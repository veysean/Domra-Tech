//import { useState } from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function CategorySearch({ onSearchChange, onSearchSubmit, onSearchFocus }) {
    const handleSearch = (query) => {
        onSearchChange(query);
    };

    const handleSearchSubmit = (query) => {
        if (onSearchSubmit) {
            onSearchSubmit(query);
        }
    };

    const handleSearchFocus = () => {
        if (onSearchFocus) {
            onSearchFocus();
        }
    };
    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-[500px] sm:max-w-[700px] lg:max-w-[1156px] p-10 rounded-[20px] shadow-[1px_2px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_8px_0px_rgba(0,0,0,0.10)] outline-1 outline-offset-[-1px] outline-[#E2E8F0] inline-flex flex-col justify-start items-start gap-7">
                {/* Search bar */}
                <SearchBar onSearchChange={handleSearch} onSearchSubmit={handleSearchSubmit}  onSearchFocus={handleSearchFocus}/>

                {/* Categories filter */}
                <CategoryFilter />
            </div>
        </div>
    );
}