import mongoose, {Schema, Document} from "mongoose";

const conditionalRuleSchema = new Schema(
    {
        formId: {
            type: Schema.Types.ObjectId,
            ref: "Form",
            required: true
        },
        trigger_element_id: {
            type: Schema.Types.ObjectId,
            ref: "FormElement",
            required: true
        },
        target_element_id: {
            type: Schema.Types.ObjectId,
            ref: "FormElement",
            required: true
        },
        conditionType: {
            type: String,
        },
        conditionValue: {
            type: String,
        },
        actionType: {
            type: String,
        }
    },
    {timestamps: true}
)

export const ConditionalRules = mongoose.model("ConditionalRules", conditionalRuleSchema);