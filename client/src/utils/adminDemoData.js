const STORAGE_PREFIX = "erpDemoAdmin:";

export const adminSeedData = {
  students: [
    { student_id: 8001, student_name: "Aarav Sharma", student_dob: "2012-08-12", student_gender: "Male", student_address: "Rohini, Delhi", student_contact: "9876501201", student_admission_date: "2022-04-01", class_id: 8 },
    { student_id: 8002, student_name: "Anaya Mehta", student_dob: "2012-11-03", student_gender: "Female", student_address: "Pitampura, Delhi", student_contact: "9876501202", student_admission_date: "2022-04-01", class_id: 8 },
    { student_id: 8003, student_name: "Dev Patel", student_dob: "2011-06-18", student_gender: "Male", student_address: "Janakpuri, Delhi", student_contact: "9876501203", student_admission_date: "2021-04-05", class_id: 9 },
    { student_id: 8004, student_name: "Isha Verma", student_dob: "2013-02-25", student_gender: "Female", student_address: "Dwarka, Delhi", student_contact: "9876501204", student_admission_date: "2023-04-03", class_id: 7 },
    { student_id: 8005, student_name: "Kabir Singh", student_dob: "2012-01-15", student_gender: "Male", student_address: "Model Town, Delhi", student_contact: "9876501205", student_admission_date: "2022-04-01", class_id: 8 },
  ],
  teachers: [
    { teacher_id: "T001", teacher_name: "Aditi Verma", teacher_contact: "9876502201", teacher_subject_specialisation: "Mathematics", teacher_joining_date: "2021-04-01", monthly_salary: 54200, class_teacher_of: "8-A" },
    { teacher_id: "T002", teacher_name: "Rohit Malhotra", teacher_contact: "9876502202", teacher_subject_specialisation: "Science", teacher_joining_date: "2020-07-15", monthly_salary: 56800, class_teacher_of: "7-B" },
    { teacher_id: "T003", teacher_name: "Neha Kapoor", teacher_contact: "9876502203", teacher_subject_specialisation: "English", teacher_joining_date: "2022-06-10", monthly_salary: 52100, class_teacher_of: "9-A" },
  ],
  classes: [
    { class_id: 7, class_name: "7", class_section: "B", numberOfstudents: 28, class_teacher_name: "Rohit Malhotra", room: "Room 108" },
    { class_id: 8, class_name: "8", class_section: "A", numberOfstudents: 32, class_teacher_name: "Aditi Verma", room: "Room 204" },
    { class_id: 9, class_name: "8", class_section: "C", numberOfstudents: 30, class_teacher_name: "Kavita Rao", room: "Room 206" },
    { class_id: 10, class_name: "9", class_section: "A", numberOfstudents: 27, class_teacher_name: "Neha Kapoor", room: "Room 302" },
  ],
  subjects: [
    { subject_id: 1, subject_name: "Mathematics", class_id: 8, teacher_name: "Aditi Verma" },
    { subject_id: 2, subject_name: "Science", class_id: 8, teacher_name: "Rohit Malhotra" },
    { subject_id: 3, subject_name: "English", class_id: 8, teacher_name: "Neha Kapoor" },
    { subject_id: 4, subject_name: "Social Studies", class_id: 7, teacher_name: "Kavita Rao" },
  ],
  attendences: [
    { attendence_id: 1, class_id: 8, student_id: 8001, teacher_id: "T001", date: "2026-10-09", attendence_status: "present" },
    { attendence_id: 2, class_id: 8, student_id: 8002, teacher_id: "T001", date: "2026-10-09", attendence_status: "present" },
    { attendence_id: 3, class_id: 8, student_id: 8005, teacher_id: "T001", date: "2026-10-09", attendence_status: "absent" },
    { attendence_id: 4, class_id: 7, student_id: 8004, teacher_id: "T002", date: "2026-10-09", attendence_status: "leave" },
  ],
  fees: [
    { fees_id: 5001, class_id: 8, student_id: 8001, total_fees: 171600, date_of_payment: "2026-09-30", balance_due: 12000 },
    { fees_id: 5002, class_id: 8, student_id: 8002, total_fees: 171600, date_of_payment: "2026-10-02", balance_due: 0 },
    { fees_id: 5003, class_id: 9, student_id: 8003, total_fees: 168000, date_of_payment: "2026-09-28", balance_due: 14300 },
    { fees_id: 5004, class_id: 7, student_id: 8004, total_fees: 165000, date_of_payment: "2026-10-01", balance_due: 5500 },
  ],
  exams: [
    { exam_id: 9001, exam_type: "PT 1", class_id: 8, student_id: 8001, subject_id: 1, marks: 82, max_marks: 100, exam_date: "2026-07-14" },
    { exam_id: 9002, exam_type: "PT 1", class_id: 8, student_id: 8002, subject_id: 1, marks: 91, max_marks: 100, exam_date: "2026-07-14" },
    { exam_id: 9003, exam_type: "Mid Term", class_id: 8, student_id: 8001, subject_id: 2, marks: 88, max_marks: 100, exam_date: "2026-10-20" },
    { exam_id: 9004, exam_type: "Mid Term", class_id: 7, student_id: 8004, subject_id: 1, marks: 76, max_marks: 100, exam_date: "2026-10-21" },
  ],
};

export function readAdminCollection(collection) {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${collection}`);
    if (stored) return JSON.parse(stored);
    const seed = adminSeedData[collection] || [];
    localStorage.setItem(`${STORAGE_PREFIX}${collection}`, JSON.stringify(seed));
    return seed;
  } catch {
    return [...(adminSeedData[collection] || [])];
  }
}

export function writeAdminCollection(collection, records) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${collection}`, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}

export function getAdminCollectionStorageKey(collection) {
  return `${STORAGE_PREFIX}${collection}`;
}
