// patientDashboard.js
// Import required modules
import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

// Load doctor cards on page load
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  // Signup modal trigger
  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }

  // Login modal trigger
  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }

  // Search and filter bindings
  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
});

// Load all doctors
async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error loading doctors:", error);
    contentDiv.innerHTML = `<p>Failed to load doctors. Please try again later.</p>`;
  }
}

// Utility to render list of doctor cards
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (doctors.length === 0) {
    contentDiv.innerHTML = `<p>No doctors found with the given filters.</p>`;
    return;
  }

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// Search/Filter function
async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || "";
  const time = document.getElementById("filterTime").value;
  const specialty = document.getElementById("filterSpecialty").value;

  try {
    const doctors = await filterDoctors(name, time, specialty);
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Filter error:", error);
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<p>Error applying filters. Please try again later.</p>`;
  }
}

// Patient signup handler
window.signupPatient = async function () {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const address = document.getElementById("signupAddress").value.trim();

  const data = { name, email, password, phone, address };

  try {
    const response = await patientSignup(data);
    if (response.success) {
      alert(response.message);
      document.getElementById("modal").classList.remove("active");
      location.reload();
    } else {
      alert(response.message || "Signup failed.");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("An error occurred during signup.");
  }
};

// Patient login handler
window.loginPatient = async function () {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const response = await patientLogin({ email, password });
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", "loggedPatient");
      window.location.href = "loggedPatientDashboard.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("An error occurred during login.");
  }
};
