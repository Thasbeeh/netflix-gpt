const VideoTitle = ({ original_title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[13%] px-4 md:px-24 absolute text-white bg-linear-to-r from-black">
      <h1 className="text-1xl md:text-6xl font-bold">{original_title}</h1>
      <p className="hidden md:inline-block py-6 text-2xl w-1/3">{overview}</p>
      <div className="my-4 md:m-0 flex items-center">
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-white/75 transition-all cursor-pointer">
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500/50 text-white p-4 px-12 text-xl rounded-lg hover:bg-gray-500/80 transition-all cursor-pointer">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
