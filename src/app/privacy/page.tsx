import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Standing Shield",
  description: "How Standing Shield collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly — such as your name, email address, shipping details, and wholesale inquiry content — as well as limited technical data (browser type, device, pages visited) collected automatically when you browse our site.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to process orders and inquiries, respond to support requests, improve our products and website, and — only with your consent — send product updates and wholesale offers. We do not sell your personal data.",
  },
  {
    title: "3. Cookies",
    body: "We use essential cookies to keep your cart and preferences working, and optional analytics cookies to understand how the site is used. You can disable non-essential cookies in your browser settings at any time.",
  },
  {
    title: "4. Data Sharing",
    body: "We share data only with the service providers required to fulfill your order (payment processors, shipping carriers) and only to the extent necessary. All partners are bound by contractual data-protection obligations.",
  },
  {
    title: "5. Data Retention & Security",
    body: "Order records are retained as required by applicable tax and commercial law. We apply industry-standard encryption in transit and at rest, and restrict internal access on a need-to-know basis.",
  },
  {
    title: "6. Your Rights",
    body: "Depending on your jurisdiction, you may have the right to access, correct, export, or delete your personal data. To exercise any of these rights, contact us at publicuse113@gmail.com.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this policy from time to time. Material changes will be announced on this page with a revised effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">Legal</p>
        <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-wider mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-12">Last updated: July 1, 2026 · Placeholder — final legal text pending review.</p>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold tracking-wide mb-3">{s.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-16 border-t border-white/10 pt-8">
          Questions about this policy? Email{" "}
          <a href="mailto:publicuse113@gmail.com" className="text-orange-500 hover:underline">
            publicuse113@gmail.com
          </a>
          .
        </p>
      </section>
      <Footer />
    </main>
  );
}
