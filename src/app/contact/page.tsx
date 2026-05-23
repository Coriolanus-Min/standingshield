import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Standing Shield",
  description:
    "Get in touch for wholesale inquiries, custom laser engraving, and bulk orders. Standing Shield B2B team is ready to assist.",
};

export default function ContactPage() {
  return <ContactClient />;
}
