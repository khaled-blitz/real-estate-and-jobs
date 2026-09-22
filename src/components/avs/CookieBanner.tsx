import { useEffect, useState } from "react";
import Link from "next/link";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="text-[#3a3944] fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50">
      <h2 className="text-lg font-bold mb-2">
        Wir respektieren Ihre Privatsphäre
      </h2>
      <p className="text-[#3a3944] text-sm text-gray-700 mb-3">
        Wir verwenden Cookies und verarbeiten personenbezogene Daten (z. B.
        IP-Adresse), um Ihr Nutzungserlebnis zu verbessern, personalisierte
        Inhalte anzuzeigen und unseren Datenverkehr zu analysieren. Mit Klick
        auf &quot;Alle akzeptieren&quot; stimmen Sie der Verwendung von Cookies
        und unseren{" "}
        <Link
          href="https://find4west.ch/datenschutzerklrung"
          className="text-blue-600 hover:underline"
        >
          Datenschutzbestimmungen.
        </Link>
      </p>
      <button
        onClick={acceptCookies}
        className="w-full bg-[#3a3944] hover:bg-[#3a3944] hover:opacity-90 text-white font-semibold py-2 rounded"
      >
        Alle akzeptieren
      </button>
    </div>
  );
};

export default CookieBanner;
