const axios = require('axios');

async function testApi() {
  try {
    // We don't have a token easily, but we can check if the server is up
    const res = await axios.get('http://localhost:4123/finance/budget');
    console.log('Response:', res.status, res.data);
  } catch (e) {
    console.log('Status:', e.response?.status);
    console.log('Data:', e.response?.data);
  }
}

testApi();
