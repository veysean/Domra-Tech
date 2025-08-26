export default function Categories() {
    return (
        <div className="w-[1076px] inline-flex flex-col justify-start items-start gap-5">
            <div className="p-2.5 inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-slate-600 text-base font-bold font-['Inter']">Filter by  category :</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-7 flex-wrap content-start">
                <div className="w-[746px] flex justify-start items-start gap-7 flex-wrap content-start">
                    <div data-property-1="Default" className="w-36 h-10 px-2.5 py-5 bg-[#6677EA] rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V13C0 13.5523 0.447715 14 1 14V1.5C1 1.22386 1.22386 1 1.5 1H14C14 0.447715 13.5523 0 13 0H1.5Z" fill="white"/>
                                    <path d="M3.5 2C2.67157 2 2 2.67157 2 3.5V14.5C2 15.3284 2.67157 16 3.5 16H9.58579C9.98361 16 10.3651 15.842 10.6464 15.5607L15.5607 10.6464C15.842 10.3651 16 9.98361 16 9.58579V3.5C16 2.67157 15.3284 2 14.5 2H3.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H14.5C14.7761 3 15 3.22386 15 3.5V9H10.5C9.67157 9 9 9.67157 9 10.5V15H3.5C3.22386 15 3 14.7761 3 14.5V3.5ZM10 14.7929V10.5C10 10.2239 10.2239 10 10.5 10H14.7929L10 14.7929Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div className="justify-start text-white text-base font-medium font-['Inter']">Categories</div>
                    </div>
                    <div className="h-10 px-2.5 py-5 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-3.5 left-0 top-0 absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12.5C6 12.2239 6.22386 12 6.5 12H9.5C9.77614 12 10 12.2239 10 12.5C10 12.7761 9.77614 13 9.5 13H6.5C6.22386 13 6 12.7761 6 12.5Z" fill="#4A5568"/>
                                    <path d="M3 8.06155C3 6.76041 4.23471 5.76462 5.53019 5.88584C6.23775 5.95205 7.07092 6 8 6C8.92908 6 9.76225 5.95205 10.4698 5.88584C11.7653 5.76462 13 6.76041 13 8.06155V9.21922C13 9.67809 12.6875 10.075 12.2354 10.1536C11.3904 10.3006 9.8946 10.5 8 10.5C6.1054 10.5 4.60964 10.3006 3.76458 10.1536C3.3125 10.075 3 9.67809 3 9.21922V8.06155ZM7.54195 7.23501C7.46308 7.22158 7.38255 7.24672 7.32532 7.30262L6.40429 8.20222C5.67721 8.15847 5.04611 8.09004 4.53396 8.01982C4.39717 8.00107 4.27107 8.09676 4.25232 8.23355C4.23356 8.37034 4.32925 8.49643 4.46604 8.51519C5.01572 8.59055 5.69797 8.6637 6.48603 8.7078C6.55606 8.71172 6.62451 8.68605 6.67468 8.63704L7.42865 7.90061L8.27598 9.61099C8.31213 9.68395 8.38155 9.73474 8.46203 9.74711C8.54251 9.75947 8.62397 9.73187 8.68036 9.67313L9.6124 8.70211C10.3589 8.65757 11.0073 8.58739 11.534 8.51519C11.6707 8.49643 11.7664 8.37034 11.7477 8.23355C11.7289 8.09676 11.6028 8.00107 11.466 8.01982C10.9283 8.09354 10.2594 8.16531 9.48603 8.20859C9.42289 8.21212 9.36343 8.23945 9.31964 8.28508L8.56605 9.07017L7.72402 7.37048C7.6885 7.29879 7.62082 7.24843 7.54195 7.23501Z" fill="#4A5568"/>
                                    <path d="M8.5 1.86622C8.7989 1.69331 9 1.37014 9 1C9 0.447715 8.55229 0 8 0C7.44772 0 7 0.447715 7 1C7 1.37014 7.2011 1.69331 7.5 1.86622V3H5.5C3.01472 3 1 5.01472 1 7.5V8C0.447715 8 0 8.44771 0 9V11C0 11.5523 0.447715 12 1 12V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V12C15.5523 12 16 11.5523 16 11V9C16 8.44771 15.5523 8 15 8V7.5C15 5.01472 12.9853 3 10.5 3H8.5V1.86622ZM14 7.5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V7.5C2 5.567 3.567 4 5.5 4H10.5C12.433 4 14 5.567 14 7.5Z" fill="#4A5568"/>
                                </svg>
                            </div>
                        </div>
                        <div className="justify-start text-slate-600 text-base font-medium font-['Inter']">AI & Machine Learning</div>
                    </div>
                    <div className="h-10 px-2.5 py-5 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                        <div className="w-4 h-4 relative">
                            <div className="w-3.5 h-3.5 left-[0.50px] top-[1px] absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.4779 1.64705C10.5591 1.38312 10.411 1.10333 10.1471 1.02212C9.88312 0.940912 9.60333 1.08904 9.52212 1.35297L5.52212 14.353C5.44091 14.6169 5.58904 14.8967 5.85297 14.9779C6.1169 15.0591 6.39669 14.911 6.4779 14.6471L10.4779 1.64705Z" fill="#4A5568"/>
                                    <path d="M4.85355 4.14645C5.04882 4.34171 5.04882 4.65829 4.85355 4.85355L1.70711 8L4.85355 11.1464C5.04882 11.3417 5.04882 11.6583 4.85355 11.8536C4.65829 12.0488 4.34171 12.0488 4.14645 11.8536L0.646447 8.35355C0.451184 8.15829 0.451184 7.84171 0.646447 7.64645L4.14645 4.14645C4.34171 3.95118 4.65829 3.95118 4.85355 4.14645Z" fill="#4A5568"/>
                                    <path d="M11.1464 4.14645C10.9512 4.34171 10.9512 4.65829 11.1464 4.85355L14.2929 8L11.1464 11.1464C10.9512 11.3417 10.9512 11.6583 11.1464 11.8536C11.3417 12.0488 11.6583 12.0488 11.8536 11.8536L15.3536 8.35355C15.5488 8.15829 15.5488 7.84171 15.3536 7.64645L11.8536 4.14645C11.6583 3.95118 11.3417 3.95118 11.1464 4.14645Z" fill="#4A5568"/>
                                </svg>
                            </div>
                        </div>
                        <div className="justify-start text-slate-600 text-base font-medium font-['Inter']">Programming</div>
                    </div>
                    <div className="h-10 px-2.5 py-5 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                        <div className="w-4 h-4 relative">
                            <div className="w-3 h-4 left-[2px] top-0 absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 13.5C10 13.7761 10.2239 14 10.5 14H11.5C11.7761 14 12 13.7761 12 13.5V7.5C12 7.22386 11.7761 7 11.5 7H10.5C10.2239 7 10 7.22386 10 7.5V13.5Z" fill="#4A5568"/>
                                    <path d="M7.5 14C7.22386 14 7 13.7761 7 13.5V9.5C7 9.22386 7.22386 9 7.5 9H8.5C8.77614 9 9 9.22386 9 9.5V13.5C9 13.7761 8.77614 14 8.5 14H7.5Z" fill="#4A5568"/>
                                    <path d="M4.5 14C4.22386 14 4 13.7761 4 13.5V11.5C4 11.2239 4.22386 11 4.5 11H5.5C5.77614 11 6 11.2239 6 11.5V13.5C6 13.7761 5.77614 14 5.5 14H4.5Z" fill="#4A5568"/>
                                    <path d="M14 14V4.5L9.5 0H4C2.89543 0 2 0.89543 2 2V14C2 15.1046 2.89543 16 4 16H12C13.1046 16 14 15.1046 14 14ZM9.5 3C9.5 3.82843 10.1716 4.5 11 4.5H13V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V2C3 1.44772 3.44772 1 4 1H9.5V3Z" fill="#4A5568"/>
                                </svg>
                            </div>
                        </div>
                        <div className="justify-start text-slate-600 text-base font-medium font-['Inter']">Data Science</div>
                    </div>
                    <div className="h-10 px-2.5 py-5 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-3.5 left-0 top-[1px] absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9C6 8.72386 6.22386 8.5 6.5 8.5H9.5C9.77614 8.5 10 8.72386 10 9C10 9.27614 9.77614 9.5 9.5 9.5H6.5C6.22386 9.5 6 9.27614 6 9Z" fill="#4A5568"/>
                                    <path d="M3.85355 4.14645C3.65829 3.95118 3.34171 3.95118 3.14645 4.14645C2.95118 4.34171 2.95118 4.65829 3.14645 4.85355L4.79289 6.5L3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355C3.34171 9.04882 3.65829 9.04882 3.85355 8.85355L5.85355 6.85355C6.04882 6.65829 6.04882 6.34171 5.85355 6.14645L3.85355 4.14645Z" fill="#4A5568"/>
                                    <path d="M2 1C0.895431 1 0 1.89543 0 3V13C0 14.1046 0.895431 15 2 15H14C15.1046 15 16 14.1046 16 13V3C16 1.89543 15.1046 1 14 1H2ZM14 2C14.5523 2 15 2.44772 15 3V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V3C1 2.44772 1.44772 2 2 2H14Z" fill="#4A5568"/>
                                </svg>
                            </div>
                        </div>
                        <div className="justify-start text-slate-600 text-base font-medium font-['Inter']">Web Development</div>
                    </div>
                    <div className="h-10 px-2.5 py-5 rounded-[20px] outline-1 outline-offset-[-1px] outline-slate-200 flex justify-center items-center gap-2.5">
                        <div className="w-4 h-4 relative">
                            <div className="w-4 h-4 left-0 top-0 absolute">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V8.5C0 9.32843 0.671573 10 1.5 10H6V11H1C0.447715 11 0 11.4477 0 12V15C0 15.5523 0.447715 16 1 16H15C15.5523 16 16 15.5523 16 15V12C16 11.4477 15.5523 11 15 11H10V10H14.5C15.3284 10 16 9.32843 16 8.5V1.5C16 0.671573 15.3284 0 14.5 0H1.5ZM1.5 1H14.5C14.7761 1 15 1.22386 15 1.5V8.5C15 8.77614 14.7761 9 14.5 9H1.5C1.22386 9 1 8.77614 1 8.5V1.5C1 1.22386 1.22386 1 1.5 1ZM12 12.5C12 12.2239 12.2239 12 12.5 12C12.7761 12 13 12.2239 13 12.5C13 12.7761 12.7761 13 12.5 13C12.2239 13 12 12.7761 12 12.5ZM14 12.5C14 12.2239 14.2239 12 14.5 12C14.7761 12 15 12.2239 15 12.5C15 12.7761 14.7761 13 14.5 13C14.2239 13 14 12.7761 14 12.5ZM1.5 12H6.5C6.77614 12 7 12.2239 7 12.5C7 12.7761 6.77614 13 6.5 13H1.5C1.22386 13 1 12.7761 1 12.5C1 12.2239 1.22386 12 1.5 12ZM1 14.25C1 14.1119 1.11193 14 1.25 14H6.75C6.88807 14 7 14.1119 7 14.25C7 14.3881 6.88807 14.5 6.75 14.5H1.25C1.11193 14.5 1 14.3881 1 14.25Z" fill="#4A5568"/>
                                </svg>
                            </div>
                        </div>
                        <div className="justify-start text-slate-600 text-base font-medium font-['Inter']">Computer Science</div>
                    </div>
                </div>
            </div>
        </div>
    );
}