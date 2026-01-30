# 🖼️ Image Handling Guide - FLIPR Application

## Overview

The FLIPR application includes comprehensive image handling for projects and clients. Images are automatically optimized, cropped to square format, and converted to WebP format for better performance.

---

## ✨ Image Features

### 1. **Automatic Image Processing**
   - ✅ Automatic square cropping (center-focused)
   - ✅ Resize to 400x400 pixels
   - ✅ Convert to WebP format for better compression
   - ✅ Quality set to 80% for optimal balance

### 2. **Image Validation**
   - ✅ Allowed formats: JPEG, PNG, GIF, WebP
   - ✅ Maximum file size: 5MB
   - ✅ Files validated on upload

### 3. **Image Storage**
   - ✅ All images stored in `server/uploads/` directory
   - ✅ Automatic directory creation if missing
   - ✅ Unique filename generation to prevent conflicts

### 4. **Image Serving**
   - ✅ Images served via `/uploads` endpoint
   - ✅ Automatic path resolution in API responses
   - ✅ CORS-enabled for cross-origin access

---

## 📚 File Structure

```
flipr-fullstack-app/
├── server/
│   ├── uploads/                    # ← Image storage directory
│   │   ├── image-1234567890.webp
│   │   ├── image-9876543210.webp
│   │   └── ...
│   ├── src/
│   │   ├── utils/
│   │   │   └── imageCrop.ts       # Image processing logic
│   │   ├── middlewares/
│   │   │   └── upload.middleware.ts # Multer configuration
│   │   ├── controllers/
│   │   │   ├── project.controller.ts
│   │   │   └── client.controller.ts
│   │   └── app.ts                 # Static file serving setup
└── client/
    └── src/
        ├── pages/
        │   ├── index.html
        │   └── admin.html
        ├── css/
        │   ├── landing.css
        │   └── admin.css
        └── ts/
            ├── api/
            │   ├── projects.ts    # Image URL resolution
            │   └── clients.ts     # Image URL resolution
            └── landing.ts         # Image display
```

---

## 🔧 Backend Implementation

### Upload Middleware (`server/src/middlewares/upload.middleware.ts`)

```typescript
// File size limit: 5MB
limits: {
  fileSize: 5 * 1024 * 1024
}

// Allowed MIME types
const allowedMimes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];
```

### Image Crop Utility (`server/src/utils/imageCrop.ts`)

The `cropImage()` function:
1. Reads original image
2. Calculates smallest dimension for square crop
3. Crops to square (center-focused)
4. Resizes to 400x400 pixels
5. Converts to WebP format (80% quality)
6. Deletes original file
7. Returns processed image path

### API Routes

```typescript
// Project routes - with file upload
POST   /api/projects     - Create project with image
GET    /api/projects     - Get all projects
GET    /api/projects/:id - Get specific project
PUT    /api/projects/:id - Update project with new image
DELETE /api/projects/:id - Delete project

// Client routes - with file upload
POST   /api/clients      - Create client with image
GET    /api/clients      - Get all clients
GET    /api/clients/:id  - Get specific client
PUT    /api/clients/:id  - Update client with new image
DELETE /api/clients/:id  - Delete client
```

### Image Path Format in Database

Images are stored in database with relative paths:
```
/uploads/image-1704067200123-123456789.webp
```

When sent in API response:
```json
{
  "_id": "...",
  "name": "Project Name",
  "image": "/uploads/image-1704067200123-123456789.webp",
  "createdAt": "..."
}
```

---

## 🎨 Frontend Implementation

### Image URL Resolution (`client/src/ts/api/projects.ts`)

```typescript
const resolveImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}`;
};
```

The frontend automatically converts relative paths to full URLs:
- Input: `/uploads/image-xxx.webp`
- Output: `http://localhost:5000/uploads/image-xxx.webp`

### Displaying Images in Landing Page

```typescript
// From landing.ts
projects.forEach((project: Project) => {
  const projectCard = document.createElement('div');
  projectCard.innerHTML = `
    <img src="${project.image}" alt="${project.name}" 
         class="project-image" />
  `;
});
```

### Image CSS Styling

From `landing.css`:
```css
.project-image {
  width: 100%;
  height: 250px;
  object-fit: cover;  /* Maintains aspect ratio, crops if needed */
}

.client-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

/* Admin Panel */
.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
```

---

## 💻 How to Upload Images

### From Admin Panel

1. **Navigate to Admin Panel**
   - URL: `http://localhost:8000/src/pages/admin.html`

2. **For Projects:**
   - Click "Projects" tab
   - Fill form:
     - Project Name
     - Description
     - Upload Image (click file input)
   - Click "Add Project"

3. **For Clients:**
   - Click "Clients" tab
   - Fill form:
     - Client Name
     - Designation
     - Description
     - Upload Image
   - Click "Add Client"

### Image Upload Requirements

- **Formats:** JPEG, PNG, GIF, WebP
- **Size:** Maximum 5MB
- **Recommended:** Square images work best (auto-cropped to square)
- **Resolution:** 400x400 pixels after processing

---

## 🔍 Troubleshooting Image Issues

### Issue: Image not showing on landing page

**Diagnosis:**
1. Check browser DevTools (F12) → Network tab
2. Look for failed image requests
3. Check browser console for errors

**Solutions:**
- Verify backend is running on port 5000
- Check `uploads` folder exists and has files
- Verify image file path in database (use MongoDB viewer)
- Check CORS is enabled (it is in app.ts)

**Debug steps:**
```javascript
// In browser console
fetch('http://localhost:5000/api/projects')
  .then(r => r.json())
  .then(d => console.log(d.data[0].image))
  // Should show: /uploads/image-xxx.webp
```

### Issue: Upload fails with "Image file is required"

**Diagnosis:**
- File input is empty or not properly selected

**Solutions:**
- Click on file input and select an image
- Ensure file is a valid image format
- Check file size is less than 5MB

### Issue: Upload fails with "Only image files are allowed"

**Diagnosis:**
- File type is not a valid image

**Solutions:**
- Select a JPEG, PNG, GIF, or WebP file
- Not a document, video, or other file type

### Issue: "413 Payload Too Large" error

**Diagnosis:**
- File size exceeds 5MB limit

**Solutions:**
- Compress image before uploading
- Use online image compressor
- Recommended: Use JPEG format with 80% quality

### Issue: Image appears stretched or distorted

**Diagnosis:**
- Browser not properly rendering the processed image

**Solutions:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Try different browser
- Check image is valid WebP

---

## 📊 Image Processing Pipeline

```
User selects image
        ↓
Multer validates file
        ↓
Save temporary file
        ↓
Sharp reads image
        ↓
Calculate crop box (center square)
        ↓
Crop to square
        ↓
Resize to 400x400px
        ↓
Convert to WebP (80% quality)
        ↓
Save to uploads folder
        ↓
Delete temporary file
        ↓
Save path to MongoDB
        ↓
Return URL to frontend
        ↓
Frontend displays image
```

---

## 🛡️ Security Measures

1. **File Type Validation**
   - Only image MIME types allowed
   - Extension validation on backend

2. **File Size Limit**
   - Maximum 5MB per image
   - Prevents disk space abuse

3. **Unique Filename**
   - Timestamp + random number
   - Prevents name collisions
   - Prevents overwriting existing files

4. **Path Normalization**
   - Prevents directory traversal attacks
   - Files only saved in uploads folder

---

## ⚙️ Configuration

Edit in `server/.env`:
```env
PORT=5000
UPLOAD_DIR=./uploads           # Change upload directory if needed
MONGO_URI=...
NODE_ENV=development
```

Edit in upload middleware (`server/src/middlewares/upload.middleware.ts`):
```typescript
// Change file size limit (currently 5MB)
limits: {
  fileSize: 10 * 1024 * 1024  // 10MB
}

// Add more allowed formats
const allowedMimes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'  // Add SVG
];
```

Edit in imageCrop utility (`server/src/utils/imageCrop.ts`):
```typescript
// Change output size (currently 400x400)
.resize(600, 600, {  // Change to 600x600
  fit: 'cover',
  position: 'center',
})

// Change quality (currently 80)
.toFormat('webp', { quality: 90 })  // Higher quality
```

---

## 📈 Performance Optimization

### What's Already Done:
- ✅ Square cropping reduces storage
- ✅ Resize to 400x400 limits dimensions
- ✅ WebP format reduces file size by ~25-35%
- ✅ 80% quality balances size and appearance
- ✅ Static file caching enabled

### Additional Optimizations (Optional):
- Add CDN (Cloudinary, AWS S3)
- Implement image lazy loading
- Add thumbnail generation
- Set cache headers
- Compress database indices

---

## 🧪 Testing Image Upload

### Manual Testing

1. **Start application:**
   ```bash
   # Terminal 1: Backend
   cd server && npm run dev

   # Terminal 2: Frontend
   cd client && npx http-server
   ```

2. **Test upload:**
   - Go to admin panel
   - Upload sample image
   - Check image appears in list
   - Click project/client to verify image loads

3. **Verify in database:**
   ```bash
   # Connect to MongoDB
   mongo flipr-db
   db.projects.findOne()
   # Should show image path like: /uploads/...
   ```

4. **Test image URL directly:**
   ```
   http://localhost:5000/uploads/image-xxx.webp
   ```
   Should display the image directly in browser

---

## 🚀 Production Deployment

For production, consider:

1. **Use external storage:**
   - AWS S3
   - Google Cloud Storage
   - Cloudinary
   - Azure Blob Storage

2. **Add proper headers:**
   ```typescript
   app.use('/uploads', express.static('uploads', {
     maxAge: '1d',
     etag: false
   }));
   ```

3. **Implement cleanup:**
   - Delete old unused images
   - Archive processed images

4. **Enable HTTPS:**
   - Ensure secure image transmission

5. **Add monitoring:**
   - Track upload success rate
   - Monitor storage usage

---

## 📚 Related Files

- [Main README](./README.md) - Project overview
- [Implementation Guide](./IMPLEMENTATION.md) - Feature details
- [Quick Start](./QUICKSTART.md) - Setup instructions

---

**Happy image processing! 🎉**
