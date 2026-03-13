# KALNET AI Study Topic Explainer

An AI-powered web application that generates simple, student-friendly explanations for any study topic.

## Features

- Enter any topic and get an instant AI-generated explanation
- Clean, responsive UI built with Tailwind CSS
- Loading state and error handling
- Example topic quick-fill buttons

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Google Gemini API** (free tier)
- **Vercel** (deployment)

## How AI API Was Used

This project uses the **Google Gemini 1.5 Flash** model via the `@google/generative-ai` SDK.

When a student enters a topic:
1. The frontend sends a `POST` request to `/api/explain` with the topic
2. The Next.js API route calls `lib/aiClient.ts` which sends a prompt to Gemini
3. The prompt instructs Gemini to explain the topic in simple, student-friendly terms (80–150 words)
4. The response is returned to the frontend and displayed in the `ExplanationCard` component

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/kalnet-ai-explainer.git
cd kalnet-ai-explainer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your Gemini API key

- Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Create a free API key

### 4. Set up environment variables

Create a `.env.local` file in the root:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push this repository to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import the GitHub repo
3. In the Vercel dashboard, add the environment variable:
   - `GEMINI_API_KEY` = your Gemini API key
4. Click **Deploy**

## Project Structure

```
app/
├── page.tsx              # Main page
├── layout.tsx            # Root layout
├── globals.css           # Tailwind base styles
└── api/
    └── explain/
        └── route.ts      # POST /api/explain

components/
├── TopicInput.tsx        # Topic input field + button
└── ExplanationCard.tsx   # Displays AI explanation

lib/
└── aiClient.ts           # Gemini API integration
```
