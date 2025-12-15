// test-env.js
require('dotenv').config();

console.log('\n=== Environment Variables Test ===');
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
console.log('DATABASE_USER:', process.env.DATABASE_USER);
console.log('DATABASE_PASS:', process.env.DATABASE_PASS);
console.log('TYPE:', process.env.TYPE);
console.log('\nAll env keys:', Object.keys(process.env).filter(key => key.startsWith('DATABASE')));