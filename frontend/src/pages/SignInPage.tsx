import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
// import { useState } from "react";

const signInSchema = z.object({
    email: z.email("Enter correct email"),
    password: z.string().min(8, "Password's length must be 8 characters").max(13, "Password's length must be greater than 13 characters")
})

const SignInPage = () => {
    const {register, handleSubmit} = useForm({
        resolver: zodResolver(signInSchema)
    })

    const on_submit = async() => {};

    return (
        <div className="h-[90vh] w-[100vw] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center font-mono mb-10">
                <h1 className="text-3xl font-semibold">
                    Welcome Back
                </h1>
            </div>

            <form onSubmit={handleSubmit(on_submit)}>
                <fieldset className="bg-base-200 border-base-300 rounded-[5px] w-xs border p-4 font-mono">
                    <legend className="">SignIn</legend>

                    <div className="flex flex-col gap-2 mb-4">
                        <label className="font-semibold">Email </label>
                        <input type="email" {...register("email")} className="border-2 rounded-[5px] text-gray-300 px-2 py-0.5" placeholder="Email" />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <label className="font-semibold">Password </label>
                        <input type="password" {...register("password")} className="border-2 rounded-[5px] text-gray-300 px-2 py-0.5" placeholder="Password" />
                    </div>

                    <div className="flex justify-center">
                        <button className="cursor-pointer mt-4 px-4 py-1 rounded-[5px] border-2 bg-black text-white hover:bg-gray-900">
                            SignIn
                        </button>
                    </div>
                </fieldset>

                <span>new here? </span>
            </form>
        </div>
    )
}

export default SignInPage;