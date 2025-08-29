import { useEffect, useState } from "react";
import { WordTranslationServices } from "../../api";
import WordCard from "./WordCard";


export default function WordList({ words: propWords }) {
    const [words, setWords] = useState([]);

    useEffect(() => {
        // If words are passed as props, use them
        if (propWords && propWords.length > 0) {
            setWords(propWords);
            return;
        }
        
        // Otherwise fetch all words
        const fetchWords = async () => {
            try {
                const res = await WordTranslationServices.findAll();
                setWords(res.data.words || []);
            } catch (err) {
                console.error("Failed to fetch words:", err);
            }
        };

        fetchWords();
    }, [propWords]);

    if (words.length === 0) {
        return <div className="text-center py-10">No words found</div>;
    }

    return (
        <div className="inline-flex justify-center gap-x-10 items-start flex-wrap gap-y-20 pb-10">
            {words.map((word) => (
                <WordCard key={word.wordId} word={word} />
            ))}
        </div>
    );
}