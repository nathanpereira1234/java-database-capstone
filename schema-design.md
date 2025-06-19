Schema Design for Smart Clinic Management System
MySQL Database Design
Table: patients
id: INT, Primary Key, AUTO_INCREMENT
first_name: VARCHAR(100), NOT NULL
last_name: VARCHAR(100), NOT NULL
email: VARCHAR(150), UNIQUE, NOT NULL
phone: VARCHAR(15), NOT NULL
gender: ENUM('Male', 'Female', 'Other'), NOT NULL
date_of_birth: DATE, NOT NULL
address: TEXT
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
Each patient has a unique email and contact number. A patient’s record is retained even after appointments are completed for historical data.

Table: doctors
id: INT, Primary Key, AUTO_INCREMENT
first_name: VARCHAR(100), NOT NULL
last_name: VARCHAR(100), NOT NULL
email: VARCHAR(150), UNIQUE, NOT NULL
phone: VARCHAR(15), NOT NULL
specialization: VARCHAR(100), NOT NULL
available_from: TIME, NOT NULL
available_to: TIME, NOT NULL
created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
Each doctor’s availability is stored as time slots. A doctor cannot have overlapping appointments enforced at the application level.

Table: appointments
id: INT, Primary Key, AUTO_INCREMENT
patient_id: INT, Foreign Key → patients(id), NOT NULL
doctor_id: INT, Foreign Key → doctors(id), NOT NULL
appointment_time: DATETIME, NOT NULL
status: ENUM('Scheduled', 'Completed', 'Cancelled'), DEFAULT 'Scheduled'
reason: TEXT
Appointments reference both patient and doctor. If a patient is deleted, their appointments should also be removed (ON DELETE CASCADE).

Table: admins
id: INT, Primary Key, AUTO_INCREMENT
username: VARCHAR(100), UNIQUE, NOT NULL
password: VARCHAR(255), NOT NULL
email: VARCHAR(150), UNIQUE, NOT NULL
role: ENUM('SuperAdmin', 'Manager'), DEFAULT 'Manager'
Admins manage system-level activities, such as doctor onboarding and appointment monitoring.

Table: payments (Optional)
id: INT, Primary Key, AUTO_INCREMENT
appointment_id: INT, Foreign Key → appointments(id), NOT NULL
amount: DECIMAL(10,2), NOT NULL
payment_date: DATETIME DEFAULT CURRENT_TIMESTAMP
method: ENUM('Cash', 'Credit Card', 'Insurance'), NOT NULL
status: ENUM('Paid', 'Pending', 'Failed'), DEFAULT 'Pending'
Payment is linked directly to an appointment and can be extended in the future to handle insurance claims or refunds.

MongoDB Collection Design
Collection: prescriptions
{
  "_id": "ObjectId('666abc1234567890abcdef01')",
  "appointmentId": 105,
  "patientId": 32,
  "doctorId": 8,
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "250mg",
      "instructions": "Take twice a day after meals"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "instructions": "Take as needed for pain"
    }
  ],
  "doctorNotes": "Patient reported mild symptoms. Revisit if condition persists.",
  "created_at": "2025-06-18T10:45:00Z",
  "pharmacyInfo": {
    "name": "HealthPlus Pharmacy",
    "location": "Bangalore"
  },
  "refillAllowed": true,
  "tags": ["fever", "pain relief"]
}
