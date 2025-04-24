import { Router } from "express";
import { ClientController } from "../controller/ClientController";
import { authMiddleware } from "../middleware/auth-middleware";

const router = Router();

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    await ClientController.create(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await ClientController.update(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    await ClientController.getAll(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await ClientController.deleteClient(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
