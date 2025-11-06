const navItems = [
  { label: "Contact", target: "contact" },
  { label: "Services", target: "services" },
  { label: "Projects", target: "projects" },
  { label: "About Us", target: "about" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold tracking-wide">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
          <span>
            SONI&lt;PRIME <span className="font-normal">/&gt;EV</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((n) => (
            <button
              key={n.target}
              onClick={() => scrollToId(n.target)}
              className="hover:text-blue-600 transition-colors"
            >
              {n.label} →
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}