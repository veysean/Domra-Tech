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
                console.log(res.data.words);
            } catch (err) {
                console.error("Failed to fetch words:", err);
            }
        };

        fetchWords();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-auto">
            {words.map((word) => (
                <WordCard key={word.wordId} word={word} />
            ))}
        </div>
    );
}