import React, { useState } from 'react';
import { X, AlertCircle, User, Mail, Lock } from 'lucide-react'; // <-- Importações limpas e corretas!

export default function RegisterScreen({ setCurrentView, userName, setUserName, highContrast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem. Tente novamente.');
      return;
    }
    setCurrentView('onboarding');
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
      
      <h2 className="text-3xl font-bold mb-2 mt-8" tabIndex="0">Crie sua conta</h2>
      <p className={`mb-6 ${highContrast ? 'text-gray-300' : 'text-gray-600'}`}>Comece sua jornada saudável agora.</p>

      <div aria-live="polite">
        {errorMsg && (
          <div className={`border-l-4 p-4 rounded-lg mb-6 flex items-start shadow-sm
            ${highContrast ? 'bg-black border-red-500 text-red-500 border-2' : 'bg-red-50 border-red-500 text-red-700'}`}>
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">{errorMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* NOME */}
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Como devemos te chamar?</label>
          <div className="relative">
            <User className={`absolute left-4 top-3.5 w-5 h-5 ${highContrast ? 'text-black' : 'text-gray-400'}`} aria-hidden="true" />
            <input 
              type="text" id="name" required placeholder="Seu nome"
              value={userName} onChange={(e) => setUserName(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-4
                ${highContrast ? 'bg-white border-4 border-yellow-400 text-black placeholder-gray-600 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`} 
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="reg-email" className={`block text-sm font-medium mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>E-mail</label>
          <div className="relative">
            <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${highContrast ? 'text-black' : 'text-gray-400'}`} aria-hidden="true" />
            <input 
              type="email" id="reg-email" required placeholder="seu@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-4
                ${highContrast ? 'bg-white border-4 border-yellow-400 text-black placeholder-gray-600 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`} 
            />
          </div>
        </div>

        {/* SENHA */}
        <div>
          <label htmlFor="reg-password" className={`block text-sm font-medium mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Senha (mín. 6 caracteres)</label>
          <div className="relative">
            <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${highContrast ? 'text-black' : 'text-gray-400'}`} aria-hidden="true" />
            <input 
              type="password" id="reg-password" required minLength="6" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-4
                ${highContrast ? 'bg-white border-4 border-yellow-400 text-black placeholder-gray-600 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`} 
            />
          </div>
        </div>

        {/* CONFIRMA SENHA */}
        <div>
          <label htmlFor="reg-confirm-password" className={`block text-sm font-medium mb-1 ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Confirme sua senha</label>
          <div className="relative">
            <Lock className={`absolute left-4 top-3.5 w-5 h-5 ${highContrast ? 'text-black' : 'text-gray-400'}`} aria-hidden="true" />
            <input 
              type="password" id="reg-confirm-password" required minLength="6" placeholder="••••••••"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all focus:ring-4
                ${highContrast ? 'bg-white border-4 border-yellow-400 text-black placeholder-gray-600 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}
                ${errorMsg && !highContrast ? 'border-red-500 focus:ring-red-500' : ''}`} 
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={`w-full font-bold py-4 rounded-xl mt-6 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-4
            ${highContrast ? 'bg-yellow-400 text-black text-lg focus:ring-white' : 'bg-blue-600 text-white focus:ring-blue-500'}`}
        >
          Criar Conta Grátis
        </button>
      </form>
    </div>
  );
}