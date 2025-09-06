import { PanelLeftClose, PanelLeftOpen, ChevronDown, Search, Settings, CircleArrowUp, HomeIcon } from 'lucide-react';

const SideBar = () => {
    return (
        <div className="h-[80vh] w-3xs py-2">
            {/* contains username and button to close the sidebar */}
            <div className='flex items-center justify-between px-2.5 border-0'>
                <div className='flex items-center justify-between'>
                    <p>
                        username
                    </p>
                    <button className='cursor-pointer relative p-3'>
                        <ChevronDown className='w-4 absolute top-0.5 left-0.5' />
                    </button>
                </div>

                <button className='cursor-pointer '>
                    <PanelLeftClose className='w-5'/>
                </button>
            </div>

            {/* contain all other options */}
            <div className='flex flex-col px-2 py-1.5'>
                <div className='flex gap-1 cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-950'>
                    <HomeIcon className='w-4'/>
                    Home
                </div>

                <div className='flex gap-1 cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-950'>
                    <Search className='w-4'/>
                    Search
                </div>

                <div className='flex gap-1 cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-950'>
                    <Settings className='w-4'/>
                    Settings
                </div>

                <div className='flex gap-1 cursor-pointer hover:bg-gray-100 text-gray-700 hover:text-gray-950'>
                    <CircleArrowUp className='w-4'/>
                    Upgrade Plan
                </div>
            </div>
        </div>
    )
}

export default SideBar