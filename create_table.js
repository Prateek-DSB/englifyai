const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  try {
    console.log('Creating test_submission table...');
    
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS test_submission (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100) NOT NULL,
          test_category VARCHAR(20) NOT NULL CHECK (test_category IN ('Easy', 'Medium', 'Hard')),
          test_score SMALLINT NOT NULL CHECK (test_score >= 0 AND test_score <= 15),
          wat TEXT NOT NULL,
          time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_test_submission_username ON test_submission(username);
        CREATE INDEX IF NOT EXISTS idx_test_submission_timestamp ON test_submission(time_stamp DESC);
        CREATE INDEX IF NOT EXISTS idx_test_submission_category ON test_submission(test_category);
      `
    });

    if (error) {
      console.error('Error creating table:', error);
      
      // Try alternative approach - just test connection
      console.log('Testing basic connection...');
      const { data: testData, error: testError } = await supabase
        .from('test_submission')
        .select('count')
        .limit(1);
        
      if (testError) {
        console.log('Table does not exist. You need to create it manually in Supabase dashboard.');
        console.log('SQL to run in Supabase SQL Editor:');
        console.log(`
CREATE TABLE test_submission (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  test_category VARCHAR(20) NOT NULL CHECK (test_category IN ('Easy', 'Medium', 'Hard')),
  test_score SMALLINT NOT NULL CHECK (test_score >= 0 AND test_score <= 15),
  wat TEXT NOT NULL,
  time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_submission_username ON test_submission(username);
CREATE INDEX idx_test_submission_timestamp ON test_submission(time_stamp DESC);
        `);
      } else {
        console.log('Table already exists!');
      }
    } else {
      console.log('Table created successfully!');
    }
  } catch (error) {
    console.error('Connection error:', error);
  }
}

createTable();
