
export default function HomeHeroSection({header, desc}) {
    return (
        <>
        {/*bg-gradient-to-r from-purple-800/80 to-indigo-500/80 */}
        <div className="w-full h-auto md:h-[454px] px-6 md:px-20 lg:px-80 py-20 md:py-40 main-color flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col justify-start items-center gap-6 md:gap-9 text-center">
            <div className="w-full text-white text-xl md:text-5xl font-extrabold">
            {header}
            </div>
            <div className="w-full text-white text-sm md:text-2xl font-semibold">
            {desc}
            </div>
        </div>
        </div>

        </>
    );
}