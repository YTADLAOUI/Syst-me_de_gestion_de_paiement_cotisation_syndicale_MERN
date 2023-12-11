import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import loginImage from '../assets/images/login.jpg';

const register = () => {
      const backgroundStyle = {
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
      const { handleSubmit, control, formState: {errors}, getValues} = useForm();
      
       const onSubmit = (data) => {
         console.log(data);
  }
  return (
   <>
          <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly" style={backgroundStyle}>

          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Register</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-1">
                <label htmlFor="name" className="text-sm font-semibold text-gray-500">Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        id="name"
                        className={`px-4 py-2 transition duration-300 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="email"
                        id="email"
                        className={`px-4 py-2 transition duration-300 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="password"
                        id="password"
                        className={`px-4 py-2 transition duration-300 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                      />
                      {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="confirm_password" className="text-sm font-semibold text-gray-500">Confirm Password</label>
                <Controller
                  name="confirm_password"
                  control={control}
                  rules={{
                    required: 'Confirm Password is required',
                    validate: (value) => value === getValues('password') || 'Passwords do not match',
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="password"
                        id="confirm_password"
                        className={`px-4 py-2 transition duration-300 border ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'} rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200`}
                      />
                      {errors.confirm_password && <p className="text-sm text-red-500">{errors.confirm_password.message}</p>}
                    </>
                  )}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Sign up
                </button>
              </div>
            </form>
            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you have an account...</p>
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">Login</button>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default register