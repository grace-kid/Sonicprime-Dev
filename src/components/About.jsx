export default function About() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="rounded-3xl bg-gradient-to-b from-indigo-700 to-blue-700 p-6 md:p-8 text-white shadow-xl ring-1 ring-white/20">
          <h3 className="text-3xl font-bold">About us</h3>
          <p className="mt-2 text-white/80 text-sm">Read more about us</p>
          <p className="mt-6 leading-7 text-white/90">
            SonicPrime Dev Portfolio is a forward-thinking technology firm dedicated to
            empowering innovation. Our commitment to creativity, expertise, and reliability
            makes us a strategic partner for businesses and communities.
          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-white/90">
            <div><span className="text-2xl font-bold">50+</span><div>Projects</div></div>
            <div><span className="text-2xl font-bold">100+</span><div>Clients</div></div>
            <div><span className="text-2xl font-bold">200k+</span><div>Community</div></div>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
          alt=""
          className="rounded-3xl shadow-xl"
        />
      </div>
    </section>
  );
}