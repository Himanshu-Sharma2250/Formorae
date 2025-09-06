import {Search} from "lucide-react"
import UseAnimations from 'react-useanimations';
import settings from 'react-useanimations/lib/settings';

const DashNav = () => {


    return (
        <div className="flex justify-between w-[85vw] px-3 py-2 items-center">
            {/* contains breadcrumbs */}
            <div className="">
                <button className="cursor-pointer hover:bg-gray-100 rounded-[5px] px-1">home</button>
            </div>

            {/* contains search settings */}
            <div className="flex h-full gap-2">
                {/* search input */}
                <button className="flex gap-1 rounded-[5px] px-2 items-center text-gray-700 hover:text-gray-900 cursor-pointer hover:bg-gray-200">
                    <Search className="w-4"/>
                    <span className="">Search</span>
                </button>

                <button className="rounded-[5px] text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer">
                    <UseAnimations animation={settings} size={25}/>
                </button>
            </div>
        </div>
    )
}

export default DashNav;