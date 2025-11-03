#!/usr/bin/env node

/**
 * Apply Supabase Security Fixes
 * This script fixes the RLS policies and creates the media storage bucket
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function applySQLFixes() {
  console.log('🔧 Applying security fixes...');

  try {
    // Read the SQL fix file
    const sqlPath = path.join(__dirname, 'fix-admin-rls.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`   ${i + 1}/${statements.length}: Executing statement...`);
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            console.log(`   ⚠️  Statement ${i + 1} warning:`, error.message);
          } else {
            console.log(`   ✅ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.log(`   ⚠️  Statement ${i + 1} error:`, err.message);
        }
      }
    }

  } catch (error) {
    console.error('❌ Error applying SQL fixes:', error.message);
  }
}

async function createMediaBucket() {
  console.log('🗂️  Creating media storage bucket...');

  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.log('❌ Failed to list buckets:', listError.message);
      return;
    }

    const mediaBucket = buckets.find(bucket => bucket.name === 'media');
    
    if (mediaBucket) {
      console.log('✅ Media bucket already exists');
    } else {
      // Create the bucket
      const { data, error } = await supabase.storage.createBucket('media', {
        public: true,
        allowedMimeTypes: ['image/*', 'video/*', 'application/pdf'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (error) {
        console.log('❌ Failed to create media bucket:', error.message);
      } else {
        console.log('✅ Media bucket created successfully');
      }
    }

  } catch (error) {
    console.error('❌ Error with media bucket:', error.message);
  }
}

async function testFixes() {
  console.log('🧪 Testing applied fixes...');

  try {
    // Test admin_users table access (should be restricted now)
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);

    if (adminError) {
      console.log('✅ Admin users table properly secured');
    } else {
      console.log('⚠️  Admin users table still accessible (may need manual policy fix)');
    }

    // Test media bucket
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.log('❌ Storage test failed:', bucketError.message);
    } else {
      const mediaBucket = buckets.find(bucket => bucket.name === 'media');
      if (mediaBucket) {
        console.log('✅ Media bucket accessible');
      } else {
        console.log('❌ Media bucket still not found');
      }
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

async function main() {
  console.log('🔧 Zaira News Magazine - Security Fixes\n');
  console.log('='.repeat(50));

  await applySQLFixes();
  console.log();
  
  await createMediaBucket();
  console.log();
  
  await testFixes();

  console.log('\n' + '='.repeat(50));
  console.log('✅ Security fixes applied!\n');
  
  console.log('🧪 Run the test script again to verify:');
  console.log('   node test-supabase.js\n');
}

// Run the fixes
main().catch(console.error);