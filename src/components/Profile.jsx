import React, { useState } from 'react';
import { 
  Home, Activity, BarChart2, User, LogOut, Settings, 
  Bell, Shield, ActivitySquare, Trophy, AlertTriangle, CheckCircle2, Eye, Save, Clock
} from 'lucide-react';

export default function Profile({ setCurrentView, userName, highContrast, toggleHighContrast }) {
  const [waterGoal, setWaterGoal] = useState(2500);
  const [notifications, setNotifications] = useState(true);
  const [waterInterval, setWaterInterval] = useState('60'); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const [exercises, setExercises] = useState([
    { id: 1, name: 'Calistenia', selected: true, duration: 60 },
    { id: 2, name: 'Musculação', selected: false, duration: 45 },
    { id: 3, name: 'Corrida', selected: false, duration: 30 },
  ]);

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const triggerFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleExerciseToggle = (id) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, selected: !ex.selected } : ex));
  };

  const handleDurationChange = (id, newDuration) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, duration: newDuration } : ex));
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    triggerFeedback('Metas e preferências salvas com sucesso!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      triggerFeedback('Erro: As novas senhas não coincidem!');
      return;
    }
    triggerFeedback('Senha alterada com sucesso!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen relative font-sans pb-20 transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <header className={`px-6 pt-10 pb-6 shadow-sm flex justify-between items-center ${highContrast ? 'bg-black border-b-2 border-yellow-400' : 'bg-white'}`}>
        <div>
          <h1 className={`text-2xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Meu Perfil</h1>
          <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>{userName || 'Atleta'}</p>
        </div>
        <button onClick={toggleHighContrast} aria-label="Alternar contraste" className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 ${highContrast ? 'bg-yellow-400 text-black focus:ring-white' : 'bg-gray-100 text-gray-600 hover:text-blue-600'}`}>
          <Eye className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      <div aria-live="polite" className="absolute w-full flex justify-center z-50">
        {feedbackMsg && (
          <div className={`top-4 w-[90%] px-4 py-3 rounded-xl flex items-center shadow-lg transition-all ${feedbackMsg.includes('Erro') ? (highContrast ? 'bg-black border-2 border-red-500 text-red-500' : 'bg-red-100 text-red-700') : (highContrast ? 'bg-yellow-400 text-black border-2 border-black' : 'bg-green-100 text-green-700')}`}>
            {feedbackMsg.includes('Erro') ? <AlertTriangle className="w-5 h-5 mr-2" aria-hidden="true" /> : <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />}
            <span className="font-medium text-sm">{feedbackMsg}</span>
          </div>
        )}
      </div>

      <main className="p-6 space-y-6">
        <section className="flex gap-4">
          <div className={`flex-1 p-4 rounded-2xl shadow-sm text-center border-l-4 ${highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-blue-500'}`}>
            <ActivitySquare className={`w-8 h-8 mx-auto mb-2 ${highContrast ? 'text-yellow-400' : 'text-blue-500'}`} aria-hidden="true" />
            <h3 className="text-2xl font-bold">142</h3><p className="text-xs text-gray-500">Atividades</p>
          </div>
          <div className={`flex-1 p-4 rounded-2xl shadow-sm text-center border-l-4 ${highContrast ? 'bg-black border-yellow-400 text-white' : 'bg-white border-orange-500'}`}>
            <Trophy className={`w-8 h-8 mx-auto mb-2 ${highContrast ? 'text-yellow-400' : 'text-orange-500'}`} aria-hidden="true" />
            <h3 className="text-2xl font-bold">85</h3><p className="text-xs text-gray-500">Dias na Meta</p>
          </div>
        </section>

        <section className={`p-6 rounded-3xl shadow-sm ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
          <h2 className={`font-bold flex items-center mb-4 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}><Settings className="w-5 h-5 mr-2" aria-hidden="true" /> Metas Diárias</h2>
          
          <form onSubmit={handleSavePreferences}>
            <label className="block text-sm font-medium mb-1">Meta de Água (ml)</label>
            <input type="number" value={waterGoal} onChange={(e) => setWaterGoal(e.target.value)}
              className={`w-full p-3 rounded-xl border mb-4 outline-none focus:ring-2 ${highContrast ? 'bg-black border-yellow-400 text-white focus:ring-yellow-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'}`} />

            <label className="block text-sm font-medium mb-2">Meus Exercícios & Tempo</label>
            <div className="space-y-3 mb-6">
              {exercises.map((ex) => (
                <div key={ex.id} className={`flex items-center justify-between p-3 rounded-xl border ${ex.selected ? (highContrast ? 'border-yellow-400' : 'border-blue-500 bg-blue-50') : 'border-gray-200'}`}>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={ex.selected} onChange={() => handleExerciseToggle(ex.id)} className={`w-5 h-5 rounded mr-3 ${highContrast ? 'accent-yellow-400' : ''}`} />
                    <span className={highContrast ? 'text-white' : 'text-gray-800'}>{ex.name}</span>
                  </label>
                  {ex.selected && (
                    <div className="flex items-center">
                      <input type="number" value={ex.duration} onChange={(e) => handleDurationChange(ex.id, e.target.value)} className={`w-16 p-1 text-center rounded border outline-none ${highContrast ? 'bg-black border-yellow-400 text-white focus:border-white' : 'border-gray-300 focus:border-blue-500'}`} />
                      <span className="ml-1 text-xs text-gray-500">min</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center"><Bell className={`w-5 h-5 mr-2 ${highContrast ? 'text-yellow-400' : 'text-gray-600'}`} aria-hidden="true" /><span>Lembretes de Hidratação</span></div>
              <button type="button" role="switch" aria-checked={notifications} onClick={() => setNotifications(!notifications)} className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-offset-2 ${notifications ? (highContrast ? 'bg-yellow-400 focus:ring-yellow-400' : 'bg-blue-600 focus:ring-blue-600') : 'bg-gray-300 focus:ring-gray-400'}`}>
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            {notifications && (
              <div className="mb-6 animate-slide-up">
                <label className="flex items-center text-sm font-medium mb-2">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" aria-hidden="true" /> Lembrar a cada:
                </label>
                <select value={waterInterval} onChange={(e) => setWaterInterval(e.target.value)}
                  className={`w-full p-3 rounded-xl border outline-none focus:ring-2 ${highContrast ? 'bg-black border-yellow-400 text-yellow-400 focus:ring-yellow-500' : 'bg-white border-gray-300 focus:ring-blue-500'}`}>
                  <option value="30">30 Minutos</option>
                  <option value="60">1 Hora</option>
                  <option value="90">1 Hora e meia</option>
                  <option value="120">2 Horas</option>
                </select>
              </div>
            )}

            <button type="submit" className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95 focus:outline-none focus:ring-4 ${highContrast ? 'bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-white' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}`}>
              <Save className="w-5 h-5 mr-2" aria-hidden="true" /> Salvar Preferências
            </button>
          </form>
        </section>

        <section className={`p-6 rounded-3xl shadow-sm ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
          <h2 className={`font-bold flex items-center mb-4 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>
            <Shield className="w-5 h-5 mr-2" aria-hidden="true" /> Segurança
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input type="password" placeholder="Senha Atual" required value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className={`w-full p-3 rounded-xl border outline-none focus:ring-2 ${highContrast ? 'bg-black border-yellow-400 text-white focus:ring-yellow-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'}`} />
            <input type="password" placeholder="Nova Senha" required minLength="6" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className={`w-full p-3 rounded-xl border outline-none focus:ring-2 ${highContrast ? 'bg-black border-yellow-400 text-white focus:ring-yellow-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'}`} />
            <input type="password" placeholder="Confirmar Nova Senha" required minLength="6" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              className={`w-full p-3 rounded-xl border outline-none focus:ring-2 ${highContrast ? 'bg-black border-yellow-400 text-white focus:ring-yellow-500' : 'bg-gray-50 border-gray-300 focus:ring-blue-500'}`} />
            
            <button type="submit" className={`w-full py-3 rounded-xl font-bold transition-all active:scale-95 focus:outline-none focus:ring-4
              ${highContrast ? 'border-2 border-yellow-400 text-yellow-400 focus:ring-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300'}`}>
              Atualizar Senha
            </button>
          </form>
        </section>

        <button onClick={() => setShowLogoutModal(true)} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95 mt-8 mb-6 focus:outline-none focus:ring-4 ${highContrast ? 'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500' : 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-200'}`}>
          <LogOut className="w-5 h-5 mr-2" aria-hidden="true" /> Sair da Conta
        </button>
      </main>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-3xl p-6 text-center animate-slide-up ${highContrast ? 'bg-black border-4 border-yellow-400' : 'bg-white'}`}>
            <AlertTriangle className={`w-12 h-12 mx-auto mb-4 ${highContrast ? 'text-yellow-400' : 'text-red-500'}`} aria-hidden="true" />
            <h3 className={`text-xl font-bold mb-2 ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Deseja mesmo sair?</h3>
            <p className={`mb-6 text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Você precisará fazer login novamente para acessar seu diário.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className={`flex-1 py-3 rounded-xl font-bold focus:outline-none focus:ring-4 ${highContrast ? 'border-2 border-white text-white focus:ring-white' : 'bg-gray-100 focus:ring-gray-300'}`}>Cancelar</button>
              <button onClick={() => { setShowLogoutModal(false); setCurrentView('unlogged'); }} className={`flex-1 py-3 rounded-xl font-bold focus:outline-none focus:ring-4 ${highContrast ? 'bg-red-600 text-white focus:ring-white' : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300'}`}>Sim, sair</button>
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed bottom-0 w-full max-w-md flex justify-between px-6 py-3 z-30 ${highContrast ? 'bg-black border-t-2 border-yellow-400 text-gray-500' : 'bg-white border-t text-gray-400'}`}>
        <button onClick={() => setCurrentView('dashboard')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><Home className="w-6 h-6"/><span className="text-[10px] mt-1">Hoje</span></button>
        <button onClick={() => setCurrentView('history')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><Activity className="w-6 h-6"/><span className="text-[10px] mt-1">Histórico</span></button>
        <div className="w-10"></div>
        <button onClick={() => setCurrentView('statistics')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><BarChart2 className="w-6 h-6"/><span className="text-[10px] mt-1">Gráficos</span></button>
        <button className={`flex flex-col items-center transition-colors ${highContrast ? 'text-yellow-400 font-bold' : 'text-indigo-600 font-bold'}`}><User className="w-6 h-6"/><span className="text-[10px] mt-1">Perfil</span></button>
      </nav>
    </div>
  );
}