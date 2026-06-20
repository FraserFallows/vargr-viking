import { Router } from "express";
import pool from "../db";
import { requireAuth } from "../middleware/auth";
import { Resend} from "resend";

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.get("/", requireAuth, async (req, res) => {
    const result = await pool.query("SELECT * FROM contact_submissions ORDER BY submitted_at DESC");
    res.json(result.rows);
});


router.post("/", async (req, res) => {
    const { name, email, message } = req.body;
    const result = await pool.query("INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *", [name, email, message]);
    
    await resend.emails.send({
        from: "Vargr Viking <info@vargrviking.co.uk>",
        to: "info@vargrviking.co.uk",
        subject: `New contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })
    
    res.status(201).json(result.rows[0]);
})

export default router;