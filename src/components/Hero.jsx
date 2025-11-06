export default function Hero() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-slate-100 via-indigo-200 to-blue-700">
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-28">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white/95">
            <span className="block">SONICPRIME DEV</span>
            <span className="block mt-3 text-white/90">SOFTWARE DEVELOPMENT</span>
            <span className="block mt-3 text-white/80 underline decoration-white/40">
              COMPANY
            </span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold shadow"
            >
              View Archives →
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-5 py-3 rounded-xl bg-blue-800/70 text-white font-semibold ring-1 ring-white/30"
            >
              Get in Touch →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}