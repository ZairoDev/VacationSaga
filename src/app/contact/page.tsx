"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/shared/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import ButtonPrimary from "@/shared/ButtonPrimary";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Loader from "@/helper/loader";

export interface PageContactProps {}

const info = [
  {
    title: "Legal Name",
    desc: "Zairo International Pvt. Ltd.",
  },
  {
    title: "🗺 ADDRESS",
    desc: "117/N/70 3rd Floor Kakadeo Kanpur",
  },
  {
    title: "💌 EMAIL",
    desc: "info@vacationsaga.com",
  },
  {
    title: "For Support",
    desc: "support@vacationsaga.com",
  },
  {
    title: "For Sales Support",
    desc: "+91 9120851166",
  },
  {
    title: "For Booking Support",
    desc: "+91 8960980806 / 9621119484",
  },
];

const PageContact: FC<PageContactProps> = ({}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [sendDetailsLoading, setSendDetailsLoading] = useState<boolean>(false);

  const handleContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <Toaster />
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Contact
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
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
                  <ButtonPrimary type="submit" disabled={sendDetailsLoading}>
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
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <div className="container">
        <SectionSubscribe2 className="pb-24 lg:pb-32" />
      </div>
    </div>
  );
};

export default PageContact;
