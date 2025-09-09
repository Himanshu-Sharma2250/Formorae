import { ChevronRight } from 'lucide-react';
import UseAnimations from 'react-useanimations';
import settings from 'react-useanimations/lib/settings';

const CreateFormNav = () => {
    return (
        <div className="flex justify-between w-[85vw] px-3 py-2 items-center">
            {/* for breadcrumbs */}
            <div className='flex gap-0.5'>
                <button className="cursor-pointer text-xs hover:bg-gray-100 rounded-[5px] px-1">
                    Home
                </button>

                <span>
                    <ChevronRight className='w-4'/>
                </span>

                <button className="cursor-pointer text-xs hover:bg-gray-100 rounded-[5px] px-1">
                    Untitled
                </button>
            </div>

            {/* for the buttons */}
            <div className='flex items-center gap-2.5'>
                <kbd className='text-[12px] bg-gray-200 px-2 rounded-[5px]'>
                    Draft
                </kbd>

                <button className="rounded-[5px] text-gray-700 px-1 hover:text-gray-900 hover:bg-gray-200 cursor-pointer">
                    <UseAnimations animation={settings} size={25}/>
                </button>

                <button className='cursor-pointer px-1 rounded-[5px] text-gray-600 hover:text-gray-950 hover:bg-gray-100'>
                    Preview
                </button>

                <button className='cursor-pointer px-2 font-light rounded-[5px] bg-sky-500'>
                    Publish
                </button>
            </div>
        </div>
    )
}

export default CreateFormNav;