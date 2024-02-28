import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import Logo from './Logo'
import Button from './Button'
import Input from './Input'
import { UseDispatch, useDispatch } from 'react-redux'
import authService, { AuthService } from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, seterror]=useState('')

    const login = async(data)=>{
        seterror('')
        try {
            const session = await authService.login(data)
            if(session) {
                const userData=await authService.getCurrentUser()
            
            if(userData)dispatch(authLogin(userData));
            navigate('/')
            }
        } catch (error) {
            seterror(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100pxl'>
                <Logo width='100%' />
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold loading-tight'>
        Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t have any account?&nbsp;
            <Link to='/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'>
                Sign Up
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'></div>
            <Input
                label="Email :"
                placeholder="Enter your email"
                type="email"
                {...register("email",{
                    required: true,
                    validate: {
                        matchPattern: (value)=>
                        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm.test(value) ||
                        "Email addtess must be a valid address"
                    }
                })}
            />
            <Input
            label="password"
            placeholder="Enter your Password"
            type="password"
            {...register("password",{
                required: true,
                validate:{
                    matchPattern:(value)=>
                    /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm.test(value) ||
                    "Invallid Password"
                }
            })}
             />
             <Button type="submit" className='w-full'
             >Sign in</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
