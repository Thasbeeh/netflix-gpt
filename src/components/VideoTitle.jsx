import { Container } from "./layout/Container";

const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[35%] sm:pt-[20%] md:pt-[15%] absolute text-white bg-linear-to-r from-black/90 via-black/50 to-transparent pointer-events-none">
      <Container maxWidth="full" className="flex flex-col justify-center pointer-events-auto">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl drop-shadow-lg leading-tight">
          {original_title}
        </h1>
        <p className="hidden sm:inline-block py-2 md:py-4 text-xs sm:text-sm md:text-base w-full sm:w-3/4 md:w-2/3 lg:w-1/2 drop-shadow-md opacity-90 line-clamp-3">
          {overview}
        </p>
        <div className="my-2 md:my-4 flex items-center gap-2 md:gap-3">
          <button className="bg-white text-black py-1 xs:py-1.5 sm:py-2 md:py-2.5 px-3 xs:px-4 sm:px-6 md:px-7 text-xs xs:text-sm sm:text-base md:text-lg font-bold rounded hover:bg-white/80 transition-all cursor-pointer flex items-center justify-center">
            ▶ Play
          </button>
          <button className="hidden sm:flex bg-gray-500/70 text-white py-1 xs:py-1.5 sm:py-2 md:py-2.5 px-3 xs:px-4 sm:px-6 md:px-7 text-xs xs:text-sm sm:text-base md:text-lg font-bold rounded hover:bg-gray-500/90 transition-all cursor-pointer items-center justify-center">
            More Info
          </button>
        </div>
      </Container>
    </div>
  );
};

export default VideoTitle;
