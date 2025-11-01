Code Journal (TechCrush Project)

A simple journal web app built with Node.js, Express, MongoDB (Mongoose), and EJS.
Users can add and view journals with email confirmation.
Admins can log in, view stats, delete entries, and filter journals by user email.


---

Features

Add, view, and delete journal entries

Confirmation email sent automatically when a journal is created

Admin login with password protection

Dashboard with total entries, unique users, and weekly stats

Admin can filter journals by clicking a user’s email

Responsive and modular EJS templates



---

Tech Stack

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Frontend: EJS Templates, CSS

Utilities: dotenv for environment variables, Nodemailer for sending emails



---

Installation

# Clone the repository
git clone https://github.com/Adodo-Safe/Code_Journal_TechCrush.git
cd Code_Journal_TechCrush

# Install dependencies
npm install


---

Create a .env file in the root directory

PORT=3000
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password

# Mail configuration (for email confirmation)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mail_user
EMAIL_PASS=your_mail_password


---

Run the Application

npm start
# or with nodemon
npm run dev

Visit the app at:
http://localhost:3000


---

API Testing (Using Postman)

Below are the key routes you can test using Postman:

Public Routes

1. Add Journal

Method: POST
URL: http://localhost:3000/journal/add
Body (raw JSON):

{
  "title": "My First Journal",
  "note": "Learning Node.js is fun!",
  "email": "user@example.com"
}

Response:
Redirects to home page and sends a confirmation email to the provided address.


---

2. View All Journals

Method: GET
URL: http://localhost:3000/
Description: Displays all journals on the home page.


---

Admin Routes

1. Admin Login

Method: POST
URL: http://localhost:3000/admin/login
Body (raw JSON):

{
  "password": "your_admin_password"
}

Response: Redirects to the admin dashboard.


---

2. View Dashboard

Method: GET
URL: http://localhost:3000/admin/dashboard
Description: Shows all journal entries, total journals, unique users, and weekly stats.
Admin can filter journals by clicking a user’s email.


---

3. Delete a Journal

Method: POST
URL: http://localhost:3000/admin/delete/:id
Example:
http://localhost:3000/admin/delete/671c2a4f9e23b1a35e1d1234
Response: Journal deleted successfully and redirects to dashboard.


---

4. View Journals by User

Method: GET
URL: http://localhost:3000/admin/user/:email
Example:
http://localhost:3000/admin/user/user@example.com
Response: Displays all journals created by that specific email.


---
Code_Journal_TechCrush/
├── config/
│   ├── db.js
│   └── mail.js
│
├── controllers/
│   ├── adminController.js
│   └── journalController.js
│
├── models/
│   └── journalModel.js
│
├── routes/
│   ├── adminRoutes.js
│   └── journalRoutes.js
│
├── views/
│   ├── adminDashboard.ejs
│   ├── adminLogin.ejs
│   ├── userJournals.ejs
│   ├── index.ejs
│   ├── add.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
├── public/
│   └── styles.css
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

---

Security

.env file is gitignored

Admin password and MongoDB URI stored securely in environment variables

Nodemailer credentials never exposed in source code