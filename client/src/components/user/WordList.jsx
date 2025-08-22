import { useEffect, useState } from "react";
import { WordTranslationServices } from "../../api";
import WordCard from "./WordCard";


export default function WordList() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const res = await WordTranslationServices.findAll();
                setWords(res.data); 
            } catch (err) {
                console.error("Failed to fetch words:", err);
            }
        };

        fetchWords();
    }, []);

    return (
        <div className="flex flex-col items-center">
            {words.map((word) => (
                <WordCard key={word.wordId} word={word} />
            ))}
        </div>
    );
}