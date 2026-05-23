import { Metadata } from "next";
import CompareClient from "@/components/CompareClient";

export const metadata: Metadata = {
  title: "Compare Products | Standing Shield",
  description:
    "Side-by-side comparison of all Standing Shield tumblers. Compare capacity, insulation, materials, and pricing.",
};

export default function ComparePage() {
  return <CompareClient />;
}
