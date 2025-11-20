import React from "react";

const PictureCard = ({ imageSrc, name, role }) => {
  return (
    <div data-property-1="Default" className=" p-5 bg-white rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-center items-center gap-5 hover:shadow-lg transition-shadow duration-300">
    {/* <img className="self-stretch rounded-[20px]" src={imageSrc} alt={name} /> */}
    <div className="self-stretch h-20 flex flex-col justify-start items-center gap-2.5">
        <div className="text-center text-main-color lg:text-xl font-medium">{name}</div>
        <div className="text-center text-slate-600 lg:text-xl font-normal">{role}</div>
    </div>
</div>
  );
};

export default PictureCard;