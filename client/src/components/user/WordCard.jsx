import WordDetailCard from "./WordDetailCard";
import { useState } from "react";

export default function WordCard({word}){
    const [open, setOpen] = useState(false);

    const handleCardClick = (e) => {
        if (e.target.closest(".fav-btn")) return;
        setOpen(true);
    };

    return (
        <>
            {/*Word Card*/}
            <div 
                onClick={handleCardClick}
                className="w-[565px] rounded-[20px] pt-1 bg-gradient-to-r from-purple-800/80 to-indigo-500/80"
            >
                <div data-property-1="Default" className="w-[565px] p-9 bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-7">
                    <div className="self-stretch inline-flex justify-between items-start"> 
                        <div className="w-80 inline-flex flex-col justify-start items-start gap-3">
                            <div className="self-stretch justify-start text-gray-700 text-3xl font-medium font-['Inter']">{word?.EnglishWord || "No Word" }</div>
                            <div className="justify-start text-indigo-500 text-3xl font-normal font-['Inter']">{word?.KhmerWord || ""}</div>
                        </div>
                        {/* Fav */}
                        <div 
                            data-property-1="fav" 
                            className="flex justify-start items-center gap-2.5"
                            onClick={(e)=> {
                                e.stopPropagation();
                                console.log("Fav clicked");
                            }}
                        >
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-4 left-0 top-0 absolute">
                                    <div className="w-4 h-3.5 left-0 top-0 absolute">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 2.74805L7.28325 2.01133C5.5989 0.280067 2.51415 0.877695 1.40036 3.05284C0.876534 4.07583 0.75875 5.55246 1.71429 7.43758C2.63457 9.25313 4.54767 11.4265 8 13.7946C11.4523 11.4265 13.3654 9.25313 14.2857 7.43758C15.2413 5.55246 15.1235 4.07583 14.5996 3.05284C13.4859 0.877695 10.4011 0.280067 8.71675 2.01133L8 2.74805ZM8 15C-7.33313 4.86841 3.27876 -3.04087 7.82432 1.14308C7.88395 1.19797 7.94253 1.25493 8 1.314C8.05747 1.25494 8.11605 1.19797 8.17567 1.14309C12.7212 -3.04088 23.3331 4.8684 8 15Z" fill="#667EEA"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Section */}
                    <div className="self-stretch pt-7 border-t border-slate-200 inline-flex justify-between items-start">
                        <div className="justify-start text-slate-500 text-base font-medium font-['Inter']"> Added: {word?.createdAt?.slice(0, 10) || "N/A"}</div>

                        {/* Reference button */}
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(true);
                            }}
                            data-property-1="Default" 
                            className="h-10 px-2.5 py-5 bg-green-600 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5"
                        >
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-3 left-[0.13px] top-[2px] absolute">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00001 3.5C1.00001 2.67157 1.67158 2 2.50001 2H5.26394C6.22171 2 7.02474 2.55996 7.57542 3.18398C7.98525 3.64839 8.47872 4 9.00001 4H13.5007C14.3296 4 15 4.67203 15 5.5V6.13933C15.5696 6.40467 15.9394 7.0161 15.8556 7.68605L15.2151 12.8101C15.0588 14.0612 13.9953 15 12.7344 15H3.26557C2.00476 15 0.941261 14.0612 0.784877 12.8101L0.144373 7.68605C0.0606283 7.0161 0.430461 6.40467 1.00001 6.13933V3.5ZM2.00001 6H14V5.5C14 5.22341 13.7764 5 13.5007 5H9.00001C8.03611 5 7.28948 4.37127 6.82563 3.84565C6.37382 3.33367 5.82126 3 5.26394 3H2.50001C2.22386 3 2.00001 3.22386 2.00001 3.5V6ZM1.63279 7C1.33204 7 1.09935 7.26359 1.13665 7.56202L1.77715 12.6861C1.87099 13.4367 2.50909 14 3.26557 14H12.7344C13.4909 14 14.129 13.4367 14.2229 12.6861L14.8634 7.56202C14.9007 7.26359 14.668 7 14.3672 7H1.63279Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="justify-start text-white text-base font-medium font-['Inter']">Reference</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {open && (
            <div
                className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                onClick={() => setOpen(false)} // close when clicking overlay
            >
                <div
                className="rounded-2xl p-6 shadow-lg max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                >
                {/* Word Detail Card */}
                <WordDetailCard word={word}/>
                </div>
            </div>
            )}
        </>
    );
}