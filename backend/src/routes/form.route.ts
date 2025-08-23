import { Router } from "express";
import { createForm, deleteForm, getFormByID, getForms, publishForm, updateForm } from "../controllers/form.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const formRouter = Router();

formRouter.post("/create-form", verifyJWT, createForm);
formRouter.get("/get-form", verifyJWT, getForms);
formRouter.get("/get-form/:formId", verifyJWT, getFormByID);
formRouter.delete("/delete-form/:formId", verifyJWT, deleteForm);
formRouter.put("/update-form/:formId", verifyJWT, updateForm);
formRouter.post("/publish/:formId", verifyJWT, publishForm);

export default formRouter