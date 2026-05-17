import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../utils/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { Container } from "./layout/Container";

export const Footer = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const langKey = useSelector((store) => store.config.language);
  const dispatch = useDispatch();

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <footer className="w-full bg-black text-neutral-500 py-4 xs:py-6 md:py-10 border-t border-neutral-900 mt-auto select-none">
      <Container maxWidth="default">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:pb-8 border-b border-neutral-900/50">
          <div>
            <p className="text-sm xs:text-base font-semibold text-neutral-400 mb-2">
              Questions? Call +91 1234567890
            </p>
            <p className="text-sm text-neutral-500">
              Developed by{" "}
              <span className="text-red-500 font-bold hover:text-red-400 hover:scale-105 inline-block transition-all duration-200 cursor-pointer">
                Thasbeeh
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 xs:gap-4">
            {/* Email Link */}
            <a
              href="mailto:ahmedthasbeeh@gmail.com"
              className="group px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs xs:text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm shadow-black/20"
            >
              <svg
                className="w-4 h-4 text-neutral-500 group-hover:text-red-500 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Email</span>
            </a>

            <a
              href="https://linkedin.com/in/thasbeeh-m"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs xs:text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm shadow-black/20"
            >
              <svg
                className="w-4 h-4 text-neutral-500 group-hover:text-red-500 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Thasbeeh"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs xs:text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm shadow-black/20"
            >
              <svg
                className="w-4 h-4 text-neutral-500 group-hover:text-red-500 transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0 pt-3 border-t border-neutral-900/50">
          {showGptSearch ? (
            <div className="relative inline-block">
              <select
                className="py-1.5 px-3 text-xs xs:text-sm font-semibold rounded-md bg-neutral-900 hover:bg-neutral-800 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors border border-neutral-800 text-neutral-400"
                onChange={handleLanguageChange}
                value={langKey}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    key={lang.identifier}
                    value={lang.identifier}
                    className="bg-neutral-900"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div />
          )}

          <div className="text-xs text-neutral-600">
            <p>
              © {new Date().getFullYear()} Netflix GPT. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
