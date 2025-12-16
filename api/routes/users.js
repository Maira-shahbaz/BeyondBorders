import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:id",verifyUser, getUser);

router.get("/",verifyAdmin, getUsers);


router.put("/:id",verifyUser, updateUser);

router.delete("/:id",verifyUser, deleteUser);


export default router;
