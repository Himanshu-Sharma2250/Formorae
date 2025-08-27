import z from "zod";

export const responseSchema = z.object({
    responseData: z.json(),
    metaData: z.json()
})