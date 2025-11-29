// Simple test to verify API connection
const API_BASE_URL = 'http://localhost:5002';

async function testAPI() {
  try {
    console.log('🔌 Testing API connection...');
    
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    
    console.log('✅ API Connection successful:', data);
    
    const testResponse = await fetch(`${API_BASE_URL}/api/test`);
    const testData = await testResponse.json();
    
    console.log('✅ Test endpoint working:', testData);
    
  } catch (error) {
    console.error('❌ API Connection failed:', error.message);
  }
}

testAPI();
