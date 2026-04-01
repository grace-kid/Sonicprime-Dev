import React from "react";
// import rectangle9 from "./rectangle-9.png";

export const Hero = () => {
  const tags = [
    { id: 1, label: "SAAS", top: "721px", left: "30px" },
    { id: 2, label: "PAAS", top: "721px", left: "158px" },
    { id: 3, label: "SACE", top: "720px", left: "283px" },
    { id: 4, label: "AWS", top: "765px", left: "42px" },
    { id: 5, label: "IAAS", top: "764px", left: "158px" },
  ];

  const tagBackgrounds = [
    { id: 1, top: "730px", left: "18px" },
    { id: 2, top: "730px", left: "145px" },
    { id: 3, top: "730px", left: "273px" },
    { id: 4, top: "774px", left: "18px" },
    { id: 5, top: "774px", left: "145px" },
  ];

  return (
    <article className='absolute top-[2222px] left-[985px] w-[393px] h-[852px] bg-[#f5feff] border-[3px] border-solid border-[#c2e8f780] overflow-y-scroll'>
      <img
        className='absolute top-[49px] left-[18px] w-[358px] h-[275px] object-cover'
        alt='Cloud Solution Infrastructure'
        // src={rectangle9}
      />

      <div className='absolute top-[347px] left-[18px] w-[346px]'>
        <h2 className="[font-family:'Inter-Medium',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[100px] m-0">
          Cloud Solution
        </h2>

        <p className="[font-family:'Inter-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-10 m-0 mt-8">
          Scalable cloud infrastructure and migration services to optimize your
          operations and reduce costs.
        </p>
      </div>

      <div
        className='absolute top-[700px] left-[18px]'
        role='list'
        aria-label='Cloud service tags'>
        {tagBackgrounds.map((bg) => (
          <div
            key={bg.id}
            className='absolute w-[103px] h-[21px] bg-white rounded-[10px]'
            style={{ top: bg.top, left: bg.left }}
          />
        ))}

        {tags.map((tag) => (
          <div
            key={tag.id}
            className="absolute [font-family:'Inter-Light',Helvetica] font-light text-black text-[15px] tracking-[0] leading-10 whitespace-nowrap"
            style={{ top: tag.top, left: tag.left }}
            role='listitem'>
            {tag.label}
          </div>
        ))}
      </div>
    </article>
  );
};
