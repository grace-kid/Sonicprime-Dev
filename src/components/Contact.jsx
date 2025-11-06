export default function Contact() {
  return (
    <section className="bg-gradient-to-b from-white to-indigo-200 py-16">
      <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-2xl font-bold">Get in Touch</h3>
          <p className="text-slate-600 text-sm mt-1">
            Get in touch with our team to discuss your project
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-3">
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Name" />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Email" />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Subject" />
            <textarea rows="5" className="w-full rounded-lg border border-slate-300 px-3 py-2" placeholder="Message" />
            <button className="w-full rounded-lg bg-blue-700 text-white py-3 font-semibold">
              Send Message
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Address:</strong> 123 Tech94025 Street, Silicon Valley, CA</li>
              <li><strong>Phone:</strong> +1 (234) 567-890</li>
              <li><strong>Email:</strong> info@bchub.com</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <h4 className="font-semibold mb-3">Business Hours</h4>
            <ul className="space-y-2 text-slate-700">
              <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
              <li>Saturday: 10:00 AM – 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}