export const DEMO_STUDENT_CLASS = "8-A";
export const DEMO_STUDENT_ID = "S0801";
export const TEACHER_NOTICE_KEY = "erpDemoTeacherNotices";
export const TEACHER_ASSIGNMENT_KEY = "erpDemoTeacherAssignments";
export const TEACHER_RESULT_KEY = "erpDemoTeacherResults";

export const teacherClasses = [];

export const teacherRosters = {
  "8-A": [
    { id: "S0801", name: "Aarav Sharma", roll: 1, status: "Present" },
    { id: "S0802", name: "Anaya Mehta", roll: 2, status: "Present" },
    { id: "S0803", name: "Dev Patel", roll: 3, status: "Absent" },
    { id: "S0804", name: "Isha Verma", roll: 4, status: "Present" },
    { id: "S0805", name: "Kabir Singh", roll: 5, status: "Leave" },
    { id: "S0806", name: "Meera Joshi", roll: 6, status: "Present" },
  ],
  "7-B": [
    { id: "S0701", name: "Aditya Rao", roll: 1, status: "Present" },
    { id: "S0702", name: "Diya Shah", roll: 2, status: "Present" },
    { id: "S0703", name: "Rohan Das", roll: 3, status: "Absent" },
    { id: "S0704", name: "Sara Khan", roll: 4, status: "Present" },
  ],
  "8-C": [
    { id: "S0811", name: "Arjun Nair", roll: 1, status: "Present" },
    { id: "S0812", name: "Myra Kapoor", roll: 2, status: "Present" },
    { id: "S0813", name: "Reyansh Gupta", roll: 3, status: "Present" },
    { id: "S0814", name: "Tara Iyer", roll: 4, status: "Absent" },
  ],
};

export const teacherSchedule = [];

export const teacherPeriodTimes = [];

export const teacherTimetable = [];

export const teacherNotices = [];

export const initialAssignments = [];

export const assessmentStudents = [];

export function readDemoList(key, fallback = []) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function writeDemoList(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
