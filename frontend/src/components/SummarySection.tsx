
const SummarySection = () => {
    return (
        <div className="w-full h-full">
            {/* for each questions we create a div and store all the responses */}
            <div className="px-2 flex flex-col gap-3">
                {/* question */}
                <div className="flex flex-col">
                    <h1 className="font-bold text-xl text-gray-800">
                        Why do you need this?
                    </h1>
                    {/* no of responses */}
                    <span className="text-[14px] text-gray-500">
                        2 responses
                    </span>
                </div>

                {/* all the responses of the question */}
                <div className="flex flex-col gap-2">
                    {/*  */}
                    <div className="flex justify-between items-center">
                        {/* response */}
                        <span>
                            yes
                        </span>

                        {/* submission date */}
                        <span className="text-gray-400">
                            Sep 3, 04:51 PM
                        </span>
                    </div>

                    {/* divider */}
                    <div className="border-b-2 border-gray-300"></div>

                    
                </div>
            </div>
            
        </div>
    )
}

export default SummarySection;