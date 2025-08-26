import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import WordList from "../../components/user/WordList";
export default function Home() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full">
                <div className="home-page">
                    <HomeHeroSection header={t("header")} desc={t("desc")} />   
                </div>
                <div className="w-full">
                    <WordList />
                </div>
            </div>
        </motion.div>
    );
}