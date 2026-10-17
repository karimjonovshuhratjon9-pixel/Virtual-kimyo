import { User, LabReport, SchoolClass, Announcement, ActivityLog } from '../types/chemistry';

const STORAGE_KEYS = {
  CURRENT_USER: 'lab_current_user_v1',
  USERS_LIST: 'lab_users_list_v1',
  LAB_REPORTS: 'lab_reports_v1',
  CLASSES: 'lab_classes_v1',
  ANNOUNCEMENTS: 'lab_announcements_v1',
  ACTIVITY_LOGS: 'lab_activity_logs_v1',
  THEME: 'lab_theme_v1',
};

// Seed demo users
export const DEFAULT_USERS: User[] = [
  {
    id: "usr-student-1",
    name: "Shaxzod Aliyev",
    email: "shaxzod@maktab.uz",
    role: "student",
    grade: 8,
    schoolClass: "8-B",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    xp: 420,
    completedExperiments: ["exp-neutralization", "exp-oxygen-prep"],
    completedLessons: ["lesson-7-1", "lesson-7-2", "lesson-8-1"],
    quizScores: { "q-1": 100, "q-2": 100, "q-3": 100 },
    badges: ["b1", "b2"],
    joinedDate: "2026-09-02"
  },
  {
    id: "usr-teacher-1",
    name: "Dilnoza Rahimova",
    email: "dilnoza.kimyo@maktab.uz",
    role: "teacher",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    xp: 2500,
    completedExperiments: ["exp-neutralization", "exp-oxygen-prep", "exp-iron-copper-sulfate", "exp-barium-sulfate-precipitate"],
    completedLessons: ["lesson-7-1", "lesson-7-2", "lesson-8-1", "lesson-8-2", "lesson-9-1"],
    quizScores: {},
    badges: ["b1", "b2", "b3", "b4", "b5"],
    joinedDate: "2025-08-15"
  },
  {
    id: "usr-admin-1",
    name: "Platforma Administratori",
    email: "admin@laboratorya.uz",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    xp: 5000,
    completedExperiments: [],
    completedLessons: [],
    quizScores: {},
    badges: ["b5"],
    joinedDate: "2025-01-01"
  }
];

export const DEFAULT_CLASSES: SchoolClass[] = [
  {
    id: "cls-7a",
    name: "7-A sinf",
    grade: 7,
    teacherId: "usr-teacher-1",
    teacherName: "Dilnoza Rahimova",
    studentCount: 28,
    averageScore: 84,
    assignedExperiments: ["exp-oxygen-prep", "exp-magnesium-burning"],
    deadlineDate: "2026-10-25"
  },
  {
    id: "cls-8b",
    name: "8-B sinf",
    grade: 8,
    teacherId: "usr-teacher-1",
    teacherName: "Dilnoza Rahimova",
    studentCount: 26,
    averageScore: 88,
    assignedExperiments: ["exp-neutralization", "exp-iron-copper-sulfate", "exp-barium-sulfate-precipitate"],
    deadlineDate: "2026-10-30"
  },
  {
    id: "cls-9a",
    name: "9-A sinf",
    grade: 9,
    teacherId: "usr-teacher-1",
    teacherName: "Dilnoza Rahimova",
    studentCount: 30,
    averageScore: 79,
    assignedExperiments: ["exp-ammonia-fountain"],
    deadlineDate: "2026-11-05"
  }
];

export const DEFAULT_REPORTS: LabReport[] = [
  {
    id: "rep-101",
    userId: "usr-student-1",
    studentName: "Shaxzod Aliyev",
    studentGrade: "8-B",
    experimentId: "exp-neutralization",
    experimentTitle: "Kislota va ishqorning neytrallanish reaksiyasi",
    date: "2026-10-08",
    objective: "Neytrallanish reaksiyasida fenolftalein rangi o‘zgarishi va tuz hosil bo‘lishini tekshirish",
    apparatusUsed: ["Kimyoviy stakan", "Tomizg‘ich", "Shisha tayoqcha"],
    observations: "NaOH ga fenolftalein qo‘shilganda malina rangi hosil bo‘ldi. HCl tomizilganda esa eritma to‘liq rangsizlandi va stakan biroz qizidi.",
    reactionEquation: "NaOH + HCl → NaCl + H₂O",
    conclusion: "Kislota ishqorni to‘liq neytralladi, pH neytrallashdi va issiqlik ajraldi.",
    teacherGrade: 5,
    teacherFeedback: "Ajoyib bajarilgan! Xulosa va tenglama to‘g‘ri yozilgan.",
    status: "graded"
  }
];

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Kimyo fani bo‘yicha maktab olimpiadasining 1-bosqichi",
    content: "Hurmatli o‘quvchilar! 20-oktabr kuni 8–10-sinf o‘quvchilari o‘rtasida maktab kimyo olimpiadasi o‘tkaziladi. Barcha xohlovchilar test va virtual laboratoriya tajribalarini takrorlab tayyorlanishlari so‘raladi.",
    authorName: "Dilnoza Rahimova",
    authorRole: "Kimyo fani o‘qituvchisi",
    date: "2026-10-09",
    targetGrade: 8,
    isImportant: true
  },
  {
    id: "ann-2",
    title: "Yangi 3D molekulalar bo‘limi ishga tushirildi",
    content: "Endilikda platformada suv, ammiak, metan va etanol molekulalarini 3D fazoda aylantirib, atomlarning fazoviy tuzilishini o‘rganishingiz mumkin.",
    authorName: "Platforma Administratori",
    authorRole: "Administrator",
    date: "2026-10-07",
    isImportant: false
  }
];

export const storageService = {
  getCurrentUser(): User {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    const defaultUser = DEFAULT_USERS[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    return defaultUser;
  },

  setCurrentUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    // also update in users list
    const users = this.getUsersList();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
  },

  switchUserRole(role: 'student' | 'teacher' | 'admin'): User {
    const target = DEFAULT_USERS.find(u => u.role === role) || DEFAULT_USERS[0];
    this.setCurrentUser(target);
    return target;
  },

  getUsersList(): User[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_LIST);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  },

  updateUser(updated: User): void {
    const users = this.getUsersList();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx >= 0) {
      users[idx] = updated;
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(users));
    }
    const current = this.getCurrentUser();
    if (current.id === updated.id) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
    }
  },

  getLabReports(): LabReport[] {
    const raw = localStorage.getItem(STORAGE_KEYS.LAB_REPORTS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.LAB_REPORTS, JSON.stringify(DEFAULT_REPORTS));
    return DEFAULT_REPORTS;
  },

  saveLabReport(report: LabReport): void {
    const reports = this.getLabReports();
    const idx = reports.findIndex(r => r.id === report.id);
    if (idx >= 0) {
      reports[idx] = report;
    } else {
      reports.unshift(report);
    }
    localStorage.setItem(STORAGE_KEYS.LAB_REPORTS, JSON.stringify(reports));

    // Also award XP and record experiment in current user if student
    const user = this.getCurrentUser();
    if (!user.completedExperiments.includes(report.experimentId)) {
      user.completedExperiments.push(report.experimentId);
      user.xp += 60;
      if (!user.badges.includes("b1")) user.badges.push("b1");
      if (user.completedExperiments.length >= 5 && !user.badges.includes("b3")) user.badges.push("b3");
      this.updateUser(user);
    }

    this.logActivity(user.id, user.name, user.role, "Laboratoriya hisoboti saqlandi", report.experimentTitle);
  },

  deleteLabReport(id: string): void {
    const reports = this.getLabReports().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.LAB_REPORTS, JSON.stringify(reports));
  },

  getClasses(): SchoolClass[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CLASSES);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(DEFAULT_CLASSES));
    return DEFAULT_CLASSES;
  },

  saveClass(schoolClass: SchoolClass): void {
    const list = this.getClasses();
    const idx = list.findIndex(c => c.id === schoolClass.id);
    if (idx >= 0) {
      list[idx] = schoolClass;
    } else {
      list.push(schoolClass);
    }
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(list));
  },

  getAnnouncements(): Announcement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    return DEFAULT_ANNOUNCEMENTS;
  },

  saveAnnouncement(announcement: Announcement): void {
    const list = this.getAnnouncements();
    const idx = list.findIndex(a => a.id === announcement.id);
    if (idx >= 0) {
      list[idx] = announcement;
    } else {
      list.unshift(announcement);
    }
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(list));
  },

  getActivityLogs(): ActivityLog[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: "log-1",
        userId: "usr-student-1",
        userName: "Shaxzod Aliyev",
        userRole: "student",
        action: "Tajriba yakunlandi",
        details: "Kislota va ishqorning neytrallanish reaksiyasi",
        timestamp: "2026-10-09 14:32"
      },
      {
        id: "log-2",
        userId: "usr-teacher-1",
        userName: "Dilnoza Rahimova",
        userRole: "teacher",
        action: "Baholash",
        details: "Shaxzod Aliyev hisoboti 5 bahoga baholandi",
        timestamp: "2026-10-09 15:10"
      }
    ];
  },

  logActivity(userId: string, userName: string, userRole: any, action: string, details: string): void {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      userId,
      userName,
      userRole,
      action,
      details,
      timestamp: new Date().toLocaleString('uz-UZ')
    };
    logs.unshift(newLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
  },

  exportDatabaseJSON(): string {
    const dump = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      users: this.getUsersList(),
      reports: this.getLabReports(),
      classes: this.getClasses(),
      announcements: this.getAnnouncements(),
      logs: this.getActivityLogs()
    };
    return JSON.stringify(dump, null, 2);
  },

  importDatabaseJSON(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.users) localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(data.users));
      if (data.reports) localStorage.setItem(STORAGE_KEYS.LAB_REPORTS, JSON.stringify(data.reports));
      if (data.classes) localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(data.classes));
      if (data.announcements) localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(data.announcements));
      return true;
    } catch {
      return false;
    }
  }
};
