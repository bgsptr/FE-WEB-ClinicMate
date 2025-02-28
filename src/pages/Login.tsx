import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { variables } from "../constants/variable";
import Cookies from "js-cookie";

const Login = () => {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({
      ...login,
      [e.target.id]: e.target.value
    })
  }

  const navigate = useNavigate();

  const url = `${variables.BASE_URL}/users/login`;

  const changedLoginData = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(url, JSON.stringify(login), {
        headers: {
          'Content-Type': "application/json"
        },
        // withCredentials: true
      });

      console.log("token", res.data.user);
      const { token } = res.data.user;
      // console.log(token);
      localStorage.setItem("token", token);


      navigate('/dashboard');
    } catch (error) {
      
    }
  }

  return (
    <div className="flex w-full min-h-screen">
      <img src="/left-login.png" className="w-1/2 mr-6" />
      <div className="py-[5rem] w-1/2 px-[10rem] flex flex-col gap-2 bg-[#f6f6f6]">
        <div className="flex items-center gap-3">
          <img src="logo-myclinic.png" alt="" className="w-[32px] h-[32px]" />
          <h1 className="font-semibold text-lg">ClinicMate</h1>
        </div>
        <h1 className="font-extrabold text-2xl">Welcome</h1>
        <p className="text-lg text-black font-light mb-8">
          Please log in to access the Dashboard
        </p>
        <form action="h-full flex flex-col gap-9">
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={login.email}
              className="mb-6 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Email"
              required
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={login.password}
              className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Masukkan Password"
              required
            />

            <div className="flex justify-between">
              <div className="flex mb-4 gap-2">
                <input type="checkbox" />
                <p>Remember Me</p>
              </div>
              <h3 className="underline">Lupa password?</h3>
            </div>

            <button
              type="submit"
              onClick={changedLoginData}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log In
            </button>

            <h3 className="text-center mt-3">
              Don't have an account ?{" "}
              <span className="text-[#478CCF]">Signup now</span>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
