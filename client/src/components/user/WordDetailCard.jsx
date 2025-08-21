export default function WordDetailCard({word}) {
    return (
        <div className="w-[565px] p-7 bg-white rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-t-[5px] border-indigo-500 inline-flex flex-col justify-center items-center gap-7">
            <div className="self-stretch inline-flex justify-between items-start">
                <div className="w-80 inline-flex flex-col justify-start items-start gap-3">
                    <div className="self-stretch justify-start text-gray-700 text-3xl font-medium font-['Inter']">{word?.EnglishWord}</div>
                    <div className="justify-start text-indigo-500 text-3xl font-normal font-['Inter']">{word?.KhmerWord}</div>
                    <div className="justify-start text-indigo-500 text-3xl font-normal font-['Inter']"> {word?.FrenchWord}</div>
                </div>
                <div data-property-1="fav" className="flex justify-start items-center gap-2.5">
                    <div className="w-4 h-4 relative">
                        <div className="w-4 h-4 left-0 top-0 absolute">
                            <div className="w-4 h-3.5 left-0 top-0 absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2.74805L7.28325 2.01133C5.5989 0.280067 2.51415 0.877695 1.40036 3.05284C0.876534 4.07583 0.75875 5.55246 1.71429 7.43758C2.63457 9.25313 4.54767 11.4265 8 13.7946C11.4523 11.4265 13.3654 9.25313 14.2857 7.43758C15.2413 5.55246 15.1235 4.07583 14.5996 3.05284C13.4859 0.877695 10.4011 0.280067 8.71675 2.01133L8 2.74805ZM8 15C-7.33313 4.86841 3.27876 -3.04087 7.82432 1.14308C7.88395 1.19797 7.94253 1.25493 8 1.314C8.05747 1.25494 8.11605 1.19797 8.17567 1.14309C12.7212 -3.04088 23.3331 4.8684 8 15Z" fill="#667EEA"/>
                                </svg>
                            </div>
                        <div/>
                    </div>
                </div>
            </div>
        </div>
            {/* Definition */}
            <div className="self-stretch p-5 bg-gray-200 rounded-[20px] border-l-[3px] border-indigo-500 flex flex-col justify-start items-start gap-5">
                <div className="self-stretch justify-start text-slate-500 text-base font-medium font-['Inter']">Definition</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                    <div className="self-stretch justify-start text-indigo-500 text-base font-normal font-['Inter']">{word?.definition}</div>
                </div>
            </div>

            {/* Example */}
            <div className="self-stretch p-5 bg-gray-200 rounded-[20px] border-l-[3px] border-indigo-500 flex flex-col justify-start items-start gap-5">
                <div className="self-stretch justify-start text-slate-500 text-base font-medium font-['Inter']">Example</div>
                <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                    <div className="self-stretch justify-start text-indigo-500 text-base font-normal font-['Inter']">{word?.example || "No Example"}</div>
                </div>
            </div>

            {/* Reference */}
            <div className="w-[493px] h-10 p-5 bg-gray-50 rounded-[20px] border-l-[3px] border-indigo-500 inline-flex justify-start items-center gap-7">
                <div className="justify-start text-slate-600 text-base font-medium font-['Inter']">Reference</div>
                <div className="w-1.5 h-4">
                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1C3.73367 4.12419 5.26633 5.87581 8 9L1 17" stroke="#4A5568" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
            <div className="self-stretch pt-7 border-t border-slate-200 inline-flex justify-between items-start">
                <div className="w-[505px] flex justify-between items-center">
                    <div className="justify-start text-slate-500 text-base font-medium font-['Inter']">Added: {word?.createdAt?.slice(0, 10) || "N/A"}</div>
                    <div className="w-60 flex justify-end items-center gap-2.5">
                        <div data-property-1="Default" className="h-10 px-2.5 py-5 bg-yellow-400 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                            <div className="w-4 h-4 relative">
                                <div className="w-4 h-3 left-[0.13px] top-[2px] absolute">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.999763 3.5C0.999763 2.67157 1.67134 2 2.49976 2H5.2637C6.22146 2 7.02449 2.55996 7.57518 3.18398C7.98501 3.64839 8.47847 4 8.99976 4H13.5005C14.3293 4 14.9998 4.67203 14.9998 5.5V6.13933C15.5693 6.40467 15.9391 7.0161 15.8554 7.68605L15.2149 12.8101C15.0585 14.0612 13.995 15 12.7342 15H3.26533C2.00452 15 0.941017 14.0612 0.784633 12.8101L0.144128 7.68605C0.0603842 7.0161 0.430217 6.40467 0.999763 6.13933V3.5ZM1.99976 6H13.9998V5.5C13.9998 5.22341 13.7761 5 13.5005 5H8.99976C8.03587 5 7.28923 4.37127 6.82539 3.84565C6.37357 3.33367 5.82102 3 5.2637 3H2.49976C2.22362 3 1.99976 3.22386 1.99976 3.5V6ZM1.63254 7C1.3318 7 1.0991 7.26359 1.13641 7.56202L1.77691 12.6861C1.87074 13.4367 2.50884 14 3.26533 14H12.7342C13.4907 14 14.1288 13.4367 14.2226 12.6861L14.8631 7.56202C14.9004 7.26359 14.6677 7 14.367 7H1.63254Z" fill="white"/>
                                    </svg>

                                </div>
                            </div>
                            <div className="justify-start text-white text-base font-medium font-['Inter']">Request</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}