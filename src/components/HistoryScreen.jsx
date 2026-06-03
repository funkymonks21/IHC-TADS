import React, { useState } from 'react';
import { 
  Home, Activity, BarChart2, User, Trash2, Droplet, Dumbbell, CheckCircle2, Eye 
} from 'lucide-react';

export default function HistoryScreen({ 
  setCurrentView, highContrast, toggleHighContrast, 
  activities, deleteRecord 
}) {
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const triggerFeedback = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleDelete = (id, title) => {
    deleteRecord(id);
    triggerFeedback(`Registro "${title}" excluído.`);
  };

  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.dateGroup]) acc[activity.dateGroup] = [];
    acc[activity.dateGroup].push(activity);
    return acc;
  }, {});

  return (
    <div className={`max-w-md mx-auto min-h-screen relative font-sans pb-20 transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <header className={`px-6 pt-10 pb-6 shadow-sm flex justify-between items-center
        ${highContrast ? 'bg-black border-b-2 border-yellow-400' : 'bg-white'}`}>
        <div>
          <h1 className={`text-2xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Histórico</h1>
          <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Seus registros recentes</p>
        </div>
        <button onClick={toggleHighContrast} aria-label="Alternar contraste" className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 ${highContrast ? 'bg-yellow-400 text-black focus:ring-white' : 'bg-gray-100 text-gray-600 hover:text-blue-600'}`}>
          <Eye className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      <div aria-live="polite" className="absolute w-full flex justify-center z-50">
        {feedbackMsg && (
          <div className={`top-4 w-[90%] px-4 py-3 rounded-xl flex items-center shadow-lg transition-all
            ${highContrast ? 'bg-yellow-400 text-black border-2 border-black' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium text-sm">{feedbackMsg}</span>
          </div>
        )}
      </div>

      <main className="p-6">
        {Object.keys(groupedActivities).length === 0 ? (
          <div className={`text-center mt-10 ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" aria-hidden="true" />
            <p>Nenhuma atividade registrada ainda.</p>
          </div>
        ) : (
          Object.keys(groupedActivities).map(date => (
            <div key={date} className="mb-6 animate-slide-up">
              <h2 className={`text-sm font-bold mb-3 uppercase tracking-wider ${highContrast ? 'text-yellow-400' : 'text-gray-500'}`}>
                {date}
              </h2>
              
              <div className="space-y-3">
                {groupedActivities[date].map(activity => (
                  <div key={activity.id} className={`flex items-center justify-between p-4 rounded-2xl shadow-sm transition-all ${highContrast ? 'bg-black border-2 border-gray-700' : 'bg-white'}`}>
                    <div className="flex items-center">
                      <div className={`p-3 rounded-xl mr-4 ${highContrast ? 'bg-gray-800' : (activity.type === 'water' ? 'bg-blue-50' : 'bg-orange-50')}`}>
                        {activity.type === 'water' 
                          ? <Droplet className={`w-6 h-6 ${highContrast ? 'text-yellow-400' : 'text-blue-500'}`} aria-hidden="true" />
                          : <Dumbbell className={`w-6 h-6 ${highContrast ? 'text-yellow-400' : 'text-orange-500'}`} aria-hidden="true" />
                        }
                      </div>
                      <div>
                        <p className={`font-bold text-md ${highContrast ? 'text-white' : 'text-gray-900'}`}>{activity.title}</p>
                        <p className={`text-sm ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.detail} • {activity.time}
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(activity.id, activity.title)}
                      aria-label={`Excluir registro de ${activity.title}`}
                      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 ${highContrast ? 'text-gray-400 hover:text-red-500' : 'text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      <nav className={`fixed bottom-0 w-full max-w-md flex justify-between px-6 py-3 z-30 ${highContrast ? 'bg-black border-t-2 border-yellow-400 text-gray-500' : 'bg-white border-t text-gray-400'}`}>
        <button onClick={() => setCurrentView('dashboard')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><Home className="w-6 h-6"/><span className="text-[10px] mt-1">Hoje</span></button>
        <button className={`flex flex-col items-center transition-colors ${highContrast ? 'text-yellow-400 font-bold' : 'text-indigo-600 font-bold'}`}><Activity className="w-6 h-6"/><span className="text-[10px] mt-1">Histórico</span></button>
        <div className="w-10"></div> 
        <button onClick={() => setCurrentView('statistics')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><BarChart2 className="w-6 h-6"/><span className="text-[10px] mt-1">Gráficos</span></button>
        <button onClick={() => setCurrentView('profile')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><User className="w-6 h-6"/><span className="text-[10px] mt-1">Perfil</span></button>
      </nav>
    </div>
  );
}