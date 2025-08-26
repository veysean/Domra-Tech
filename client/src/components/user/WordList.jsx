import { useEffect, useState } from "react";
import { WordTranslationServices } from "../../api";
import WordCard from "./WordCard";


export default function WordList({ words: propWords, isHomepage = false }) {
    const [words, setWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = isHomepage ? 4 : 10;

    useEffect(() => {
        // If words are passed as props, use them
        if (propWords && propWords.length > 0) {
            setWords(propWords);
            return;
        }
        
        // Otherwise fetch all words
        const fetchWords = async () => {
            setLoading(true);
            try {
                const res = await WordTranslationServices.findAll(currentPage, limit);
                setWords(res.data.words || []);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                console.error("Failed to fetch words:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, [propWords, currentPage, limit]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading words...</div>;
    }

    if (words.length === 0) {
        return <div className="text-center py-10">No words found</div>;
    }

     return (
        <div className="word-list-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-start pb-10">
                {words.map((word) => (
                    <WordCard key={word.wordId} word={word} />
                ))}
            </div>
            
            {/* Show pagination only if not on homepage and multiple pages exist */}
            {!isHomepage && totalPages > 1 && (
                <div className="pagination-controls flex justify-center items-center space-x-2 mt-8">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}