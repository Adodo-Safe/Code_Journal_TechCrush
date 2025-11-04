---

# Code Journal (TechCrush Project)

A simple journal web app built with **Node.js**, **Express**, **MongoDB (Mongoose)**, and **EJS**.  
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

## Installation

```bash
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

Method	Route	Description

GET	/	Fetch all journals (EJS view)
GET	/add	Render add journal page
POST	/add	Add new journal (JSON body)
POST	/delete	Delete a journal by ID and email
GET	/api/all	Fetch all journals (JSON)
GET	/api/user/:email	Fetch journals by specific user


Admin

Method	Route	Description

GET	/admin/	Render admin login page
POST	/admin/login	Admin login
GET	/admin/dashboard	View all journals & analytics
POST	/admin/delete/:id	Delete a journal by ID
GET	/admin/user/:email	View journals by user (page)



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

Response:

{
  "success": true,
  "message": "Journal entry saved successfully"
}

2. Get All Journals (JSON)

Method: GET

URL: http://localhost:3000/api/all


Response: JSON array of all journal entries.

3. Delete a Journal

Method: POST

URL: http://localhost:3000/delete

Body (JSON):


{
  "id": "your_journal_id",
  "email": "user@example.com"
}

Response:

{
  "success": true,
  "message": "Journal deleted successfully"
}

4. Admin Login

Method: POST

URL: http://localhost:3000/admin/login

Body (JSON):


{
  "password": "your_admin_password"
}

Response:

{
  "success": true,
  "message": "Admin logged in successfully"
}

5. View Journals by User (JSON)

Method: GET

URL: http://localhost:3000/api/user/:email

Response: JSON array of journals for that user.



---

Security

.env is gitignored

Admin password and MongoDB URI stored securely in environment variables

Nodemailer credentials are never exposed in source code



---