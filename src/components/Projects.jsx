import { useRef } from "react";

const items = [
  {
    title: "e-commerce",
    img: "https://picsum.photos/seed/ecom1/640/400",
    copy: "Advanced analytics platform for real-time data monitoring with widgets & notifications.",
  },
  {
    title: "e-commerce",
    img: "https://picsum.photos/seed/ecom2/640/400",
    copy: "Custom storefronts and content tools enabling growth.",
  },
  {
    title: "e-commerce",
    img: "https://picsum.photos/seed/ecom3/640/400",
    copy: "Conversion-first product pages and checkout.",
  },
];

export default function Projects() {
  const scroller = useRef(null);
  const step = () => (scroller.current?.clientWidth ?? 400) * 0.9;
  const scrollBy = (x) => scroller.current?.scrollBy({ left: x, behavior: "smooth" });

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Latest Projects</h2>
        <p className="text-center text-slate-500 mt-2">
          Discover our latest work and innovations
        </p>

        <div className="relative mt-8">
          <button
            onClick={() => scrollBy(-step())}
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
            aria-label="Prev"
          >‹</button>

          <div
            ref={scroller}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-4"
          >
            {items.map((it, i) => (
              <article
                key={i}
                className="min-w-[300px] md:min-w-[420px] snap-start rounded-3xl bg-white shadow ring-1 ring-slate-200 overflow-hidden"
              >
                <img src={it.img} alt="" className="h-56 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{it.title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{it.copy}</p>
                  <div className="mt-4 flex gap-3">
                    <button className="px-4 py-2 rounded-xl ring-1 ring-slate-300 text-slate-800 font-medium">
                      About
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium">
                      Preview
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={() => scrollBy(step())}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow"
            aria-label="Next"
          >›</button>
        </div>
      </div>
    </section>
  );
}