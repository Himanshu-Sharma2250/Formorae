import { Router } from "express";
import { createFormElement, deleteElement, getElement, getElementById, updateElement } from "../controllers/formElement.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const elementRouter = Router();

elementRouter.post("/:formId/element", verifyJWT, createFormElement);
elementRouter.get("/:formId/elements", verifyJWT, getElement);
elementRouter.get("/:formId/element/:elementId", verifyJWT, getElementById);
elementRouter.patch("/:formId/element/:elementId", verifyJWT, updateElement);
elementRouter.delete("/:formId/element/:elementId", verifyJWT, deleteElement);

export default elementRouter;