
export default function HomeHeroSection({header, desc}) {
    return (
        <>
            <div className="w-full h-[454px] px-80 py-40 bg-gradient-to-r from-purple-800/80 to-indigo-500/80 inline-flex flex-col justify-center items-center overflow-hidden opacity-80">
                <div className="self-stretch flex flex-col justify-start items-center gap-9">
                        <div className="self-stretch text-center justify-start text-white text-5xl font-extrabold font-['Inter']">{header}</div>
                        <div className="self-stretch text-center justify-start text-white text-2xl font-semibold font-['Inter']">{desc}</div>
                </div>
            </div>
        </>
    );
}