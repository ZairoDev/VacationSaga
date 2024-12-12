'use client'
import React, { Fragment, useEffect, useRef, useState } from "react";
import Input from "@/shared/Input";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "@/shared/ButtonClose";
import Button from "@/shared/Button";
import { toast } from "sonner";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Textarea from "@/shared/Textarea";
import Label from "@/components/Label";
import Loader from "@/helper/loader";
import { TfiEmail } from "react-icons/tfi";
import { BsWhatsapp } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import Link from "next/link";


function Page() {
  const [searchTerm, setSearchTerm] = useState(""); // To store user input
  const [results, setResults] = useState([]); // To store search results
  const [loading, setLoading] = useState(false); // To indicate loading state
  const [error, setError] = useState(""); // To handle errors
  const [modalIsOpen, setModalIsOpen] = useState<Boolean[]>(() => Array.from({ length: 2 }, () => false));

  const number = "9120851166";

  // Handle search functionality
  const handleSearch = async (term: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/travellerquestion/getquestion", { title: term });
      console.log(response.data.questions);
      setResults(response.data.questions);
    } catch (err) {
      setError("Something went wrong while fetching results");
    } finally {
      setLoading(false);
    }
  };
     
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    console.log(term, "Term gonna print here")
    setSearchTerm(term);
    if (term.trim()) {
      handleSearch(term);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    handleSearch("")
  }, [searchTerm])


  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const name2Ref = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const ScheduleRef = useRef<HTMLInputElement>(null);

  const [sendDetailsLoading, setSendDetailsLoading] = useState<boolean>(false);

  const handleContactForm = async () => {
    // e.preventDefault();
    setSendDetailsLoading(true);
    if (!nameRef.current?.value || !emailRef.current?.value) {
      return;
    }
    try {
      const response = await axios.post("/api/contact", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        message: messageRef.current?.value,
      });
      if (response) {
        toast.success(response.data.message);
        nameRef.current!.value = "";
        emailRef.current!.value = "";
        messageRef.current!.value = "";
      }
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setSendDetailsLoading(false);
    }
  };

  const handleScheduleForm = async () => {
    // e.preventDefault();
    setSendDetailsLoading(true);
    if (!name2Ref.current?.value || !numberRef.current?.value || !ScheduleRef.current?.value) {
      return;
    }
    try {
      const response = await axios.post("/api/schedule", {
        name: name2Ref.current?.value,
        number: numberRef.current?.value,
        Schedule: ScheduleRef.current?.value,

      });
      if (response) {
        toast.success(response.data.message);
        name2Ref.current!.value = "";
        numberRef.current!.value = "";
        ScheduleRef.current!.value = "";
      }
    } catch (err: any) {
      toast.error(err.response.data.error);
    } finally {
      setSendDetailsLoading(false);
    }
  };

  return (
    <div className=" justify-center items-center m-4 p-4 flex flex-col">
      {/* Search Bar */}
      <div className="w-1/2">
        <Input
          className=" p-2 border-gray-400 rounded"
          type="text"
          placeholder="Have a question?...."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Loading Spinner */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}

      {/* Error Message */}
      {error && <p className="mt-4 text-orange-500">{error}</p>}

      {/* Results */}
      <div className="mt-4 w-1/2">
        {results.length > 0 ? (
          results.map((result: any) => (
            <div
              key={result._id}
              className="p-4 mb-2"
            >
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <p className="text-sm text-gray-600">{result.content}</p>
            </div>
          ))
        ) : (
          !loading && searchTerm.trim() && <div className="   flex-col justify-center items center">

            <div className="flex justify-center items-center"><img src="/notfound.png " className="w-72" alt="" /></div>
            <p className="flex justify-center items-center text-base"> Didn't found what you're looking for? No worries, we’ve got more options for you!  </p>
            <div className="flex sm:flex-row flex-col justify-center">


              <Transition appear show={modalIsOpen[0] === true} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-50 overflow-y-auto"
                  // onClose={() => setModalIsOpen(false)}
                  onClose={() => setModalIsOpen((prev) => {
                    const arr = [...prev];
                    arr[0] = true;
                    return arr;
                  })}

                >
                  <div className="min-h-screen px-4 text-center flex items-center justify-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <span
                      className="inline-block h-screen align-middle"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="w-3/4 max-w-md h-4/5 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl rounded-2xl overflow-hidden flex flex-col">
                        <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                          <div className="  max-w-md">
                            <form
                              className="grid grid-cols-1 gap-6"
                              // action={handleContactForm}
                              // method="post"
                              onSubmit={handleContactForm}
                            >
                              <label className="block">
                                <Label>Full name</Label>
                                <Input
                                  placeholder="Example Doe"
                                  type="text"
                                  className="mt-1"
                                  ref={nameRef}
                                />
                              </label>
                              <label className="block">
                                <Label>Email address</Label>

                                <Input
                                  type="email"
                                  placeholder="example@example.com"
                                  className="mt-1"
                                  ref={emailRef}
                                />
                              </label>
                              <label className="block">
                                <Label>Message</Label>

                                <Textarea className="mt-1" rows={6} ref={messageRef} />
                              </label>
                              <div>
                                <ButtonPrimary onClick={handleContactForm} disabled={sendDetailsLoading}>
                                  {sendDetailsLoading ? (
                                    <p className=" flex gap-2 disabled">
                                      Sending... <Loader />
                                    </p>
                                  ) : (
                                    "Send Message"
                                  )}
                                </ButtonPrimary>
                              </div>
                            </form>
                          </div>
                          <span className="absolute left-3 top-3">
                            <ButtonClose onClick={() => setModalIsOpen((prev) => {
                              const arr = [...prev];
                              arr[0] = false;
                              return arr;
                            })} />
                          </span>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>
              <Transition appear show={modalIsOpen[1] === true} as={Fragment}>
                <Dialog
                  as="div"
                  className="fixed inset-0 z-50 overflow-y-auto"
                  onClose={() => setModalIsOpen((prev) => {
                    const arr = [...prev];
                    arr[1] = false;
                    return arr;
                  })}
                >
                  <div className="min-h-screen px-4 text-center flex items-center justify-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <span
                      className="inline-block h-screen align-middle"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="w-3/4 max-w-md h-4/5 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl rounded-2xl overflow-hidden flex flex-col">
                        <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                          <div className="  max-w-md">
                            <form
                              className="grid grid-cols-1 gap-6"
                              // action={handleContactForm}
                              // method="post"
                              onSubmit={handleScheduleForm}
                            >
                              <label className="block">
                                <Label>Full name</Label>
                                <Input
                                  placeholder="Example Doe"
                                  type="text"
                                  className="mt-1"
                                  ref={name2Ref}
                                />
                              </label>
                              <label className="block">
                                <Label>Phone Number</Label>

                                <Input
                                  type="number"
                                  placeholder="1234567890"
                                  className="mt-1"
                                  ref={numberRef}
                                />
                              </label>
                              <label className="block">
                                <Label>Schedule</Label>

                                {/* <Textarea className="mt-1" rows={6} ref={messageRef} /> */}
                                <Input
                                  type="number"
                                  placeholder=""
                                  className="mt-1"
                                  ref={numberRef}
                                />
                              </label>
                              <div>
                                <ButtonPrimary type="submit" disabled={sendDetailsLoading}>
                                  {sendDetailsLoading ? (
                                    <p className=" flex gap-2 disabled">
                                      Sending... <Loader />
                                    </p>
                                  ) : (
                                    "Make Schedule"
                                  )}
                                </ButtonPrimary>
                              </div>
                            </form>
                          </div>
                          <span className="absolute left-3 top-3">
                            <ButtonClose onClick={() => setModalIsOpen((prev) => {
                              const arr = [...prev];
                              arr[1] = false;
                              return arr;
                            })} />
                          </span>
                        </div>
                      </div>
                    </Transition.Child>
                  </div>
                </Dialog>
              </Transition>




              <div className=" flex gap-x-4 mt-4">

                <div className="dark:text-white bg-neutral-100 dark:bg-slate-800 flex items-center rounded-md h-24">
                  <Button className=" flex flex-col" onClick={() => setModalIsOpen((prev) => {
                    const arr = [...prev];
                    arr[0] = true;
                    return arr;
                  })}>
                    <TfiEmail className=" text-4xl" />
                    <p className="mt-2 text-sm whitespace-nowrap">Email Us</p>
                  </Button>
                </div>


                <div className="dark:text-white bg-neutral-100 dark:bg-slate-800 flex items-center rounded-md h-24">
                  <Button className=" flex flex-col" onClick={() => setModalIsOpen((prev) => {
                    const arr = [...prev];
                    arr[1] = true;
                    return arr;
                  })}>
                    <IoCallOutline className=" text-4xl" />
                    <p className="mt-2 text-sm whitespace-nowrap">Schedule a call</p>
                  </Button>
                </div>



                <div className="dark:text-white bg-neutral-100 dark:bg-slate-800 flex items-center rounded-md h-24">
                  <Button className=" flex flex-col" >
                    <Link
                      className=""
                      href={`https://wa.me/${number
                        }?text=${encodeURIComponent(
                          `Hello`
                        )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsWhatsapp className=" text-4xl" />
                    </Link>
                    <p className="mt-2 text-sm whitespace-nowrap">Whatsapp</p>
                  </Button>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Page;

