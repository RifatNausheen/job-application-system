# Job Application System

A full-stack MERN-based web application that allows users to browse jobs, post opportunities, and apply with resumes. The platform includes secure authentication and a structured backend for managing job data and applications.

---

## 🚀 Features

* 🔐 User authentication (Login / Signup)
* 🧑‍💼 Post and manage job listings
* 🔍 Browse all available jobs
* 📄 Apply to jobs with resume link
* 📂 View jobs posted by a specific user
* 🗑️ Update and delete job listings
* 📬 Track job applications

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML, CSS, JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* Firebase Authentication

---

## 🔐 Authentication

User authentication is handled using **Firebase**, providing:

* Email & Password login
* Secure session management
* Easy integration with frontend

---

## 🔐 Firebase Setup

Create a file:

client/src/firebase/firebase.config.js

Add your Firebase configuration:

```js
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
};

export default firebaseConfig;

## 📁 Project Structure

```
job-application-system/
│
├── job-portal-client/        # React frontend
├── job-portal-server/        # Express backend
├── .env           # Environment variables
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in your server directory and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

For Firebase (frontend):

```
VITE_FIREBASE_API_KEY=your_key
VITE_AUTH_DOMAIN=your_domain
VITE_PROJECT_ID=your_project_id
```

---

## ▶️ Run Locally

### 1. Clone the repository

```
git clone https://github.com/RifatNausheen/job-application-system.git
cd job-application-system
```

### 2. Install dependencies

Backend:

```
cd server
npm install
```

Frontend:

```
cd client
npm install
```

### 3. Start the project

Backend:

```
node server.js
```

Frontend:

```
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | /all-jobs       | Get all jobs   |
| GET    | /all-jobs/:id   | Get single job |
| POST   | /post-job       | Create new job |
| PATCH  | /update-job/:id | Update job     |
| DELETE | /job/:id        | Delete job     |
| GET    | /myJobs/:email  | Jobs by user   |
| POST   | /apply-job      | Apply to job   |

---

## 📌 Future Improvements

* JWT-based backend authentication
* File upload for resumes
* Admin dashboard
* Pagination & search filters
* Email notifications

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
