import { Request, Response } from "express";
import crypto from "crypto";

import { Form } from "../models/form/index.js";
import { formSchema } from "../validators/form.validator.js";
import { FORM_STATUS } from "../constant.js";

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
            settings: settings,
            userId: req.user?._id
        });

        await form.save();

        const createdForm = await Form.findOne({
            userId: req.user?._id,
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

export const getFormByID = async (req:Request, res:Response) => {
    const {formId} = req.params;

    if (!formId) {
        return res.status(400).json({
            success: false,
            message: "FormID not present"
        })
    }

    try {
        const form = await Form.findById(formId);

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "No Such Form Exist"
            })
        }

        res.status(200).json({
            success: true,
            message: "Form",
            form
        })
    } catch (error) {
        console.error("Error getting form by Id: ", error);
        res.status(500).json({
            success: true,
            message: "Error getting form by Id"
        })
    }
}


export const deleteForm = async (req: Request, res: Response) => {
    const {formId} = req.params;

    if (!formId) {
        return res.status(400).json({
            success: false,
            message: "FormID not present"
        })
    }

    try {
        const deletedForm = await Form.findByIdAndDelete(formId);

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Form do not exist"
            })
        }

        res.status(200).json({
            success: true,
            message: "Form deleted Successfully"
        })
    } catch (error) {
        console.error("Error deleting form: ", error);
        res.status(500).json({
            success: false,
            message: "Error deleting form"
        })        
    }
}

export const updateForm = async (req:Request, res: Response) => {
    const {formId} = req.params;
    const data = req.body;

    if (!formId) {
        return res.status(400).json({
            success: false,
            message: "FormID not present"
        })
    }

    try {
        const form = await Form.findByIdAndUpdate(formId, 
            {$set: data},
            {new: true, runValidators: true}
        )

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Form updated successfully",
            form
        })
    } catch (error) {
        console.error("Error updating form: ", error);
        res.status(500).json({
            success: false,
            message: "Error updating form"
        })       
    }
}

export const publishForm = async (req:Request, res: Response) => {
    const {formId} = req.params;

    if (!formId) {
        return res.status(400).json({
            success: false,
            message: "FormID not present"
        })
    }

    try {
        const form = await Form.findById(formId);

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found"
            })
        }

        let slug;

        if (!form.slug) {
            slug = `${form.name.replace(/\s+/g, '-').toLowerCase()}-${crypto.randomBytes(3).toString('hex')}`;

            const slugExists = await Form.findOne({slug});

            if (slugExists) {
                return res.status(400).json({
                    success: false,
                    message: "slug already exist"
                })
            }

            form.slug = slug;
        }

        form.status = FORM_STATUS.PUBLISHED;
        form.publishedAt = new Date();

        await form.save();

        const shareUrl = `${process.env.APP_BASE_URL as string}/f/${form.slug}`;

        res.status(200).json({
            success: true,
            message: "Form published successfully",
            shareUrl: shareUrl
        })
    } catch (error) {
        console.error("Error publishing form: ", error);
        res.status(500).json({
            success: false,
            message: "Error publishing form"
        })      
    }
}