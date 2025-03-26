# Business Contracts Management Application

This repository contains the source code for a web application that allows admin users to manage business contracts for clients. The application enables the admin to add new clients and create contracts for each client. It also provides a consolidated view where all contracts can be filtered and reviewed.


## Overview

The application is designed to manage business contracts associated with individual clients. It provides a simple user interface for:

- Adding and managing clients.
- Creating and storing contracts with the following key information:
  - **Contract Name (Reference)**
  - **Associated Client/Customer**
  - **Contract Start Date**
  - **Contract Duration**
  - **Comments/Additional Information** (e.g., contract details, contract value)

---
## Architecture Overview

### Frontend

- **Framework:** React JS
- **Role:**
  - Provides the user interface for admin users.
  - Implements pages for client management, contract creation, and contract listing.
  - Consumes RESTful API endpoints exposed by the backend.

### Backend

- **Framework:** PHP (Laravel)
- **Role:**
  - Serves as the API layer that handles business logic and data management.
  - Implements authentication and authorization if needed.
  - Provides endpoints for client and contract operations.
- **Key Considerations:**
  - Follow RESTful best practices.
  - Use Laravel's built-in features (Eloquent ORM, migrations, validation, etc.) for rapid development.
  - Secure endpoints to ensure that only authorized admin users can perform operations.

### Database

- **Database Management System:** MySQL/PostgreSQL (or any SQL-based system)
- **Role:**
  - Stores client and contract data.
  - Ensures data consistency and supports relational data operations.
- **Key Tables:**
  - **Clients:** Contains fields like `id`, `name`, `contact_info`, etc.
  - **Contracts:** Contains fields such as `id`, `name`, `client_id` (foreign key), `start_date`, `duration`, `comments`, etc.
---
## Installation and Setup

### Backend Setup (Laravel)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/business-contracts.git
   cd business-contracts/backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run Migrations:**
   ```bash
   php artisan migrate
   ```

5. **Start the Laravel development server:**
   ```bash
   php artisan serve
   ```

### Frontend Setup (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```


## Future Improvements and purpose of the task
I am aware that this task has certain shortcomings – from the coding itself to the underlying logic – but my intention was to showcase some of the basic principles of development.

**Backend:**  
The project structure example demonstrates clearly versioned components, with each function performing a single command, making the code scalable and easy to maintain. It also showcases fundamental development practices such as authentication, authorization, the use of relationships, dynamic attribute assignment, soft deletes, various Laravel features, request validation, services, repositories, and more.

**Potential Improvements for Future Development:**

- **Optimization:** Create indexes in the database.

- **Contract Statuses:** Introduce statuses for contracts, for example, two types – *calculated* and *base* – and, depending on further development, implement mutators or triggers in the database to update tasks.

- **File Handling:** Develop a series of background commands for uploading, file conversion, and similar operations.

- **Document Export:** Utilize libraries such as phpPdf and phpWord to enable users to export contracts in a packaged format.

- **Email Notifications:** Implement background services (using Laravel workers and jobs) to notify users when a contract is nearing expiration.

- **Caching:** Introduce caching through Laravel’s built-in system or use alternatives like Redis or Memcached.

- **Real-Time Solutions:** Implement synchronization and real-time services (e.g., using Pusher) to enhance the user experience when multiple administrators work on the same contracts simultaneously.

**Frontend:**  
The aim is to demonstrate routing and validation practices on both the frontend and backend. The login component illustrates the use of external libraries, and basic implementations of asynchronous functions, custom hooks, lazy loading, and memoization are shown – though these aspects require further optimization.

Additional frontend improvements include:

- Enhancing structure and code reusability by creating universal components (e.g., a form widget) that can be used in multiple places.

- Introducing Redux for better state management and data sharing between components.

  Using TypeScrpt for rela data type manpulation except propTypes

**In Conclusion:**  
I do not consider this task to be executed perfectly, but it certainly demonstrates the fundamental principles of application development upon which more complex frontend applications can be built.







