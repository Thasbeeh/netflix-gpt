import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import Header from "./Header";
import { Container } from "./layout/Container";
import { Footer } from "./Footer";

const GptSearch = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/60" />
        <img
          className="h-full w-full object-cover"
          alt=""
          aria-hidden="true"
          src={BG_URL}
        />
      </div>
      <div className="grow pt-6 xs:pt-8 sm:pt-10 md:pt-12 lg:pt-32 xl:pt-36 pb-16 flex flex-col justify-center gap-6 xs:gap-8 w-full">
        <Container maxWidth="narrow">
          <GptSearchBar />
        </Container>
        <Container maxWidth="default">
          <GptMovieSuggestions />
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default GptSearch;
