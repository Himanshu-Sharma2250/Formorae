import { Response, Request } from "express";
import { ruleSchema } from "../validators/conditionalRule.validator.js";
import { ConditionalRules } from "../models/conditional_rules/index.js";

export const addConditionalRule = async (req:Request, res:Response) => {
    const {data, error} = ruleSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse"
        })
    }

    const {trigger_element_id, target_element_id, actionType, conditionType, conditionValue} = data;
    const {formId} = req.params;

    try {
        const isRule = await ConditionalRules.findOne({
            trigger_element_id: trigger_element_id,
            target_element_id: target_element_id
        });

        if (isRule) {
            return res.status(400).json({
                success: false,
                message: "conditional rule already exist"
            })
        }

        const rule = await ConditionalRules.create({
            formId:formId,
            trigger_element_id:trigger_element_id,
            target_element_id:target_element_id,
            actionType:actionType,
            conditionType:conditionType,
            conditionValue:conditionType
        })

        if (!rule) {
            return res.status(400).json({
                success: false,
                message: "Rule not added"
            })
        }

        await rule.save();

        const createdRule = await ConditionalRules.findOne({
            trigger_element_id:trigger_element_id,
            target_element_id:target_element_id
        })

        if (!createdRule) {
            return res.status(404).json({
                success: false,
                message: "Rule not found after creating"
            })
        }

        res.status(201).json({
            success: true,
            message: "Rule added successfully",
            rule
        })
    } catch (error) {
        console.error("Error adding rule: ", error);
        res.status(500).json({
            success: false,
            message: "Error adding rule"
        })
    }
}