import WordDetailCard from "./WordDetailCard";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { renderReference } from "./WordDetailCard";
import RequestChangingForm from "./RequestChangingForm";
import { FavoriteServices } from "../../api";
import { AuthContext } from "../../contexts/AuthContext";

export default function WordCard({word}){
    const [open, setOpen] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    let hoverTimeout;

    //check if a word is already in fav
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!auth?.token) { return; }
            try {
                const res = await FavoriteServices.getAllFavorites();
                const favWords = res.data.map((w) => w.wordId);
                setIsFav(favWords.includes(word.wordId));
            } catch (error) {
                console.error("Error fetching favorite words:", error);
            }
        };
        fetchFavorites();
    }, [auth?.token, word.wordId]);

    const handleCardClick = (e) => {
        if (e.target.closest(".fav-btn") || e.target.closest(".reference-btn")) return;
        setOpen(true);
    };

    const toggleFav = async (e) => {
        e.stopPropagation();

        if (!auth?.token) {
            navigate("/auth"); 
            return;
        }

        try {
            if (isFav) {
                await FavoriteServices.deleteFavorite(word.wordId, auth.token);
                setMessage("Removed from favorites");
            } else {
                await FavoriteServices.createFavorite(word.wordId, auth.token);
                setMessage("Added to favorites");
            }
            setIsFav(!isFav);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setMessage("Something went wrong");
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
        }
    };
    
    useEffect(() => {
    if (open) {
        // disable scroll
        document.body.style.overflow = "hidden";
    } else {
        // re-enable scroll
        document.body.style.overflow = "auto";
    }

    // cleanup when unmount
    return () => {
        document.body.style.overflow = "auto";
    };
    }, [open]);
    //handle click link
    function handleClick(reference) {
        window.open(renderReference({ reference }), "_blank");
    }

    //for tooltip
    const handleMouseEnter = () => {
        hoverTimeout = setTimeout(() => setShowTooltip(true), 500); 
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout); 
        setShowTooltip(false); 
    };
     const handleTooltipClick = () => {
        setShowTooltip(false);
    };

    return (
        <>
       {/* Word Card */}
        <div 
        onClick={handleCardClick}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg cursor-pointer select-none mb-6"
        >
        {/* Gradient Header */}
        <div className="h-1 bg-gradient-to-r from-[#667EEA]/80 to-[#764BA2]/80" />

        {/* Main Card */}
        <div 
            data-property-1="Default"
            className="bg-white p-5 lg:p-9 rounded-b-[20px] shadow-md hover:shadow-lg flex flex-col gap-7"
        >
            {/* Top Section */}
            <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 lg:gap-3">
                <div className="text-gray-700 text-xl md:text-2xl lg:text-2xl font-medium">
                {word?.EnglishWord || "No Word"}
                </div>
                <div className="text-indigo-500 text-xl md:text-2xl lg:text-2xl font-normal">
                {word?.KhmerWord || ""}
                </div>
            </div>

            {/* Favorite Icon */}
            <div 
                className="relative group flex items-center cursor-pointer"
                onClick={toggleFav}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="hover:bg-[#E9ECEF] p-1 rounded">
                <div className="w-4 h-4 relative">
                    {isFav ? (
                    <svg className="absolute w-4 h-4" viewBox="0 0 16 16" fill="#DC3545">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.314C12.4384 -3.24799 23.5343 4.7355 8 15C-7.53427 4.7355 3.56164 -3.24799 8 1.314Z"/>
                    </svg>
                    ) : (
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2.74805L7.28325 2.01133C5.5989 0.280067 2.51415 0.877695 1.40036 3.05284C0.876534 4.07583 0.75875 5.55246 1.71429 7.43758C2.63457 9.25313 4.54767 11.4265 8 13.7946C11.4523 11.4265 13.3654 9.25313 14.2857 7.43758C15.2413 5.55246 15.1235 4.07583 14.5996 3.05284C13.4859 0.877695 10.4011 0.280067 8.71675 2.01133L8 2.74805ZM8 15C-7.33313 4.86841 3.27876 -3.04087 7.82432 1.14308C7.88395 1.19797 7.94253 1.25493 8 1.314C8.05747 1.25494 8.11605 1.19797 8.17567 1.14309C12.7212 -3.04088 23.3331 4.8684 8 15Z" fill="#667EEA"/>
                    </svg>
                    )}
                </div>
                </div>
                {showTooltip && (
                <span 
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-black bg-[#E9ECEF] rounded"
                    onClick={handleTooltipClick}
                >
                    Favorite
                </span>
                )}
            </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-7 border-t border-slate-200 flex justify-between items-center">
            <div className="text-slate-500 text-xs md:text-sm lg:text-base font-medium">
                Added: {word?.createdAt?.slice(0, 10) || "N/A"}
            </div>

            <button
                onClick={() => handleClick(word?.reference)}
                className="px-3 py-2 bg-green-600 rounded-[20px] flex items-center gap-2 hover:bg-green-700"
            >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="white">
                <path d="M1 3.5C1 2.67157 1.67157 2 2.5 2H5.26394C6.22171 2 7.02474 2.55996 7.57542 3.18398C7.98525 3.64839 8.47872 4 9 4H13.5007C14.3296 4 15 4.67203 15 5.5V6.13933C15.5696 6.40467 15.9394 7.0161 15.8556 7.68605L15.2151 12.8101C15.0588 14.0612 13.9953 15 12.7344 15H3.26557C2.00476 15 0.941261 14.0612 0.784877 12.8101L0.144373 7.68605C0.0606283 7.0161 0.430461 6.40467 1 6.13933V3.5Z"/>
                </svg>
                <span className="text-white text-xs md:text-sm lg:text-base font-medium">Reference</span>
            </button>
            </div>
        </div>
        </div>

        {/* Modal */}
        {open && (
            <div
            className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-y-auto z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) setOpen(false); // close only if clicked on overlay
            }}
            >
            <div className="">
                {!showRequestForm ? (
                <WordDetailCard
                    word={word}
                    onRequest={() => setShowRequestForm(true)}
                    isFav={isFav}
                    toggleFav={toggleFav}
                />
                ) : (
                <RequestChangingForm
                    wordId={word.wordId}
                    onCancel={() => setShowRequestForm(false)}
                />
                )}
            </div>
            </div>
        )}

        {showMessage && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#764BA2] text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {message}
            </div>
        )}
        </>
    );
}