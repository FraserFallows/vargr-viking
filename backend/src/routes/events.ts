import { NextFunction, Request, Response, Router } from "express";
import pool from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

function requireAuthIfAll(req: Request, res: Response, next: NextFunction) {
    if (req.query.all === "true") {
        return requireAuth(req, res, next);
    }
    next();
}

router.get("/", requireAuthIfAll, async (req, res) => {
    const includeAll = req.query.all === "true";
    const query = includeAll
        ? "SELECT * FROM events ORDER BY event_date ASC"
        : "SELECT * FROM events WHERE event_date >= CURRENT_DATE ORDER BY event_date ASC";
    const result = await pool.query(query);
    res.json(result.rows);
});

router.post("/", requireAuth, async (req, res) => {
    const { title, description, event_date, location, url } = req.body;
    const result = await pool.query("INSERT INTO events (title, description, event_date, location, url) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, description, event_date, location, url ?? null]);
    res.status(201).json(result.rows[0]);
});

router.put("/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, description, event_date, location, url } = req.body;
    const result = await pool.query("UPDATE events SET title = $1, description = $2, event_date = $3, location = $4, url = $5 WHERE id = $6 RETURNING *", [title, description, event_date, location, url ?? null, id]);
    res.json(result.rows[0]);
});

router.delete("/:id", requireAuth, async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    res.status(204).send();
});

export default router;