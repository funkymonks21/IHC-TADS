import React, { useState } from 'react';
import { 
  Home, Activity, BarChart2, User, Share2, ChevronDown, 
  CheckCircle2, XCircle, Droplet, Dumbbell, Copy, Smartphone, Globe // <-- Ícones corrigidos aqui!
} from 'lucide-react';

export default function StatisticsScreen({ setCurrentView, highContrast }) {
  const [timeFilter, setTimeFilter] = useState('Semana');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');

  const chartData = [
    { day: 'Seg', water: 100, workout: true },  
    { day: 'Ter', water: 80, workout: false },  
    { day: 'Qua', water: 100, workout: true },
    { day: 'Qui', water: 60, workout: true },   
    { day: 'Sex', water: 100, workout: false },
    { day: 'Sáb', water: 100, workout: true },
    { day: 'Dom', water: 40, workout: false },
  ];

  const triggerShareFeedback = (msg) => {
    setShareFeedback(msg);
    setTimeout(() => setShareFeedback(''), 3000);
    setShowShareModal(false);
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen relative font-sans pb-20 transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <header className={`px-6 pt-10 pb-6 shadow-sm flex justify-between items-center
        ${highContrast ? 'bg-black border-b-2 border-yellow-400' : 'bg-white'}`}>
        <div>
          <h1 className={`text-2xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Estatísticas</h1>
          <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Seu desempenho na {timeFilter.toLowerCase()}</p>
        </div>
        
        <button 
          onClick={() => setShowShareModal(true)}
          aria-label="Compartilhar progresso"
          className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 
            ${highContrast ? 'bg-yellow-400 text-black focus:ring-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200 focus:ring-blue-500'}`}
        >
          <Share2 className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      <div aria-live="polite" className="absolute w-full flex justify-center z-50">
        {shareFeedback && (
          <div className={`top-4 w-[90%] px-4 py-3 rounded-xl flex items-center shadow-lg transition-all animate-slide-down
            ${highContrast ? 'bg-yellow-400 text-black border-2 border-black' : 'bg-green-100 border border-green-400 text-green-700'}`}>
            <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium text-sm">{shareFeedback}</span>
          </div>
        )}
      </div>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-800'}`}>Visão Geral</h2>
          <div className="relative">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className={`appearance-none pl-4 pr-10 py-2 rounded-xl text-sm font-bold border outline-none
                ${highContrast ? 'bg-black border-yellow-400 text-yellow-400' : 'bg-white border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500'}`}
            >
              <option value="Semana">Esta Semana</option>
              <option value="Mês">Este Mês</option>
              <option value="Ano">Este Ano</option>
            </select>
            <ChevronDown className={`absolute right-3 top-2.5 w-4 h-4 pointer-events-none ${highContrast ? 'text-yellow-400' : 'text-gray-500'}`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`p-4 rounded-2xl shadow-sm border-l-4 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-green-500'}`}>
            <div className="flex items-center mb-2">
              <Droplet className={`w-4 h-4 mr-1 ${highContrast ? 'text-yellow-400' : 'text-blue-500'}`} />
              <span className={`text-xs font-bold ${highContrast ? 'text-white' : 'text-gray-500'}`}>ÁGUA TOTAL</span>
            </div>
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>14.5L</h3>
          </div>
          <div className={`p-4 rounded-2xl shadow-sm border-l-4 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-green-500'}`}>
            <div className="flex items-center mb-2">
              <Dumbbell className={`w-4 h-4 mr-1 ${highContrast ? 'text-yellow-400' : 'text-orange-500'}`} />
              <span className={`text-xs font-bold ${highContrast ? 'text-white' : 'text-gray-500'}`}>TREINOS</span>
            </div>
            <h3 className={`text-2xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>4 dias</h3>
          </div>
        </div>

        <div className={`p-6 rounded-3xl shadow-sm mb-6 ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
          <h3 className={`font-bold mb-6 text-center ${highContrast ? 'text-white' : 'text-gray-800'}`}>Progresso Diário</h3>
          
          <div className="flex justify-between items-end h-48 mb-4 border-b border-gray-200 pb-2 relative">
            <div className="absolute w-full h-px bg-gray-200 bottom-[50%] z-0"></div>
            <div className="absolute w-full h-px bg-gray-200 top-0 z-0"></div>

            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full z-10 w-10">
                <div className="mb-2">
                  {data.workout ? (
                    <CheckCircle2 className={`w-4 h-4 ${highContrast ? 'text-yellow-400' : 'text-green-500'}`} />
                  ) : (
                    <XCircle className={`w-4 h-4 ${highContrast ? 'text-gray-600' : 'text-red-400'}`} />
                  )}
                </div>
                
                <div 
                  className={`w-full rounded-t-md transition-all duration-1000 
                    ${data.water >= 100 
                      ? (highContrast ? 'bg-yellow-400' : 'bg-green-500') 
                      : (highContrast ? 'bg-gray-700' : 'bg-red-400')}`}
                  style={{ height: `${data.water}%`, minHeight: '10%' }}
                  aria-label={`${data.day}: ${data.water}% da meta de água`}
                ></div>
                <span className={`text-xs mt-2 font-bold ${highContrast ? 'text-gray-400' : 'text-gray-500'}`}>{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 text-xs font-medium">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full inline-block mr-1 ${highContrast ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
              <span className={highContrast ? 'text-gray-300' : 'text-gray-600'}>Meta Atingida</span>
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full inline-block mr-1 ${highContrast ? 'bg-gray-700' : 'bg-red-400'}`}></span>
              <span className={highContrast ? 'text-gray-300' : 'text-gray-600'}>Abaixo da Meta</span>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE COMPARTILHAMENTO */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end justify-center">
          <div className={`w-full rounded-t-3xl p-6 pb-10 animate-slide-up
            ${highContrast ? 'bg-black border-t-4 border-yellow-400' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-6 text-center ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Compartilhar Progresso</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => triggerShareFeedback('Link copiado para a área de transferência!')} className={`flex flex-col items-center p-4 rounded-2xl transition-all ${highContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                <Copy className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Copiar Link</span>
              </button>
              
              {/* ÍCONES GENÉRICOS SUBSTITUINDO AS MARCAS */}
              <button onClick={() => triggerShareFeedback('Abrindo Instagram...')} className={`flex flex-col items-center p-4 rounded-2xl transition-all ${highContrast ? 'bg-gray-800 text-white' : 'bg-pink-50 hover:bg-pink-100 text-pink-600'}`}>
                <Smartphone className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Instagram</span>
              </button>
              <button onClick={() => triggerShareFeedback('Abrindo Facebook...')} className={`flex flex-col items-center p-4 rounded-2xl transition-all ${highContrast ? 'bg-gray-800 text-white' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}`}>
                <Globe className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Facebook</span>
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareModal(false)}
              className={`w-full mt-6 py-4 font-bold rounded-xl ${highContrast ? 'border-2 border-yellow-400 text-yellow-400' : 'text-gray-500 bg-gray-100'}`}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <nav className={`fixed bottom-0 w-full max-w-md flex justify-between px-6 py-3 z-30
        ${highContrast ? 'bg-black border-t-2 border-yellow-400 text-gray-500' : 'bg-white border-t text-gray-400'}`}>
        <button onClick={() => setCurrentView('dashboard')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><Home className="w-6 h-6"/><span className="text-[10px] mt-1">Hoje</span></button>
        <button onClick={() => setCurrentView('history')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><Activity className="w-6 h-6"/><span className="text-[10px] mt-1">Histórico</span></button>
        <div className="w-10"></div> 
        <button className={`flex flex-col items-center transition-colors ${highContrast ? 'text-yellow-400 font-bold' : 'text-indigo-600 font-bold'}`}>
          <BarChart2 className="w-6 h-6"/><span className="text-[10px] mt-1">Gráficos</span>
        </button>
        <button onClick={() => setCurrentView('profile')} className="flex flex-col items-center hover:text-indigo-600 transition-colors"><User className="w-6 h-6"/><span className="text-[10px] mt-1">Perfil</span></button>
      </nav>
    </div>
  );
}