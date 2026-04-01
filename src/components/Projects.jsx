import { useRef } from "react";

const items = [
  {
    title: "e-commerce",
    img: "https://picsum.photos/seed/ecom1/640/400",
    copy: "Advanced analytics platform for real-time data monitoring with widgets & notifications.",
  },
  {
    title: "e-commerce",
    img: "https://picsum.photos/seed/ecom2/640/400",
    copy: "Custom storefronts and content tools enabling growth.",
  },
  {
    title: "e-commerce",
    img: "https://picsum.photos/seed/ecom3/640/400",
    copy: "Conversion-first product pages and checkout.",
  },
];

export default function Projects() {
  const scroller = useRef(null);
  const step = () => (scroller.current?.clientWidth ?? 400) * 0.9;
  const scrollBy = (x) => scroller.current?.scrollBy({ left: x, behavior: "smooth" });

  return (
    <div>
      <section className='flex flex-col w-[601px] items-center absolute top-[1084px] left-[409px]'>
        <div className='flex flex-col items-center gap-1 relative self-stretch w-full flex-[0_0_auto]'>
          <h2 className="relative w-[737px] mt-[-1.00px] ml-[-68.00px] mr-[-68.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[53.5px] text-center tracking-[0] leading-[78.4px]">
            Latest Projects
          </h2>
        </div>
        <p className="relative self-stretch [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#fffffffc] text-[19.6px] text-center tracking-[0] leading-[28.7px]">
          Discover our latest work and innovations
        </p>
      </section>
      {items.map((project, index) => (
        <article
          key={project.id}
          className={`absolute ${
            index === 0
              ? "top-[1252px] left-[53px] w-[528px] h-[621px]"
              : index === 1
              ? "top-[1247px] left-[643px] w-[513px] h-[626px]"
              : "top-[1252px] left-[1216px] w-56 h-[626px]"
          } bg-white ${
            index === 2
              ? "rounded-[0px_0px_0px_30px]"
              : "rounded-[0px_0px_30px_30px]"
          }`}>
          <img
            className={`absolute ${
              index === 0
                ? "top-px left-0.5 w-[526px] h-[433px]"
                : index === 1
                ? "top-[7px] left-0.5 w-[511px] h-[431px]"
                : "top-0 left-0.5 w-[222px] h-[433px]"
            } object-cover`}
            alt='Rectangle'
            src={items.image}
          />
          <div
            className={`flex flex-col w-[453px] items-center gap-[3.54px] absolute 
              ${ 
              index === 0
                ? "top-[435px] left-10"
                : index === 1
                ? "top-[440px] left-[46px]"
                : "top-[435px] left-[-127px]"
            }`}>
            <div className="relative w-[460.79px] mt-[-0.88px] ml-[-3.98px] mr-[-3.98px] text-[#484848] text-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-2xl tracking-[0] leading-[35.2px]">
              {project.title}
            </div>
          </div>
          <div
            className={`${
              index === 0
                ? "top-[479px] left-[32px]"
                : index === 1
                ? "top-[481px] left-[43px]"
                : "top-[483px] left-[58px]"
            } [-webkit-text-stroke:1px_#ffffff] text-[#1638bd] text-2xl leading-[35.2px] whitespace-nowrap absolute [font-family:'Inter-SemiBold',Helvetica] font-semibold text-center tracking-[0]`}>
            About
          </div>
          <img
            className={`absolute ${
              index === 0
                ? "top-[475px] left-[32px] w-[137px] h-[46px]"
                : index === 1
                ? "top-[478px] left-[43px] w-[134px] h-[43px]"
                : "top-[475px] left-[58px] w-[152px] h-[53px]"
            }`}
            alt='Rectangle'
            // src={project.aboutButton}
          />
          <p
            className={`absolute ${
              index === 0
                ? "top-[538px] left-[47px] w-[439px]"
                : index === 1
                ? "top-[543px] left-[29px] w-[445px]"
                : "top-[540px] left-[17px] w-[445px]"
            } [font-family:'Inter-Bold',Helvetica] font-bold text-[#3813dc] text-base text-center tracking-[0] leading-[23.4px]`}>
            {project.description}
          </p>
          <div
            className={`absolute ${
              index === 0
                ? "top-[484px] left-[250px] w-[203px] h-[58px]"
                : index === 1
                ? "top-[475px] left-[291px] w-[222px] h-[60px]"
                : "top-[475px] left-[233px] w-[222px] h-[60px]"
            }`}>
            <div
              className={`${index === 0 ? "top-[-7px]" : "top-0"} left-[42px] ${
                index === 0 ? "w-[129px] h-[41px]" : "w-[138px] h-[46px]"
              } bg-[#1638bd] absolute rounded-[10px]`}
            />
            <div
              className={`absolute ${
                index === 0
                  ? "top-[calc(50.00%_-_30px)]"
                  : "top-[calc(50.00%_-_26px)]"
              } left-[calc(50.00%_-_46px)] ${
                index === 0 ? "" : "w-[92px]"
              } [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[35.2px] whitespace-nowrap`}>
              Preview
            </div>
          </div>
        </article>
      ))}
      {/* // <LatestProjectsSection /> */}
      <section className='flex flex-col w-[827px] items-center gap-1 absolute top-[2016px] left-[calc(50.00%_-_423px)]'>
        <h2 className="relative w-[603px] mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#484848] text-[53.5px] text-center tracking-[0] leading-[78.4px]">
          Our Services
        </h2>
        <p className="relative w-[745px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#6d7681] text-[19.6px] text-center tracking-[0] leading-[28.7px]">
          Comprehensive solutions for your digital needs
        </p>
      </section>
    </div>
  );
}