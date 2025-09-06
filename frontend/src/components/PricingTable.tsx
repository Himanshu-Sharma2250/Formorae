import {FileUp, Upload, CloudUpload} from "lucide-react";

const PricingTable = () => {
    return (
        <div className="h-[70vh] w-[100vw] flex justify-center items-center py-2 px-5 font-mono gap-5">
            {/* first card shows free */}
            <div className="border-2 w-96 bg-base-100 shadow-sm py-3 px-2 rounded-xl">
                <div className="flex flex-col">
                    
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Free</h2>
                        <span className="text-xl">$0/mo</span>
                    </div>

                    <ul className="mt-6 flex flex-col gap-2 text-[15px]">
                        <li className="flex items-center gap-1">
                            <FileUp className="w-5"/>
                            <span>Create 10 forms per day</span>
                        </li>
                        
                        <li className="flex items-center gap-1">
                            <Upload className="w-5"/>
                            <span>Share the forms to many users</span>
                        </li>
                        
                        <li className="flex items-center gap-1">
                            <CloudUpload className="w-5"/>
                            <span>Upload upto 0.1MB of files</span>
                        </li>
                    </ul>

                    
                </div>
            </div>

            {/* second card shows premium */}
            <div className="border-2 w-96 bg-base-100 shadow-sm py-3 px-2 rounded-xl">
                <div className="card-body">
                    <span className="border-2 rounded-2xl font-extralight text-xs px-2 bg-fuchsia-600 text-white hover:cursor-default">Most Popular</span>
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Premium</h2>
                        <span className="text-xl">$29/mo</span>
                    </div>

                    <ul className="mt-6 flex flex-col gap-2 text-[15px]">
                        <li className="flex items-center gap-1">
                            <FileUp className="w-5"/>
                            <span>Create unlimited forms</span>
                        </li>
                        
                        <li className="flex items-center gap-1">
                            <CloudUpload className="w-5"/>
                            <span>Upload upto 1MB of files</span>
                        </li>
                    </ul>
                    
                    <div className="mt-6 flex justify-center relative h-11">
                        <button className="border-2 py-1 px-3 cursor-pointer rounded-xl bg-lime-500 font-mono shadow-[2px_3px_1px_1px] shadow-black absolute hover:bottom-1.5 hover:shadow-amber-50">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingTable;