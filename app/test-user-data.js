// Test script to check user data
if (typeof window !== 'undefined') {
  console.log('=== USER DATA TEST ===');
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  console.log('User from localStorage:', user);
  console.log('Token from localStorage:', token);
  
  if (user) {
    const userData = JSON.parse(user);
    console.log('Parsed user data:', userData);
    console.log('Phone:', userData.phone);
    console.log('Disability Type:', userData.disabilityType);
  }
  console.log('=== END TEST ===');
}
