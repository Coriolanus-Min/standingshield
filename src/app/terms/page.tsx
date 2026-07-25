import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Standing Shield",
  description: "The terms that govern your use of the Standing Shield website and wholesale services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Standing Shield website, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree, please do not use the site.",
  },
  {
    title: "2. Products & Wholesale Orders",
    body: "All products are offered primarily for wholesale purchase and are subject to the stated minimum order quantities. Prices, specifications, and availability may change without notice. A binding contract forms only upon our written order confirmation.",
  },
  {
    title: "3. Custom Engraving",
    body: "Custom laser-engraving orders require artwork approval before production. You represent that you own or have licensed all rights to any logo or artwork you submit, and you indemnify us against third-party claims arising from its use.",
  },
  {
    title: "4. Intellectual Property",
    body: "All content on this site — including the Standing Shield name, the camel rider logo, product designs, images, and text — is the property of Standing Shield and may not be reproduced without written permission.",
  },
  {
    title: "5. Warranty & Returns",
    body: "Standing Shield tumblers carry a lifetime warranty against manufacturing defects and a 30-day return policy for unused goods in original packaging. Warranty does not cover normal wear, misuse, or unauthorized modification.",
  },
  {
    title: "6. Limitation of Liability",
    body: "To the maximum extent permitted by law, Standing Shield shall not be liable for indirect, incidental, or consequential damages arising from the use of our products or this website.",
  },
  {
    title: "7. Governing Law",
    body: "These terms are governed by the laws of the jurisdiction in which Standing Shield is incorporated, without regard to conflict-of-law principles. Disputes will be resolved in the competent courts of that jurisdiction.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <p className="text-orange-500 tracking-widest uppercase text-sm font-semibold mb-3">Legal</p>
        <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-wider mb-2">Terms of Service</h1>
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
          Questions about these terms? Email{" "}
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
