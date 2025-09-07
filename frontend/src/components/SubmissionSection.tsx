import { Calendar, Equal, Trash } from 'lucide-react';

const SubmissionSection = () => {
    return (
        <div>
            {/* show total submissions */}
            <div className='flex px-2'>
                <button className='flex gap-2 border-b-2 py-2'>
                    <span>
                        All
                    </span>
                    {/* show total submission */}
                    <kbd className='bg-gray-200 px-2 rounded-2xl'>
                        2
                    </kbd>
                </button>
            </div>

            {/* shows all submissions in form of table */}
            <table>
                {/* head to contain submitted data and questions */}
                <thead>
                    <tr className='flex'>
                        {/* submission date */}
                        <th className='flex gap-1 w-100 border-[1px] border-gray-300 px-2 py-2 text-gray-400'>
                            <Calendar className='w-4'/>
                            <span className='font-light'>
                                Submitted at
                            </span>
                        </th>

                        {/* questions */}
                        <th className='flex gap-1 w-100 border-[1px] border-gray-300 px-2 py-2 text-gray-400'>
                            <Equal className='w-4'/>
                            <span className='font-light'>
                                why do you like banana?
                            </span>
                        </th>
                    </tr>
                </thead>

                {/* all the responses in respect to questions */}
                <tbody>
                    {/* rows */}
                    <tr className='flex'>
                        <td className='flex justify-between px-2 border-[1px] w-100 border-gray-300 py-1'>
                            <span className='font-light text-[15px]'>
                                Sep 3, 04:51 PM
                            </span>

                            <button className='cursor-pointer hover:bg-gray-100 px-2 rounded-[5px]'>
                                <Trash className='w-4'/>
                            </button>
                        </td>

                        <td className='px-2 border-[1px] w-100 border-gray-300 py-1 font-light text-[15px]'>
                            no
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SubmissionSection