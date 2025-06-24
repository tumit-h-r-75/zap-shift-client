# ZAPSHIFT - Parcel Delivery Web App

ZAPSHIFT is a responsive home/office parcel delivery system built to simplify logistics and ensure a seamless delivery experience. This repository includes the **frontend source code** of the system.

---

## 🚀 Live Website

[🔗 Live Site](https://your-live-link.com) *(Update with your link)*

---

## 🖥️ Tech Stack

- React
- React Router DOM
- Axios / Fetch API
- Recharts
- Tailwind CSS / DaisyUI
- Firebase Authentication

---

## 📂 Project Structure

```bash
src/
├── components/          # Reusable UI components
├── layouts/             # Dashboard and Main Layout
├── pages/               # All pages by role (User, Admin, Rider)
├── routes/              # Route definitions
├── utils/               # Helper functions, auth logic, toast utils
├── assets/              # Images, icons, etc.
└── App.jsx              # Root Component
```

---

## 👥 User Roles

### 🧑‍💼 User
- Add Parcel
- Pay for Parcel
- Track Status
- See Parcel History
- Add Reviews
- Edit Profile Info

### 🛠️ Admin
- Manage Parcels (Assign Riders, Track Progress)
- Manage Riders
- View Service Center Status
- Make Admin/User
- View Payment Logs

### 🚚 Rider
- View Assigned Pickups / Deliveries
- Confirm Pickup & Delivery
- View Earning Status
- Update Profile Info

---

## ✨ Key Features

- 🔐 Role-Based Dashboard (User / Admin / Rider)
- 📦 Real-time Parcel Tracking & Status Updates
- 💰 Rider Earnings & Payment Management
- 📊 Dashboard with Recharts & Pie Graphs
- 📍 Location-based Service Center Integration
- 💳 Payment Integration (Card based)
- 🧾 Full Review & Discussion System

---

## 📸 Screenshots

> Add screenshots like these:

- ![Dashboard](assets/dashboard.png)
- ![Add Parcel](assets/add-parcel.png)

*(Save in `assets/` folder)*

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/your-username/zapshift-frontend.git
cd zapshift-frontend
npm install
npm run dev  # or npm start
```

Make sure to configure Firebase and Backend API Base URL in a `.env` file:

```env
VITE_API_URL=https://your-backend-url.com/api
VITE_FIREBASE_API_KEY=your_firebase_key
```

---

## 🧾 Dependencies

- react
- react-router-dom
- firebase
- recharts
- react-icons
- daisyui + tailwindcss
- axios
- sweetalert2 / react-hot-toast

---

## 📁 Pages Included

- `/dashboard/user/home`
- `/dashboard/user/add-parcel`
- `/dashboard/user/payment-history`
- `/dashboard/user/manage-parcel`
- `/dashboard/user/discussion`
- `/dashboard/admin/manage-users`
- `/dashboard/admin/manage-riders`
- `/dashboard/admin/delivery-management`
- `/dashboard/rider/home`
- `/dashboard/rider/pickups`
- `/dashboard/rider/deliveries`

---

## 🔗 Related Links

- Backend Repo: [ZapShift Server](https://github.com/your-backend-link)
- Live API Docs: [API Swagger Docs](https://your-api-docs.com)

---

## 📧 Contact

**Developer:** Tumit Hasan  
**Email:** tumithasan1@gmail.com  
**LinkedIn:** [Tumit Hasan](https://linkedin.com/in/tumit-hasan)

---

### ⭐ Don’t forget to star the repo and share feedback!
