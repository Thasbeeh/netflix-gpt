import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toogleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative min-h-screen w-full">
      <Header />

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60" />

        <img
          className="h-full w-full object-cover"
          alt="login-page-background"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbfbf920-aae8-4f40-95f7-28cd7910f1e8/web/IN-en-20260427-TRIFECTA-perspective_5f59ca49-2de3-4727-9fdd-2aad23de56c8_large.jpg"
        />
      </div>

      <div className="flex justify-center items-center h-[80vh]">
        <form className="relative flex flex-col p-12 bg-black/75 w-full max-w-md rounded-md text-white">
          <h1 className="text-3xl font-bold mb-7">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 my-3 bg-[#333] rounded"
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-4 my-3 bg-[#333] rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 my-3 bg-[#333] rounded"
          />
          <button className="p-4 mt-6 mb-2 bg-red-600 rounded font-bold">
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
