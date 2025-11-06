const team = [
  { name: "Benson Okoye", role: "CEO & Founder", img: "https://i.pravatar.cc/480?img=5" },
  { name: "Charles Chris", role: "Head of Education", img: "https://i.pravatar.cc/480?img=12" },
  { name: "Micheal Chen", role: "Team Lead", img: "https://i.pravatar.cc/480?img=32" },
];

const IconX = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3 3h4.6l5.2 7.5L18.5 3H21l-7 10 7 8h-4.6L11 13.5 5.5 21H3l7.1-10L3 3z"/></svg>
);
const IconIn = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v13H0zM8 8h4.7v1.8h.07c.66-1.2 2.27-2.46 4.67-2.46 4.99 0 5.9 3.28 5.9 7.55V21H18v-6.24c0-1.49-.03-3.41-2.08-3.41-2.09 0-2.41 1.63-2.41 3.31V21H8z"/></svg>
);

export default function Team() {
  return (
    <section className="bg-gradient-to-b from-white to-indigo-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Meet Our Team</h2>
        <p className="text-center text-slate-600 mt-2">
          Meet the experts behind our success
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl bg-white shadow-lg overflow-hidden">
              <img src={m.img} alt="" className="h-72 w-full object-cover" />
              <div className="p-5">
                <div className="font-semibold">{m.name}</div>
                <div className="text-blue-700 text-sm">{m.role}</div>
                <div className="mt-4 flex gap-3 text-slate-700">
                  <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"><IconIn /></a>
                  <a href="#" aria-label="X" className="hover:text-blue-600"><IconX /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}