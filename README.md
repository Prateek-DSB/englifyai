# EnglifyAI - Grammar Assessment Platform

Comprehensive grammar and writing assessment tool for Indian graduates.


## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase PostgreSQL** - Cloud database and authentication
- **OpenAI GPT-4 API** - AI-powered writing evaluation


## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd englifyai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env.local with the following variables:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open application**
   ```
   Navigate to http://localhost:3000
   ```


## Demo Credentials

Use any of the following credentials to access the application:

- **Username:** abc1 | **Password:** xyz1
- **Username:** abc2 | **Password:** xyz2
- **Username:** abc3 | **Password:** xyz3
- **Username:** abc4 | **Password:** xyz4
- **Username:** abc5 | **Password:** xyz5


## Database Schema

### test_submission Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key, auto-increment |
| `Username` | TEXT | User identifier from login credentials |
| `Test score` | INTEGER | MCQ test score (0-15) |
| `time_stamp` | TIMESTAMP | Test submission date and time |
| `WAT` | TEXT | Writing Assessment Task response |
| `Test Category` | TEXT | Difficulty level (easy/medium/hard) |

## Features

- **MCQ Questions** - Multiple choice questions for grammar assessment across different difficulty levels
- **WAT with AI Evaluation** - Writing Assessment Task with intelligent AI-powered evaluation and feedback
- **OpenAI Integration** - Advanced natural language processing for accurate writing assessment
- **Supabase Database** - Reliable cloud database for storing user data and test results
- **Score Tracking** - Comprehensive score tracking and performance analytics for users

## Project Structure

```
englifyai/
├── app/
│   ├── login/           # Authentication page
│   ├── home/            # Dashboard after login
│   ├── assessment/      # Difficulty selection
│   │   ├── test/        # MCQ questions page
│   │   └── wat/         # Writing Assessment Task
│   ├── scores/          # Test results and history
│   ├── api/
│   │   └── evaluate-wat/ # OpenAI API integration
│   ├── layout.tsx       # Root layout with gradient background
│   └── page.tsx         # Landing page
├── components/
│   ├── Toast.tsx        # Notification component
│   └── Loading.tsx      # Loading spinner
├── lib/
│   ├── database.ts      # Supabase database operations
│   ├── supabase.ts      # Supabase client configuration
│   ├── auth.ts          # Authentication logic
│   └── auth-provider.tsx # React Context for auth state
├── types/
│   └── index.ts         # TypeScript interfaces
├── .env.local           # Environment variables
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Developed by Prateek**

For questions, suggestions, or support, please reach out to the development team.
