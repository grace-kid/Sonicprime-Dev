const cards = [
  {
    name: "John Smith",
    role: "CEO, Tech Solutions",
    img: "https://i.pravatar.cc/160?img=13",
    text:
      "Sonicprime Dev transformed our digital presence with innovative solutions and a professional approach.",
  },
  {
    name: "Jane Doe",
    role: "COO, Cloudify",
    img: "https://i.pravatar.cc/160?img=23",
    text:
      "Reliable, creative, and fast. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-indigo-200 to-blue-700 py-16">
      <div className="mx-auto max-w-7xl px-4 text-slate-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Client Testimonials</h2>
        <p className="text-center text-slate-700 mt-2">What our clients say about us</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {cards.map((c) => (
            <div key={c.name} className="rounded-xl bg-white p-6 shadow">
              <div className="flex items-center gap-4">
                <img src={c.img} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-blue-700 text-sm">{c.role}</div>
                </div>
              </div>
              <p className="mt-4 text-slate-700">“{c.text}”</p>
            </div>
          ))}
        </div>

        {/* Review form */}
        <div className="mt-10 rounded-2xl bg-white/80 p-6">
          <h3 className="font-semibold">Drop review</h3>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 grid gap-4 md:grid-cols-2">
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Your Name" />
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Upload your image (URL)" />
            <input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="Title eg: Mr" />
            <div className="flex items-center gap-2">
              <span>Rating:</span>
              <div className="select-none">★ ★ ★ ★ ☆</div>
            </div>
            <textarea className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2" rows="4" placeholder="Comments" />
            <button className="md:col-span-2 w-full rounded-lg bg-green-600 text-white py-3 font-semibold">
              submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}