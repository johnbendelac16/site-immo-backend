"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/contacts.ts
const express_1 = require("express");
const Contact_1 = require("../models/Contact");
const router = (0, express_1.Router)();
// ✅ NOUVELLE ROUTE GÉNÉRIQUE
router.post("/leads", async (req, res) => {
    try {
        const { name, email, phone, city, budget, message, source, projectType, timeline, cities, } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ error: "name et phone sont obligatoires" });
        }
        const doc = await Contact_1.ContactModel.create({
            name,
            email,
            phone,
            city,
            budget,
            message,
            source,
            projectType,
            timeline,
            cities,
        });
        res.json({
            success: true,
            id: doc._id.toString(),
        });
    }
    catch (err) {
        console.error("Erreur POST /api/leads:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
// 🔁 L’ANCIENNE ROUTE RESTE TELLE QUELLE POUR L’INSTANT
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
            source: "legacy-contact", // petit tag pour savoir d’où ça vient
        });
        res.json({ success: true, id: doc._id.toString() });
    }
    catch (err) {
        console.error("Erreur POST /api/contact:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
// GET /api/contact : on renvoie aussi les nouveaux champs
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
            source: l.source,
            projectType: l.projectType,
            timeline: l.timeline,
            cities: l.cities,
            createdAt: l.createdAt,
        })));
    }
    catch (err) {
        console.error("Erreur GET /api/contact:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
exports.default = router;
