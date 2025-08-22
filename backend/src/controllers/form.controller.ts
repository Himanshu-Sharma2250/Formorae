import { Request, Response } from "express";

import { Form } from "../models/form/index.js";
import { formSchema } from "../validators/form.validator.js";

export const createForm = async (req: Request, res: Response) => {
    const {data, error} = formSchema.safeParse(req.body);

    if (error) {
        console.log("Error in safeParse", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse"
        })
    }

    const {name, description, schema, settings} = data;

    try {
        // check if the form with same name exist or not
        const existingForm = await Form.findOne({
            userID: req.user?._id,
            name: name
        })

        if (existingForm) {
            return res.status(401).json({
                success: false,
                message: "Form with same name already exist"
            })
        }

        // if the form not exist then create a new form
        const form = await Form.create({
            name: name,
            description: description,
            schema: schema,
            settings: settings
        });

        await form.save();

        const createdForm = await Form.findOne({
            userID: req.user?._id,
            name: name
        })

        if (!createdForm) {
            return res.status(400).json({
                success: false,
                message: "Form not created"
            })
        }

        res.status(201).json({
            success: true,
            message: "Form created successfully",
            form
        })
    } catch (error) {
        console.error("Error creating form: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating form"
        })
    }
}

export const getForms = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find({
            userID: req.user?._id
        })

        if (!forms) {
            return res.status(400).json({
                success: false,
                message: "Login first"
            })
        }

        if (forms.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No Forms Present"
            })
        }

        res.status(200).json({
            success: true,
            message: "Getting Forms",
            forms
        })
    } catch (error) {
        console.error("Error getting forms: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting forms"
        })
    }
}