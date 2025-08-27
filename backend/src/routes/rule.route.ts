import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addConditionalRule, deleteRule, getConditionalRuleById, getConditionalRules, updateRule } from "../controllers/conditionalRule.controller.js";

const ruleRouter = Router();

ruleRouter.post("/:formId/conditional-rule", verifyJWT, addConditionalRule);
ruleRouter.get("/:formId/conditional-rule", verifyJWT, getConditionalRules);
ruleRouter.get("/:formId/conditional-rule/:ruleId", verifyJWT, getConditionalRuleById);
ruleRouter.patch("/:formId/conditional-rule/:ruleId", verifyJWT, updateRule);
ruleRouter.delete("/:formId/conditional-rule/:ruleId", verifyJWT, deleteRule);

export default ruleRouter;