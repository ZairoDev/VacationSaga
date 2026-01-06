"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import { toast, Toaster } from "sonner";
import { BookingDataType, PropertiesDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import CheckoutCard from "@/components/CheckoutCard";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function Payment() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [amount, setAmount] = useState("0");
  const [currency, setCurrency] = useState("EUR");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const amount = parseInt(params.get("amount") || "49");
  const paymentToken = params.get("paymentToken")?.replace(/ /g, "+");
  const pId = params.get("pId");
  const bookingId = params.get("bookingId");

  const [particularProperty, setParticularProperty] =
    useState<PropertiesDataType>();
  const [booking, setBooking] = useState<BookingDataType>();

  const getPropertyById = async () => {
    try {
      // const response = await axios.post("/api/newProperties/getPropertyById", {
      //   propertyId: pId,
      // });
      // console.log("response: ", response.data);
      // setParticularProperty(response?.data?.property);
      const response = await axios.post("/api/bookings/getDetailsByBookingId", {
        bookingId,
      });
      setParticularProperty(response?.data?.property);
      setBooking(response?.data?.booking);
    } catch (err: any) {
      toast.error("Error in fetching property");
    }
  };

  useEffect(() => {
    // Check if user is logged in, redirect to login if not
    const checkAuth = async () => {
      try {
        await axios.post("/api/user/profile");
      } catch (err) {
        // User not logged in, redirect to login
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}&role=Traveller`);
        return;
      }
    };
    
    checkAuth();
    
    if (pId) {
      getPropertyById();
    }
  }, [router, pId]);

  const decryptToken = async () => {
    try {
      const response = await axios.post("api/decrypt", {
        amount: amount,
        encryptedAmount: paymentToken,
      });
      toast.success(response.data.message);
      return true;
    } catch (err) {
      setLoading(false);
      alert("Invalid Payment Token");
      return false;
    }
  };

  const createOrderId = async () => {
    try {
      const response = await axios.post("/api/order", {
        amount: amount * 100,
        currency: currency,
      });
      // console.log("orderId response: ", response);
      // console.log(response.data.orderId);
      return response.data.orderId;
    } catch (error) {
      // console.error("There was a problem with your fetch operation:", error);
      toast.error("Prolbem in placing order. Please try again");
    }
  };

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (!amount) {
      // router.replace("/");
      alert("Invalid Amount");
      return;
    }
    const result = await decryptToken();
    if (!result) return;
    setLoading(false);
    try {
      const orderId = await createOrderId();
      // console.log(orderId);
      const options = {
        key: process.env.RAZORPAY_API_KEY,
        amount: amount * 100,
        currency: currency,
        name: "VacationSaga",
        description: "Listing Plan Subscription",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            amount: amount,
            propertyId: pId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // console.log("option data: ", data);

          try {
            const result = await axios.post("/api/verify", { data: data });

            try {
              const emailRepsonse = await axios.post(
                "/api/bookings/detailsExchange",
                { bookingId: bookingId }
              );
              toast.success("Email sent successfully");
            } catch (err: any) {
              toast.error(err.response.data.error);
            }

            alert("Payment Successful");
          } catch (err) {
            toast.error("Error in Payment!. Please try again");
            // console.log("error in payment: ", err);
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#F7951D",
        },
      };
      const paymentObject = new window.Razorpay(options);
      // console.log(paymentObject);
      paymentObject.on("payment.failed", function (response: any) {
        // console.log("response error: ", response.error);
        // console.log(response.error.description);
        alert(response.error.description);
      });
      setLoading(false);
      paymentObject.open();
      router.push("/add-listing/10");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Toaster />
      <section className=" min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36">
        <h1 className=" text-4xl font-bold ">Checkout</h1>
        <form
          className="flex flex-col gap-6 sm:w-80 md:w-1/2  px-4 py-8 rounded-xl "
          onSubmit={processPayment}
        >
          {/* <div className=" flex flex-col gap-8 mt-8 borer-2 dark:border-white">
            <h2 className=" font-semibold text-xl">Continue</h2>
            <p className=" font-light">
              By Clicking on pay you will purchase the plan of € {amount}
            </p>

            <button
              type="submit"
              className=" bg-primary-6000 hover:bg-primary-700 w-full rounded-xl p-2 font-semibold"
            >
              {loading ? (
                <LuLoader2 className=" animate-spin mx-auto text-2xl font-bold" />
              ) : (
                "Pay"
              )}
            </button>
          </div> */}
          {particularProperty ? (
            <>
              <CheckoutCard
                key={particularProperty?._id}
                data={particularProperty}
                booking={booking}
                className="h-full"
              />
              <div className=" border p-2 rounded-xl border-neutral-700 flex justify-between items-center px-2">
                <div className="">
                  Pay the Platform charges to get the owner&apos; details
                </div>
                <ButtonPrimary
                  type="submit"
                  className="whitespace-nowrap end-0"
                >
                  {loading ? (
                    <LuLoader2 className=" animate-spin" />
                  ) : (
                    "PAY € 6"
                  )}
                </ButtonPrimary>
              </div>
            </>
          ) : (
            <LuLoader2 className=" animate-spin mx-auto text-2xl font-bold" />
          )}
        </form>
      </section>
    </>
  );
}

export default Payment;
