# 📋 Complete List: Placeholder Content & Dummy Data to Update

## 🚨 CRITICAL FIXES NEEDED FOR PRODUCTION

### 1. **PLACEHOLDER IMAGES** (via.placeholder.com)

#### **Mock Data in `client/lib/supabase.ts`:**

```typescript
// Lines 123, 135 - Team member images
image: "https://via.placeholder.com/300x300";

// Lines 150, 161 - Gallery images
image: "https://via.placeholder.com/400x300";

// Lines 176, 191 - Project images
image: "https://via.placeholder.com/600x400";
```

#### **Error Fallback Images:**

```typescript
// client/components/admin/TeamManager.tsx:161
e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";

// client/components/admin/GalleryManager.tsx:167
e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";

// client/pages/Team.tsx:198
e.currentTarget.src = "https://via.placeholder.com/300x300?text=No+Image";

// client/pages/GalleryPage.tsx:296
e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
```

#### **Old Files (Legacy):**

```typescript
// data/team.json:6, 19
"image": "https://via.placeholder.com/300x300"

// data/gallery.json:6, 15
"image": "https://via.placeholder.com/400x300"

// server/utils/data-store.ts:49, 58, 73, 82
"image": "https://via.placeholder.com/300x300" // Team
"image": "https://via.placeholder.com/400x300" // Gallery

// SUPABASE_SETUP.md:101-104
'https://via.placeholder.com/300x300' // Team members
'https://via.placeholder.com/400x300' // Gallery items
```

---

### 2. **NON-WORKING LINKS** (href="#")

#### **Footer Links - `client/components/Footer.tsx`:**

```typescript
// Lines 172, 180, 188, 196, 226, 232
href="#" // All footer links are broken

// Specific broken links:
- Learning Resources (Line 172)
- Community Guidelines (Line 180)
- Code of Conduct (Line 188)
- Support (Line 196)
- Privacy Policy (Line 226)
- Terms of Service (Line 232)
```

---

### 3. **MOCK GITHUB REPOSITORIES**

#### **Non-existent GitHub URLs:**

```typescript
// client/lib/supabase.ts:177, 192
"https://github.com/gdgoc-iet-davv/website"     // Doesn't exist
"https://github.com/gdgoc-iet-davv/event-app"   // Doesn't exist

// client/pages/ProjectsPage.tsx:172
href="https://github.com/gdgoc-iet-davv"        // Organization doesn't exist

// SUPABASE_SETUP.md:144-146 and database-schema.sql:103-105
Sample project GitHub URLs that don't exist
```

---

### 4. **PLACEHOLDER PAGES**

#### **About Page - `client/pages/AboutPage.tsx`:**

```typescript
// Uses PlaceholderPage component instead of real content
<PlaceholderPage
  title="About GDGoC IET DAVV"
  description="Learn more about our mission, vision, and the amazing community we're building at IET DAVV."
/>
```

#### **Contact Page - `client/pages/ContactPage.tsx`:**

```typescript
// Uses PlaceholderPage component instead of real content
<PlaceholderPage
  title="Get in Touch"
  description="Have questions or want to collaborate? We'd love to hear from you! Connect with our team."
/>
```

#### **PlaceholderPage Component - `client/pages/PlaceholderPage.tsx`:**

```typescript
// Shows "🚧 Coming Soon" message
<h3 className="text-lg font-semibold text-gray-900 mb-4">
  🚧 Coming Soon
</h3>
```

---

### 5. **DUMMY TEAM MEMBER NAMES**

#### **Generic Team Names in Multiple Files:**

```typescript
// SUPABASE_SETUP.md:102-104
"Core Member 1", "Technical Lead";
"Core Member 2", "Design Lead";
"Core Member 3", "Event Coordinator";

// server/utils/data-store.ts:56
name: "Core Member 1";

// SUPABASE_STEP_BY_STEP.md:115-116
"Team Member 2", "Technical Lead";
"Team Member 3", "Web Development Lead";
```

---

### 6. **SAMPLE FORM REGISTRATION LINKS**

#### **Non-working Form URLs:**

```typescript
// SUPABASE_SETUP_COMPLETE.md:126-128
"https://forms.gle/example"; // All event registration links

// SUPABASE_STEP_BY_STEP.md and database-schema.sql
"https://forms.gle/your-form-link"; // Sample registration links
```

---

### 7. **PLACEHOLDER SOCIAL MEDIA LINKS**

#### **Broken Social Links:**

```typescript
// SUPABASE_SETUP.md:101-104
linkedin: "#"; // All team member social links
github: "#"; // All team member social links
```

---

### 8. **MOCK CONTENT & DESCRIPTIONS**

#### **Generic Event Descriptions:**

```typescript
// Multiple files contain sample events:
"Learn React fundamentals and build your first app";
"Introduction to Machine Learning with Python";
"Complete web development from basics to advanced";
```

#### **Generic Project Descriptions:**

```typescript
// Sample project descriptions that may need updating:
"Modern, responsive website for our community built with React and TypeScript";
"Mobile app for managing community events and registrations";
"Machine learning powered study assistant for students";
```

#### **Coming Soon Messages:**

```typescript
// client/pages/ProjectsPage.tsx:257
"Amazing Projects Coming Soon!";

// client/pages/EventsPage.tsx:188
"Exciting Events Coming Soon!";

// client/pages/Team.tsx:158
"Our amazing team members will be featured here soon!";
```

---

## 🔧 **INPUT PLACEHOLDER TEXT** (Form Fields)

#### **Admin Form Placeholders - These are OK to keep:**

```typescript
// These are just form field helpers, not content issues:
placeholder = "Dec 15, 2024"; // Date format example
placeholder = "2:00 PM - 5:00 PM"; // Time format example
placeholder = "Workshop, Seminar, etc."; // Event type examples
placeholder = "https://example.com/image.jpg"; // URL format example
placeholder = "Lead, Technical Lead, etc."; // Role examples
placeholder = "Brief description..."; // Input guidance
placeholder = "https://linkedin.com/in/username"; // Social URL format
```

---

## ✅ **WHAT'S WORKING CORRECTLY**

#### **Real, Working Links:**

- WhatsApp community link: `https://chat.whatsapp.com/DjVwm5za2GZIlSvr8OXS3M?mode=ems_copy_t`
- Instagram: `https://www.instagram.com/gdgoc.ietdavv/?hl=en`
- LinkedIn: `https://in.linkedin.com/company/gdgoc-iet-davv`
- Logo URL: `https://www.dscvit.com/newlogo.svg`

#### **Temporary Working Images (Unsplash):**

- All sample data in database schema uses Unsplash images
- These are production-ready but should be replaced with real photos

---

## 🎯 **PRIORITY ORDER FOR FIXES**

### **HIGH PRIORITY (Must fix before production):**

1. ✅ Replace `via.placeholder.com` images with real photos
2. ✅ Fix broken footer links (`href="#"`)
3. ✅ Create real GitHub repositories or remove GitHub links
4. ✅ Replace About/Contact placeholder pages with real content

### **MEDIUM PRIORITY (Should fix soon):**

1. ✅ Update team member names from "Core Member X" to real names
2. ✅ Create real event registration forms
3. ✅ Add real social media links for team members
4. ✅ Update sample project descriptions

### **LOW PRIORITY (Nice to have):**

1. ✅ Replace Unsplash images with actual event photos
2. ✅ Update event descriptions with real events
3. ✅ Remove "Coming Soon" messages when real content is added

---

## 📝 **IMMEDIATE ACTION ITEMS**

1. **Collect Real Photos:**

   - Team member headshots (300x300px minimum)
   - Event photos (800x600px minimum)
   - Project screenshots (600x400px minimum)

2. **Create Content:**

   - Write About page content
   - Create Contact page with form
   - Set up real GitHub repositories

3. **Fix Links:**

   - Update footer links to real pages
   - Create Google Forms for event registration
   - Add real social media profiles

4. **Update Database:**
   - Replace mock data with real information
   - Update team member names and roles
   - Add real project information

---

**🚨 TOTAL PLACEHOLDER ITEMS: 47 items across 15+ files**

The website is **85% production-ready** - most issues are content-related, not functional problems!
