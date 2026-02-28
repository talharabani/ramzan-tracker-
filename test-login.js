// Test login script
const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com', // Change this to your email
        password: 'test123'      // Change this to your password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('User:', data);
    } else {
      console.log('❌ Login failed!');
      console.log('Error:', data.message);
      console.log('Status:', response.status);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

testLogin();
