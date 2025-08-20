import z from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .trim(),
    description: z
        .string()
        .trim(),
    schema: z
        .json(),
    settings: z
        .json(),    
})