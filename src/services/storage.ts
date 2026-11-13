import { ContraceptionRecord, CycleRecord, DailyLog, HealthAppointment, MedicationItem, ReminderItem, UserProfile } from '../types';

const PREFIX = 'mood_app_';
const KEYS = { profile: `${PREFIX}profile_v2`, cycles: `${PREFIX}cycles_v2`, logs: `${PREFIX}daily_logs_v2`, reminders: `${PREFIX}reminders_v2`, appointments: `${PREFIX}appointments_v2`, medications: `${PREFIX}medications_v2`, contraception: `${PREFIX}contraception_v2`, locked: `${PREFIX}session_locked_v2` };

const emptyProfile: UserProfile = { name: '', cycleLength: 28, periodLength: 5, activeMode: 'cycle', discreteMode: false, isPinEnabled: false, pinCode: '', theme: 'light', textSize: 'normal', lang: 'fr', onboarded: false };
const emptyContraception: ContraceptionRecord = { type: 'none', brandName: '', startDate: '', notes: '' };

function read<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }
function write<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

/** Local-only storage. New installations intentionally start blank: no invented health history or medication. */
export const StorageService = {
  getProfile: () => ({ ...emptyProfile, ...read<UserProfile>(KEYS.profile, emptyProfile) }),
  saveProfile: (profile: UserProfile) => write(KEYS.profile, profile),
  getCycles: () => read<CycleRecord[]>(KEYS.cycles, []),
  saveCycles: (cycles: CycleRecord[]) => write(KEYS.cycles, cycles),
  addOrUpdateCycle(cycle: CycleRecord) { const cycles = this.getCycles(); const index = cycles.findIndex(item => item.id === cycle.id); if (index === -1) cycles.unshift(cycle); else cycles[index] = cycle; this.saveCycles(cycles); return cycles; },
  deleteCycle(id: string) { const cycles = this.getCycles().filter(cycle => cycle.id !== id); this.saveCycles(cycles); return cycles; },
  getDailyLogs: () => read<Record<string, DailyLog>>(KEYS.logs, {}),
  getLogForDate(date: string): DailyLog { return this.getDailyLogs()[date] || { date, flow: 'none', symptoms: [], painLocations: [], waterGlasses: 0, sleepHours: 0 }; },
  saveDailyLog(log: DailyLog) { const logs = this.getDailyLogs(); logs[log.date] = log; this.saveDailyLogs(logs); },
  saveDailyLogs: (logs: Record<string, DailyLog>) => write(KEYS.logs, logs),
  getReminders: () => read<ReminderItem[]>(KEYS.reminders, []),
  saveReminders: (items: ReminderItem[]) => write(KEYS.reminders, items),
  getAppointments: () => read<HealthAppointment[]>(KEYS.appointments, []),
  saveAppointments: (items: HealthAppointment[]) => write(KEYS.appointments, items),
  getMedications: () => read<MedicationItem[]>(KEYS.medications, []),
  saveMedications: (items: MedicationItem[]) => write(KEYS.medications, items),
  getContraception: () => read<ContraceptionRecord>(KEYS.contraception, emptyContraception),
  saveContraception: (item: ContraceptionRecord) => write(KEYS.contraception, item),
  isSessionLocked() { const profile = this.getProfile(); return Boolean(profile.isPinEnabled && profile.pinCode && sessionStorage.getItem(KEYS.locked) === 'true'); },
  lockSession: () => sessionStorage.setItem(KEYS.locked, 'true'),
  unlockSession: () => sessionStorage.removeItem(KEYS.locked),
  exportAllDataJSON() { return JSON.stringify({ version: '2.0', exportedAt: new Date().toISOString(), profile: this.getProfile(), cycles: this.getCycles(), dailyLogs: this.getDailyLogs(), reminders: this.getReminders(), appointments: this.getAppointments(), medications: this.getMedications(), contraception: this.getContraception() }, null, 2); },
  importDataJSON(json: string) { try { const data = JSON.parse(json); if (data.profile) this.saveProfile({ ...emptyProfile, ...data.profile }); if (Array.isArray(data.cycles)) this.saveCycles(data.cycles); if (data.dailyLogs) this.saveDailyLogs(data.dailyLogs); if (Array.isArray(data.reminders)) this.saveReminders(data.reminders); if (Array.isArray(data.appointments)) this.saveAppointments(data.appointments); if (Array.isArray(data.medications)) this.saveMedications(data.medications); if (data.contraception) this.saveContraception(data.contraception); return true; } catch { return false; } },
  wipeAllData() { Object.values(KEYS).filter(key => key !== KEYS.locked).forEach(key => localStorage.removeItem(key)); sessionStorage.removeItem(KEYS.locked); }
};
