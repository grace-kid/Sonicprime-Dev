import { useState } from "react";

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer web development, mobile app, digital marketing and cyber security solutions.",
  },
  {
    q: "How long does a typical project last?",
    a: "Timelines vary by complexity; we provide a detailed plan after our initial consultation.",
  },
  {
    q: "Do you offer support after project completion?",
    a: "Yes. We provide ongoing support and maintenance to ensure optimal performance.",
  },
  {
    q: "What is your pricing model?",
    a: "Flexible pricing models based on requirements. Contact us for a detailed quote.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <p className="text-center text-slate-500 mt-2">Find answers to common questions</p>

        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4"
                >
                  <span className="font-medium text-left">{f.q}</span>
                  <span className="text-blue-700">{isOpen ? "▴" : "▾"}</span>
                </button>
                {isOpen && <div className="px-5 pb-5 text-slate-600">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}