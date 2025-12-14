# Domra-Tech

**Domra Tech** is a comprehensive bilingual technical lexicon bridging **English, French** and **Khmer** terminology in **Computer Science**, **Artificial Intelligence**, and **emerging technologies**. Named after the traditional Khmer word _Domra_ (តម្រា), this project harmonizes modern technology with Khmer linguistic heritage.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Project Overview

Domra Tech aims to:
- **Empower Khmer-speaking learners and professionals** with accessible technical vocabulary.
- **Promote digital literacy and inclusivity** in Cambodia.
- **Serve as a resource hub** for educators, developers, and researchers.



## Features

### 🔹 User Features
- **User Authentication** – Secure login and signup system.
- **Home Page** – Search for terms and explore featured content.
- **Favourite Terms** – Save word cards to your personal list.
- **Category Browsing** – Explore terms by technical categories.
- **Contribute Terms** – Submit new terms with definitions.
- **Feedback on Word Cards** – Share feedback directly on term entries.
- **Request New Word** – Suggest terms not yet in the lexicon.

### 🔹 Admin Features
- **Admin Dashboard** – Overview of platform activity.
- **Manage Words** – Add, edit, or delete terms.
- **Manage Users** – View and manage user accounts.



## Technology Stack

### 🔹 Frontend
- **React.js** – Dynamic UI
- **Tailwind CSS** – Utility-first styling
- **React Router** – Page navigation
- **Axios** – HTTP requests
### 🔹 Backend
- **Express.js** – RESTful API
- **JWT** – Authentication
- **Bcryptjs** – Password hashing
- **Dotenv** – Environment variables

### 🔹 Database
- **MySQL** – Structured data storage
- **Sequelize ORM** – Database interaction

### 🔹 Development Tools
- **Swagger** – API testing
- **VS Code** – Code editor
- **Git + GitHub** – Version control
- **Telegram** – Team communication

## Prerequisites
Make sure you have the following installed:

- Node.js (v18 or later)
- npm

## Folder Structure

Domra-Tech/
│
├── client/                     # React frontend (Vite + Tailwind)
│   ├── public/                 # Static assets (index.html, favicon, etc.)
│   └── src/                    # Application source code
│       ├── assets/             # Images, icons, fonts
│       ├── components/         # Reusable UI components
│       ├── contexts/           # React Context providers (global state)
│       ├── layouts/            # Page layouts (e.g., dashboard, auth layout)
│       ├── locales/            # i18n translation files (English/Khmer)
│       ├── pages/              # Page-level views (Home, Login, Admin)
│       ├── utils/              # Helper functions (API wrappers, formatters)
│       ├── apijs               # API integration logic
│       ├── App.jsx             # Root component
│       ├── i18n.js             # Internationalization setup
│       ├── index.css           # Global styles
│       └── index.jsx           # Entry point
│
├── server/                     # Express backend
│   └── src/
│       ├── config/             # DB & environment configs
│       ├── controllers/        # Route handlers (business logic)
│       ├── middleware/         # Auth, validation, error handling
│       ├── models/             # Sequelize models
│       ├── routes/             # API endpoints
│       ├── services/           # Utility services (e.g., Gmail)
│       ├── server.js           # Backend entry point
│       └── sync.js             # DB sync script


## Installation

### 1. Clone Repository
```
git clone https://github.com/veysean/Domra-Tech.git
cd Domra-Tech
```
### 2. Backend Setup (Node.js + Express)

```
cd server // Navigate to the backend folder
npm install // Install dependencies
node server.js // To run the backend
```
### 3. Frontend Setup (React)

```
cd client // Navigate to the frontend folder
npm install // Install dependencies
npm run dev // To run the backend
```

## API Documentation

Base URL: `http://localhost:3000/api`

### Authentication
- **Signup** → `POST /auth/signup`
- **Login** → `POST /auth/login`

### Words
- **Get all words** → `GET /words`
- **Get word by ID** → `GET /words/:id`
- **Add word** → `POST /words` *(Admin/Contributor)*
- **Update word** → `PUT /words/:id`
- **Delete word** → `DELETE /words/:id`

Protected routes require JWT in the header:
`Authorization: Bearer <token>`
Swagger docs: `http://localhost:3000/api-docs`



## Contributors
- **Ms. Tang Sonika**, Software Engineering Student at CADT
- **Ms. Kem Veysean**, Software Engineering Student at CADT
- **Ms. Oeng Gechty**, Software Engineering Student at CADT
- **Ms. In Chanaliza**, Software Engineering Student at CADT
- **Ms. Sor Sovannita**, Software Engineering Student at CADT
- **Ms. Chum Chanlinna**, Software Engineering Student at CADT

## Acknowledgements

We would like to express our sincere gratitude to our advisor:

- **Mr. Him Soklong**, NLP Researcher at CADT, for his valuable guidance, mentorship, and support throughout the development of Domra-Tech.

Additional thanks to:
- Libraries/frameworks used (React, Express, Sequelize, Tailwind)
- Inspiration: bridging Khmer language with modern technology
- Contributors and community support