import bcrypt from 'bcrypt'
import pool from './db'

async function seed() {
    const hash = await bcrypt.hash('temppassword123', 10);
    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', ['admin', hash]);
    console.log('Seed complete');
    await pool.end();
}

seed().catch(console.error);