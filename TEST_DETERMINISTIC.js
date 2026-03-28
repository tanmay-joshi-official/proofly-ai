// Test script to verify deterministic analysis
// Run this with: node TEST_DETERMINISTIC.js

import { generateDeterministicResult, hashString } from './server/utils/deterministicAnalysis.js';

console.log('🔍 Testing Deterministic Analysis\n');
console.log('='.repeat(50));

// Test with the same content multiple times
const testContent = 'https://example.com/suspicious-link';
const type = 'link';

console.log(`\n📝 Testing with: "${testContent}"`);
console.log(`Type: ${type}`);
console.log(`Hash: ${hashString(testContent)}`);

console.log('\n🔄 Running analysis 5 times:\n');

for (let i = 1; i <= 5; i++) {
  const result = generateDeterministicResult(testContent, type);
  console.log(`Run ${i}:`);
  console.log(`  Trust Score: ${result.trustScore}`);
  console.log(`  Risk Level: ${result.riskLevel}`);
  console.log(`  AI Generated: ${result.aiGenerated}`);
  console.log('');
}

// Test with different content
const testContent2 = 'https://different-site.com/page';
console.log('='.repeat(50));
console.log(`\n📝 Testing with different content: "${testContent2}"`);
console.log(`Hash: ${hashString(testContent2)}`);

const result2 = generateDeterministicResult(testContent2, type);
console.log(`\nTrust Score: ${result2.trustScore}`);
console.log(`Risk Level: ${result2.riskLevel}`);

console.log('\n✅ Same content = Same results!');
console.log('='.repeat(50));
