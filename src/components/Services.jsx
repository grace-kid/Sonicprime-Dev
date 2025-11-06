const services = [
  {
    title: "Web Development",
    copy:
      "Custom web applications built with modern frameworks and best practices.",
    tags: ["Node.js", "React", "JavaScript", "HTML5", "Python"],
    img: "https://picsum.photos/seed/web/480/320",
  },
  {
    title: "App Development",
    copy:
      "Native and cross-platform mobile apps with exceptional experiences.",
    tags: ["iOS", "Android", "SQL", "React Native", "Flutter"],
    img: "https://picsum.photos/seed/app/480/320",
  },
  {
    title: "Cloud Solution",
    copy:
      "Scalable cloud infrastructure & migration services to optimize cost.",
    tags: ["SaaS", "PaaS", "AWS", "IAAS", "SASE"],
    img: "https://picsum.photos/seed/cloud/480/320",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Our Services</h2>
        <p className="text-center text-slate-500 mt-2">
          Comprehensive solutions for your digital needs
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((svc) => (
            <div key={svc.title} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
              <img src={svc.img} alt="" className="rounded-xl mb-4 h-40 w-full object-cover" />
              <h3 className="font-semibold text-lg">{svc.title}</h3>
              <p className="text-slate-600 mt-2">{svc.copy}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {svc.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                    {t}
                  </span>
                ))}
              </div>
              <button className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full ring-1 ring-slate-300">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}