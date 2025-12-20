import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import WordList from "../../components/user/WordList";
import CategorySearch from "../../components/user/CategorySearch";
import { WordTranslationServices } from "../../api";
import Snowfall from "react-snowfall";

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function Home() {
  const { t } = useTranslation();
  const [words, setWords] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("EnglishWord");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const wordListRef = useRef();

  const debouncedQuery = useDebounce(query, 300);

  // Fetch all words initially
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

  // Handle live search
  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery.trim()) {
        // fetch all if empty
        try {
          setIsLoading(true);
          const res = await WordTranslationServices.findAll(
            1,
            1000,
            selectedCategory
          );
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
        const res = await WordTranslationServices.searchWords(
          debouncedQuery,
          selectedLanguage,
          1,
          1000,
          selectedCategory
        );
        setWords(res.data || []);
      } catch (error) {
        console.error("Error searching words:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleSearch();
  }, [debouncedQuery, selectedCategory, selectedLanguage]);

  // Handlers
  const handleSearchChange = (searchQuery, language) => {
    setQuery(searchQuery);
    setSelectedLanguage(language);
  };

  const handleSearchSubmit = (searchQuery, language) => {
    setQuery(searchQuery);
    setSelectedLanguage(language);
  };

  const handleSearchFocus = () => {
    if (wordListRef.current) wordListRef.current.resetToFirstPage();
  };

  const handleCategoryChange = (categoryName, categoryId) => {
    if (categoryName === "All Category" || categoryName === "Categories") {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <div className="home-page flex flex-col gap-10 md:px-0 overflow-x-hidden">
      <Snowfall color="#9370db" />

      <div className="w-full mx-auto">
        <HomeHeroSection header={t("header")} desc={t("desc")} />
      </div>

      <div className="w-full max-w-[1156px] px-4 mx-auto">
        <CategorySearch
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchFocus={handleSearchFocus}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {isLoading && (
        <div className="text-center text-gray-600 text-lg md:text-xl">
          Loading...
        </div>
      )}

      <div className="flex flex-col items-center gap-5 w-full px-4 max-w-[1156px] mx-auto">
        <WordList ref={wordListRef} words={words} />
      </div>
    </div>
  );
}
