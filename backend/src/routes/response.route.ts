import { Router } from "express";
import { createResponse, deleteResponse, getResponseById, getResponses } from "../controllers/response.controller.js";

const responseRouter = Router();

responseRouter.post("/:formId/response", createResponse);
responseRouter.get("/:formId/response", getResponses);
responseRouter.get("/:formId/response/:responseId", getResponseById);
responseRouter.delete("/:formId/response/:responseId", deleteResponse);

export default responseRouter;