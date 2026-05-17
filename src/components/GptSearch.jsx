import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import Header from "./Header";
import { Container } from "./layout/Container";

const GptSearch = () => {
  return (
    <div>
      <Header />
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60" />
        <img
          className="h-full w-full object-cover"
          alt="login-page-background"
          src={BG_URL}
        />
      </div>
      <div className="pt-[45%] xs:pt-[35%] sm:pt-[30%] md:pt-[20%] lg:pt-[10%] pb-16 flex flex-col justify-center gap-8 w-full">
        <Container maxWidth="narrow">
          <GptSearchBar />
        </Container>
        <Container maxWidth="default">
          <GptMovieSuggestions />
        </Container>
      </div>
    </div>
  );
};
export default GptSearch;
