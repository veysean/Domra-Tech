import { FavoriteServices } from "../../api";
import { useEffect, useState } from "react";
import WordCard from "../../components/user/WordCard";
import { useTranslation } from 'react-i18next';

export default function Favorite({ userData }) {
    const [favorites, setFavorites] = useState([]);
    const { t } = useTranslation('profilePage');

    useEffect(() => {
        const fetchFavorites = async () => {
            const response = await FavoriteServices.getAllFavorites();
            setFavorites(response.data);
        };

        fetchFavorites();
    }, []);

    return(
        <div>
            <div className="text-indigo-500 text-2xl font-bold hidden lg:block">{t('yourfavourite')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
                {favorites.map((word) => (
                    <WordCard word={word} />
                ))}
            </div>
        </div>
    );
}