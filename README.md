
# Code Journal (TechCrush Project)

A simple journal web app built with Node.js, Express, MongoDB (Mongoose), and EJS.  
Users can add and view journals with email confirmation.  
Admins can log in, view stats, delete entries, and filter journals by user email.

---

## Features

- Add, view, and delete journal entries
- Confirmation email sent after each journal submission
- Admin dashboard with total entries and unique users
- Filter journals by clicking a user’s email

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Frontend:** EJS Templates, CSS
- **Utilities:** dotenv for environment variables, Nodemailer for sending emails

---

## Email Functionality

This app uses **Mailtrap** as a sandbox for sending confirmation emails.  
To test email functionality, you need a Mailtrap account and must update your `.env` file with your Mailtrap credentials:

```env
EMAIL_USER=your_mailtrap_username
EMAIL_PASS=your_mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525


---

Installation

git clone https://github.com/Adodo-Safe/Code_Journal_TechCrush.git
cd Code_Journal_TechCrush
npm install

Create a .env file with:

PORT=3000
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525

Run the app:

node server.js

Visit: http://localhost:3000


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

Method	URL	Description

GET	http://localhost:3000/	Fetch all journals (EJS)
GET	http://localhost:3000/add	Render add journal page
POST	http://localhost:3000/add	Add new journal (JSON body)
POST	http://localhost:3000/delete	Delete a journal by ID and email
GET	http://localhost:3000/api/all	Fetch all journals (JSON)
GET	http://localhost:3000/api/user/:email	Fetch journals by user (JSON)


Admin

Method	URL	Description

GET	http://localhost:3000/admin/	Render admin login page
POST	http://localhost:3000/admin/login	Admin login
GET	http://localhost:3000/admin/dashboard	View all journals & analytics
POST	http://localhost:3000/admin/delete/:id	Delete a journal by ID
GET	http://localhost:3000/admin/user/:email	View journals by user (Page)



---

Testing with Postman / cURL

1. Add a Journal

Method: POST

URL: http://localhost:3000/add

Body (JSON):


{
  "title": "My First Journal",
  "note": "Learning Node.js with TechCrush is awesome!",
  "email": "user@example.com"
}

Response:


{ "success": true, "message": "Journal added successfully" }


---

2. Get All Journals (JSON)

Method: GET

URL: http://localhost:3000/api/all

Response: List of all journal objects



---

3. Delete a Journal

Method: POST

URL: http://localhost:3000/delete

Body (JSON):


{
  "id": "your_journal_id",
  "email": "user@example.com"
}

Response:


{ "success": true, "message": "Journal deleted successfully" }


---

4. Admin Login

Method: POST

URL: http://localhost:3000/admin/login

Body (JSON):


{
  "password": "your_admin_password"
}

Response:


{ "success": true, "message": "Login successful" }


---

5. View Journals by User (JSON)

Method: GET

URL: http://localhost:3000/api/user/user@example.com

Response: List of journal objects filtered by email



---

6. View Journals by User (Page)

Method: GET

URL: http://localhost:3000/admin/user/user@example.com

Response: HTML page showing journals filtered by user email



---

Security

.env is gitignored

Admin password and MongoDB URI stored securely in environment variables

Nodemailer credentials never exposed in source code


---
