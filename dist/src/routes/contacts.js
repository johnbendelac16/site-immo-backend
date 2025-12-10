"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Contact_1 = require("../models/Contact");
const router = (0, express_1.Router)();
// POST /api/contact : créer un lead
router.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, city, budget, message } = req.body;
        const doc = await Contact_1.ContactModel.create({
            name,
            email,
            phone,
            city,
            budget,
            message,
        });
        res.json({ success: true, id: doc._id.toString() });
    }
    catch (err) {
        console.error("Erreur POST /api/contact:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
// GET /api/contact : lister les leads
router.get("/contact", async (req, res) => {
    try {
        const leads = await Contact_1.ContactModel.find().sort({ createdAt: -1 });
        res.json(leads.map((l) => ({
            id: l._id.toString(),
            name: l.name,
            email: l.email,
            phone: l.phone,
            city: l.city,
            budget: l.budget,
            message: l.message,
            createdAt: l.createdAt,
        })));
    }
    catch (err) {
        console.error("Erreur GET /api/contact:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
exports.default = router;
