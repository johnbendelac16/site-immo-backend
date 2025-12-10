"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    price: { type: String, default: "Prix sur demande" },
    city: { type: String, default: "Non spécifié" },
    image: { type: String, default: "" },
    rooms: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    floor: { type: Number, default: 0 },
    hasParking: { type: Boolean, default: false },
    description: { type: String, default: "" },
    type: { type: String, default: "appartement" }, // valeur par défaut
    status: { type: String, default: "a_vendre" }, // valeur par défaut
    tags: { type: [String], default: [] }, // tableau de tags
});
exports.PropertyModel = mongoose_1.default.models.Property || mongoose_1.default.model("Property", propertySchema);
