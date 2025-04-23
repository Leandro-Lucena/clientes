"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const router = (0, express_1.Router)();
router.post("/login", async (req, res, next) => {
    try {
        await AuthController_1.AuthController.login(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
