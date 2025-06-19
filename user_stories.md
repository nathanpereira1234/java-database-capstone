User Stories
Admin User Stories
Title:
As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely.

Acceptance Criteria:

Admin can access login page
Login requires valid credentials
Successful login redirects to admin dashboard
Priority: High
Story Points: 3
Notes: Standard authentication flow

Title:
As an admin, I want to log out of the portal, so that system access is protected.

Acceptance Criteria:

Logout option is visible on dashboard
Clicking logout ends the session
Redirects to login page
Priority: High
Story Points: 2
Notes: Include session timeout handling

Title:
As an admin, I want to add doctors to the portal, so that they can start managing appointments.

Acceptance Criteria:

Admin can view an 'Add Doctor' form
Form includes fields for name, email, and specialization
Submitting form saves doctor in the system
Priority: High
Story Points: 3
Notes: Include form validation

Title:
As an admin, I want to delete a doctor's profile, so that I can remove inactive users.

Acceptance Criteria:

Admin can view doctor list
Each doctor entry has a delete button
System confirms deletion before proceeding
Priority: Medium
Story Points: 2
Notes: Add safety confirmation modal

Title:
As an admin, I want to run a stored procedure to get the number of appointments per month, so that I can track platform usage.

Acceptance Criteria:

Stored procedure exists in MySQL
Admin can trigger it from CLI
Result displays appointment count by month
Priority: Low
Story Points: 3
Notes: Output can be logged or displayed in CLI

Patient User Stories
Title:
As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering.

Acceptance Criteria:

Public page displays doctors list
Info includes name, specialization, and availability
No login required
Priority: High
Story Points: 2
Notes: Cache doctor data for faster load

Title:
As a patient, I want to sign up with email and password, so that I can book appointments.

Acceptance Criteria:

Signup page available
Fields include email, password, name
Successful signup stores patient info
Priority: High
Story Points: 3
Notes: Use hashed passwords

Title:
As a patient, I want to log into the portal, so that I can manage my bookings.

Acceptance Criteria:

Login page is accessible
Email/password validated
Redirect to patient dashboard
Priority: High
Story Points: 2
Notes: Basic authentication with token support

Title:
As a patient, I want to log out of the portal, so that my account is secure.

Acceptance Criteria:

Logout button is visible
Clears session or JWT
Redirects to homepage
Priority: High
Story Points: 1
Notes: Handle auto logout on inactivity

Title:
As a patient, I want to book an hour-long appointment, so that I can consult with a doctor.

Acceptance Criteria:

Patient selects doctor and time
Booking duration is 1 hour
Confirmation shown on success
Priority: High
Story Points: 3
Notes: Prevent double-booking

Title:
As a patient, I want to view my upcoming appointments, so that I can prepare accordingly.

Acceptance Criteria:

Dashboard shows upcoming appointments
Each entry includes date, time, and doctor
Sort by date
Priority: Medium
Story Points: 2
Notes: Use calendar UI component

Doctor User Stories
Title:
As a doctor, I want to log into the portal, so that I can manage my appointments.

Acceptance Criteria:

Login form accepts doctor credentials
Successful login shows doctor dashboard
Invalid credentials show error
Priority: High
Story Points: 2
Notes: Use role-based redirection

Title:
As a doctor, I want to log out of the portal, so that my data is protected.

Acceptance Criteria:

Logout button ends session
Redirects to login
Secure session clearing
Priority: High
Story Points: 1
Notes: Include inactivity timeout

Title:
As a doctor, I want to view my appointment calendar, so that I stay organized.

Acceptance Criteria:

Calendar UI available
Appointments shown by date/time
Filters available
Priority: High
Story Points: 4
Notes: Use third-party calendar library

Title:
As a doctor, I want to mark my unavailability, so that patients see only available slots.

Acceptance Criteria:

Form to block time slots
Unavailable slots hidden from patient view
Success message shown
Priority: Medium
Story Points: 3
Notes: Check for overlapping appointments

Title:
As a doctor, I want to update my profile with specialization and contact info, so that patients have up-to-date details.

Acceptance Criteria:

Profile page with editable fields
Save changes button
Data updated in backend
Priority: Medium
Story Points: 2
Notes: Validate email/phone format

Title:
As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared.

Acceptance Criteria:

Appointment list includes patient info
Click on appointment shows details
Include reason for visit
Priority: Medium
Story Points: 3
Notes: Respect patient privacy
