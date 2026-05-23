import { Metadata } from "next";
import FaqClient from "@/components/FaqClient";

export const metadata: Metadata = {
  title: "FAQ | Standing Shield",
  description:
    "Frequently asked questions about Standing Shield products, wholesale orders, shipping, custom engraving, and warranty.",
};

export default function FaqPage() {
  return <FaqClient />;
}
