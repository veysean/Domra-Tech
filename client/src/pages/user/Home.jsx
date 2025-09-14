import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from "react";
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
    //const [searchTrigger, setSearchTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const wordListRef = useRef();

    const debouncedQuery = useDebounce(query, 300);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch all words on initial load
    useEffect(() => {
        const fetchAllWords = async () => {
            try {
                setIsLoading(true);
                const res = await WordTranslationServices.findAll(1, 1000);
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
                    const res = await WordTranslationServices.findAll(1, 1000, selectedCategory);
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
                const res = await WordTranslationServices.searchWords(debouncedQuery, 1, 1000, selectedCategory);
                setWords(res.data || []);
            } catch (error) {
                console.error("Error searching words:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        handleSearch();
    }, [debouncedQuery, selectedCategory]);

    // Handle manual search submission 
    const handleSearchSubmit = (searchQuery) => {
        setQuery(searchQuery);
        //setSearchTrigger(prev => prev + 1); 
    };

    
    // Handle search input changes (real-time)
    const handleSearchChange = (searchQuery) => {
        setQuery(searchQuery);
    };

    const handleSearchFocus = () => {
        if (wordListRef.current) {
            wordListRef.current.resetToFirstPage();
        }
    };

    // Handle category change
  const handleCategoryChange = (categoryName, categoryId) => {
    if (categoryName === "All Category" || categoryName === "Categories") {
      setSelectedCategory("all"); // Use "all" to indicate no category filtering
    } else {
      setSelectedCategory(categoryId); // Set the selected category ID
    }
  };


    return (
        <div className="home-page flex flex-col gap-10">
            {/* Hero Section */}
            <HomeHeroSection header={t("header")} desc={t("desc")} />

            {/* Category section with See more */}
            <CategorySearch onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit}  onSearchFocus={handleSearchFocus} onCategoryChange={handleCategoryChange}/>

            {/* Loading indicator */}
            {isLoading && <div className="text-center">Loading...</div>}

            {/* Word list */}
            <div className="flex flex-col items-center gap-5 w-full">
                <WordList ref={wordListRef} words={words} />
             </div>
        </div>
    );
}