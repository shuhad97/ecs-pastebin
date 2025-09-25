# CodePaste

A modern, real-time code sharing platform built with Next.js 14 and Prisma. Share code snippets instantly with syntax highlighting for multiple programming languages.

## 🚀 Features

- Real-time code sharing
- Syntax highlighting for multiple languages
- Mobile-responsive design
- Anonymous or named paste creation
- Recent pastes feed
- Custom paste URLs
- Dark mode interface

## 🛠️ Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor that powers VS Code
- [TypeScript](https://www.typescript.org/) - Type-safe JavaScript

### Backend
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - API endpoints

### Deployment
- [Vercel](https://vercel.com) - Deployment platform
- Database hosting options:
  - [Vercel Postgres](https://vercel.com/storage/postgres)
  - [Supabase](https://supabase.com/)
  - [Neon](https://neon.tech/)

## 📝 Environment Variables


Create a `.env` file in the root directory:
with the following variables:

DATABASE_URL="YOUR_DATABASE_URL"
ADMIN_PASSWORD="YOUR_ADMIN_PASSWORD"

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/codepaste.git
cd codepaste
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```    

4. Run the development server:
```bash
npm run dev
``` 

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Database Schema

prisma
model Paste {
id String @id @default(cuid())
content String
language String @default("plaintext")
title String?
authorName String @default("Anonymous")
createdAt DateTime @default(now())
}



## 📈 Performance

- Server-side rendering for better SEO
- Optimized database queries
- Efficient caching strategy
- Fast page loads with Next.js App Router

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## 🌟 Supported Languages

- Plain Text
- JavaScript
- TypeScript
- Python
- Java
- HTML
- CSS

## 🔄 Key Features Implementation

### Real-time Updates
- Zero-second revalidation using `export const revalidate = 0`
- Client-side refresh after paste creation
- Optimistic updates for better UX

### Code Editor
- Monaco Editor integration with multiple language support
- Custom theme and settings
- Auto-indent and syntax highlighting

### Database Integration
- Prisma ORM for type-safe database operations
- PostgreSQL for reliable data storage
- Efficient connection pooling in production

## 🎨 UI Features

- Responsive design using TailwindCSS
- Dark mode optimized interface
- Clean and intuitive layout
- Mobile-first approach



## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team
- [Prisma](https://www.prisma.io/) team
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) team
- [Vercel](https://vercel.com) for hosting

## 📧 Contact

Abdul shaikh - [@abduldotexe](https://instagram.com/abduldotexe)

Link tree: [Portfolio](https://linktr.ee/abduldotexe)
