import { useRef, useState } from "react";
import Header from "./Header";
import checkValidateData from "../utils/validate";
import api from "../utils/api";
import { useAuthActions } from "../hooks/useAuthActions";
import { BG_URL } from "../utils/constants";
import { Container } from "./layout/Container";
import { Footer } from "./Footer";

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
    <div className="relative min-h-screen w-full flex flex-col justify-between">
      <Header />

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60" />
        <img
          className="h-full w-full object-cover"
          alt="login-page-background"
          src={BG_URL}
        />
      </div>

      <div className="flex-1 flex justify-center items-center py-20 md:py-32 w-full">
        <Container maxWidth="narrow" className="flex justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative flex flex-col p-6 xs:p-8 sm:p-12 md:p-16 bg-black/80 w-full max-w-112.5 rounded-md text-white shadow-2xl"
          >
            <h1 className="text-2xl xs:text-3xl font-bold mb-6 md:mb-8">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                type="text"
                ref={name}
                placeholder="Full Name"
                className="p-4 my-2.5 bg-gray-800/80 focus:bg-gray-700/90 text-white rounded outline-none border-b-2 border-transparent focus:border-red-600 transition-all text-sm xs:text-base"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-4 my-2.5 bg-gray-800/80 focus:bg-gray-700/90 text-white rounded outline-none border-b-2 border-transparent focus:border-red-600 transition-all text-sm xs:text-base"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 my-2.5 bg-gray-800/80 focus:bg-gray-700/90 text-white rounded outline-none border-b-2 border-transparent focus:border-red-600 transition-all text-sm xs:text-base"
            />

            {errorMessage && (
              <p className="font-semibold text-red-500 text-sm mt-2">
                {errorMessage}
              </p>
            )}

            <button
              className="p-4 mt-6 mb-3 bg-red-600 hover:bg-red-700 transition-colors rounded font-bold text-sm xs:text-base cursor-pointer shadow-lg active:scale-[0.98] transition-transform duration-100"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="text-xs xs:text-sm text-gray-400 hover:underline cursor-pointer mt-4 text-center md:text-left"
              onClick={toogleSignInForm}
            >
              {!isSignInForm
                ? "Already registered? Sign In now"
                : "New to Netflix? Sign Up now"}
            </p>
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
