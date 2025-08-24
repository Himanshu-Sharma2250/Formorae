import mongoose, {Schema, Document} from "mongoose";

const formElementSchema = new Schema(
    {
        formId: {
            type: Schema.Types.ObjectId,
            ref: "Form",
            required: true
        },
        elementType: {
            type: String,
        },
        name: {
            type: String,
        },
        label: {
            type: String,
        },
        configuration: {
            type: Schema.Types.Mixed,
        },
        validationTypes: {
            type: Schema.Types.Mixed,
        },
        conditionalLogic: {
            type: Schema.Types.Mixed,
        },
        orderIndex: {
            type: Number,
        },
    },
    {timestamps: true}
);

interface IFormElementDocument extends Document {
    formId: number
    elementType: string
    name: string
    label: string
    configuration: JSON
    validationTypes: JSON
    conditionalLogic: JSON
    orderIndex: number
}

export const FormElement = mongoose.model("FormElement", formElementSchema);