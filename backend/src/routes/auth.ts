import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";

const router = Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "8h" });
    res.json({ token });
});

export default router;