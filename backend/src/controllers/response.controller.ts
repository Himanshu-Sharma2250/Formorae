import { Request, Response as res } from "express";
import { responseSchema } from "../validators/response.validator.js";
import { Response } from "../models/form_response/index.js";

export const createResponse = async (req: Request, res: res) => {
    const {data, error} = responseSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safe parse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safe parse"
        })
    }

    const {responseData, metaData} = data;
    const {formId} = req.params;

    try {
        const response = await Response.create({
            formId:formId,
            responseData:responseData,
            metaData:metaData
        })

        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Reponse not recorded"
            })
        }

        await response.save();

        res.status(201).json({
            success: true,
            message: "Response recorded successfully",
            response
        })
    } catch (error) {
        console.error("Error recorded response: ", error);
        res.status(500).json({
            success: false,
            message: "Error recorded response"
        })
    }    
}