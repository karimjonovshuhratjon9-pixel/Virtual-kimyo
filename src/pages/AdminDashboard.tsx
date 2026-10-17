import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { User, ActivityLog, UserRole } from '../types/chemistry';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import { LESSONS_DATA } from '../data/lessonsData';
import { getAllElements } from '../data/elementsData';
import { QUIZ_ITEMS } from '../data/quizData';
import { 
  Shield, Users, Activity, Database, Download, Upload, 
  CheckCircle2, AlertTriangle, Key, Server, RefreshCw 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => storageService.getUsersList());
  const [logs, setLogs] = useState<ActivityLog[]>(() => storageService.getActivityLogs());
  const [activeTab, setActiveTab] = useState<'users' | 'logs' | 'backup'>('users');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const elements = getAllElements();
  const reports = storageService.getLabReports();

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;
    const updated = { ...targetUser, role: newRole };
    storageService.updateUser(updated);
    setUsers(storageService.getUsersList());
  };

  const handleExportBackup = () => {
    const jsonStr = storageService.exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laboratorya_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageService.importDatabaseJSON(content);
      if (success) {
        setUsers(storageService.getUsersList());
        setLogs(storageService.getActivityLogs());
        setImportStatus('Ma’lumotlar bazasi zaxira nusxadan muvaffaqiyatli tiklandi!');
      } else {
        setImportStatus('Xatolik: Zaxira fayli formati yaroqsiz.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-rose-500/10 text-rose-400">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tizim Administratori Paneli
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Foydalanuvchilar, xavfsizlik auditi, faollik jurnali va to‘liq ma’lumotlar bazasi zaxirasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Tizim Faol & Himoyalangan
          </span>
        </div>
      </div>

      {/* Platform Content Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400">Foydalanuvchilar</span>
          <div className="text-2xl font-black text-white font-mono">{users.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400">Elementlar</span>
          <div className="text-2xl font-black text-cyan-400 font-mono">{elements.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400">Virtual Tajribalar</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">{EXPERIMENTS_DATA.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400">Darslik Mavzulari</span>
          <div className="text-2xl font-black text-purple-400 font-mono">{LESSONS_DATA.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400">Hisobotlar</span>
          <div className="text-2xl font-black text-amber-400 font-mono">{reports.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          Foydalanuvchilar ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'logs'
              ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          Faollik Jurnali (Audit)
        </button>
        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'backup'
              ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          Zaxira Nusxa va Tiklash
        </button>
      </div>

      {/* TAB 1: USERS LIST */}
      {activeTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-4">Foydalanuvchi</th>
                <th className="p-4">Elektron pochta</th>
                <th className="p-4">Sinf</th>
                <th className="p-4">Tajriba balli (XP)</th>
                <th className="p-4">Joriy Rol</th>
                <th className="p-4 text-right">Rolni o‘zgartirish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-950/40">
                  <td className="p-4 font-bold text-white flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 text-xs">
                      {u.name.charAt(0)}
                    </span>
                    {u.name}
                  </td>
                  <td className="p-4 font-mono text-slate-400">{u.email}</td>
                  <td className="p-4 font-mono text-slate-300">{u.schoolClass || '—'}</td>
                  <td className="p-4 font-mono text-amber-400 font-bold">{u.xp} XP</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      u.role === 'admin' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                      u.role === 'teacher' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                      'bg-cyan-500/15 text-cyan-400 border-cyan-500/30'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none focus:border-rose-500"
                    >
                      <option value="student">O‘quvchi</option>
                      <option value="teacher">O‘qituvchi</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: AUDIT & ACTIVITY LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white">Xavfsizlik va Faollik Jurnali</h3>
          <div className="space-y-2.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-white">{log.userName}</span>
                  <span className="text-slate-500 mx-2">({log.userRole})</span>
                  <span className="text-cyan-400 font-medium">{log.action}: </span>
                  <span className="text-slate-300">{log.details}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BACKUP AND RESTORE */}
      {activeTab === 'backup' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl">
          <div>
            <h3 className="text-lg font-bold text-white">Ma’lumotlar Bazasini Zaxiralash</h3>
            <p className="text-xs text-slate-400 mt-1">
              Barcha foydalanuvchilar, topshiriqlar, sinflar va laboratoriya hisobotlarini JSON formatida to‘liq yuklab oling yoki qayta tiklang.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Zaxira Nusxa Olish</h4>
              <p className="text-xs text-slate-400">Butun ma’lumotlar bazasini JSON fayl sifatida eksport qiling.</p>
            </div>
            <button
              onClick={handleExportBackup}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0"
            >
              <Download className="w-4 h-4" />
              JSON Eksport
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">Zaxira Faylidan Tiklash</h4>
            <p className="text-xs text-slate-400">Avval olingan .json zaxira faylini tanlang va tiklang.</p>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-cyan-400 hover:file:bg-slate-700"
            />
          </div>

          {importStatus && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
              {importStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
