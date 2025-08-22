import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useTranslation } from 'react-i18next';
export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="home-page">
            <HomeHeroSection header={t("header")} desc={t("desc")} />
        </div>
    );
}