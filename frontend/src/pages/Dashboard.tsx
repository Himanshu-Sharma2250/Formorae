import { Pencil, Plus, Share2, Trash} from "lucide-react"

import DashNav from "../components/DashNav";
import SideBar from "../components/SideBar";

const Dashboard = () => {
    return (
        <div className='w-[100vw] h-full flex font-mono'>
            <SideBar/>

            <div className="flex flex-col">
                {/* nav bar for dashboard */}
                <DashNav/>

                {/* main container */}
                <div className="w-[85vw] px-50 pt-15">
                    <main className="flex flex-col gap-3">
                        {/* heading - Home and create form button */}
                        <div className="flex justify-between items-baseline px-2">
                            <h1 className="text-4xl font-bold">
                                Home
                            </h1>

                            <button className="flex gap-1 cursor-pointer rounded-[5px] py-0.5 px-2 bg-blue-500 hover:bg-blue-600">
                                <Plus className="w-4"/>
                                <span>New Form</span>
                            </button>
                        </div>

                        {/* divider */}
                        <div className="border-b-2 border-gray-200 mb-3"></div>

                        {/* contains all the forms created till now */}
                        <div className="border-2 flex justify-between items-center px-2 py-2 rounded-[5px] cursor-pointer hover:bg-gray-100">
                            {/* div-1 contains form's name, no of submissions and published / edited date */}
                            <div>
                                <h1 className="flex items-center gap-2">
                                    <span className="text-2xl text-gray-900 font-bold">
                                        Form-1
                                    </span>

                                    <kbd className="text-red-600 bg-red-100 px-2 text-xs rounded-2xl">
                                        closed
                                    </kbd>
                                </h1>

                                <p className="text-xs flex gap-1">
                                    <span>
                                        2 submissions
                                    </span>

                                    <span>
                                        •
                                    </span>

                                    <span>
                                        Edited 2d ago
                                    </span>
                                </p>
                            </div>

                            {/* contains buttons for editing and sharing and to delete */}
                            <div className="flex items-center gap-3 pr-1">
                                {/* edit button */}
                                <button className="flex cursor-pointer rounded-[5px] ml-1 hover:bg-gray-300 px-1">
                                    <Pencil className="w-4"/>
                                    <span>
                                        edit
                                    </span>
                                </button>

                                {/* share button */}
                                <button className="cursor-pointer rounded-[5px] ml-1 hover:bg-gray-300 px-1">
                                    <Share2 className="w-4.5"/>
                                </button>

                                {/* delete button */}
                                <button className="cursor-pointer rounded-[5px] ml-1 hover:bg-gray-300 px-1">
                                    <Trash className="w-4.5"/>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;