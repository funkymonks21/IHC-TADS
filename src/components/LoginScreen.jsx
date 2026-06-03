import React from 'react';
import { X, Mail, Lock } from 'lucide-react'; // <-- Ícones corretos importados aqui!

export default function LoginScreen({ setCurrentView, highContrast }) {
  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen p-6 flex flex-col justify-center relative transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <button 
        onClick={() => setCurrentView('unlogged')} 
        className={`absolute top-6 left-6 p-2 rounded-full focus:outline-none focus:ring-2 
          ${highContrast ? 'text-yellow-400 focus:ring-yellow-400' : 'text-gray-500 focus:ring-blue-500'}`}
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>
      
      <h2 className="text-3xl font-bold mb-2 mt-8" tabIndex="0">Bem-vindo de volta!</h2>
      <p className={`mb-8 ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>Insira seus dados para continuar.</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="login-email" className={`block text-sm font-medium mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>E-mail</label>
          <div className="relative">
            <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${highContrast ? 'text-black' : 'text-gray-400'}`} aria-hidden="true" />
            <input 
              type="email" id="login-email" required placeholder="seu@email.com"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-4
                ${highContrast ? 'bg-white border-4 border-yellow-400 text-black placeholder-gray-600 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`} 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="login-password" className={`block text-sm font-medium mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Senha</label>
          <div className="relative">
            <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${highContrast ? 'text-black' : 'text-gray-400'}`} aria-hidden="true" />
            <input 
              type="password" id="login-password" required placeholder="••••••••"
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-4
                ${highContrast ? 'bg-white border-4 border-yellow-400 text-black placeholder-gray-600 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`} 
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`w-full font-bold py-4 rounded-xl mt-6 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-4
            ${highContrast ? 'bg-yellow-400 text-black text-lg focus:ring-white' : 'bg-blue-600 text-white focus:ring-blue-500'}`}
        >
          Entrar no Aquafyte
        </button>
      </form>

      <p className="text-center mt-8">
        Ainda não tem conta?{' '}
        <button 
          onClick={() => setCurrentView('register')} 
          className={`font-bold underline decoration-2 underline-offset-2 focus:outline-none focus:ring-2 
            ${highContrast ? 'text-yellow-400 focus:ring-yellow-400' : 'text-blue-600 focus:ring-blue-500'}`}
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
}