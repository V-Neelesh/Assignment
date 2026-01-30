# 🚀 Agency Application - Quick Start Guide

## Step-by-Step Setup Instructions

### ✅ Prerequisites
- Node.js v14+ installed
- MongoDB running locally or MongoDB Atlas account
- A code editor (VS Code recommended)
- Terminal/Command Prompt

---

## 📦 Backend Setup (5 minutes)

### 1. Navigate to server directory
```bash
cd agency-fullstack-app/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Verify .env file
The `.env` file is already created. Default configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agency-db
NODE_ENV=development
UPLOAD_DIR=./uploads
```

**If using MongoDB Atlas**, update the URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agency-db
```

### 4. Start the server
**For development (with auto-reload):**
```bash
npm run dev
```

**For production:**
```bash
npm run build
npm start
```

✅ Server should be running on `http://localhost:5000`

Test it: `http://localhost:5000/api/health`

---

## 🎨 Frontend Setup (2 minutes)

### 1. Navigate to client directory
```bash
cd agency-fullstack-app/client
```

### 2. Start a local server

**Option A: Using Python (built-in)**
```bash
python -m http.server 8000
```

**Option B: Using http-server (npm)**
```bash
npx http-server
```

**Option C: Using VS Code Live Server**
- Right-click on `src/pages/index.html` → "Open with Live Server"

✅ Frontend will be available at `http://localhost:8000` (or as shown in terminal)

---

## 🌐 Access the Application

### Landing Page
Visit: `http://localhost:8000/src/pages/index.html`

Features:
- 📌 View Projects
- 👥 View Happy Clients
- 📧 Submit Contact Form
- 📬 Subscribe to Newsletter

### Admin Panel
Visit: `http://localhost:8000/src/pages/admin.html`

Features:
- ➕ Add Projects
- ➕ Add Clients
- 📋 View Contact Submissions
- 📬 Manage Newsletter Subscribers

---

## ✨ Try the Application

### 1. Add a Project (Admin Panel)
- Go to Projects tab
- Fill in: Name, Description
- Upload an image
- Click "Add Project"
- See it appear on the landing page!

### 2. Add a Client (Admin Panel)
- Go to Clients tab
- Fill in: Name, Designation, Description
- Upload an image
- Click "Add Client"
- See it appear on the landing page!

### 3. Submit Contact Form (Landing Page)
- Fill in: Name, Email, Mobile, City
- Click Submit
- Check Admin Panel > Contacts to see the submission

### 4. Subscribe to Newsletter (Landing Page)
- Enter your email
- Click Subscribe
- Check Admin Panel > Newsletter to see the subscriber

---

## 🛠️ Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Make sure MongoDB is running
- If using local MongoDB: `mongod` in a separate terminal
- If using MongoDB Atlas: Update MONGODB_URI in .env

### Issue: "Port 5000 already in use"
**Solution:**
- Change PORT in .env to another port (e.g., 5001)
- Or kill the process using port 5000

### Issue: "Images not uploading"
**Solution:**
- Check file size (limit is 5MB)
- Ensure only image files are selected
- Check file permissions for uploads folder

### Issue: "Frontend can't connect to API"
**Solution:**
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify API_BASE_URL matches your backend URL

### Issue: "Cannot find module errors"
**Solution:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Important Files

### Backend
- `server/src/server.ts` - Entry point
- `server/src/app.ts` - Express app configuration
- `server/src/models/` - Database schemas
- `server/src/controllers/` - Business logic
- `server/src/routes/` - API endpoints
- `server/.env` - Configuration

### Frontend
- `client/src/pages/index.html` - Landing page
- `client/src/pages/admin.html` - Admin panel
- `client/src/ts/landing.ts` - Landing page logic
- `client/src/ts/admin.ts` - Admin panel logic
- `client/src/ts/api/` - API calls

---

## 🔒 Security Tips

1. **Never share .env file** - Keep it private
2. **Validate inputs** - Already done on backend
3. **Use HTTPS** - In production
4. **Rate limiting** - Add for production
5. **Authentication** - Consider adding for admin panel

---

## 📊 Database Connection Check

To verify MongoDB is working:

```bash
# Open MongoDB shell (if local)
mongo

# In MongoDB shell
use agency-db
db.projects.find()
db.clients.find()
db.contacts.find()
db.newsletters.find()
```

---

## 🎯 What's Next?

After initial setup:

1. **Add sample data** - Use admin panel to add projects/clients
2. **Test all forms** - Contact form and newsletter
3. **Check network tab** - View API calls in browser DevTools
4. **Review console** - Check for errors
5. **Read README.md** - For detailed documentation

---

## 💡 Useful Commands

```bash
# Build backend
cd server && npm run build

# Watch TypeScript changes
cd server && npm run watch

# Serve frontend with specific port
cd client && npx http-server -p 3000

# Install new dependencies
npm install package-name
```

---

## 📞 Quick Reference

| Component | URL | Port |
|-----------|-----|------|
| Landing Page | http://localhost:8000/src/pages/index.html | 8000 |
| Admin Panel | http://localhost:8000/src/pages/admin.html | 8000 |
| Backend API | http://localhost:5000/api | 5000 |
| MongoDB | localhost:27017 | 27017 |

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 8000
- [ ] MongoDB connected (check console)
- [ ] Landing page loads without errors
- [ ] Admin panel loads without errors
- [ ] Can add project via admin panel
- [ ] Project appears on landing page
- [ ] Contact form submission works
- [ ] Newsletter subscription works

---

**🎉 Congratulations! Your Agency application is ready to use!**

For detailed documentation, see `README.md`
