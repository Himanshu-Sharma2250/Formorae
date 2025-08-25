import { Request, Response } from "express"
import { elementSchema, getElementSchema } from "../validators/formElement.validator.js"
import { FormElement } from "../models/form_element/index.js";

export const createFormElement = async (req:Request, res:Response) => {
    const {data, error} = elementSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse"
        })
    }

    const {formId, type, name, label, configuration, conditionalLogic, orderIndex} = data;

    try {
        const existingElement = await FormElement.findOne({formId:formId, name:name});

        if (existingElement) {
            return res.status(400).json({
                success: false,
                message: "Element with same name already exist"
            })
        }

        const element = await FormElement.create({
            formId: formId,
            name: name,
            type: type,
            label: label,
            configuration: configuration,
            conditionalLogic: conditionalLogic,
            orderIndex: orderIndex
        });

        if (!element) {
            return res.status(400).json({
                success: false,
                message: "Element not found"
            })
        }

        await element.save();

        const createdElement = await FormElement.findOne({
            formId:formId,
            name:name
        })

        if (!createdElement) {
            return res.status(404).json({
                success: false,
                message: "Element not found"
            })
        }

        res.status(201).json({
            success: true,
            message: "Element created successfully",
            element
        })
    } catch (error) {
        console.error("Error creating element: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating element"
        })
    }
}

export const getElement = async (req:Request, res:Response) => {
    const {data, error} = getElementSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse"
        })
    }

    const {formId} = data;

    try {
        const element = await FormElement.findById({formId});

        if (!element) {
            res.status(404).json({
                success: false,
                message: "element not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Element get successfull",
            element
        })
    } catch (error) {
        console.error("Error getting element: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting element"
        })        
    }
}