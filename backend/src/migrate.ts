import pool from "./db";

async function migrate() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL
        )`)
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        event_date DATE NOT NULL,
        location TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );`)
    
    await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMPTZ DEFAULT NOW()
    )`)
    
    console.log("Migration complete")
    await pool.end();
}

migrate().catch(console.error);