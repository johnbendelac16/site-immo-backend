"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const properties_1 = __importDefault(require("./routes/properties"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Connexion Mongo
(0, db_1.connectDB)();
// Routes API
app.use("/api", properties_1.default);
app.use("/api", contacts_1.default);
app.listen(3001, () => console.log("Backend Mongo: http://localhost:3001"));
