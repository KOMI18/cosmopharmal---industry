
// 'use client';
// import { useState, useEffect } from 'react';

// const WhatsAppButton = () => {
//   const [isShaking, setIsShaking] = useState(false);

//   useEffect(() => {
//     // Animation de secousse toutes les 5 secondes
//     const interval = setInterval(() => {
//       setIsShaking(true);
//       // Arrêter l'animation après 1 seconde
//       setTimeout(() => {
//         setIsShaking(false);
//       }, 1000);
//     }, 1000); // 5000ms = 5 secondes

//     return () => clearInterval(interval);
//   }, []);

//   const handleClick = () => {
//    window.open('https://wa.me/+15043846092?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+%0A%0AJe+suis+int%C3%A9ress%C3%A9+par+une+collaboration.', '_blank');
//     console.log('Bouton WhatsApp cliqué');
//   };

//   return (
//     <button 
//       onClick={handleClick}
//       className={`fixed bottom-8 right-8  bg-white hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
//         isShaking ? 'animate-shake' : ''
//       }`}
//       aria-label="Contacter via WhatsApp"
//     >
//       <img 
//         className="w-18 h-18 color-white" 
//         src="/images/whatsapp1.png" 
//         alt="WhatsApp" 
//       />
//     </button>
//   );
// };

// export default WhatsAppButton;
// components/WhatsAppButton.tsx
'use client';
import { useState, useEffect, useRef } from 'react';

const WhatsAppButton = () => {
  const [isShaking, setIsShaking] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerShake = () => {
    setIsShaking(true);
    timeoutRef.current = setTimeout(() => {
      setIsShaking(false);
    }, 1000);
  };

  useEffect(() => {
    // Première animation après 3 secondes
    const initialDelay = setTimeout(() => {
      triggerShake();
      
      // Puis répéter toutes les 8 secondes
      intervalRef.current = setInterval(() => {
        triggerShake();
      }, 8000);
    }, 3000);

    // Cleanup function
    return () => {
      clearTimeout(initialDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    // Ajoutez ici votre logique pour ouvrir WhatsApp
    window.open('https://wa.me/+15043846092?text=Bonjour%2C+je+vous+contacte+depuis+votre+site+web+car.+Je+poss%C3%A8de+un+stock+de+concombres+de+mer+%C3%A0+vendre.+%0A%0AJe+suis+int%C3%A9ress%C3%A9+par+une+collaboration.', '_blank');

    console.log('Bouton WhatsApp cliqué');
  };

  return (
      <button 
      onClick={handleClick}
      className={`fixed bottom-8 right-8  bg-white hover:bg-green-600 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
        isShaking ? 'animate-shake' : ''
      }`}
      aria-label="Contacter via WhatsApp"
    >
      <img 
        className="w-18 h-18 color-white" 
        src="/images/whatsapp1.png" 
        alt="WhatsApp" 
      />
    </button>
  );
};

export default WhatsAppButton;