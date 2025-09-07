import { Pencil, Share2 } from "lucide-react";
import DashNav from "../components/DashNav";
import SideBar from "../components/SideBar";
import SummarySection from "../components/SummarySection";
import SubmissionSection from "../components/SubmissionSection";
import ShareSection from "../components/ShareSection";

const SubmissionPage = () => {
    return (
        <div className="w-[100vw] h-full flex font-mono">
            <SideBar/>

            <div className="flex flex-col">
                <DashNav/>

                {/* contain the submissions of the form */}
                <div className="w-[85vw] px-50 pt-15">
                    {/* main section */}
                    <main className="flex flex-col gap-5">
                        {/* contain the form name and other buttons */}
                        <div className="flex justify-between items-baseline px-2">
                            <h1 className="flex items-center gap-2">
                                <span className="text-4xl font-bold">
                                    Form-1
                                </span>

                                <kbd className="text-red-600 bg-red-100 px-2 text-xs rounded-2xl">
                                    closed
                                </kbd>
                            </h1>

                            <div className="flex items-center gap-2">
                                <button className="cursor-pointer hover:bg-gray-200 p-1 rounded-[5px]">
                                    <Share2 className="w-5"/>
                                </button>

                                <button className="flex gap-1 cursor-pointer rounded-[5px] py-0.5 px-2 text-white bg-blue-500 hover:bg-blue-600">
                                    <Pencil className="w-4"/>
                                    <span>Edit</span>
                                </button>
                            </div>
                        </div>

                        {/* options */}
                        <div className="px-2 flex flex-col">
                            {/* contains all the buttons */}
                            <div className="flex gap-2.5">
                                <button className="cursor-pointer border-b-2 border-gray-50 hover:border-black">
                                    Summary
                                </button>

                                <button className="cursor-pointer border-b-2 border-gray-50 hover:border-black">
                                    Submissions
                                </button>

                                <button className="cursor-pointer border-b-2 border-gray-50 hover:border-black">
                                    Share
                                </button>
                            </div>

                            {/* for divider */}
                            <div className="border-b-2 border-gray-200"></div>
                        </div>
                        
                        {/* when we click on the buttons it will show particular section */}
                        {/* <SummarySection/> */}
                        {/* <SubmissionSection/> */}
                        <ShareSection/>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SubmissionPage;