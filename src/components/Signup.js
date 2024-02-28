import React,{useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import Button from './Button'
import Input from './Input'
import { login } from '../store/authSlice'
import { UseDispatch, useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'


function Signup() {
    const navigate=useNavigate()
    const [error, seterror]=useState()
    const dispatch=useDispatch()
    const {register, HandleSubmit}=useForm()

    const signup= async (data)=>{
        seterror("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData=authService.getCurrentUser()
                if(userData)dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            seterror(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={HandleSubmit}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name :"
                            placeholder="Enter your full name"
                            {...register("name",{
                                required: true,
                            })}
                        />
                        <Input
                            label="Email :"
                            placeholder="Enter your Email"
                            {...register("email",{
                                required: true,
                                validate:{
                                    matchPattern:(value)=>
                                    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(value) ||
                                    "Email addtess must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="password :"
                            placeholder="Enter your Password"
                            {...register("password",{
                                required: true,
                                validate:{
                                    matchPattern:(value)=>
                                    /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm.test(value) ||
                                    "Invallid Password"
                                }
                            })}
                        />
                        <Button type='submit' className='w-full'>
                            Create Account
                        </Button>
                    </div>
                </form>

        </div>
    </div>
  )
}

export default Signup
