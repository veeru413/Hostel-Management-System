# Hostel Management System

A modern, full-stack Hostel Management System built with Node.js, Express, Sequelize, and EJS.  
This project provides a professional web portal for students and administrators to manage hostel registrations, payments, and room allocations.

---

## Features

- **Student Registration & Login**
- **Administrator Login & Dashboard**
- **Student Details View**
- **Room Allocation & Payment Gateway**
- **All Students List for Admin**
- **Session-based Authentication**
- **Modern, Responsive UI with Bootstrap 4 & Font Awesome**
- **Elegant College Branding with Logo and Background**

---

## Screenshots

- ![Landing Page](screenshots/landing.png)
- ![Student Login](screenshots/student_login.png)
- ![Admin Dashboard](screenshots/admin_dashboard.png)
- ![All Students](screenshots/all_students.png)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/veeru413/Hostel-Management-System.git
   cd Hostel-Management-System
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up the database:**
   - The project uses SQLite by default (see `database.js`).
   - On first run, tables and demo data are auto-created.

4. **Add your assets:**
   - Place your college logo as `public/logo.png`
   - Place your college background image as `public/svit_pic.jpg`

5. **Start the server:**
   ```
   node app.js
   ```
   The app runs at [http://localhost:3000](http://localhost:3000)

---

## Default Credentials

- **Administrator**
  - Username: `lohitakshareddykr.23is@saividya.ac.in`
  - Password: `123456789`
- **Student**
  - Register with your name and roll number.  
  - Default password is your roll number.

---

## Folder Structure

```
├── app.js
├── database.js
├── models/
│   ├── administrator.js
│   └── student.js
├── views/
│   ├── initial.ejs
│   ├── student_login.ejs
│   ├── admin_login.ejs
│   ├── admin_dashboard.ejs
│   ├── student_details.ejs
│   ├── all_students.ejs
│   ├── payment.ejs
│   └── register.ejs
├── public/
│   ├── logo.png
│   └── svit_pic.jpg
└── package.json
```

---

## Customization

- **Branding:**  
  Replace `logo.png` and `svit_pic.jpg` in the `public` folder with your own college logo and campus image.
- **Styling:**  
  Edit `public/styles.css` or inline styles in EJS files for further customization.

---

## License

This project is for educational purposes.  
Feel free to use, modify, and share!

---

**Made with ❤️ by Veerendra R Patil**
