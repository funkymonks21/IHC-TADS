import React, { useState } from 'react';
import { 
  Home, Activity, BarChart2, User, Share2, ChevronDown, 
  CheckCircle2, XCircle, Droplet, Dumbbell, Copy, Smartphone, Globe 
} from 'lucide-react';

export default function StatisticsScreen({ setCurrentView, highContrast }) {
  const [timeFilter, setTimeFilter] = useState('Semana'); // Semana, Mês, Ano
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFeedback, setShareFeedback] = useState('');

  // NOVOS ESTADOS PARA NAVEGAÇÃO DE TEMPO
  const [selectedMonth, setSelectedMonth] = useState('Maio');
  const [selectedWeek, setSelectedWeek] = useState(1);

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const daysInMonthMap = { 'Janeiro': 31, 'Fevereiro': 28, 'Março': 31, 'Abril': 30, 'Maio': 31, 'Junho': 30, 'Julho': 31, 'Agosto': 31, 'Setembro': 30, 'Outubro': 31, 'Novembro': 30, 'Dezembro': 31 };
  
  const maxDays = daysInMonthMap[selectedMonth];

  const triggerShareFeedback = (msg) => {
    setShareFeedback(msg);
    setTimeout(() => setShareFeedback(''), 3000);
    setShowShareModal(false);
  };

  // ==========================================
  // LÓGICA DE DADOS DINÂMICOS (Baseado na seleção)
  // ==========================================
  
  // Geração da Semana Dinâmica
  const weekDaysLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const dynamicWeeklyData = weekDaysLabels.map((dayName, index) => {
    let dayNum = (selectedWeek - 1) * 7 + index + 1;
    if (dayNum > maxDays) dayNum = null; // Dias que passam do final do mês ficam vazios

    // Matemática simples para simular dados diferentes em semanas diferentes
    const pseudoRandom = dayNum ? (dayNum * selectedWeek) % 5 : 0; 
    
    return {
      dayName,
      dayNum,
      waterVolume: dayNum ? (pseudoRandom === 0 ? 1.2 : pseudoRandom * 0.8) : 0, // Volumes entre 0.8 e ~3.2L
      waterMet: pseudoRandom >= 2,
      workoutMet: pseudoRandom % 2 !== 0
    };
  });

  // Geração do Mês Dinâmico
  const dynamicMonthlyData = Array.from({ length: maxDays }, (_, i) => {
    const day = i + 1;
    return {
      day,
      waterMet: (day % 3 !== 0), // Simulação de dados falhando a cada 3 dias
      workoutMet: (day % 2 === 0) // Simulação de treino dia sim, dia não
    };
  });

  // Dados do Ano fixos
  const yearlyData = [
    { month: 'Jan', water: 25, workout: 18, total: 31 }, { month: 'Fev', water: 20, workout: 15, total: 28 },
    { month: 'Mar', water: 28, workout: 22, total: 31 }, { month: 'Abr', water: 26, workout: 20, total: 30 },
    { month: 'Mai', water: 15, workout: 10, total: 31 }, { month: 'Jun', water: 30, workout: 25, total: 30 },
    { month: 'Jul', water: 29, workout: 24, total: 31 }, { month: 'Ago', water: 31, workout: 28, total: 31 },
    { month: 'Set', water: 22, workout: 12, total: 30 }, { month: 'Out', water: 27, workout: 20, total: 31 },
    { month: 'Nov', water: 24, workout: 19, total: 30 }, { month: 'Dez', water: 10, workout: 5,  total: 31 },
  ];

  // Cores Semânticas
  const colorSuccess = highContrast ? '#facc15' : '#22c55e'; 
  const colorFail = highContrast ? '#374151' : '#f87171';    

  return (
    <div className={`max-w-md mx-auto min-h-screen relative font-sans pb-20 transition-colors duration-300
      ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <header className={`px-6 pt-10 pb-6 shadow-sm flex justify-between items-center ${highContrast ? 'bg-black border-b-2 border-yellow-400' : 'bg-white'}`}>
        <div>
          <h1 className={`text-2xl font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Estatísticas</h1>
          <p className={`text-sm ${highContrast ? 'text-white' : 'text-gray-500'}`}>Seu histórico de progresso</p>
        </div>
        <button onClick={() => setShowShareModal(true)} aria-label="Compartilhar" className={`p-3 rounded-full transition-all focus:outline-none focus:ring-2 ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-600'}`}>
          <Share2 className="w-5 h-5" aria-hidden="true" />
        </button>
      </header>

      <div aria-live="polite" className="absolute w-full flex justify-center z-50">
        {shareFeedback && (
          <div className={`top-4 w-[90%] px-4 py-3 rounded-xl flex items-center shadow-lg transition-all animate-slide-down ${highContrast ? 'bg-yellow-400 text-black border-2 border-black' : 'bg-green-100 border border-green-400 text-green-700'}`}>
            <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium text-sm">{shareFeedback}</span>
          </div>
        )}
      </div>

      <main className="p-6">
        {/* NAVEGAÇÃO PRINCIPAL (Semana, Mês, Ano) */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-800'}`}>Visão Geral</h2>
          <div className="relative">
            <select 
              value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}
              className={`appearance-none pl-4 pr-10 py-2 rounded-xl text-sm font-bold border outline-none ${highContrast ? 'bg-black border-yellow-400 text-yellow-400' : 'bg-white border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500'}`}
            >
              <option value="Semana">Semanal</option>
              <option value="Mês">Mensal</option>
              <option value="Ano">Anual</option>
            </select>
            <ChevronDown className={`absolute right-3 top-2.5 w-4 h-4 pointer-events-none ${highContrast ? 'text-yellow-400' : 'text-gray-500'}`} />
          </div>
        </div>

        {/* ==================================================== */}
        {/* FLUXO 1: GRÁFICO SEMANAL */}
        {/* ==================================================== */}
        {timeFilter === 'Semana' && (
          <div className={`p-6 rounded-3xl shadow-sm mb-6 animate-slide-up ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
            
            {/* TÍTULO E CONTROLES DA SEMANA */}
            <div className="mb-6 text-center">
              <h3 className={`font-bold text-lg mb-3 ${highContrast ? 'text-white' : 'text-gray-800'}`}>
                Semana {selectedWeek} - {selectedMonth}
              </h3>
              <div className="flex gap-2 justify-center">
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border outline-none ${highContrast ? 'bg-gray-800 border-gray-600 text-yellow-400' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={selectedWeek} onChange={(e) => setSelectedWeek(Number(e.target.value))} className={`px-3 py-1.5 rounded-lg text-xs font-bold border outline-none ${highContrast ? 'bg-gray-800 border-gray-600 text-yellow-400' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                  <option value={1}>Semana 1</option>
                  <option value={2}>Semana 2</option>
                  <option value={3}>Semana 3</option>
                  <option value={4}>Semana 4</option>
                  <option value={5}>Semana 5</option>
                </select>
              </div>
            </div>
            
            <div className="flex h-56 w-full mt-4">
              <div className={`flex flex-col justify-between h-40 pr-2 text-xs font-bold border-r ${highContrast ? 'text-yellow-400 border-yellow-400' : 'text-gray-400 border-gray-200'}`}>
                <span>3L</span><span>2L</span><span>1L</span><span>0L</span>
              </div>
              
              <div className="flex justify-between items-end h-40 w-full pl-2 relative">
                {dynamicWeeklyData.map((data, index) => {
                  const heightPercent = Math.min((data.waterVolume / 3.0) * 100, 100); 
                  return (
                    <div key={index} className="flex flex-col items-center justify-end h-full z-10 w-8">
                      {/* Barra de Água */}
                      {data.dayNum && (
                        <div className={`w-full rounded-t-md transition-all duration-1000 ${highContrast ? 'bg-white' : 'bg-blue-400'}`} style={{ height: `${heightPercent}%`, minHeight: '5%' }}></div>
                      )}
                      
                      {/* Rótulos: Dia da semana + Data Numérica */}
                      <div className="flex flex-col items-center mt-2 space-y-1 w-full text-center">
                        <span className={`text-[10px] leading-tight font-bold ${highContrast ? 'text-yellow-400' : 'text-gray-500'}`}>
                          {data.dayName}<br/>
                          {data.dayNum ? String(data.dayNum).padStart(2, '0') : '--'}
                        </span>
                        
                        {data.dayNum && (
                          <>
                            <Droplet className="w-4 h-4 mt-1" color={data.waterMet ? colorSuccess : colorFail} fill={data.waterMet ? colorSuccess : 'transparent'} />
                            <Dumbbell className="w-4 h-4" color={data.workoutMet ? colorSuccess : colorFail} />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* FLUXO 2: GRÁFICO MENSAL */}
        {/* ==================================================== */}
        {timeFilter === 'Mês' && (
          <div className={`p-5 rounded-3xl shadow-sm mb-6 animate-slide-up ${highContrast ? 'bg-black border-2 border-yellow-400' : 'bg-white'}`}>
            
            <div className="mb-4 flex justify-between items-center">
              <h3 className={`font-bold text-lg ${highContrast ? 'text-white' : 'text-gray-800'}`}>Mês: {selectedMonth}</h3>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border outline-none ${highContrast ? 'bg-gray-800 border-gray-600 text-yellow-400' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {dynamicMonthlyData.map((data) => {
                const waterColor = data.waterMet ? colorSuccess : colorFail;
                const workoutColor = data.workoutMet ? colorSuccess : colorFail;
                
                return (
                  <div key={data.day} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm"
                    style={{ background: `linear-gradient(to bottom right, ${waterColor} 50%, ${workoutColor} 50%)` }}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-black bg-white bg-opacity-70 px-1 rounded text-gray-900">{data.day}</span>
                    </div>
                    <Droplet className="absolute top-0.5 left-0.5 w-3 h-3 text-white drop-shadow-md" fill="currentColor" />
                    <Dumbbell className="absolute bottom-0.5 right-0.5 w-3 h-3 text-white drop-shadow-md" fill="currentColor" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* FLUXO 3: GRÁFICO ANUAL (Intacto) */}
        {/* ==================================================== */}
        {timeFilter === 'Ano' && (
          <div className="grid grid-cols-3 gap-3 animate-slide-up mb-6">
            {yearlyData.map((data) => (
              <div key={data.month} className={`p-3 rounded-2xl flex flex-col items-center text-center shadow-sm ${highContrast ? 'bg-black border border-yellow-400' : 'bg-white border border-gray-100'}`}>
                <h4 className={`text-sm font-black mb-2 uppercase ${highContrast ? 'text-yellow-400' : 'text-gray-800'}`}>{data.month}</h4>
                <div className="flex flex-col space-y-2 w-full">
                  <div className={`flex items-center justify-between text-xs font-bold px-1 rounded ${highContrast ? 'bg-gray-800 text-white' : 'bg-blue-50 text-blue-700'}`}>
                    <Droplet className="w-3 h-3" /><span>{data.water}/{data.total}</span>
                  </div>
                  <div className={`flex items-center justify-between text-xs font-bold px-1 rounded ${highContrast ? 'bg-gray-800 text-white' : 'bg-orange-50 text-orange-700'}`}>
                    <Dumbbell className="w-3 h-3" /><span>{data.workout}/{data.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LEGENDA GLOBAL */}
        <div className={`p-4 rounded-2xl text-xs font-medium grid grid-cols-2 gap-2 ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorSuccess }}></span>
            <span className={highContrast ? 'text-white' : 'text-gray-700'}>Meta Atingida</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colorFail }}></span>
            <span className={highContrast ? 'text-white' : 'text-gray-700'}>Meta Falha</span>
          </div>
        </div>
      </main>

      {/* MODAL DE COMPARTILHAMENTO */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-end justify-center">
          <div className={`w-full rounded-t-3xl p-6 pb-10 animate-slide-up ${highContrast ? 'bg-black border-t-4 border-yellow-400' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-6 text-center ${highContrast ? 'text-yellow-400' : 'text-gray-900'}`}>Compartilhar Progresso</h3>
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => triggerShareFeedback('Link copiado!')} className={`flex flex-col items-center p-4 rounded-2xl transition-all ${highContrast ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}>
                <Copy className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Copiar</span>
              </button>
              <button onClick={() => triggerShareFeedback('Abrindo Instagram...')} className={`flex flex-col items-center p-4 rounded-2xl transition-all ${highContrast ? 'bg-gray-800 text-white' : 'bg-pink-50 text-pink-600'}`}>
                <Smartphone className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Instagram</span>
              </button>
              <button onClick={() => triggerShareFeedback('Abrindo Facebook...')} className={`flex flex-col items-center p-4 rounded-2xl transition-all ${highContrast ? 'bg-gray-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <Globe className="w-8 h-8 mb-2" />
                <span className="text-sm font-bold">Facebook</span>
              </button>
            </div>
            <button onClick={() => setShowShareModal(false)} className={`w-full mt-6 py-4 font-bold rounded-xl ${highContrast ? 'border-2 border-yellow-400 text-yellow-400' : 'text-gray-500 bg-gray-100'}`}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM NAV */}
      <nav className={`fixed bottom-0 w-full max-w-md flex justify-between px-6 py-3 z-30 ${highContrast ? 'bg-black border-t-2 border-yellow-400 text-gray-500' : 'bg-white border-t text-gray-400'}`}>
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