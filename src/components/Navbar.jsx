// const navItems = [
//   { label: "Contact", target: "contact" },
//   { label: "Services", target: "services" },
//   { label: "Projects", target: "projects" },
//   { label: "About Us", target: "about" },
// ];

// function scrollToId(id) {
//   const el = document.getElementById(id);
//   if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
// }

export default function Navbar() {
  return (
      <header className="  left-0 w-[1440px] h-[62px] bg-[#f5feff] border-[#2c416780]">
        <div className="absolute top-0 left-[94px] w-[491px] [font-family:'Kantumruy_Pro-Regular',Helvetica] font-normal text-black text-4xl tracking-[0] leading-[60px] whitespace-nowrap">
          SONI&lt;PRIME&nbsp;&nbsp;/&gt;EV
        </div>
        <img
          className="absolute top-[7px] left-[19px] w-[50px] h-[51px] object-cover"
          alt="Ellipse"
          // src={ellipse8}
        />
        <nav className="absolute top-6 left-[709px] flex gap-[49px]">
          <div className="w-[123px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            CONTACT →
          </div>
          <div className="w-[122px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            SERVICES →
          </div>
          <div className="w-[130px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            PROJECTS →
          </div>
          <div className="w-[186px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            ABOUT-US →
          </div>
        </nav>
      </header>
  );
}