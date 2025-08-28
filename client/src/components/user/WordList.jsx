import { useEffect, useState } from "react";
import { WordTranslationServices } from "../../api";
import WordCard from "./WordCard";


export default function WordList({ words: propWords, isHomepage = false, searchQuery = "" }) {
    const [words, setWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    useEffect(() => {
        // If words are passed as props, use them
        if (propWords && propWords.length > 0) {
            setWords(propWords);
            setTotalPages(Math.ceil(propWords.length / limit));
            return;
        }

        const fetchWords = async () => {
            setLoading(true);
            try {
                let res;
                if (searchQuery) {
                    res = await WordTranslationServices.searchWords(searchQuery, currentPage, limit);
                   
                    if (res.data && res.data.words) {
                        setWords(res.data.words || []);
                        setTotalPages(res.data.totalPages || 1);
                    } else if (Array.isArray(res.data)) {
                        const startIndex = (currentPage - 1) * limit;
                        const endIndex = startIndex + limit;
                        const paginatedWords = res.data.slice(startIndex, endIndex);
                       
                        setWords(paginatedWords);
                        setTotalPages(Math.ceil(res.data.length / limit));
                    }else if (res.data && Array.isArray(res.data)) {
                        const startIndex = (currentPage - 1) * limit;
                        const endIndex = startIndex + limit;
                        const paginatedWords = res.data.words.slice(startIndex, endIndex);
                        
                        setWords(paginatedWords);
                        setTotalPages(Math.ceil(res.data.words.length / limit));
                    } else {
                        setWords(res.data.words || []);
                        setTotalPages(1);
                    }
                } else {
                    // If no search query, fetch all words with pagination
                    res = await WordTranslationServices.findAll();
                    setWords(res.data.words || []);
                    setTotalPages(Math.ceil((res.data.words || []).length / limit));
                }
            } catch (err) {
                console.error("Failed to fetch words:", err);
            } finally {
                setLoading(false);
            }
        };

        if (!propWords || propWords.length === 0) {
            fetchWords();
        }
    }, [propWords, currentPage, limit, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getDisplayedWords = () => {
        if (propWords && propWords.length > 0) {
            const startIndex = (currentPage - 1) * limit;
            const endIndex = startIndex + limit;
            return propWords.slice(startIndex, endIndex);
        }
        return words;
    };

    const displayedWords = getDisplayedWords();

    if (loading) {
        return <div className="text-center py-10">Loading words...</div>;
    }

    if (displayedWords.length === 0) {
        return <div className="text-center py-10">No words found</div>;
    }

     return (
        <div className="word-list-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-start pb-10">
                {displayedWords.map((word) => (
                    <WordCard key={word.wordId} word={word} />
                ))}
            </div>
            
            {/* Show pagination only if not on homepage and multiple pages exist */}
            {totalPages > 1 && (
                <div className="pagination-controls flex justify-center items-center space-x-2 mt-8">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-[#667EEA] text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center rounded-[12px]"
                    >
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 23.9925V6.00753L8.47311 15L18.75 23.9925ZM17.5144 25.4044L7.23936 16.4119C7.03796 16.2359 6.87655 16.0189 6.76596 15.7754C6.65536 15.5318 6.59814 15.2675 6.59814 15C6.59814 14.7326 6.65536 14.4682 6.76596 14.2247C6.87655 13.9812 7.03796 13.7641 7.23936 13.5882L17.5144 4.59565C17.7855 4.35811 18.1193 4.20375 18.4759 4.15106C18.8325 4.09837 19.1967 4.14958 19.5249 4.29856C19.8532 4.44754 20.1315 4.68797 20.3266 4.99107C20.5217 5.29416 20.6253 5.64707 20.625 6.00753V23.9925C20.6253 24.353 20.5217 24.7059 20.3266 25.009C20.1315 25.3121 19.8532 25.5525 19.5249 25.7015C19.1967 25.8505 18.8325 25.9017 18.4759 25.849C18.1193 25.7963 17.7855 25.6419 17.5144 25.4044Z" fill="white"/>
</svg>



                        Prev
                    </button>
                    
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-[#667EEA] text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center rounded-[12px]"
                    >
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 23.9925V6.00752L21.5269 15L11.25 23.9925ZM12.4856 25.4044L22.7606 16.4119C22.962 16.2359 23.1234 16.0189 23.234 15.7753C23.3446 15.5318 23.4018 15.2675 23.4018 15C23.4018 14.7326 23.3446 14.4682 23.234 14.2247C23.1234 13.9812 22.962 13.7641 22.7606 13.5881L12.4875 4.59565C11.2706 3.5344 9.375 4.3969 9.375 6.00752V23.9925C9.37469 24.353 9.47829 24.7059 9.67339 25.009C9.86849 25.3121 10.1468 25.5525 10.475 25.7015C10.8033 25.8505 11.1675 25.9017 11.5241 25.849C11.8807 25.7963 12.2145 25.6419 12.4856 25.4044Z" fill="white"/>
</svg>

                        Next
                    </button>
                </div>
            )}
        </div>
    );
}