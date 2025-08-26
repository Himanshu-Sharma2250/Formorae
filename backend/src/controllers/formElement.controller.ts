import { Request, Response } from "express"
import { elementSchema, updateElementSchema } from "../validators/formElement.validator.js"
import { FormElement } from "../models/form_element/index.js";

export const createFormElement = async (req:Request, res:Response) => {
    const {data, error} = elementSchema.safeParse(req.body);
    const {formId} = req.params;

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse"
        })
    }

    const {type, name, label, configuration, conditionalLogic, validationRules, orderIndex} = data;

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
            validationRules: validationRules,
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
    const {formId} = req.params;

    try {
        const element = await FormElement.find({formId:formId});

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

export const getElementById = async (req:Request, res:Response) => {
    const {elementId} = req.params;

    try {
        const element = await FormElement.findById(elementId);

        if (!element) {
            return res.status(404).json({
                success: false,
                message: "Element not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Element get successfull",
            element
        })
    } catch (error) {
        console.error("Error getting element by id: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting element by id"
        })        
    }
}

export const deleteElement = async (req:Request, res:Response) => {
    const {elementId} = req.params;

    try {
        const element = await FormElement.findByIdAndDelete(elementId);

        if (!element) {
            return res.status(404).json({
                success: false,
                message: "Element not found"
            })
        }

        const deletedElement = await FormElement.findById(elementId);

        if (deletedElement) {
            return res.status(400).json({
                success: false,
                message: "Element not deleted"
            })
        }

        res.status(200).json({
            success: true,
            message: "Element deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting element: ", error);
        res.status(500).json({
            success: false,
            message: "Error deleting element"
        })
    }
}

export const updateElement = async (req:Request, res:Response) => {
    const {data, error} = updateElementSchema.safeParse(req.body);
    const {elementId} = req.params;

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse"
        })
    }

    try {
        const element = await FormElement.findByIdAndUpdate(elementId, 
            {
                $set: data
            },
            {new: true, runValidators: true}
        )

        if (!element) {
            return res.status(404).json({
                success: false,
                message: "Element not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Element updated successfully",
            element
        })
    } catch (error) {
        console.error("Error updating element: ", error);
        res.status(500).json({
            success: false,
            message: "Error updating element"
        })        
    }
}