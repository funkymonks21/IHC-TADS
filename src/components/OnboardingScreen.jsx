import React from 'react';
import { CheckCircle2, ArrowRight, PlayCircle } from 'lucide-react'; // <-- Importe o PlayCircle

export default function OnboardingScreen({ setCurrentView, userName, highContrast, startTour }) {
  return (
    <div className={`max-w-md mx-auto min-h-screen p-6 flex flex-col justify-center text-center items-center transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm
        ${highContrast ? 'bg-yellow-400 text-black' : 'bg-green-100 text-green-500'}`}>
        <CheckCircle2 className="w-10 h-10" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Sucesso, {userName || 'Atleta'}!</h2>
      <p className={`mb-10 text-lg px-2 ${highContrast ? 'text-yellow-400' : 'text-gray-600'}`}>
        Sua conta foi criada. O Aquafyte é super simples de usar, mas preparamos um mini tutorial rápido de 4 passos para você conhecer tudo.
      </p>

      <div className="w-full space-y-4">
        {/* BOTÃO QUE INICIA O TOUR */}
        <button 
          onClick={startTour}
          className={`w-full font-bold py-4 rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-md
            ${highContrast ? 'bg-yellow-400 text-black text-lg focus:ring-4 focus:ring-white' : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-500'}`}
        >
          <PlayCircle className="w-5 h-5 mr-2" aria-hidden="true" /> Iniciar Tutorial
        </button>
        
        {/* BOTÃO DE PULAR */}
        <button 
          onClick={() => setCurrentView('profile')} // Pula e vai configurar metas
          className={`w-full font-bold py-4 rounded-xl active:scale-95 transition-all
            ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:ring-4 focus:ring-white' : 'text-gray-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300'}`}
        >
          Pular tutorial
        </button>
      </div>
    </div>
  );
}