-- Create test_submission table for EnglifyAI
CREATE TABLE IF NOT EXISTS test_submission (
    id SERIAL PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    Test_Category VARCHAR(20) NOT NULL CHECK (Test_Category IN ('Easy', 'Medium', 'Hard')),
    Test_score SMALLINT NOT NULL CHECK (Test_score >= 0 AND Test_score <= 15),
    WAT TEXT NOT NULL,
    time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_test_submission_username ON test_submission(Username);
CREATE INDEX IF NOT EXISTS idx_test_submission_timestamp ON test_submission(time_stamp DESC);
CREATE INDEX IF NOT EXISTS idx_test_submission_category ON test_submission(Test_Category);

-- Add comments for documentation
COMMENT ON TABLE test_submission IS 'Stores test submissions with MCQ scores and WAT evaluations';
COMMENT ON COLUMN test_submission.Username IS 'Username of the test taker';
COMMENT ON COLUMN test_submission.Test_Category IS 'Difficulty level: Easy, Medium, or Hard';
COMMENT ON COLUMN test_submission.Test_score IS 'MCQ score out of 15';
COMMENT ON COLUMN test_submission.WAT IS 'Writing Assessment Task response and evaluation';
COMMENT ON COLUMN test_submission.time_stamp IS 'When the test was submitted';
