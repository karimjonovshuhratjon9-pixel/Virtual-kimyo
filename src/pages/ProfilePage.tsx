import React, { useState } from 'react';
import { storageService, DEFAULT_USERS } from '../services/storageService';
import { User, UserRole } from '../types/chemistry';
import { User as UserIcon, Shield, GraduationCap, LayoutDashboard, Check, Save, Zap } from 'lucide-react';

interface Props {
  currentUser: User;
  onUserUpdated: (u: User) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const ProfilePage: React.FC<Props> = ({ currentUser, onUserUpdated, onSwitchRole }) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [schoolClass, setSchoolClass] = useState(currentUser.schoolClass || '8-B');
  const [grade, setGrade] = useState<number>(currentUser.grade || 8);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...currentUser,
      name,
      email,
      schoolClass,
      grade,
    };
    storageService.updateUser(updated);
    onUserUpdated(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Foydalanuvchi Profili
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Shaxsiy ma’lumotlarni tahrirlash va rollar (O‘quvchi, O‘qituvchi, Admin) bo‘yicha tizimga kirish
        </p>
      </div>

      {/* Role Switcher Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Rolni tanlash (Tezkor o‘tish):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              role: 'student' as UserRole,
              title: 'O‘quvchi (Shaxzod)',
              desc: 'Tajriba bajarish, dars o‘qish va test topshirish',
              icon: GraduationCap,
              color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20'
            },
            {
              role: 'teacher' as UserRole,
              title: 'O‘qituvchi (Dilnoza)',
              desc: 'Sinflarni boshqarish, baholash va e’lonlar',
              icon: LayoutDashboard,
              color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20'
            },
            {
              role: 'admin' as UserRole,
              title: 'Administrator',
              desc: 'Foydalanuvchilar nazorati, tizim auditi va zaxira',
              icon: Shield,
              color: 'text-rose-400 border-rose-500/40 bg-rose-950/20'
            },
          ].map((item) => (
            <div
              key={item.role}
              onClick={() => onSwitchRole(item.role)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                currentUser.role === item.role
                  ? `${item.color} ring-1 ring-cyan-400 shadow-xl`
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <item.icon className="w-5 h-5 text-white" />
                  {currentUser.role === item.role && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-950">
                      Faol Rol
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
              <p className="text-xs text-slate-400">{currentUser.email} • {currentUser.role.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            <Zap className="w-4 h-4 text-amber-400" />
            {currentUser.xp} XP
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1.5 font-semibold">Ism va Familiya:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1.5 font-semibold">Elektron pochta:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1.5 font-semibold">Sinf nomi (Masalan: 8-B):</label>
              <input
                type="text"
                value={schoolClass}
                onChange={(e) => setSchoolClass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1.5 font-semibold">Sinf bosqichi:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
              >
                {[7, 8, 9, 10, 11].map((g) => (
                  <option key={g} value={g}>{g}-sinf</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Ma’lumotlar muvaffaqiyatli saqlandi!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              <Save className="w-4 h-4" />
              O‘zgarishlarni saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
