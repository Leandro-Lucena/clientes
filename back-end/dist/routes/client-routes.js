"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientController_1 = require("../controller/ClientController");
const auth_middleware_1 = require("../middleware/auth-middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        await ClientController_1.ClientController.create(req, res);
    }
    catch (error) {
        next(error);
    }
});
router.put("/:id", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        await ClientController_1.ClientController.update(req, res);
    }
    catch (error) {
        next(error);
    }
});
router.get("/", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        await ClientController_1.ClientController.getAll(req, res);
    }
    catch (error) {
        next(error);
    }
});
router.delete("/:id", auth_middleware_1.authMiddleware, async (req, res, next) => {
    try {
        await ClientController_1.ClientController.deleteClient(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
