import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [profilePic, setProfilePic] = useState('');
  const [uploading, setUploading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      const user = res.user;
      console.log(user);

      // update userProfile in firebase
      await updateUser({
        displayName: data.name,
        photoURL: profilePic
      });

      // save to database
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: profilePic,
        role: "user",
        createdAt: new Date().toISOString(),
        last_log_In: new Date().toISOString()
      };

      const response = await axiosInstance.post('/users', userInfo);
      console.log('Saved to DB:', response.data);

      Swal.fire('Success!', 'Account created successfully!', 'success').then(() => {
        navigate(from, { replace: true });
      });

    } catch (error) {
      console.error("Register Error:", error);
      Swal.fire('Error', 'Registration failed. Try again.', 'error');
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);
    setUploading(true);
    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_apiKey}`;
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image Upload Failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Create an Account</h2>
        <p className="text-sm text-gray-500">Register with Profast</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Profile Image Upload */}
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
        {uploading && <p className="text-center text-sm text-blue-600">Uploading image...</p>}

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="input input-bordered w-full"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="input input-bordered w-full"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" }
          })}
          className="input input-bordered w-full"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        {/* Submit Button */}
        <button type="submit" className="btn bg-lime-500 hover:bg-lime-600 text-white w-full">
          Register
        </button>
      </form>

      {/* Already have account */}
      <div className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link>
      </div>

      {/* Divider */}
      <div className="divider text-gray-500 mt-6">or</div>

      {/* Social login */}
      <SocialLogin />
    </div>
  );
};

export default Register;
