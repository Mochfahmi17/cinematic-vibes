import { IoClose } from "react-icons/io5";
import { useFetchDetails } from "../hooks/useFetchDetails";

const VideoPlay = ({ videoId, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${videoId}/videos`,
  );

  return (
    <section className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-neutral-700 bg-opacity-50">
      <div className="relative aspect-video max-h-[80vh] w-full max-w-screen-lg rounded bg-black">
        <button onClick={close} className="absolute -right-1 -top-6 text-3xl">
          <IoClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData.results?.find((data) => data.name === "Official Trailer")?.key || videoData?.results?.[0]?.key}`}
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default VideoPlay;
