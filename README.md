# Code Journal (TechCrush Project)

A simple journal web app built with Node.js, Express, MongoDB (Mongoose), and EJS. Users can add/view journals; admins can manage entries and view analytics.

## Features
- Add, view, delete journal entries
- Admin login with password
- Dashboard with total entries, unique users, weekly stats
- Filter journals by user

## Tech Stack
- Node.js, Express, EJS
- MongoDB (Mongoose)
- CSS, dotenv for environment variables

## Installation
```bash
git clone https://github.com/Adodo-Safe/Code_Journal_TechCrush.git
cd Code_Journal_TechCrush
npm install

Create a .env file in the root:

PORT=3000
MONGO_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password

Run the app:

npm start
# or with nodemon
npm run dev

Visit: http://localhost:3000

API Routes

Public

POST /journal/add – Add journal { "title": "...", "note": "...", "email": "..." }

GET /journal/all – Fetch all journals


Admin

POST /admin/login – Login { "password": "..." }

GET /admin/dashboard – View all journals

POST /admin/delete/:id – Delete a journal

GET /admin/user/:email – Journals by user


Folder Structure

Code_Journal_TechCrush/
├─ config/db.js
├─ controllers/
│  ├─ adminController.js
│  └─ journalController.js
├─ models/journalModel.js
├─ routes/
│  ├─ adminRoutes.js
│  └─ journalRoutes.js
├─ views/
│  ├─ adminDashboard.ejs
│  ├─ userJournals.ejs
│  ├─ adminLogin.ejs
│  ├─ index.ejs
│  └─ partials/
│     ├─ header.ejs
│     └─ footer.ejs
├─ public/styles.css
├─ .env (ignored)
├─ .gitignore
├─ package.json
└─ server.js

Security

.env is gitignored

Admin password and MongoDB URI stored securely

