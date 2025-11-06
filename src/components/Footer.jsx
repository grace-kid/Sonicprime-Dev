const socials = [
  { name: "X", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white font-semibold">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
            ONICPRIME DEV
          </div>
          <p className="mt-3 text-sm text-slate-400 max-w-sm">
            Empowering careers through expert-led online technology and development.
          </p>
        </div>

        <div>
          <div className="font-semibold text-white">Quick Links</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><a className="hover:text-white" href="#about">About Us</a></li>
            <li><a className="hover:text-white" href="#projects">Projects</a></li>
            <li><a className="hover:text-white" href="#testimonials">Testimonials</a></li>
            <li><a className="hover:text-white" href="#contact">Contacts</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white">Contact Us</div>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>sonicprimedev@gmail.com</li>
            <li>+(234)7082865002</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-white">Follow Us</div>
          <div className="mt-3 flex gap-3">
            {socials.map((s) => (
              <a key={s.name} className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20" href={s.href}>
                {s.name}
              </a>
            ))}
          </div>
          <div className="mt-6">
            <label className="text-sm text-slate-400">Newsletter</label>
            <div className="mt-2 flex">
              <input className="w-full rounded-l-lg border border-slate-600 bg-transparent px-3 py-2 text-slate-200 placeholder:text-slate-500" placeholder="Your email" />
              <button className="rounded-r-lg bg-blue-600 px-4">Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © 2025 SONICPRIMEDEV. All rights reserved
      </div>
    </footer>
  );
}