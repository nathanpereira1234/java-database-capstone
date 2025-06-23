/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form


  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')


  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors


  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards

    Call getDoctors() from the service layer
    Clear the current content area
    For each doctor returned:
    - Create a doctor card using createDoctorCard()
    - Append it to the content div

    Handle any fetch errors by logging them


  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()


  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty

    Read values from the search bar and filters
    Normalize empty values to null
    Call filterDoctors(name, time, specialty) from the service

    If doctors are found:
    - Render them using createDoctorCard()
    If no doctors match the filter:
    - Show a message: "No doctors found with the given filters."

    Catch and display any errors with an alert


  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it

    Clear the content area
    Loop through the doctors and append each card to the content area


  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system

    Collect input values from the modal form
    - Includes name, email, phone, password, specialty, and available times

    Retrieve the authentication token from localStorage
    - If no token is found, show an alert and stop execution

    Build a doctor object with the form values

    Call saveDoctor(doctor, token) from the service

    If save is successful:
    - Show a success message
    - Close the modal and reload the page

    If saving fails, show an error message
*/
import { openModal } from "../components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "../services/doctorServices.js";
import { createDoctorCard } from "../components/doctorCard.js";

// Load doctors when the page loads
window.onload = () => {
  loadDoctorCards();

  const addBtn = document.getElementById("addDocBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);

  const addDoctorForm = document.getElementById("addDoctorForm");
  if (addDoctorForm) {
    addDoctorForm.addEventListener("submit", adminAddDoctor);
  }
};

// Load and display all doctors
async function loadDoctorCards() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (err) {
    console.error("Failed to load doctors:", err);
    contentDiv.innerHTML = "<p class='noPatientRecord'>Unable to load doctors.</p>";
  }
}

// Render a list of doctor cards
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p class='noPatientRecord'>No doctors found.</p>";
    return;
  }

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// Filter/search logic
async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim();
  const time = document.getElementById("filterTime").value;
  const specialty = document.getElementById("filterSpecialty").value;

  try {
    const filtered = await filterDoctors(name, time, specialty);
    renderDoctorCards(filtered);
  } catch (err) {
    console.error("Filter failed:", err);
    document.getElementById("content").innerHTML = "<p class='noPatientRecord'>Something went wrong while filtering doctors.</p>";
  }
}

// Admin adds a doctor
async function adminAddDoctor(e) {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in as admin.");
    return;
  }

  const name = document.getElementById("docName").value.trim();
  const email = document.getElementById("docEmail").value.trim();
  const password = document.getElementById("docPassword").value;
  const mobile = document.getElementById("docMobile").value.trim();
  const specialty = document.getElementById("docSpecialty").value;
  const availability = Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value);

  const doctor = { name, email, password, mobile, specialty, availability };

  try {
    const response = await saveDoctor(doctor, token);
    if (response.success) {
      alert("Doctor added successfully!");
      document.getElementById("modal").classList.remove("active");
      await loadDoctorCards();
    } else {
      alert("Failed to add doctor: " + response.message);
    }
  } catch (err) {
    console.error("Add Doctor Error:", err);
    alert("Something went wrong while adding doctor.");
  }
}
