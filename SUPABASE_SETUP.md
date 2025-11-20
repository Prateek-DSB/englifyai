# Supabase Database Setup Instructions

## Manual Table Creation Required

The application requires a `test_submission` table in your Supabase database. Please follow these steps:

### 1. Access Supabase Dashboard
- Go to https://supabase.com/dashboard
- Navigate to your project: whrzowjcbsrcyrmiozzr

### 2. Create the Table
Go to the SQL Editor and run this command:

```sql
CREATE TABLE test_submission (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  test_category VARCHAR(20) NOT NULL CHECK (test_category IN ('Easy', 'Medium', 'Hard')),
  test_score SMALLINT NOT NULL CHECK (test_score >= 0 AND test_score <= 15),
  wat TEXT NOT NULL,
  time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_test_submission_username ON test_submission(username);
CREATE INDEX idx_test_submission_timestamp ON test_submission(time_stamp DESC);
CREATE INDEX idx_test_submission_category ON test_submission(test_category);
```

### 3. Verify Table Creation
After running the SQL, you should see the `test_submission` table in your Tables view.

### 4. Test the Application
Once the table is created, the application's scores page and test submission functionality will work properly.

## Current Status
- ✅ Application is running successfully
- ✅ All pages and components are implemented
- ❌ Database table needs manual creation
- ✅ API routes are ready for database integration

## Application URL
http://172.191.19.68:3000
