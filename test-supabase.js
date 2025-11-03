#!/usr/bin/env node

/**
 * Supabase Test Script
 * This script tests the Supabase setup and functionality
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

// Create clients
const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function testDatabaseTables() {
  console.log('🗄️  Testing database tables...');

  try {
    // Test articles table
    const { data: articles, error: articlesError } = await supabaseAnon
      .from('articles')
      .select('*')
      .limit(1);

    if (articlesError) {
      console.log('❌ Articles table:', articlesError.message);
    } else {
      console.log('✅ Articles table accessible');
    }

    // Test admin_users table (should fail for anon user due to RLS)
    const { data: adminUsers, error: adminError } = await supabaseAnon
      .from('admin_users')
      .select('*')
      .limit(1);

    if (adminError) {
      console.log('✅ Admin users table properly secured (RLS working)');
    } else {
      console.log('⚠️  Admin users table accessible to anon (check RLS)');
    }

    // Test with service role
    const { data: adminUsersService, error: adminServiceError } = await supabaseAdmin
      .from('admin_users')
      .select('*');

    if (adminServiceError) {
      console.log('❌ Admin users table (service role):', adminServiceError.message);
    } else {
      console.log(`✅ Admin users table accessible with service role (${adminUsersService.length} admin(s))`);
    }

  } catch (error) {
    console.error('❌ Database test error:', error.message);
  }
}

async function testStorageBucket() {
  console.log('🗂️  Testing storage bucket...');

  try {
    const { data: buckets, error } = await supabaseAnon.storage.listBuckets();
    
    if (error) {
      console.log('❌ Storage test failed:', error.message);
    } else {
      const mediaBucket = buckets.find(bucket => bucket.name === 'media');
      if (mediaBucket) {
        console.log('✅ Media bucket exists and accessible');
      } else {
        console.log('❌ Media bucket not found');
      }
    }
  } catch (error) {
    console.error('❌ Storage test error:', error.message);
  }
}

async function testAuthFunctions() {
  console.log('🔐 Testing authentication functions...');

  try {
    // Test is_admin function (should return false for unauthenticated user)
    const { data: isAdminResult, error: isAdminError } = await supabaseAnon
      .rpc('is_admin');

    if (isAdminError) {
      console.log('❌ is_admin function:', isAdminError.message);
    } else {
      console.log(`✅ is_admin function working (returns: ${isAdminResult})`);
    }

    // Test get_user_role function
    const { data: roleResult, error: roleError } = await supabaseAnon
      .rpc('get_user_role');

    if (roleError) {
      console.log('❌ get_user_role function:', roleError.message);
    } else {
      console.log(`✅ get_user_role function working (returns: ${roleResult})`);
    }

  } catch (error) {
    console.error('❌ Auth functions test error:', error.message);
  }
}

async function testAdminUser() {
  console.log('👤 Testing admin user setup...');

  try {
    // Check if admin user exists
    const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (usersError) {
      console.log('❌ Failed to list users:', usersError.message);
      return;
    }

    const adminUser = users.users.find(user => user.email === 'kumaranujranchi@gmail.com');
    
    if (adminUser) {
      console.log('✅ Admin user exists:', adminUser.email);
      console.log('📧 User ID:', adminUser.id);
      console.log('🔐 Email confirmed:', adminUser.email_confirmed_at ? 'Yes' : 'No');
      
      // Check if user is in admin_users table
      const { data: adminRecord, error: adminRecordError } = await supabaseAdmin
        .from('admin_users')
        .select('*')
        .eq('email', 'kumaranujranchi@gmail.com')
        .single();

      if (adminRecordError) {
        console.log('❌ Admin user not in admin_users table:', adminRecordError.message);
      } else {
        console.log('✅ Admin user properly configured in admin_users table');
      }
    } else {
      console.log('❌ Admin user not found');
    }

  } catch (error) {
    console.error('❌ Admin user test error:', error.message);
  }
}

async function testArticleOperations() {
  console.log('📝 Testing article operations...');

  try {
    // Test creating an article (should fail without authentication)
    const { data: createResult, error: createError } = await supabaseAnon
      .from('articles')
      .insert({
        title: 'Test Article',
        content: 'This is a test article content.',
        status: 'draft'
      });

    if (createError) {
      console.log('✅ Article creation properly secured (requires auth)');
    } else {
      console.log('⚠️  Article creation allowed without auth (check RLS)');
    }

    // Test reading published articles (should work)
    const { data: publishedArticles, error: readError } = await supabaseAnon
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .limit(5);

    if (readError) {
      console.log('❌ Reading published articles failed:', readError.message);
    } else {
      console.log(`✅ Reading published articles works (found ${publishedArticles.length} articles)`);
    }

  } catch (error) {
    console.error('❌ Article operations test error:', error.message);
  }
}

async function main() {
  console.log('🧪 Zaira News Magazine - Supabase Test Suite\n');
  console.log('='.repeat(60));

  await testDatabaseTables();
  console.log();
  
  await testStorageBucket();
  console.log();
  
  await testAuthFunctions();
  console.log();
  
  await testAdminUser();
  console.log();
  
  await testArticleOperations();

  console.log('\n' + '='.repeat(60));
  console.log('🎯 Test completed!\n');
  
  console.log('📋 Next steps if tests passed:');
  console.log('1. Execute the SQL setup in Supabase Dashboard');
  console.log('2. Create admin user manually in Authentication panel');
  console.log('3. Test login at: http://localhost:3000/login');
  console.log('4. Access CMS at: http://localhost:3000/admin/articles\n');
}

// Run the tests
main().catch(console.error);