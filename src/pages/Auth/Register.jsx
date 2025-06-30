import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAxios from '../../hooks/useAxios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios()
  const [profilePic, setProfilePic] = useState('');



  const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    console.log('Register Data:', data);
    createUser(data.email, data.password)
      .then(async(res) => {
        console.log(res.user);
        // update user info inthe data base 
        const userInfo = {
          email: data.email,
          role: "user", //defoult role
          createdAt: new Date().toISOString(), 
          last_log_In: new Date().toISOString()
        }
        
        const userRes = await axiosInstance.post('/users',userInfo)
        
        console.log(userRes.data);

        // update userProfile in firebase 
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUser(userProfile)
          .then(() => {
            console.log('profile namr picture updated');
          })
          .catch(error => {
            console.log(error);
          })

        navigate(from, { replace: true });
      })
      .catch(err => {
        console.error(err);
      })
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_apiKey}`

    const res = await axios.post(imageUploadUrl, formData)

    setProfilePic(res.data.data.url);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-black">Create an Account</h2>
        <p className="text-sm text-gray-600">Register with Profast</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


        {/* Profile Image Upload UI */}
        <div className="flex justify-center">
          <label
            htmlFor="profilePic"
            className="cursor-pointer relative w-24 h-24 rounded-full border-4 border-lime-400 flex items-center justify-center overflow-hidden"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400" />
            )}
            <input
              id="profilePic"
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        {/* name fild */}
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

      <div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
