# API Endpoints

## Auth

- **POST** `/auth/login`  
  **Body:** `{ username, password }`  
  **Returns:** JWT (via `auth.service` behavior)

---

## Appointments

- **GET** `/appointments` — List all appointments
- **POST** `/appointments` — Create an appointment  
  _(Check `create-appointment.dto.ts` for required fields)_
- **GET** `/appointments/:id` — Get appointment details
- **PUT** `/appointments/:id` — Update appointment
- **DELETE** `/appointments/:id` — Delete appointment

---

## Doctors

- **GET** `/doctors` — List all doctors
- **POST** `/doctors` — Create a doctor
- **GET** `/doctors/:id` — Get doctor details
- **PUT** `/doctors/:id` — Update doctor
- **DELETE** `/doctors/:id` — Delete doctor

---

## Patients

- **GET** `/patients` — List all patients
- **POST** `/patients` — Create a patient
- **GET** `/patients/:id` — Get patient details
- **PUT** `/patients/:id` — Update patient
- **DELETE** `/patients/:id` — Delete patient

---

## Queue

- **GET** `/queue` — List all queue items
- **POST** `/queue` — Add walk-in / enqueue
- **GET** `/queue/:id` — Get queue item
- **PUT** `/queue/:id` — Update queue item (status, etc.)
- **DELETE** `/queue/:id` — Remove queue item
