import Button from './Button';

const NavBar = () => {
    return (
        <div className='flex justify-between items-center px-8'>
            {/* for logo */}
            <div>
                <h1 className='text-3xl'>Formorae</h1>
            </div>

            {/* for other buttons */}
            <div className='flex justify-around items-center gap-3'>
                
                <Button label={"Pricing"} style='py-1 px-3 rounded-xl font-mono text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-200'/>
                
                <Button label={"Sign in"} style='py-1 px-3 rounded-xl font-mono text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-200'/>
                
                
                <Button label={"Sign up"} style='py-1 px-3 rounded-xl font-mono text-gray-600 hover:text-gray-800 cursor-pointer hover:bg-gray-200'/>
                
                
                <Button label={"Create Form"} style='py-1 px-3 rounded-xl font-mono text-gray-50 hover:text-gray-800 cursor-pointer bg-blue-600 hover:bg-gray-200'/>

            </div>
        </div>
    )
}

export default NavBar;