// Test script to verify backend is working
import axios from 'axios';

const API_URL = 'http://localhost:5000';

async function testBackend() {
  console.log('🧪 Testing Backend Connection...\n');

  // Test 1: Health Check
  try {
    const { data } = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Health Check:', data);
  } catch (error) {
    console.error('❌ Health Check Failed:', error.message);
    return;
  }

  // Test 2: Register New User
  const testUser = {
    fullName: 'Test User ' + Date.now(),
    email: `test${Date.now()}@example.com`,
    password: 'password123'
  };

  try {
    const { data } = await axios.post(`${API_URL}/api/auth/register`, testUser);
    console.log('✅ Registration Successful!');
    console.log('   User:', data.fullName);
    console.log('   Email:', data.email);
    console.log('   Token:', data.token.substring(0, 20) + '...');
    
    // Test 3: Fetch Today's Islamic Content
    try {
      const { data: islamicData } = await axios.get(`${API_URL}/api/islamic/today`, {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      console.log('\n✅ Islamic API Working!');
      console.log('   Daily Ayah:', islamicData.data.dailyAyah?.reference);
      console.log('   Daily Hadith:', islamicData.data.dailyHadith?.reference);
    } catch (error) {
      console.error('❌ Islamic API Failed:', error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.error('❌ Registration Failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ All tests completed!');
}

testBackend();
