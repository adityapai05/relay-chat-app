# 🚀 Relay Chat App

Relay Chat is a full-stack real-time chat application designed for seamless communication. It features a responsive UI, multiple themes, user authentication, and real-time message updates.

## 🌟 Features

- 💬 **Real-Time Messaging**: Instant communication using Socket.IO.
- 🔒 **User Authentication**: Secure login and registration.
- 📱 **Responsive Design**: Works seamlessly across devices.
- 🎨 **Theming**: Multiple light and dark themes from DaisyUI.
- 🟢 **User Presence**: Indicates online/offline status.
- 👤 **Profile Management**: Update and view user details.

## 🖼️ Screenshots

1. **Login & Signup Page**  

   ![Login & Signup](/frontend/src/assets/login-signup.png)

2. **Home Page (With and Without Chat Open)**  

   ![Home Page](/frontend/src/assets/home.png)

3. **Profile & Settings Page** 

   ![Profile & Settings](/frontend/src/assets/profile-settings.png)

## 🛠️ Tech Stack

### 🖥️ Frontend:
- ⚛️ React  
- 🟦 TypeScript  
- 🎨 Tailwind CSS  
- 🌸 DaisyUI  
- 🗂️ Zustand for state management  

### 🔧 Backend:
- 🟢 Node.js  
- 🚀 Express.js  
- 🍃 MongoDB (via Mongoose)  
- 🔌 Socket.IO  

## 📥 Installation

### ⚡ Prerequisites:
- 🖥️ Node.js (v16 or above)  
- 🍃 MongoDB (local or cloud, e.g., MongoDB Atlas)  

1. Clone the repository:  
   ```bash
   git clone https://github.com/adityapai05/relay-chat-app.git
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Set up your `.env` file with:  
   ```
   PORT=5001
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   ```

4. Start the app:  
   ```bash
   npm run dev
   ```  
## 🎉 Usage
- 📝 Register or login to access the app.  
- 👥 Select a contact from the sidebar to start chatting.  
- 🎨 Customize the theme using the built-in theme selector.  

## 🚀 Upcoming Features

I'm actively working on adding new features to enhance the Relay Chat app. Stay tuned for:

- 💬 **Group Chats**: Chat with multiple users at once.
- 🔍 **Search Functionality**: Easily find users and messages.
- 📂 **File Sharing**: Share documents, videos, and other files.
- ✔️ **User Verification**: Add a layer of security with user verification.
- 📲 **Push Notifications**: Get notified when you receive a new message or request.

## 🤝 Contributing

1. 🍴 Fork the repository.  
2. 🌱 Create a new branch:  
   ```bash
   git checkout -b feature/your-feature
   ```  
3. 📌 Commit your changes:  
   ```bash
   git commit -m "Add your message"
   ```  
4. 🚀 Push the branch:  
   ```bash
   git push origin feature/your-feature
   ```  
5. 📬 Open a pull request.  