// patientServices
import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = `${API_BASE_URL}/patient`;

// Patient Signup
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      return { success: true, message: result.message || "Signup successful" };
    } else {
      return { success: false, message: result.message || "Signup failed" };
    }
  } catch (error) {
    console.error("Signup Error:", error);
    return { success: false, message: "An error occurred during signup." };
  }
}

// Patient Login
export async function patientLogin(data) {
  try {
    const response = await fetch(`${PATIENT_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response; // Let caller handle token extraction and status
  } catch (error) {
    console.error("Login Error:", error);
    return null;
  }
}

// Get Logged-in Patient Data
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.patient;
    } else {
      console.warn("Failed to fetch patient data.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
}

// Get Appointments for Patient or Doctor View
export async function getPatientAppointments(id, token, user) {
  try {
    const url = `${API_BASE_URL}/${user}/appointments/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.appointments || [];
    } else {
      console.warn("Failed to fetch appointments");
      return null;
    }
  } catch (error) {
    console.error("Appointment fetch error:", error);
    return null;
  }
}

// Filter Appointments
export async function filterAppointments(condition, name, token) {
  try {
    const params = new URLSearchParams();
    if (condition) params.append("condition", condition);
    if (name) params.append("name", name);

    const url = `${API_BASE_URL}/appointments/filter?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.appointments || [];
    } else {
      console.warn("Failed to filter appointments");
      return [];
    }
  } catch (error) {
    console.error("Error filtering appointments:", error);
    alert("Something went wrong while filtering appointments.");
    return [];
  }
}
