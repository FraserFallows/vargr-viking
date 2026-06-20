import { Router } from "express";
import pool from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
    const result = await pool.query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC");
    res.json(result.rows);
});


router.post("/", async (req, res) => {
    const { name, email, message } = req.body;
    const result = await pool.query("INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *", [name, email, message]);
    res.status(201).json(result.rows[0]);
})

export default router;