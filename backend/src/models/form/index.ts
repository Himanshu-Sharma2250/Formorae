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
            type: Schema.Types.Mixed,
            required: true
        },
        settings: {
            type: Schema.Types.Mixed,
        },
        status: {
            type: String,
            default: FORM_STATUS.DRAFT,
            enum: availableFormStatus,
            required: true,
        },
        slug: {
            type: String,
        },
        publishedAt: {
            type: Date,
        }
    },
    {timestamps: true}
)

interface IFormDocument extends Document {
    userId: string
    name: string
    description?: string
    // schema: JSON
    settings: JSON
    status: string
    slug: string
    publishedAt: Date
}

export const Form = mongoose.model<IFormDocument>("Form", formSchema);