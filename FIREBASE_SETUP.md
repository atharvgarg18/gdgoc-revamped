# 🔥 **FIREBASE SETUP GUIDE**

## 🎯 **OVERVIEW**

We've migrated from Supabase to Firebase for better integration with Google services and improved reliability. This guide will help you set up Firebase for the GDGoC IET DAVV website.

## 📋 **STEP-BY-STEP SETUP**

### **Step 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter project name: `gdgoc-iet-davv` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

### **Step 2: Set up Firestore Database**

1. In your Firebase project, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll configure rules later)
4. Select your preferred location (choose closest to India, like `asia-south1`)
5. Click **"Done"**

### **Step 3: Get Firebase Configuration**

1. In Firebase Console, click the **⚙️ Settings** icon
2. Go to **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Add app"** → **"Web app"** (</> icon)
5. Enter app nickname: `gdgoc-website`
6. **Don't** check "Set up Firebase Hosting"
7. Click **"Register app"**
8. Copy the configuration object (you'll need these values)

### **Step 4: Configure Environment Variables**

**For Local Development:**
1. Create a `.env` file in your project root
2. Add these variables with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**For Netlify Deployment:**
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add each variable one by one:
   - `VITE_FIREBASE_API_KEY` = your-api-key
   - `VITE_FIREBASE_AUTH_DOMAIN` = your-project-id.firebaseapp.com
   - `VITE_FIREBASE_PROJECT_ID` = your-project-id
   - `VITE_FIREBASE_STORAGE_BUCKET` = your-project-id.appspot.com
   - `VITE_FIREBASE_MESSAGING_SENDER_ID` = your-sender-id
   - `VITE_FIREBASE_APP_ID` = your-app-id

### **Step 5: Initialize Database Collections**

The app will automatically create collections when you add the first item through the admin panel. The collections are:

- `events` - Workshop and event data
- `team_members` - Team member information
- `gallery_items` - Photo gallery items
- `projects` - Project portfolio

### **Step 6: Configure Firestore Security Rules**

1. In Firebase Console, go to **Firestore Database**
2. Click **"Rules"** tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections
    match /{collection}/{document} {
      allow read: if true;
    }
    
    // Allow write access only for admin operations
    // In production, you should implement proper authentication
    match /{collection}/{document} {
      allow write: if true;
    }
  }
}
```

4. Click **"Publish"**

⚠️ **Note**: These rules allow all read/write access. In production, implement proper authentication and more restrictive rules.

### **Step 7: Test the Setup**

1. Start your development server: `npm run dev`
2. Go to `/admin` and login with password: `gdgoc2024admin`
3. Try adding an event, team member, gallery item, or project
4. Check your Firestore console to see if data appears

### **Step 8: Deploy to Production**

1. Make sure environment variables are set in Netlify
2. Push your code to trigger a new deployment
3. Test the admin panel on your live site

## 🔧 **TROUBLESHOOTING**

### **Common Issues:**

**1. "Firebase not initialized" error**
- Check that all environment variables are set correctly
- Verify there are no typos in variable names
- Ensure values don't have extra quotes or spaces

**2. "Permission denied" error**
- Check Firestore security rules
- Verify your project ID is correct
- Make sure Firestore is enabled in your project

**3. Data not appearing**
- Check browser console for errors
- Verify your Firebase config in the console
- Try adding data directly in Firestore console first

## 🎉 **BENEFITS OF FIREBASE**

✅ **Google Integration** - Perfect for Google Developer Groups  
✅ **Real-time Updates** - Data syncs automatically  
✅ **Scalability** - Handles growth automatically  
✅ **Reliability** - Google's infrastructure  
✅ **No Server Management** - Fully serverless  
✅ **Free Tier** - Generous limits for community projects

## 📞 **SUPPORT**

If you encounter issues:
1. Check the Firebase Console for errors
2. Review this setup guide
3. Check browser developer console
4. Verify all environment variables

---

**Firebase Setup Complete! 🎉**
Your GDGoC website is now powered by Google Firebase!
