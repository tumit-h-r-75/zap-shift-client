import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {createUser,googleSigneIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    console.log('Register Data:', data);
    createUser(data.email,data.password)
    .then(res=>{
        console.log(res.user);
        navigate(from, { replace: true });
    })
    .catch(err=>{
        console.error(err);
    })
  };

  const handleGoogleLogin = () => {
        googleSigneIn()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black">Create an Account</h2>
        <p className="text-sm text-gray-600">Register with Profast</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
          className="input input-bordered w-full"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 text-white w-full">
          Register
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link>
      </div>

      <div className="divider text-gray-500">or</div>

      <button onClick={handleGoogleLogin} className="btn btn-outline w-full flex items-center justify-center gap-2">
        <FcGoogle className="text-xl" /> Register with Google
      </button>
    </div>
  );
};

export default Register;
