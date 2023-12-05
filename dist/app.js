"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deadlineCalculator_1 = __importDefault(require("./deadlineCalculator"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
const deadlineCalculator = new deadlineCalculator_1.default();
app.post('/calculate-deadline', (req, res) => {
    try {
        res.json({ 'hello': 'akarmi' });
    }
    catch (error) {
        res.status(500).json({
            error: 'Internal error'
        });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
