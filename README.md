# AI Online Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.5-000000.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4.svg)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-3D4F5D.svg)](https://clerk.com/)
[![Neon](https://img.shields.io/badge/Neon-Database-12FFF7.svg)](https://neon.tech/)

Modern AI-powered online learning platform built with Next.js. [Live Demo](https://ai-learning-platform.vercel.app/) 


[Site](https://ai-perplexity-clone.vercel.app) 

---

![Demo](demo.gif)

---

## Features

- AI-powered course recommendations using Google GenAI
- Secure user authentication with Clerk
- Interactive course content with React Markdown
- Serverless database with Neon and Drizzle ORM
- Beautiful UI with Tailwind CSS and Radix UI components
- Responsive design for all devices
- YouTube video integration
- Real-time progress tracking

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 18, TypeScript
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Styling**: Tailwind CSS, Radix UI
- **AI Integration**: Google GenAI
- **Utilities**: Axios, UUID, React Markdown
- **Components**: Lucide Icons, Sonner Toasts

## Project Structure
```
ai-online-learning-platform/
├── app/
│ ├── (auth)/ # Authentication routes
│ ├── (main)/ # Protected routes
│ ├── api/ # API routes
│ └── courses/ # Course pages
├── components/ # Shared components
├── lib/ # Utility functions
├── styles/ # Global CSS
├── public/ # Static assets
├── drizzle/ # Database schema
├── package.json # Project dependencies
└── README.md
```

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account (for authentication)
- Neon database account
- Google GenAI API key

## ⚙️ Setup

1. **Clone the Repository**:
   ```bash
         git clone https://github.com/sxidsvit/ai-online-learning-platform.git
         cd ai-online-learning-platform
   ```

2. **Install Dependencies**:
   ```bash
        npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/


    DATABASE_URL=
    NEXT_PUBLIC_DATABASE_URL=


    GEMINI_API_KEY=

    AI_GURU_LAB_API=

    YOUTUBE_API_KEY=
   ```

4. **Start development server:**
```
bash
npm run dev
```
---

## 📬 Contact

Connect with the project maintainer:

[<img alt="Sergiy Antonyuk | LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />][linkedin]

[linkedin]: https://www.linkedin.com/in/sergiy-antonyuk/

## 🙏 Acknowledgements

A heartfelt thank you to [Tubeguruji](https://www.youtube.com/@tubeguruji) for their inspiring tutorials and invaluable contributions to the developer community.
