import mongoose, {Schema, Document} from "mongoose";
import { availableFormStatus, FORM_STATUS } from "../../constant.js";

const formSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        schema: {
            type: JSON,
            required: true
        },
        settings: {
            type: JSON,
        },
        status: {
            type: String,
            default: FORM_STATUS.DRAFT,
            enum: availableFormStatus,
            required: true,
        },
        sharableLink: {
            type: String,
        },
        publishedAt: {
            type: Date,
            required: true
        }
    },
    {timestamps: true}
)

interface IFormDocument extends Document {
    userID: string
    name: string
    description?: string
    // schema: JSON
    settings: JSON
    status: string
    sharableLink: string
    publishedAt: Date
}

export const Form = mongoose.model<IFormDocument>("Form", formSchema);