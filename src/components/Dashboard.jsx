import React, { useState } from 'react';
import { 
  Home, Activity, BarChart2, User, LogOut, 
  CheckCircle2, Droplet, Dumbbell, X, Plus, Eye, AlertTriangle // <-- AlertTriangle adicionado
} from 'lucide-react';

export default function AquafyteDashboard({ 
  setCurrentView, userName, highContrast, toggleHighContrast, simulateNotification,
  waterIntake, workoutDone, addWaterRecord, addWorkoutRecord,
  waterGoal, exercises 
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  
  // NOVO ESTADO PARA O MODAL DE SAIR
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const waterPercent = Math.min(Math.round((waterIntake / waterGoal) * 100), 100);
  const workoutPercent = workoutDone ? 100 : 0;

  const triggerFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleAddWater = (amount) => {
    addWaterRecord(amount);
    triggerFeedback(`+${amount}ml registrados! 💧`);
    setShowMenu(false);
  };

  const handleAddWorkout = (name, duration) => {
    addWorkoutRecord(name, duration);
    triggerFeedback(`Treino de ${name} salvo! 💪`);
    setShowMenu(false);
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen relative font-sans overflow-hidden shadow-xl transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <header className={`px-6 pt-10 pb-6 rounded-b-3xl shadow-sm flex justify-between items-start
        ${highContrast ? 'bg-black border-b-2 border-yellow-400' : 'bg-white'}`}>
        <div>
          <button onClick={simulateNotification} className={`text-2xl font-bold truncate max-w-[200px] text-left focus:outline-none ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>
            Olá, {userName || 'Atleta'}!
          </button>
          <p className={`mt-1 text-sm ${highContrast ? 'text-white' : 'text-gray-600'}`}>
            {workoutDone && waterPercent >= 100 ? "Metas concluídas! 🎉" : "Pronto para dominar o dia? 🚀"}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={toggleHighContrast} aria-label="Alternar contraste" className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 ${highContrast ? 'bg-yellow-400 text-black focus:ring-white' : 'bg-gray-100 text-gray-500 hover:text-blue-600'}`}>
            <Eye className="w-5 h-5" aria-hidden="true" />
          </button>
          {/* BOTÃO DE SAIR AGORA ABRE O MODAL */}
          <button onClick={() => setShowLogoutModal(true)} aria-label="Sair da conta" className={`p-2 rounded-full transition-all focus:outline-none focus:ring-2 ${highContrast ? 'text-yellow-400 border-2 border-transparent focus:border-yellow-400' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}>
            <LogOut className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div aria-live="polite" className="absolute w-full flex justify-center z-50">
        {feedbackMsg && (
          <div className={`top-6 w-[90%] px-4 py-3 rounded-xl flex items-center shadow-lg animate-bounce mt-4
            ${highContrast ? 'bg-yellow-400 text-black border-2 border-black' : 'bg-green-100 border border-green-400 text-green-700'}`}>
            <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium text-sm">{feedbackMsg}</span>
          </div>
        )}
      </div>

      <main className="p-6 pb-32">
        <div id="tour-progress" className={`flex justify-between items-center p-6 rounded-3xl shadow-sm mb-8 ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-2">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className={highContrast ? 'text-gray-800' : 'text-gray-100'} />
                <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className={`${highContrast ? 'text-yellow-400' : 'text-blue-500'} transition-all duration-1000`} strokeDasharray={2 * Math.PI * 45} strokeDashoffset={(2 * Math.PI * 45) - (waterPercent / 100) * (2 * Math.PI * 45)} strokeLinecap="round" />
              </svg>
              <div className={`flex flex-col items-center z-10 ${highContrast ? 'text-yellow-400' : 'text-blue-600'}`}>
                <Droplet className="w-6 h-6 mb-1" aria-hidden="true" />
                <span className="text-sm font-bold">{waterPercent}%</span>
              </div>
            </div>
            <span className={`font-semibold text-sm ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Água</span>
            <span className={`text-xs ${highContrast ? 'text-white' : 'text-gray-500'}`}>{waterIntake} / {waterGoal}ml</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-2">
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className={highContrast ? 'text-gray-800' : 'text-gray-100'} />
                <circle cx="56" cy="56" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className={`${highContrast ? 'text-yellow-400' : 'text-orange-500'} transition-all duration-1000`} strokeDasharray={2 * Math.PI * 45} strokeDashoffset={(2 * Math.PI * 45) - (workoutPercent / 100) * (2 * Math.PI * 45)} strokeLinecap="round" />
              </svg>
              <div className={`flex flex-col items-center z-10 ${highContrast ? 'text-yellow-400' : 'text-orange-500'}`}>
                <Dumbbell className="w-6 h-6 mb-1" aria-hidden="true" />
                <span className="text-sm font-bold">{workoutPercent}%</span>
              </div>
            </div>
            <span className={`font-semibold text-sm ${highContrast ? 'text-yellow-400' : 'text-gray-700'}`}>Treino</span>
            <span className={`text-xs ${highContrast ? 'text-white' : 'text-gray-500'}`}>{workoutDone ? "Concluído" : "Pendente"}</span>
          </div>
        </div>

        <div id="tour-quick-add" className="mb-6">
          <h2 className={`text-sm font-bold mb-4 uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-800'}`}>Hidratação Rápida</h2>
          <div className="flex gap-4">
            <button onClick={() => handleAddWater(250)} className={`flex-1 py-4 rounded-2xl flex flex-col items-center active:scale-95 transition-colors focus:outline-none focus:ring-4 ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-yellow-400 focus:ring-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700 focus:ring-blue-500'}`}>
              <span className="text-2xl mb-1" aria-hidden="true">🥛</span><span className="font-semibold text-sm">+250ml</span>
            </button>
            <button onClick={() => handleAddWater(500)} className={`flex-1 py-4 rounded-2xl flex flex-col items-center active:scale-95 transition-colors focus:outline-none focus:ring-4 ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-yellow-400 focus:ring-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700 focus:ring-blue-500'}`}>
              <span className="text-2xl mb-1" aria-hidden="true">🚰</span><span className="font-semibold text-sm">+500ml</span>
            </button>
          </div>
        </div>
      </main>

      {/* OVERLAY MENU INFERIOR */}
      {showMenu && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-40 flex items-end justify-center">
          <div className={`w-full rounded-t-3xl p-6 pb-24 animate-slide-up ${highContrast ? 'bg-black border-t-4 border-yellow-400' : 'bg-white'}`}>
            <div className="flex justify-between mb-6">
              <h3 className={`text-lg font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>O que vamos registrar?</h3>
              <button onClick={() => setShowMenu(false)} className={`p-2 rounded-full ${highContrast ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100'}`}><X className="w-5 h-5"/></button>
            </div>
            <button onClick={() => handleAddWater(350)} className={`w-full flex items-center p-4 rounded-2xl mb-3 text-left transition-colors ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-white' : 'bg-blue-50 hover:bg-blue-100'}`}>
              <Droplet className={`w-6 h-6 mr-4 ${highContrast ? 'text-yellow-400' : 'text-blue-500'}`} />
              <div><p className="font-bold">Água Personalizada</p><p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>Registrar outro volume</p></div>
            </button>

            {exercises.filter(ex => ex.selected).map(ex => (
              <button 
                key={ex.id} 
                onClick={() => handleAddWorkout(ex.name, ex.duration)} 
                className={`w-full flex items-center p-4 rounded-2xl mb-3 text-left transition-colors ${highContrast ? 'bg-transparent border-2 border-yellow-400 text-white' : 'bg-orange-50 hover:bg-orange-100'}`}
              >
                <Dumbbell className={`w-6 h-6 mr-4 ${highContrast ? 'text-yellow-400' : 'text-orange-500'}`} />
                <div><p className="font-bold">Treino ({ex.name})</p><p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>{ex.duration} min planejados</p></div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* NOVO: MODAL DE CONFIRMAÇÃO DE SAÍDA */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-3xl p-6 text-center animate-slide-up ${highContrast ? 'bg-black border-4 border-yellow-400' : 'bg-white'}`}>
            <AlertTriangle className={`w-12 h-12 mx-auto mb-4 ${highContrast ? 'text-yellow-400' : 'text-red-500'}`} aria-hidden="true" />
            <h3 className={`text-xl font-bold mb-2 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Desconectar</h3>
            <p className={`mb-6 text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Tem certeza que deseja desconectar e sair?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className={`flex-1 py-3 rounded-xl font-bold focus:outline-none focus:ring-4 ${highContrast ? 'border-2 border-white text-white focus:ring-white' : 'bg-gray-100 focus:ring-gray-300'}`}>Cancelar</button>
              <button onClick={() => { setShowLogoutModal(false); setCurrentView('unlogged'); }} className={`flex-1 py-3 rounded-xl font-bold focus:outline-none focus:ring-4 ${highContrast ? 'bg-red-600 text-white focus:ring-white' : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300'}`}>Sim, sair</button>
            </div>
          </div>
        </div>
      )}

      <div id="tour-fab" className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <button onClick={() => setShowMenu(!showMenu)} className={`text-white p-4 rounded-full shadow-xl transition-all duration-300 ${highContrast ? (showMenu ? 'bg-red-600' : 'bg-yellow-400 text-black border-2 border-black') : (showMenu ? 'bg-red-500 rotate-45' : 'bg-indigo-600 hover:scale-105 active:scale-95')}`}>
          <Plus className={`w-8 h-8 ${showMenu && !highContrast ? 'rotate-45' : ''}`} />
        </button>
      </div>

      <nav id="tour-nav" className={`absolute bottom-0 w-full flex justify-between px-6 py-3 z-30 ${highContrast ? 'bg-black border-t-2 border-yellow-400 text-yellow-400' : 'bg-white border-t text-gray-400'}`}>
        <button className={`flex flex-col items-center ${highContrast ? 'font-bold' : 'text-indigo-600'}`}><Home className="w-6 h-6"/><span className="text-[10px] mt-1">Hoje</span></button>
        <button onClick={() => setCurrentView('history')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><Activity className="w-6 h-6"/><span className="text-[10px] mt-1">Histórico</span></button>
        <div className="w-10"></div>
        <button onClick={() => setCurrentView('statistics')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><BarChart2 className="w-6 h-6"/><span className="text-[10px] mt-1">Gráficos</span></button>
        <button onClick={() => setCurrentView('profile')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><User className="w-6 h-6"/><span className="text-[10px] mt-1">Perfil</span></button>
      </nav>
    </div>
  );
}