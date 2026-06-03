import React from 'react';
import { Eye, Droplet, LogIn } from 'lucide-react'; // <-- Importações corrigidas!

export default function WelcomeScreen({ setCurrentView, highContrast, toggleHighContrast }) {
  return (
    <div className={`max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-6 text-center transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-blue-500 text-white'}`}>
      
      <button 
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        aria-label={highContrast ? "Desativar modo de alto contraste" : "Ativar modo de alto contraste"}
        className={`absolute top-6 right-6 p-3 rounded-full flex items-center shadow-lg transition-all
          ${highContrast ? 'bg-yellow-400 text-black border-2 border-black focus:ring-4 focus:ring-white' : 'bg-blue-600 text-white focus:ring-4 focus:ring-blue-300'}`}
      >
        <Eye className="w-6 h-6" aria-hidden="true" />
        <span className="sr-only">Alternar Contraste</span>
      </button>
  
      <div className={`p-4 rounded-full mb-6 shadow-lg ${highContrast ? 'bg-yellow-400' : 'bg-white'}`} aria-hidden="true">
        <Droplet className={`w-16 h-16 ${highContrast ? 'text-black' : 'text-blue-500'}`} />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Aquafyte</h1>
      <p className={`mb-10 text-lg ${highContrast ? 'text-yellow-400' : 'text-blue-100'}`}>
        Seu progresso diário de saúde e hidratação em um só lugar.
      </p>
      
      <div className={`w-full rounded-3xl p-8 shadow-xl ${highContrast ? 'bg-black border-2 border-yellow-400 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-xl font-bold mb-2">Acesse seu diário</h2>
        <p className={`mb-6 text-sm ${highContrast ? 'text-gray-300' : 'text-gray-500'}`}>
          Você precisa fazer login para visualizar seu painel e registrar atividades.
        </p>
        
        <button 
          onClick={() => setCurrentView('login')}
          className={`w-full font-bold py-4 rounded-xl flex items-center justify-center transition-all active:scale-95 focus:outline-none focus:ring-4
            ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-white' : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'}`}
        >
          <LogIn className="w-5 h-5 mr-2" aria-hidden="true" />
          Fazer Login
        </button>
        
        <button 
          onClick={() => setCurrentView('register')}
          className={`w-full mt-4 font-bold py-4 rounded-xl transition-all active:scale-95 focus:outline-none focus:ring-4
            ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black focus:ring-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-600 focus:ring-blue-500'}`}
        >
          Criar nova conta
        </button>
      </div>
    </div>
  );
}