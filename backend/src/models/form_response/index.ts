import mongoose, {Schema, Document} from "mongoose";

const responseSchema = new Schema(
    {
        formId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        responseData: {
            type: Schema.Types.Mixed,
            required: true
        },
        metaData: {
            type: Schema.Types.ObjectId
        },
    },
    {timestamps: {createdAt: 'submitted_at', updatedAt: 'updated_at'}}
);

interface IResponseDocument {
    formId: string
    responseData: JSON
    metaData: JSON
}

export const ResponseTable = mongoose.model("ResponseTable", responseSchema);