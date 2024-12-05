
# AdOnWheels

AdOnWheels is a web platform that connects Advertisers and Publishers for vehicle-based ad campaigns. It streamlines ad management, task assignments, and collaboration among multiple roles, ensuring a seamless experience.

---

## Features

- Mobile-responsive UI with role-based access control.
- CRUD operations for ads, proposals, vehicles, and tasks.
- Secure login using JWT and bcrypt encryption.
- RESTful APIs for efficient client-server communication.
- Data persistence with MongoDB.

---

## Technologies Used

- **Frontend:** React.js, Material-UI, Bootstrap, CSS.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Authentication:** JWT, bcrypt.

---

## Roles & Workflows

### **Advertiser**
- Post and manage ads.
- Approve or decline admin proposals.

### **Admin**
- Manage ads, publishers, and body shop tasks.
- Assign opportunities and send proposals.

### **Publisher**
- Register vehicles and accept ad opportunities.
- Manage active and past ads.

### **Body Shop**
- Handle tasks for ad wrapping/stickering.
- Update task statuses.

---

## Setup Instructions

### **Prerequisites**
- Node.js (v14+), npm, MongoDB.

### **Backend Setup**
1. Navigate to `adOnWheels/backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables.
4. Start the server:
   ```bash
   npm start
   ```

### **Frontend Setup**
1. Navigate to `adOnWheels/frontend`:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Access**
- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend: [http://localhost:5001](http://localhost:5001)

---


