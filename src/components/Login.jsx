import { useRef, useState } from "react";
import Header from "./Header";
import checkValidateData from "../utils/validate";
import api from "../utils/api";
import { useAuthActions } from "../hooks/useAuthActions";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const { login } = useAuthActions();

  const toogleSignInForm = () => setIsSignInForm(!isSignInForm);

  const handleButtonClick = async () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value,
    );

    setErrorMessage(message);
    if (message) return;

    if (isSignInForm) {
      try {
        const response = await api.post("/auth/login", {
          email: email.current.value,
          password: password.current.value,
        });
        login(response.data.user, response.data.accessToken);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    } else {
      try {
        const response = await api.post("/auth/signup", {
          displayName: name.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        login(response.data.user, response.data.accessToken);
      } catch (error) {
        setErrorMessage(
          error.response.data.statusCode + "-" + error.response.data.message,
        );
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60" />

        <img
          className="h-full w-full object-cover"
          alt="login-page-background"
          src={BG_URL}
        />
      </div>

      <div className="flex justify-center items-center h-[80vh]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex flex-col p-12 bg-black/75 w-full max-w-md rounded-md text-white"
        >
          <h1 className="text-3xl font-bold mb-7">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              ref={name}
              placeholder="Full Name"
              className="p-4 my-3 bg-[#333] rounded"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-3 bg-[#333] rounded"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-3 bg-[#333] rounded"
          />
          <p className="font-bold text-red-600 ">{errorMessage}</p>
          <button
            className="p-4 mt-6 mb-2 bg-red-600 rounded font-bold"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="p-2 m-2 cursor-pointer" onClick={toogleSignInForm}>
            {!isSignInForm
              ? "Already registered? Sign In now"
              : "New to Netflix? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
