import HomeHeroSection from "../../components/user/HomeHeroSection";
import { useTranslation } from 'react-i18next';

export default function ContributeTerm() {
    const { t } = useTranslation('contributeTerm');
    return (
        <div className="contribute-term-page">
           <HomeHeroSection header={t("contributeHeader")} desc={t("contributeDesc")} />
            </div>
        );
}