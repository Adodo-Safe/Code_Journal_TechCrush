---

Code Journal (TechCrush Project)
A simple journal web app built with Node.js, Express, MongoDB (Mongoose), and EJS.
Users can add and view journals with email confirmation.
Admins can log in, view stats, delete entries, and filter journals by user email.


---

Features

Add, view, and delete journal entries

Confirmation email sent after each journal submission

Admin dashboard with total entries and unique users

Filter journals by clicking a user’s email



---

Tech Stack

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Frontend: EJS Templates, CSS

Utilities: dotenv for environment variables, Nodemailer for sending emails




---

Installation

git clone https://github.com/Adodo-Safe/Code_Journal_TechCrush.git
cd Code_Journal_TechCrush
npm install

Create a .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

Run the app:

node server.js

Visit:
http://localhost:3000


---

Folder Structure

Code_Journal_TechCrush/
├─ config/
│  ├─ db.js
│  └─ mail.js
├─ controllers/
│  ├─ adminController.js
│  └─ journalController.js
├─ models/
│  └─ journalModel.js
├─ routes/
│  ├─ adminRoutes.js
│  └─ journalRoutes.js
├─ views/
│  ├─ index.ejs
│  ├─ add.ejs
│  ├─ adminDashboard.ejs
│  ├─ adminLogin.ejs
│  ├─ userJournals.ejs
│  └─ partials/
│     ├─ header.ejs
│     └─ footer.ejs
├─ public/
│  └─ styles.css
├─ .env
├─ .gitignore
├─ package.json
└─ server.js


---

API Routes

Public

GET    http://localhost:3000/                  → Fetch all journals (EJS)
GET    http://localhost:3000/add              → Render add journal page
POST   http://localhost:3000/add              → Add new journal (JSON body)
POST   http://localhost:3000/delete           → Delete a journal by ID and email
GET    http://localhost:3000/api/all          → Fetch all journals (JSON)

Admin

GET    http://localhost:3000/admin/           → Render admin login page
POST   http://localhost:3000/admin/login      → Admin login
GET    http://localhost:3000/admin/dashboard  → View all journals & analytics
POST   http://localhost:3000/admin/delete/:id → Delete a journal by ID
GET    http://localhost:3000/api/user/:email → View journals by user(json)
GET    http://localhost:3000/admin/user/:email → View journals by user(page)


---

Testing with Postman

1. Add a Journal

Method: POST
URL: http://localhost:3000/add
Body (JSON):

{
  "title": "My First Journal",
  "note": "Learning Node.js with TechCrush is awesome!",
  "email": "user@example.com"
}

2. Get All Journals (JSON)

Method: GET
URL: http://localhost:3000/api/all

3. Delete a Journal

Method: POST
URL: http://localhost:3000/delete
Body (JSON):

{
  "id": "your_journal_id",
  "email": "user@example.com"
}

4. Admin Login

Method: POST
URL: http://localhost:3000/admin/login
Body (JSON):

{
  "password": "your_admin_password"
}


---

Security

.env is gitignored

Admin password and MongoDB URI stored securely in environment variables

Nodemailer credentials never exposed in source code




---
