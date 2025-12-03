import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CorrectionServices, WordRequestServices } from "../../api";
import { useTranslation } from 'react-i18next';

export default function RequestHistory() {
  const { auth } = useContext(AuthContext);
  const [corrections, setCorrections] = useState([]);
  const [wordRequests, setWordRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('profilePage');

  useEffect(() => {
    if (auth) {
        const fetchData = async () => {
          try {
            const [correctionRes, wordRes] = await Promise.all([
              CorrectionServices.getCorrections(),
              WordRequestServices.getWordRequests()
            ]);
            setCorrections(correctionRes.data?.data || []);
            setWordRequests(wordRes.data?.data || []);
          } catch (err) {
            console.error("Error fetching history:", err);
          }
        };
        fetchData();
        setLoading(false);
    }
  }, [auth]);

  if (loading) return <div className="p-6 text-gray-600">Loading history...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-500 mb-6 hidden lg:block">{t('reqHt')}</h2>
      <div className="w-full max-w-screen mx-auto p-6 bg-white rounded-2xl shadow-md">

      {/* Correction Requests */}
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('correctionRequests')}</h3>
      {corrections.length === 0 ? (
        <div className="text-gray-500 mb-6">{t('noCorrectionRequests')}</div>
      ) : (
        <ul className="mb-6 space-y-3">
          {corrections.map((req) => (
            <li key={req.correctionId} className="p-4 border rounded-lg bg-gray-50">
              <p className="font-medium">
                <span className="text-indigo-500">English:</span> {req.correctEnglishWord} | 
                <span className="text-indigo-500"> French:</span> {req.correctFrenchWord} | 
                <span className="text-indigo-500"> Khmer:</span> {req.correctKhmerWord}
              </p>
              <p className="text-sm text-gray-600 mt-1">Reference: {req.reference}</p>
              <p
                className={`text-sm mt-2 font-medium ${
                  req.status === "accepted"
                    ? "text-green-600"
                    : req.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {req.status}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* New Word Requests */}
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('newWordRequests')}</h3>
      {wordRequests.length === 0 ? (
        <div className="text-gray-500">{t('noNewWordRequests')}</div>
      ) : (
        <ul className="space-y-3">
          {wordRequests.map((req) => (
            <li key={req.wordRequestId} className="p-4 border rounded-lg bg-gray-50">
              <p className="font-medium">
                <span className="text-indigo-500">English:</span> {req.newEnglishWord} | 
                <span className="text-indigo-500"> French:</span> {req.newFrenchWord} | 
                <span className="text-indigo-500"> Khmer:</span> {req.newKhmerWord}
              </p>
              <p className="text-sm text-gray-600 mt-1">Definition: {req.newDefinition}</p>
              <p className="text-sm text-gray-600">Example: {req.newExample}</p>
              <p className="text-sm text-gray-600 mt-1">Reference: {req.reference}</p>
              <p
                className={`text-sm mt-2 font-medium ${
                  req.status === "accepted"
                    ? "text-green-600"
                    : req.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {req.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
