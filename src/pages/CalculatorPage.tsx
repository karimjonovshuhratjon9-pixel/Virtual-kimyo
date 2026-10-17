import React, { useState } from 'react';
import { calculateMolarMass, MolarMassResult } from '../services/chemicalFormulaParser';
import { Calculator, Sparkles, Scale, Percent, Waves, Wind, HelpCircle, Check, ArrowRight } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'molar' | 'amount' | 'solution' | 'gas' | 'density'>('molar');

  // 1. Molar Mass state
  const [formulaInput, setFormulaInput] = useState('H2SO4');
  const [molarResult, setMolarResult] = useState<MolarMassResult | null>(() => {
    const res = calculateMolarMass('H2SO4');
    return 'error' in res ? null : res;
  });
  const [molarError, setMolarError] = useState<string | null>(null);

  const handleComputeMolar = () => {
    if (!formulaInput.trim()) return;
    const res = calculateMolarMass(formulaInput.trim());
    if ('error' in res) {
      setMolarError(res.error);
      setMolarResult(null);
    } else {
      setMolarError(null);
      setMolarResult(res);
    }
  };

  // 2. Amount of substance n = m / M
  const [massInput, setMassInput] = useState('98');
  const [molarSubstanceInput, setMolarSubstanceInput] = useState('98.079');
  const [calculatedMoles, setCalculatedMoles] = useState<number | null>(1.0);

  const handleComputeMoles = () => {
    const m = parseFloat(massInput);
    const M = parseFloat(molarSubstanceInput);
    if (!isNaN(m) && !isNaN(M) && M > 0) {
      setCalculatedMoles(Number((m / M).toFixed(4)));
    } else {
      setCalculatedMoles(null);
    }
  };

  // 3. Solution concentration w = (m_solute / m_solution) * 100%
  const [soluteMass, setSoluteMass] = useState('20');
  const [solutionMass, setSolutionMass] = useState('100');
  const [massPercentResult, setMassPercentResult] = useState<number | null>(20.0);

  const handleComputeSolution = () => {
    const m_solute = parseFloat(soluteMass);
    const m_sol = parseFloat(solutionMass);
    if (!isNaN(m_solute) && !isNaN(m_sol) && m_sol > 0 && m_solute <= m_sol) {
      setMassPercentResult(Number(((m_solute / m_sol) * 100).toFixed(2)));
    } else {
      setMassPercentResult(null);
    }
  };

  // 4. Gas volume V = n * 22.4 L/mol
  const [gasMoles, setGasMoles] = useState('2.5');
  const [gasVolumeResult, setGasVolumeResult] = useState<number | null>(56.0);

  const handleComputeGas = () => {
    const n = parseFloat(gasMoles);
    if (!isNaN(n) && n >= 0) {
      setGasVolumeResult(Number((n * 22.4).toFixed(3)));
    } else {
      setGasVolumeResult(null);
    }
  };

  // 5. Density ρ = m / V
  const [densityMass, setDensityMass] = useState('54');
  const [densityVolume, setDensityVolume] = useState('20');
  const [densityResult, setDensityResult] = useState<number | null>(2.7);

  const handleComputeDensity = () => {
    const m = parseFloat(densityMass);
    const V = parseFloat(densityVolume);
    if (!isNaN(m) && !isNaN(V) && V > 0) {
      setDensityResult(Number((m / V).toFixed(3)));
    } else {
      setDensityResult(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
            <Calculator className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kimyoviy Kalkulyator
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Molyar massa, modda miqdori (n), eritmalar konsentratsiyasi (w) va gazlar hajmini tezkor hisoblash
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-thin">
        {[
          { id: 'molar', label: 'Molyar massa va Tarkib (%)', icon: Scale },
          { id: 'amount', label: 'Modda miqdori (n = m/M)', icon: Sparkles },
          { id: 'solution', label: 'Eritma konsentratsiyasi (w)', icon: Percent },
          { id: 'gas', label: 'Gaz hajmi (V = n × 22.4L)', icon: Wind },
          { id: 'density', label: 'Zichlik (ρ = m/V)', icon: Waves },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: MOLAR MASS & ELEMENTAL COMPOSITION */}
      {activeTab === 'molar' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="max-w-xl space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Kimyoviy Formulani Kiriting:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleComputeMolar()}
                placeholder="Masalan: Al2(SO4)3, Ca(OH)2, CuSO4*5H2O, C6H12O6"
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm sm:text-base font-mono text-white outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleComputeMolar}
                className="px-6 py-3 rounded-2xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-lg shadow-cyan-500/25 shrink-0"
              >
                Hisoblash
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-1">
              <span>Namuna formulalar:</span>
              {['H2O', 'H2SO4', 'Ca(OH)2', 'Al2(SO4)3', 'CuSO4*5H2O', 'CH3COOH'].map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFormulaInput(f);
                    const res = calculateMolarMass(f);
                    if ('error' in res) setMolarError(res.error);
                    else {
                      setMolarError(null);
                      setMolarResult(res);
                    }
                  }}
                  className="font-mono text-cyan-400 hover:underline"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {molarError && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-300">
              {molarError}
            </div>
          )}

          {molarResult && (
            <div className="space-y-6 pt-4 border-t border-slate-800">
              {/* Main Total Molar Mass Display */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">
                    Umumiy Molyar Massa (M):
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">
                    {molarResult.molarMass} <span className="text-lg font-normal text-slate-400">g/mol</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block mb-1">Kimyoviy formula:</span>
                  <span className="text-xl font-bold font-mono text-white">
                    {molarResult.formula}
                  </span>
                </div>
              </div>

              {/* Elements Mass Percentage Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-200">
                  Elementlarning Massa Ulushi va Tarkibi (%):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {molarResult.elements.map((el, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{el.nameUz} ({el.symbol})</span>
                        <span className="font-mono font-bold text-cyan-400 text-sm">
                          {el.massPercentage.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Atomlar soni: <strong className="text-slate-200">{el.count} ta</strong>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Massa hissasi: <strong className="text-slate-200">{el.totalMass.toFixed(3)} g/mol</strong>
                      </div>
                      {/* Mini visual percentage bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${el.massPercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-step formula breakdown */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-slate-300 block">Bosqichma-bosqich hisoblash:</span>
                <div className="space-y-1 font-mono text-slate-400">
                  {molarResult.steps.map((st, idx) => (
                    <div key={idx}>• {st}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AMOUNT OF SUBSTANCE n = m / M */}
      {activeTab === 'amount' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
            <strong>Formula:</strong> <span className="font-mono font-bold text-white">n = m / M</span> (bu yerda <strong>n</strong> — modda miqdori [mol], <strong>m</strong> — massa [g], <strong>M</strong> — molyar massa [g/mol]).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Modda massasi (m, gramm):</label>
              <input
                type="number"
                value={massInput}
                onChange={(e) => setMassInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Molyar massa (M, g/mol):</label>
              <input
                type="number"
                value={molarSubstanceInput}
                onChange={(e) => setMolarSubstanceInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            onClick={handleComputeMoles}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
          >
            Modda miqdorini hisoblash
          </button>

          {calculatedMoles !== null && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 block">Natija (n):</span>
              <div className="text-3xl font-black text-cyan-400 font-mono">
                {calculatedMoles} <span className="text-base font-normal text-slate-400">mol</span>
              </div>
              <p className="text-xs text-slate-500 font-mono pt-1">
                Zarrachalar soni N = n × N_A = {(calculatedMoles * 6.02).toFixed(2)} × 10²³ dona
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SOLUTION CONCENTRATION w */}
      {activeTab === 'solution' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl">
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
            <strong>Formula:</strong> <span className="font-mono font-bold text-white">w = (m(erigan) / m(eritma)) × 100%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Erigan modda massasi (g):</label>
              <input
                type="number"
                value={soluteMass}
                onChange={(e) => setSoluteMass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Umumiy eritma massasi (g):</label>
              <input
                type="number"
                value={solutionMass}
                onChange={(e) => setSolutionMass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            onClick={handleComputeSolution}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
          >
            Massa ulushini hisoblash
          </button>

          {massPercentResult !== null && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 block">Eritmaning massa ulushi (w):</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {massPercentResult}%
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: GAS VOLUME V = n * 22.4 L */}
      {activeTab === 'gas' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl">
          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-xs text-sky-200">
            <strong>Formula:</strong> <span className="font-mono font-bold text-white">V = n × V_m</span> (Normal sharoitda V_m = 22.4 L/mol).
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Gaz miqdori (n, mol):</label>
            <input
              type="number"
              value={gasMoles}
              onChange={(e) => setGasMoles(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={handleComputeGas}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
          >
            Gaz hajmini hisoblash
          </button>

          {gasVolumeResult !== null && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 block">Normal sharoitdagi hajm (V):</span>
              <div className="text-3xl font-black text-sky-400 font-mono">
                {gasVolumeResult} <span className="text-base font-normal text-slate-400">litr</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: DENSITY ρ = m / V */}
      {activeTab === 'density' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl">
          <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-200">
            <strong>Formula:</strong> <span className="font-mono font-bold text-white">ρ = m / V</span> (bu yerda ρ — zichlik [g/sm³], m — massa [g], V — hajm [sm³]).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Massa (m, gramm):</label>
              <input
                type="number"
                value={densityMass}
                onChange={(e) => setDensityMass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Hajm (V, sm³ yoki ml):</label>
              <input
                type="number"
                value={densityVolume}
                onChange={(e) => setDensityVolume(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm font-mono text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            onClick={handleComputeDensity}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
          >
            Zichlikni hisoblash
          </button>

          {densityResult !== null && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 block">Modda zichligi (ρ):</span>
              <div className="text-3xl font-black text-teal-400 font-mono">
                {densityResult} <span className="text-base font-normal text-slate-400">g/sm³</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
