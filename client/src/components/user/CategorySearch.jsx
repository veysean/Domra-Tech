import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function CategorySearch() {
    return (
        <div className="flex justify-center w-full">
            <div className="w-[1156px] p-10 rounded-[20px] shadow-[1px_3px_0px_0px_rgba(0,0,0,0.05)] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-start items-start gap-7">
                {/* Search bar */}
                <SearchBar />

                {/* Categories filter */}
                <CategoryFilter />
            </div>
        </div>
    );
}