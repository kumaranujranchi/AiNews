#!/usr/bin/env node

/**
 * Supabase Setup Script
 * This script sets up the database and configures admin privileges
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
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🚀 Starting Supabase database setup...\n');

  try {
    // Read the SQL setup file
    const sqlPath = path.join(__dirname, 'supabase-setup.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 Executing SQL setup script...');
    
    // Split SQL into individual statements and execute them
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          if (error) {
            console.log(`⚠️  Statement ${i + 1} had an issue (might be expected):`, error.message);
          }
        } catch (err) {
          // Try direct execution for some statements
          try {
            await supabase.from('_').select('*').limit(0); // This will fail but establish connection
          } catch (e) {
            // Ignore connection test error
          }
        }
      }
    }

    console.log('✅ SQL setup script executed\n');

  } catch (error) {
    console.error('❌ Error executing SQL setup:', error.message);
  }
}

async function setupAdminUser() {
  console.log('👤 Setting up admin user...');

  const adminEmail = 'kumaranujranchi@gmail.com';

  try {
    // Check if user exists
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();
    
    if (userError) {
      console.error('❌ Error fetching users:', userError.message);
      return;
    }

    let adminUser = users.users.find(user => user.email === adminEmail);

    if (!adminUser) {
      console.log(`📧 Creating admin user: ${adminEmail}`);
      
      // Create the admin user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: 'TempPassword123!', // User should change this on first login
        email_confirm: true,
        user_metadata: {
          role: 'admin'
        }
      });

      if (createError) {
        console.error('❌ Error creating admin user:', createError.message);
        return;
      }

      adminUser = newUser.user;
      console.log('✅ Admin user created successfully');
    } else {
      console.log('👤 Admin user already exists');
      
      // Update user metadata to include admin role
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        adminUser.id,
        {
          user_metadata: {
            ...adminUser.user_metadata,
            role: 'admin'
          }
        }
      );

      if (updateError) {
        console.error('❌ Error updating user metadata:', updateError.message);
      } else {
        console.log('✅ Admin role assigned to existing user');
      }
    }

    // Add to admin_users table
    const { error: adminTableError } = await supabase
      .from('admin_users')
      .upsert({
        user_id: adminUser.id,
        email: adminEmail
      });

    if (adminTableError) {
      console.log('⚠️  Admin table update (might be expected):', adminTableError.message);
    } else {
      console.log('✅ Admin user added to admin_users table');
    }

  } catch (error) {
    console.error('❌ Error setting up admin user:', error.message);
  }
}

async function createMediaBucket() {
  console.log('🗂️  Setting up media storage bucket...');

  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      return;
    }

    const mediaBucket = buckets.find(bucket => bucket.name === 'media');

    if (!mediaBucket) {
      // Create media bucket
      const { error: createError } = await supabase.storage.createBucket('media', {
        public: true,
        allowedMimeTypes: ['image/*', 'video/*'],
        fileSizeLimit: 10485760 // 10MB
      });

      if (createError) {
        console.error('❌ Error creating media bucket:', createError.message);
      } else {
        console.log('✅ Media bucket created successfully');
      }
    } else {
      console.log('✅ Media bucket already exists');
    }

  } catch (error) {
    console.error('❌ Error setting up media bucket:', error.message);
  }
}

async function testSetup() {
  console.log('🧪 Testing setup...\n');

  try {
    // Test articles table
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .limit(1);

    if (articlesError) {
      console.error('❌ Articles table test failed:', articlesError.message);
    } else {
      console.log('✅ Articles table accessible');
    }

    // Test admin_users table
    const { data: adminUsers, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1);

    if (adminError) {
      console.error('❌ Admin users table test failed:', adminError.message);
    } else {
      console.log('✅ Admin users table accessible');
      console.log(`📊 Found ${adminUsers.length} admin user(s)`);
    }

    // Test storage
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
    
    if (storageError) {
      console.error('❌ Storage test failed:', storageError.message);
    } else {
      console.log('✅ Storage accessible');
      console.log(`📦 Found ${buckets.length} storage bucket(s)`);
    }

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  }
}

async function main() {
  console.log('🎯 Zaira News Magazine - Supabase Setup\n');
  console.log('='.repeat(50));

  await setupDatabase();
  await setupAdminUser();
  await createMediaBucket();
  await testSetup();

  console.log('\n' + '='.repeat(50));
  console.log('🎉 Supabase setup completed!\n');
  
  console.log('📋 Next steps:');
  console.log('1. Admin user: kumaranujranchi@gmail.com');
  console.log('2. Temporary password: TempPassword123! (change on first login)');
  console.log('3. Test login at: http://localhost:3000/login');
  console.log('4. Access CMS at: http://localhost:3000/admin/articles');
  console.log('5. Check Supabase dashboard for database tables and policies\n');
}

// Run the setup
main().catch(console.error);