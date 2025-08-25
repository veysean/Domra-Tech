import { useEffect, useState } from "react";
import { WordTranslationServices } from "../../api";
import WordCard from "./WordCard";


export default function WordList() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const res = await WordTranslationServices.findAll();
                setWords(res.data.words); 
            } catch (err) {
                console.error("Failed to fetch words:", err);
            }
        };

        fetchWords();
    }, []);

    return (
        <div className="inline-flex justify-center gap-x-10 items-start flex-wrap gap-y-20 pb-10">
            {words.slice(2, 6).map((word) => (
                <WordCard key={word.wordId} word={word} />
            ))}
        </div>
    );
}