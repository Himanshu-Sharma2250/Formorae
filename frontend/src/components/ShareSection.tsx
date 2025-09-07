import { Copy } from "lucide-react";

const ShareSection = () => {
    return (
        <div className="w-full h-full flex flex-col gap-14 px-2">
            {/* this contains the sharable link */}
            <div className="flex flex-col gap-6">
                {/* this contain share and para */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold text-gray-900">
                        Share Link
                    </h1>

                    <span className="text-[15px] font-medium">
                        Your form is now published and ready to be shared with the world! Copy this link to share your form on social media, messaging apps or via email.
                    </span>
                </div>

                {/* contains link and copy button */}
                <div className="flex gap-3 items-center">
                    <div className="border-2 px-3 py-1 rounded-[5px] border-gray-400">
                        <span>
                            https://formorae.com/f/adf32
                        </span>
                    </div>

                    <button className="flex gap-1 bg-gray-950 text-gray-50 px-3 py-1 cursor-pointer rounded-[5px] hover:bg-gray-900">
                        <Copy className="w-4"/>
                        <span>
                            Copy
                        </span>
                    </button>
                </div>
            </div>

            {/* template option */}
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-xl text-gray-900">
                    Create a template
                </h1>

                <p className="font-medium text-[15px]">
                    Do you want others to be able to use your form as a template? Create a template and share the link for others to use.
                </p>

                <div>
                    <button className="bg-gray-950 text-gray-50 px-3 py-1 rounded-[5px] cursor-pointer hover:bg-gray-900">
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareSection;