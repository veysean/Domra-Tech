export default function RequestChangeCard ({ onClose }) {

   return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            {/* Optional semi-transparent background */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="fixed w-[657px] p-7 bg-indigo-500 rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex flex-col justify-center items-center gap-7 z-50">
                <div className="self-stretch h-10 text-center justify-start text-white text-3xl font-bold font-['Inter']">Request Changing</div>
                <div className="self-stretch p-7 bg-white rounded-3xl flex flex-col justify-end items-end gap-11">
                    <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-start text-gray-700 text-xl font-normal font-['Inter']">English Word</div>
                        <div className="self-stretch h-10 p-2.5 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-indigo-500 inline-flex justify-start items-center gap-2.5">
                            <div className="justify-start text-slate-500 text-sm font-light font-['Inter'] leading-snug">Enter New English word</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-start text-gray-700 text-xl font-normal font-['Inter']">Khmer Word</div>
                        <div className="self-stretch h-10 p-2.5 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-indigo-500 inline-flex justify-start items-center gap-2.5">
                            <div className="justify-start text-slate-500 text-sm font-light font-['Inter'] leading-snug">Enter New Khmer word</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-start text-gray-700 text-xl font-normal font-['Inter']">French Word</div>
                        <div className="self-stretch h-10 p-2.5 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-indigo-500 inline-flex justify-start items-center gap-2.5">
                            <div className="justify-start text-slate-500 text-sm font-light font-['Inter'] leading-snug">Enter New French word</div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-start text-gray-700 text-xl font-normal font-['Inter']">Word Reference</div>
                        <div className="self-stretch h-10 p-2.5 bg-white rounded-xl outline-1 outline-offset-[-1px] outline-indigo-500 inline-flex justify-start items-center gap-2.5">
                            <div className="justify-start text-slate-500 text-sm font-light font-['Inter'] leading-snug">Enter New word reference</div>
                        </div>
                    </div>
                    <div className="inline-flex justify-start items-center gap-[5px]">
                        <button   onClick={onClose}>
                        <div data-property-1="Default" className="w-24 h-10 px-2.5 py-5 bg-slate-500 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-base font-medium font-['Inter']">Cancel</div>
                        </div>
                        </button>
                        <div data-property-1="Default" className="w-24 h-10 px-2.5 py-5 bg-indigo-500 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                            <div className="justify-start text-white text-base font-medium font-['Inter']">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   );
}