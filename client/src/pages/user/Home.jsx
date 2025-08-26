import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import WordList from "../../components/user/WordList";
import CategorySearch from "../../components/user/CategorySearch";
import { WordTranslationServices } from "../../api";

// Custom debounce hook
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
}

export default function Home() {
    const { t } = useTranslation();
    const [words, setWords] = useState([]);
    const [query, setQuery] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 300);

    // Fetch all words on initial load
    useEffect(() => {
        const fetchAllWords = async () => {
            try {
                setIsLoading(true);
                const res = await WordTranslationServices.findAll();
                setWords(res.data.words || []);
            } catch (error) {
                console.error("Error fetching words:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchAllWords();
    }, []);

     // Handle search when debounced query changes
    useEffect(() => {
        const handleSearch = async () => {
            if (!debouncedQuery.trim()) {
                // If query is empty, fetch all words
                try {
                    setIsLoading(true);
                    const res = await WordTranslationServices.findAll(1, 4);
                    setWords(res.data.words || []);
                } catch (error) {
                    console.error("Error fetching all words:", error);
                } finally {
                    setIsLoading(false);
                }
                return;
            }
            
            try {
                setIsLoading(true);
                const res = await WordTranslationServices.searchWords(debouncedQuery);
                setWords(res.data || []);
            } catch (error) {
                console.error("Error searching words:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        handleSearch();
    }, [debouncedQuery]);

    // Handle manual search submission (Enter key)
    const handleSearchSubmit = (searchQuery) => {
        setQuery(searchQuery);
        setSearchTrigger(prev => prev + 1); // Trigger the search
    };

    return (
        <div className="home-page flex flex-col gap-10">
            {/* Hero Section */}
            <HomeHeroSection header={t("header")} desc={t("desc")} />

            {/* Category section with See more */}
            <CategorySearch onSearch={setQuery} onSearchSubmit={handleSearchSubmit}/>

            {/* Loading indicator */}
            {isLoading && <div className="text-center">Loading...</div>}

            {/* Word list */}
            <div className="flex flex-col items-center gap-5 w-full">
                <Link 
                    to="/categories" 
                    className="w-full flex justify-end pr-50"
                >
                    <div className="p-2.5 inline-flex items-center gap-2.5">
                        <div className="justify-start text-slate-600 text-base font-bold font-['Inter']">see more  </div>
                        <div className="w-3.5 h-0 flex items-center justify-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3086 8.20711C14.6991 7.81658 14.6991 7.18342 14.3086 6.79289L7.94462 0.428932C7.55409 0.0384079 6.92093 0.0384079 6.5304 0.428932C6.13988 0.819456 6.13988 1.45262 6.5304 1.84315L12.1873 7.5L6.5304 13.1569C6.13988 13.5474 6.13988 14.1805 6.5304 14.5711C6.92093 14.9616 7.55409 14.9616 7.94462 14.5711L14.3086 8.20711ZM0 7.5V8.5H13.6015V7.5V6.5H0V7.5Z" fill="#4A5568"/>
                            </svg>
                        </div>
                    </div>
                </Link>
                <WordList words={words} isHomepage={true}/>
             </div>
        </div>
    );
}