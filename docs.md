# Innovative Centre Website Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Environment Variables](#environment-variables)
4. [Admin Panel](#admin-panel)
5. [Database Models](#database-models)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components](#frontend-components)
8. [Troubleshooting](#troubleshooting)
9. [Future Enhancements](#future-enhancements)

## Project Overview

The Innovative Centre website is a Next.js application with a MongoDB backend. It features a public-facing landing page showcasing language courses and testimonials, along with a secure admin panel for content management and lead tracking.

### Key Features

- **Dynamic Landing Page**: Displays courses and testimonials fetched from the database
- **Registration Form**: Captures leads and stores them in the database
- **Admin Panel**: Secure interface for managing content and leads
- **MongoDB Integration**: Stores all data in a MongoDB database
- **Authentication**: Secure login for admin users

### Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database (Atlas or local)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd innovative-centre
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Build for production:
   \`\`\`bash
   npm run build
   # or
   yarn build
   \`\`\`

6. Start the production server:
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

### Deployment

The application is designed to be deployed on Vercel. Simply connect your repository to Vercel and set the required environment variables.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
MONGODB_URI=mongodb+srv://your_mongodb_connection_string
ADMIN_EMAIL=admin@innovativecentre.com
ADMIN_PASSWORD=your_admin_password
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### Variable Descriptions

- `MONGODB_URI`: Your MongoDB connection string
- `ADMIN_EMAIL`: Email address for the admin account
- `ADMIN_PASSWORD`: Password for the admin account
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js (generate a random string)
- `NEXT_PUBLIC_APP_URL`: URL of your application (used for API calls)

## Admin Panel

### First-time Access

1. Navigate to `/admin/login` in your browser
2. Log in with the credentials set in your environment variables:
   - Email: The value of `ADMIN_EMAIL`
   - Password: The value of `ADMIN_PASSWORD`
3. On first login, the system will automatically create an admin account with these credentials

### Dashboard

The dashboard provides an overview of your website data, including:
- Total number of leads
- Number of courses
- Number of testimonials

### Leads Management

The Leads section allows you to:
- View all leads submitted through the registration form
- Update lead status (new, contacted, converted, closed)
- Add notes to leads
- Track lead information (name, phone, age, city)

#### Lead Statuses

- **New**: Recently submitted, not yet contacted
- **Contacted**: Initial contact has been made
- **Converted**: Lead has enrolled in a course
- **Closed**: Lead is no longer active

### Courses Management

The Courses section allows you to:
- Create new courses
- Edit existing courses
- Delete courses
- Set course display order
- Customize course colors

#### Course Fields

- **Title**: Name of the course
- **Description**: Brief description of the course
- **Color**: Visual theme for the course card (blue, green, purple, orange, red, teal)
- **Order**: Display order on the landing page (lower numbers appear first)

### Testimonials Management

The Testimonials section allows you to:
- Create new testimonials
- Edit existing testimonials
- Delete testimonials
- Set testimonial display order

#### Testimonial Fields

- **Name**: Name of the person giving the testimonial
- **Course**: Course they took or are taking
- **Text**: The testimonial content
- **Initials**: Initials displayed in the avatar (auto-generated if left blank)
- **Order**: Display order on the landing page (lower numbers appear first)

## Database Models

### User Model

\`\`\`javascript
{
  email: String,       // Admin email address
  password: String,    // Hashed password
  role: String,        // "admin"
  createdAt: Date      // Account creation date
}
\`\`\`

### Lead Model

\`\`\`javascript
{
  name: String,        // Lead's name
  phone: String,       // Lead's phone number
  age: String,         // Lead's age
  city: String,        // Lead's city
  status: String,      // "new", "contacted", "converted", "closed"
  notes: String,       // Additional notes
  createdAt: Date      // Submission date
}
\`\`\`

### Course Model

\`\`\`javascript
{
  title: String,       // Course title
  description: String, // Course description
  color: String,       // Card color theme
  order: Number,       // Display order
  createdAt: Date      // Creation date
}
\`\`\`

### Testimonial Model

\`\`\`javascript
{
  name: String,        // Person's name
  course: String,      // Course they took
  text: String,        // Testimonial content
  initials: String,    // Initials for avatar
  order: Number,       // Display order
  createdAt: Date      // Creation date
}
\`\`\`

## API Endpoints

### Authentication

- **POST /api/auth/[...nextauth]**
  - Handles authentication requests
  - Used by NextAuth.js

### Leads

- **GET /api/leads**
  - Returns all leads
  - Requires admin authentication

- **POST /api/leads**
  - Creates a new lead
  - Public endpoint (used by registration form)

- **GET /api/leads/:id**
  - Returns a specific lead
  - Requires admin authentication

- **PUT /api/leads/:id**
  - Updates a specific lead
  - Requires admin authentication

- **DELETE /api/leads/:id**
  - Deletes a specific lead
  - Requires admin authentication

### Courses

- **GET /api/courses**
  - Returns all courses
  - Public endpoint

- **POST /api/courses**
  - Creates a new course
  - Requires admin authentication

- **GET /api/courses/:id**
  - Returns a specific course
  - Public endpoint

- **PUT /api/courses/:id**
  - Updates a specific course
  - Requires admin authentication

- **DELETE /api/courses/:id**
  - Deletes a specific course
  - Requires admin authentication

### Testimonials

- **GET /api/testimonials**
  - Returns all testimonials
  - Public endpoint

- **POST /api/testimonials**
  - Creates a new testimonial
  - Requires admin authentication

- **GET /api/testimonials/:id**
  - Returns a specific testimonial
  - Public endpoint

- **PUT /api/testimonials/:id**
  - Updates a specific testimonial
  - Requires admin authentication

- **DELETE /api/testimonials/:id**
  - Deletes a specific testimonial
  - Requires admin authentication

## Frontend Components

### Landing Page Sections

- **Hero Section**: Introduction and call-to-action
- **About Section**: Information about Innovative Centre
- **Courses Section**: Dynamic display of courses from the database
- **Testimonials Section**: Dynamic display of testimonials from the database
- **Registration Section**: Form for lead capture

### Admin Components

- **AdminLayout**: Layout wrapper for admin pages
- **LeadsPage**: Interface for managing leads
- **CoursesPage**: Interface for managing courses
- **TestimonialsPage**: Interface for managing testimonials
- **LoginPage**: Authentication interface

### Form Components

- **RegistrationForm**: Lead capture form on the landing page
- **CourseForm**: Form for creating/editing courses (in dialogs)
- **TestimonialForm**: Form for creating/editing testimonials (in dialogs)

## Troubleshooting

### Common Issues

#### Authentication Problems

**Issue**: Unable to log in to the admin panel
**Solution**:
1. Check that your environment variables are correctly set
2. Ensure your MongoDB connection is working
3. Try resetting your password by updating it directly in the database

#### Database Connection Issues

**Issue**: "Failed to fetch" errors in the admin panel
**Solution**:
1. Verify your MongoDB connection string
2. Check MongoDB Atlas network access settings
3. Ensure your IP is whitelisted if using MongoDB Atlas

#### Content Not Displaying on Landing Page

**Issue**: Courses or testimonials not showing on the landing page
**Solution**:
1. Check the admin panel to ensure content exists
2. Verify API endpoints are returning data
3. Check for console errors in the browser

### Debugging

To enable more detailed logging, you can modify the API route handlers to include more console.log statements. Look for error messages in:

1. Server logs (terminal where Next.js is running)
2. Browser console
3. Network tab in browser developer tools

## Future Enhancements

### Planned Features

1. **Analytics Dashboard**
   - Track website visitors
   - Monitor conversion rates
   - Visualize lead data

2. **Email Notifications**
   - Automatic emails when new leads are submitted
   - Lead status change notifications

3. **Course Detail Pages**
   - Individual pages for each course
   - More comprehensive course information

4. **Image Upload**
   - Allow uploading images for courses and testimonials
   - Media library management

5. **Instructor Profiles**
   - Section to showcase teaching staff
   - Instructor bios and qualifications

6. **Blog Management**
   - Create and manage blog posts
   - Categories and tags

7. **Multilingual Support**
   - Translate content to multiple languages
   - Language switcher

### Contributing

Contributions to the project are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## Support

For support or questions, please contact:
- Email: support@innovativecentre.com
- Website: https://innovativecentre.com

---

Documentation last updated: May 12, 2025
