const https = require('https');

const testLogin = async (email, password, description) => {
  try {
    const response = await fetch('http://localhost:3004/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    console.log(`${description}:`);
    console.log(`  Status: ${response.status}`);
    console.log(`  Message: ${data.message}`);
    console.log(`  Success: ${response.ok}`);
    console.log('---');
    
    return response.ok;
  } catch (error) {
    console.log(`${description}: ERROR - ${error.message}`);
    console.log('---');
    return false;
  }
};

const runTests = async () => {
  console.log('🧪 Testing Login Security...\\n');
  
  // Test with correct credentials (we don't know the actual password)
  await testLogin(
    'lamoraugustine122@gmail.com', 
    'TestPassword123!', 
    '✅ Correct credentials (if this is the actual password)'
  );
  
  // Test with wrong passwords (these should fail)
  await testLogin(
    'lamoraugustine122@gmail.com', 
    'wrongpassword', 
    '❌ Wrong password 1'
  );
  
  await testLogin(
    'lamoraugustine122@gmail.com', 
    '123456', 
    '❌ Wrong password 2'
  );
  
  await testLogin(
    'lamoraugustine122@gmail.com', 
    'anythingelse', 
    '❌ Wrong password 3'
  );
  
  // Test with wrong email
  await testLogin(
    'nonexistent@example.com', 
    'anypassword', 
    '❌ Wrong email'
  );
  
  console.log('🎯 Security Test Complete!');
  console.log('All wrong credentials should return status 401 (Unauthorized)');
};

// Make sure your server is running first
console.log('⚠️  Make sure your Next.js server is running on port 3004!');
console.log('Run: npm run dev\\n');

runTests();
