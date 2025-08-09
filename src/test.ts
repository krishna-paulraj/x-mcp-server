#!/usr/bin/env node

import { XMCPServer } from './index.js';

// Simple test to verify the server can be instantiated
async function testServer() {
  try {
    const server = new XMCPServer();
    console.log('✅ Server instantiated successfully');
    
    // Test tool listing
    const tools = await server.listTools();
    console.log('✅ Tools listed successfully:', tools.tools.map(t => t.name));
    
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testServer();
}
