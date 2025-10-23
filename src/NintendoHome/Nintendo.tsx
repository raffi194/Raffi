import React, { useState, useEffect } from "react";
import NintendoLogo from "../assets/img/Nintendo Switch.svg";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.matchMedia("(orientation: portrait)").matches
      ? "portrait"
      : "landscape"
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handleChange = (e: MediaQueryListEvent) =>
      setOrientation(e.matches ? "portrait" : "landscape");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return orientation;
};

const RotationAlert: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center text-white p-8">
    <h2 className="text-2xl font-bold mb-2">Peringatan</h2>
    <p className="text-lg opacity-90">
      Harap putar perangkat Anda ke mode horizontal untuk melihat konten.
    </p>
  </div>
);

const Nintendo: React.FC = () => {
  const isMobile = useIsMobile();
  const orientation = useOrientation();
  const showRotationWarning = isMobile && orientation === "portrait";

  // ✅ state untuk efek klik tombol
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    // aktifkan animasi tekan
    setPressed(true);
    // reset animasi setelah selesai (biar bisa ditekan lagi)
    setTimeout(() => setPressed(false), 400);
  };

  return (
    <div className="relative bg-white h-screen w-screen flex items-center justify-center overflow-hidden">
      {showRotationWarning ? (
        <RotationAlert />
      ) : (
        <>
          {/* 🎮 Logo utama Nintendo */}
          <div
            className={`relative z-10 transition-transform duration-500 ease-in-out ${
              pressed ? "scale-95" : "scale-100"
            }`}
            onClick={handleClick}
          >
            <img
              src={NintendoLogo}
              alt="Nintendo Switch"
              className="w-[90%] sm:w-[70%] md:w-[55%] lg:w-[50%] max-w-4xl select-none pointer-events-none"
            />

            {/* 🔹 Tombol tengah di atas logo */}
            <img
              src="https://res.cloudinary.com/dpgzuioqi/image/upload/v1761203249/ButtonfirstA_kmsnob.svg"
              alt="Button A"
              className={`absolute top-1/2 left-1/2 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
                pressed ? "scale-75 brightness-90" : "scale-100"
              }`}
            />
          </div>

          {/* Efek bayangan lembut */}
          <div
            className={`absolute w-[400px] h-[400px] rounded-full bg-black/20 blur-3xl transition-all duration-700 ${
              pressed ? "opacity-70 scale-90" : "opacity-50 scale-100"
            }`}
          ></div>
        </>
      )}
    </div>
  );
};

export default Nintendo;
