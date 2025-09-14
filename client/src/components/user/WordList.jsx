import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { WordTranslationServices } from "../../api";
import WordCard from "./WordCard";

export default function WordList({ words: propWords, isHomepage = false, searchQuery = "", ref }) {
    const [words, setWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    useImperativeHandle(ref, () => ({
        resetToFirstPage: () => {
            setCurrentPage(1);
        }
    }));

    useEffect(() => {
        setCurrentPage(1);
    }, [propWords]);

    useEffect(() => {
        if (propWords !== undefined && propWords !== null) {
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
                    } else if (res.data && Array.isArray(res.data.words)) {
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
                    res = await WordTranslationServices.findAll(currentPage, limit);
                    setWords(res.data.words || []);
                    setTotalPages(Math.ceil((res.data.words || []).length / limit));
                }
            } catch (err) {
                console.error("Failed to fetch words:", err);
            } finally {
                setLoading(false);
            }
        };

        if (propWords === undefined || propWords === null) {
            fetchWords();
        }
    }, [propWords, currentPage, limit, searchQuery]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                const firstCard = document.querySelector('.word-list-container .grid > div:first-child');
                if (firstCard) {
                    firstCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                }
            }, 100);
        }
    };

    const getDisplayedWords = () => {
        if (propWords !== undefined && propWords !== null) {
            const startIndex = (currentPage - 1) * limit;
            const endIndex = startIndex + limit;
            return propWords.slice(startIndex, endIndex);
        }
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        return words.slice(startIndex, endIndex);
    };

    const displayedWords = getDisplayedWords();
    const totalWords = propWords !== undefined && propWords !== null ? propWords.length : words.length;

    // Generate page numbers for pagination with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than or equal to max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always include first page
            pages.push(1);
            
            // Calculate start and end of visible page range
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);
            
            // Adjust if we're at the beginning
            if (currentPage <= 3) {
                endPage = 4;
            }
            
            // Adjust if we're at the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }
            
            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pages.push('...');
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }
            
            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            
            // Always include last page
            pages.push(totalPages);
        }
        
        return pages;
    };

    if (loading) {
        return <div className="text-center py-10">Loading words...</div>;
    }

    if (totalWords === 0) {
        return <div className="text-center py-10">No words found</div>;
    }

    const pageNumbers = getPageNumbers();

    return (
        <div className="word-list-container w-full">
            {/*show found terms*/}
            <div className="text-base md:text-xl lg:text-xl text-gray-700 mb-10 font-semibold">
                {words.length} {words.length === 1 ? 'term' : 'terms'} found
            </div>
            {/*word card */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 justify-center items-start pb-10">
                {displayedWords.map((word) => (
                    <WordCard key={word.wordId} word={word} />
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="pagination-controls flex justify-center items-center space-x-2 mt-5 pb-[20px]">
                    
                    {/* Previous Button */}
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 bg-[#667EEA] text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center rounded-md"
                    >
                        Prev
                    </button>
                    
                    {/* Page Numbers */}
                    <div className="flex space-x-1 gap-[5px]">
                        {pageNumbers.map((page, index) => (
                            page === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-2 rounded-md ${
                                        currentPage === page
                                            ? 'bg-[#667EEA] text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>
                    
                    {/* Next Button */}
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 bg-[#667EEA] text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center rounded-md"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}