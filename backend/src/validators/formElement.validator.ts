import z from "zod";

export const elementSchema = z.object({
    formId: z.string(),
    type: z.string(),
    name: z.string(),
    label: z.string(),
    configuration: z.json(),
    validationRules: z.json(),
    conditionalLogic: z.json(),
    orderIndex: z.number()
});

export const getElementSchema = z.object({
    formId: z.string()
})