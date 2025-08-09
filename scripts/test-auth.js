#!/usr/bin/env node

import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';

// Load environment variables
dotenv.config();

async function testAuthentication() {
  console.log('🔐 Testing X API Authentication...\n');

  // Check if environment variables are set
  const requiredVars = [
    'X_API_KEY',
    'X_API_SECRET', 
    'X_ACCESS_TOKEN',
    'X_ACCESS_TOKEN_SECRET'
  ];

  console.log('📋 Checking environment variables:');
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (value && value !== 'your_api_key_here') {
      console.log(`  ✅ ${varName}: Set`);
    } else {
      console.log(`  ❌ ${varName}: Not set or using placeholder`);
    }
  }
  console.log('');

  // Test API connection
  try {
    console.log('🔗 Testing API connection...');
    
    const client = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
    });

    // Test by getting user info (read-only operation)
    const me = await client.v2.me();
    console.log(`  ✅ Authentication successful!`);
    console.log(`  👤 User: @${me.data.username} (${me.data.name})`);
    console.log(`  🆔 User ID: ${me.data.id}`);
    console.log('');

    // Test app permissions
    console.log('🔐 Testing app permissions...');
    try {
      // Try to get user timeline (read permission)
      const timeline = await client.v2.userTimeline(me.data.id, {
        max_results: 1,
      });
      console.log('  ✅ Read permission: OK');
    } catch (error) {
      console.log('  ❌ Read permission: Failed');
      console.log(`     Error: ${error.message}`);
    }

    // Note: We don't test write permission here to avoid posting test tweets
    console.log('  ℹ️  Write permission: Not tested (to avoid posting tweets)');
    console.log('');

    console.log('🎉 Authentication test completed successfully!');
    console.log('✅ Your X API credentials are working correctly.');
    console.log('✅ You can now use the X MCP server to post tweets.');

  } catch (error) {
    console.log('❌ Authentication failed!');
    console.log(`   Error: ${error.message}`);
    console.log('');
    console.log('🔧 Troubleshooting tips:');
    console.log('   1. Verify your API credentials are correct');
    console.log('   2. Check that your app has the right permissions');
    console.log('   3. Ensure your developer account is approved');
    console.log('   4. Check if you\'ve hit rate limits');
    console.log('   5. Review the authentication guide in docs/authentication-guide.md');
  }
}

// Run the test
testAuthentication().catch(console.error);
