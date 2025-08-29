import { Request, Response } from "express";
import { responseSchema } from "../validators/response.validator.js";
import { ResponseTable } from "../models/form_response/index.js";

export const createResponse = async (req: Request, res: Response) => {
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
        const response = await ResponseTable.create({
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

export const getResponses = async (req: Request, res: Response) => {
    const {formId} = req.params;

    try {
        const responses = await ResponseTable.find({
            formId:formId
        });

        if (!responses) {
            return res.status(404).json({
                success: false,
                message: "Response not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Responses found ",
            responses
        })
    } catch (error) {
        console.error("Error getting responses: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting responses"
        })        
    }
}

export const getResponseById = async (req: Request, res: Response) => {
    const {responseId} = req.params;

    try {
        const response = await ResponseTable.findById(responseId);

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Response not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Response found by id",
            response
        })
    } catch (error) {
        console.error("Error getting response: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting response"
        })
    }
}