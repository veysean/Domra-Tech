import { useState } from "react";

export default function SearchBar({ onSearchChange, onSearchSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter' && onSearchSubmit) {
  //     onSearchSubmit(query);
  //   }
  // };

   const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearchSubmit) {
            onSearchSubmit(query);
        }
    };

  return (
    <div className="self-stretch h-16 p-5 rounded-[30px] outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-center items-start gap-5">
      <div className="p-2.5 inline-flex justify-center items-center gap-2.5 w-full">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onSubmit={handleSubmit}
          placeholder="Search terms in English or Khmer... (ស្វែងរកពាក្យជាភាសាអង់គ្លេស ឬខ្មែរ)"
          className="w-full text-gray-700/80 text-base font-normal font-['Inter'] bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
