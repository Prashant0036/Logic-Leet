import {React,useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // or 'zod/v4'
import assest from "../assets/assets";
// Docs : https://www.npmjs.com/package/@hookform/resolvers#zod

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';


const signUpSchema = z.object({
  firstName: z.string().min(3, "Name should have atleast 3 Chars"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too short"),
});

const Signup = () => {
  const {register,handleSubmit,formState: { errors },} = useForm({ resolver: zodResolver(signUpSchema) });
  // useForm() is kind of React hook which returns register, handleSubmit, and formState obj
  // Docs : https://www.npmjs.com/package/react-hook-form


const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used
  // useSelector -> to get data from slice

  

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    //         <div>

    //         <form onSubmit={handleSubmit((data) => console.log(data))}>
    //         {/* <form onSubmit={handleSubmit((submittedData) => console.log(data))}> */}
    //       <input {...register('name')} placeholder='Enter Your Name'/>
    //       {errors.name && <span>{errors.name.message}</span>}
    //       {/* or can use ternary operator if errors.name is not undefined */}
    //       {/* {errors.name ? <span>{errors.name.message}</span> : null} */}

    //       <input {...register('emailId')} placeholder='Enter Your Email'/>
    //       {errors.emailId && <span>{errors.emailId.message}</span>}
    //       {/* here emailId is equivalent to name='emailId' in input tag */}
    //       <input type='password' {...register('password')} placeholder='Create a Password' />
    //       {/* <input {...register('Lastname', { required: true })} />
    //       {errors.lastName && <p>Last name is required.</p>}
    //       <input {...register('age', { pattern: /\d+/ })} />
    //       {errors.age && <p>Please enter number for age.</p>} */}

    //       {/* we can validate these entries using react-hook-form but we'll use zod */}
    //    <button type='submit' className='btn btn-primary'>Submit</button>
    //     </form>

    //         </div>

    <div className="body flex justify-center items-center h-screen">
      <div className="flex items-center justify-between p-4  w-[80vw] ">
        {" "}
        {/* Centering container */}
            <div className="hover-3d">
  {/* content */}
  <figure className="w-[30em] rounded-4xl">
    <img src={assest.toon3D}  />
  </figure>
  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
        <div className="w-96 bg-base-200 shadow-xl">
          {" "}
          {/* Existing card styling */}
          <div
            className="card-body rounded-lg border
            transition-all duration-300
            hover:shadow-[6px_6px_20px_#5754E8]"
          >
            <h2 className="card-title justify-center text-3xl">Logic Leet</h2>{" "}
            {/* Centered title */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Existing form fields */}
              <div className="form-control">
                <label className=" label mb-1">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className={`input input-bordered ${
                    errors.firstName && "input-error"
                  }`}
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <span className="">{errors.firstName.message}</span>
                )}
              </div>

              <div className="form-control  mt-4">
                <label className="label mb-1">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`input input-bordered ${
                    errors.emailId && "input-error"
                  }`}
                  {...register("emailId")}
                />
                {errors.emailId ? (
                  <span className="text-error">{errors.emailId.message}</span>
                ) : null}
              </div>

              <div className="form-control mt-4">
                <label className="label mb-1">
                  <span className="label-text">Password</span>
                </label>
              <div className="relative ">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  // Added pr-10 (padding-right) to make space for the button
                  className={`input input-bordered  w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer" // Added transform for better centering, styling
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
                {errors.password && (
                  <span className="text-error">{errors.password.message}</span>
                )}
              </div>

                <div className="form-control mt-6 flex justify-center"> 
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : '' }`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            </form>
            <div className=" mt-3 flex justify-center gap-2">
              <label className="label mb-1">
                <span className="label-text">Already a user? </span>
              </label>
              <Link
                className=" hover:text-[#5754E8] transition-colors duration-200"
                to={"/login"}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// if error exists other wise will be undefined
//const errors = {
// firstName: {
// type: 'minLength', // Type of validation that failed
// message: 'Minimum character should be 3' // Custom error message
// },
// emailId: {
// type: 'invalid_string
// message: 'Invalid Email'
// }
// }
