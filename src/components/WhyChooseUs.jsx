const features = [
  { title: "Innovative Solutions", copy: "Cutting-edge tech and creative approaches to solve complex problems.", icon: "💡" },
  { title: "Expert Team", copy: "Highly skilled professionals with diverse industry experience.", icon: "👥" },
  { title: "Timely Delivery", copy: "Consistent track record of delivering on schedule.", icon: "⏱" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Why Choose Us</h2>
        <p className="text-center text-slate-500 mt-2">What sets us apart from the rest</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="text-slate-600 mt-2">{f.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-slate-100 p-6">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-slate-700 mt-2">
              To empower business through innovative technology solutions, driving growth and digital transformation.
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 p-6">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-slate-700 mt-2">
              To be a leading force in technological innovation with sustainable digital solutions worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}