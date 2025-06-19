Schema Architecture
Section 1: Architecture Summary
This Spring Boot application follows a hybrid architecture using both MVC and REST controllers. It is designed to manage a Smart Clinic, providing role-based access for Admin and Doctor users.

Thymeleaf templates are used to render views for the Admin and Doctor dashboards. These views are served through MVC controllers. Other parts of the application—such as appointment management, patient registration, and prescriptions—are handled via REST APIs, allowing for seamless interaction between the frontend and backend.

The application integrates with two databases:

MySQL is used for storing structured relational data like patients, doctors, appointments, admins, and roles. It uses Spring Data JPA repositories and entity models.
MongoDB is used to manage unstructured data, specifically prescription records, using Spring Data MongoDB and document-based models.
Controllers (both REST and MVC) pass requests to a common service layer that contains the core business logic. This service layer interacts with the appropriate repository layer to perform CRUD operations. Security is enforced using JWT-based authentication for API endpoints, ensuring secure access control across the application.

Section 2: Numbered Flow of Data and Control
The user logs in via a web page and selects a role (Admin or Doctor).
After successful JWT-based authentication, the user is redirected to the appropriate Thymeleaf dashboard.
User actions (e.g., "Add Doctor", "View Appointments", "Create Prescription") trigger requests routed to either an MVC controller or REST controller.
The controller passes the request to the corresponding method in the service layer.
The service layer determines which database to query—MySQL for relational entities, MongoDB for prescription documents.
The service layer uses JPA or MongoRepository interfaces to interact with the databases.
Results from the database are returned through the service layer to the controller, which then updates the Thymeleaf view or returns JSON to the frontend.
