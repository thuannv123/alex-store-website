import express from "express";
import authUser from "../middlewares/authUser.js";
import { addAdress, getAddress } from "../controllers/addressController.js";

const adddressRouter = express.Router();

adddressRouter.post("/add", authUser, addAdress);
adddressRouter.post("/get", authUser, getAddress);

export default adddressRouter;
