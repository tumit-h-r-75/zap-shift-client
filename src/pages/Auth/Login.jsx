import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {sigInUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    console.log('Login Data:', data);
    sigInUser(data.email,data.password)
    .then(res=>{
        console.log(res.user);
        navigate(from, { replace: true });
    })
    .catch(err=>{
        console.error(err);
    })
  };



  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black">Welcome Back</h2>
        <p className="text-sm text-gray-600">Login with Profast</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {...register("password", { required: "Password is required" })}
          className="input input-bordered w-full"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <div className="text-right">
          <Link className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
        </div>

        <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 text-white w-full">
          Login
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Don’t have any account? <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link>
      </div>

      <div className="divider text-gray-500">or</div>

      <div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
