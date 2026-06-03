import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // <-- ArrowRight adicionado aqui!

export default function OnboardingScreen({ setCurrentView, userName, highContrast }) {
  return (
    <div className={`max-w-md mx-auto min-h-screen p-6 flex flex-col justify-center text-center items-center transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm
        ${highContrast ? 'bg-yellow-400 text-black' : 'bg-green-100 text-green-500'}`}>
        <CheckCircle2 className="w-10 h-10" />
      </div>
      
      <h2 className="text-3xl font-bold mb-4">Sucesso, {userName || 'Atleta'}!</h2>
      <p className={`mb-10 text-lg px-2 ${highContrast ? 'text-yellow-400' : 'text-gray-600'}`}>
        Sua conta foi criada. Para o Aquafyte funcionar perfeitamente, precisamos saber suas metas diárias. Deseja configurar isso agora?
      </p>

      <div className="w-full space-y-4">
        {/* Quando clicar em configurar, vai para o Perfil em vez do Dashboard! */}
        <button 
          onClick={() => setCurrentView('profile')}
          className={`w-full font-bold py-4 rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-md
            ${highContrast ? 'bg-yellow-400 text-black text-lg focus:ring-4 focus:ring-white' : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-500'}`}
        >
          Sim, configurar metas <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
        </button>
        
        <button 
          onClick={() => setCurrentView('dashboard')}
          className={`w-full font-bold py-4 rounded-xl active:scale-95 transition-all
            ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:ring-4 focus:ring-white' : 'text-gray-500 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300'}`}
        >
          Pular por enquanto
        </button>
      </div>
    </div>
  );
}