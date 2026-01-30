# Agency - Full Stack Placement Assignment

A complete full-stack web application built with modern technologies for managing projects, clients, and placement information.

## 📋 Features

### Public Landing Page
- Responsive design with modern UI
- **Our Projects** section - Display portfolio projects with images
- **Happy Clients** section - Client testimonials with images
- **Contact Form** - Collect inquiries with validation
- **Newsletter Subscription** - Email subscription system

### Admin Panel
- **Project Management** - Add, view, and delete projects with image uploads
- **Client Management** - Add, view, and delete client testimonials
- **Contact Submissions** - View and manage contact form submissions
- **Newsletter Management** - View and manage newsletter subscribers
- Tab-based interface for easy navigation

## 🛠️ Technology Stack

### Frontend
- HTML5 (semantic markup)
- CSS3 (responsive design)
- TypeScript (vanilla, no framework)
- Fetch API (for API calls)

### Backend
- Node.js & Express.js
- TypeScript
- MongoDB & Mongoose (database)
- Multer (file upload)
- Sharp (image optimization)
- CORS (cross-origin requests)

## 📁 Project Structure

```
agency-fullstack-app/
├── client/                    # Frontend
│   ├── public/images/         # Static images
│   ├── src/
│   │   ├── pages/             # HTML files
│   │   ├── css/               # Stylesheets
│   │   └── ts/                # TypeScript files
│   │       ├── api/           # API modules
│   │       ├── types/         # TypeScript interfaces
│   │       ├── utils.ts       # DOM utilities
│   │       ├── landing.ts     # Landing page script
│   │       └── admin.ts       # Admin panel script
│   └── tsconfig.json
│
├── server/                    # Backend
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── models/            # Mongoose schemas
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Express middlewares
│   │   ├── utils/             # Utility functions
│   │   ├── app.ts             # Express app
│   │   └── server.ts          # Server entry point
│   ├── uploads/               # Uploaded files directory
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── .gitignore
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

#### 1. Clone or Download the Project
```bash
cd agency-fullstack-app
```

#### 2. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file (already created with defaults)
# Update MongoDB URI if needed in .env

# Build TypeScript
npm run build

# Start server
npm run dev
# OR in production
npm start
```

The server will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
cd client

# Note: Frontend is vanilla HTML/CSS/TypeScript
# You can serve it using a local server
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node http-server
npx http-server

# Option 3: Using Live Server extension in VS Code
# Just open the index.html file with Live Server
```

The frontend will run on `http://localhost:8000` (or as configured)

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (form-data with image)
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client (form-data with image)
- `DELETE /api/clients/:id` - Delete client

### Contact
- `GET /api/contact` - Get all contact submissions
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete contact

### Newsletter
- `GET /api/newsletter` - Get all subscribers
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter/:id` - Unsubscribe

## 🔧 Configuration

### Backend (.env file)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agency-db
NODE_ENV=development
UPLOAD_DIR=./uploads
```

### Frontend API Base URL
Update in `client/src/ts/api/*.ts` files:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📝 Features Explained

### Image Upload & Processing
- Images are automatically cropped to square format
- Optimized to 400x400px using Sharp
- Converted to WebP format for better compression
- Original files are cleaned up after processing

### Form Validation
- Email validation using regex patterns
- Mobile number must be 10 digits
- Required field validation
- Duplicate email prevention in newsletter

### Error Handling
- Global error middleware in backend
- User-friendly toast notifications
- Console logging for debugging
- Try-catch blocks in all async operations

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 Customization

### Colors
Edit CSS files to customize the color scheme:
```css
/* Primary color */
#667eea

/* Secondary color */
#764ba2
```

### Content
- Update company name in header
- Modify section titles and descriptions
- Add your own images to public/images folder

## 🔐 Security Notes

- Store sensitive data in .env file
- Never commit .env to version control
- Validate all user inputs on backend
- Use environment-specific configurations

## 📚 Database Models

### Project
- name (string)
- description (string)
- image (string - file path)
- timestamps

### Client
- name (string)
- designation (string)
- description (string)
- image (string - file path)
- timestamps

### Contact
- fullName (string)
- email (string)
- mobileNumber (string - 10 digits)
- city (string)
- timestamps

### Newsletter
- email (string - unique)
- timestamps

## 🐛 Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify .env file configuration
- Check if port 5000 is already in use

### Frontend can't connect to API
- Ensure backend is running on port 5000
- Check CORS settings in server
- Verify API_BASE_URL in frontend code

### Images not uploading
- Check uploads directory permissions
- Verify file size is under 5MB
- Ensure only image files are selected

## 📞 Support

For issues or questions, check:
1. Console logs (browser DevTools)
2. Server terminal output
3. Database connection status
4. Network tab in DevTools

## 📄 License

This project is created for placement assignment purposes.

## ✨ Production Checklist

- [ ] Update MongoDB connection string for production
- [ ] Set NODE_ENV=production
- [ ] Configure HTTPS/SSL
- [ ] Set up proper logging
- [ ] Add rate limiting
- [ ] Set up backup strategy
- [ ] Add authentication/authorization
- [ ] Test all forms and validations
- [ ] Optimize image sizes
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure CDN for static files
- [ ] Add API documentation (Swagger)

---

**Built with ❤️ for Agency Placement Assignment**
