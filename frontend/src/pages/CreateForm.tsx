import CreateFormNav from "../components/CreateFormNav";
import SideBar from "../components/SideBar";

const CreateForm = () => {
    return (
        <div className="w-[100vw] h-full font-mono flex">
            <SideBar/>

            {/* main part of create form */}
            <div className="flex flex-col">
                <CreateFormNav/>

                <div className="border-2 h-full w-[85vw] px-50 pt-15">
                    {/* for the cover */}
                    <div></div>

                    {/* for the logo */}
                    <div></div>

                    <main className="border-2 h-full">                
                        {/* for the title */}
                        <div className="w-full border-2 h-20">
                            <input type="text" placeholder="Form Title" className="h-full w-full text-4xl font-bold " />
                        </div>
                        
                    </main>
                </div>
            </div>
        </div>
    )
}

export default CreateForm;