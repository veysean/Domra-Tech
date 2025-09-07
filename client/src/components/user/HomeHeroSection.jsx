
export default function HomeHeroSection({header, desc}) {
    return (
        <>
        <div className="w-full h-auto md:h-[454px] px-6 md:px-20 lg:px-80 py-20 md:py-40 bg-gradient-to-r from-purple-800/80 to-indigo-500/80 flex flex-col justify-center items-center overflow-hidden opacity-80">
        <div className="w-full flex flex-col justify-start items-center gap-6 md:gap-9 text-center">
            <div className="w-full text-white text-xl md:text-5xl font-extrabold font-['Inter']">
            {header}
            </div>
            <div className="w-full text-white text-sm md:text-2xl font-semibold font-['Inter']">
            {desc}
            </div>
        </div>
        </div>

        </>
    );
}