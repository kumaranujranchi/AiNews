
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const config = {
    user: 'postgres',
    password: '1gvfW0fapUGdB0sARFjPKRDXIcLX1xQ3',
    host: '72.60.202.93',
    port: 5432,
    database: 'postgres',
    ssl: false // Coolify usually doesn't enforce SSL for direct IP connections, but we might need to toggle this
};

async function setupDatabase() {
    console.log('🔌 Connecting to PostgreSQL database...');
    console.log(`   Host: ${config.host}`);
    console.log(`   User: ${config.user}`);

    const client = new Client(config);

    try {
        await client.connect();
        console.log('✅ Connected successfully!');

        // Read the SQL setup file
        const sqlPath = path.join(__dirname, 'supabase-setup.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        console.log('📄 Executing SQL setup script...');

        // Execute the SQL
        await client.query(sqlContent);

        console.log('✅ SQL setup script executed successfully!');

        // Also run the fix script content just in case
        const fixPath = path.join(__dirname, 'fix-admin-rls.sql');
        if (fs.existsSync(fixPath)) {
            console.log('🔧 Executing fix script...');
            const fixContent = fs.readFileSync(fixPath, 'utf8');
            await client.query(fixContent);
            console.log('✅ Fix script executed successfully!');
        }

    } catch (err) {
        console.error('❌ Database error:', err);
        if (err.code === 'ECONNREFUSED') {
            console.log('\n⚠️  Connection refused. The database port might not be 5432 or the firewall is blocking access.');
        }
    } finally {
        await client.end();
    }
}

setupDatabase();
