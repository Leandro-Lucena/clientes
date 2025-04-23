import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    await AuthController.login(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
