import z from "zod";

export const ruleSchema = z.object({
    trigger_element_id: z.string(),
    target_element_id: z.string(),
    conditionType: z.string(),
    conditionValue: z.string(),
    actionType: z.string()
})