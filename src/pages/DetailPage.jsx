import { Link, useParams } from "react-router-dom";
import { useFetchDetails } from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import { useFetch } from "../hooks/useFetch";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import { useState } from "react";
import VideoPlay from "../components/VideoPlay";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DetailPage = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const params = useParams();
  const { data, loading } = useFetchDetails(`/${params.explore}/${params.id}`);
  const { data: castData } = useFetchDetails(
    `/${params.explore}/${params.id}/credits`,
  );
  const { data: similarData } = useFetch(
    `/${params.explore}/${params.id}/similar`,
  );
  const { data: recommendationData } = useFetch(
    `/${params.explore}/${params.id}/recommendations`,
  );

  // duration
  const duration = moment.duration(data.runtime, "minutes");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  // handle play video
  const handlePlayVideo = (data) => {
    setPlayVideoId(data.id);
    setPlayVideo(true);
  };

  if (loading) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-white">
        <DotLottieReact
          src="https://lottie.host/ae201ad0-59db-479c-ba50-a1182a8357c3/bFkqiXmEMa.json"
          loop
          autoplay
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="relative hidden h-[280px] w-full lg:block">
        <div className="h-full w-full">
          <img
            src={imageURL + "/" + data.backdrop_path}
            alt={data.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto flex flex-col gap-5 px-3 py-16 lg:flex-row lg:gap-10 lg:py-0">
        <div className="relative mx-auto w-fit min-w-60 lg:mx-0 lg:-mt-28">
          <img
            src={imageURL + "/" + data.poster_path}
            alt={data.title}
            className="h-80 w-60 rounded object-cover"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full rounded bg-white from-red-500 to-orange-500 px-4 py-2 text-center text-lg font-bold text-black transition-all hover:scale-105 hover:bg-gradient-to-l hover:text-white"
          >
            Play Now
          </button>
        </div>

        <div>
          <h2 className="text-center text-2xl font-bold text-white lg:text-start lg:text-4xl">
            {data.title || data.name}
          </h2>
          <p className="text-center text-neutral-400 lg:text-start">
            {data.tagline}
          </p>

          <Divider />

          <div className="mb-3 gap-3">
            <p>rating : {Number(data.vote_average).toFixed(1)}+</p>
            <p>view : {Number(data.vote_count)}</p>
            <p>Genre : {data.genres?.map((genre) => genre.name).join(", ")}</p>
          </div>

          <Divider />

          <div>
            <h3 className="mb-1 text-xl font-bold text-white">Synopsis</h3>
            <p>{data.overview}</p>

            <Divider />

            <div className="my-3 flex items-center gap-4 text-center">
              <p>Status : {data.status}</p>
              <span className="hidden lg:inline">|</span>
              <p>
                Release date :{" "}
                {data.release_date
                  ? moment(data.release_date).format("MMMM D YYYY")
                  : moment(data.first_air_date).format("MMMM D YYYY")}
              </p>
              <span className="hidden lg:inline">|</span>
              {params.explore === "movie" ? (
                <p>
                  duration : {hours}h {minutes}m
                </p>
              ) : (
                <p>Episodes : {data.number_of_episodes}</p>
              )}
            </div>

            <Divider />
          </div>

          <div>
            <p>
              <span className="text-white">Director</span> :{" "}
              {castData.crew
                ?.filter((item) => item.job === "Director")
                .map((item) => item.name)
                .join(", ")}
            </p>
            <p>
              <span className="text-white">Producer</span> :{" "}
              {castData.crew
                ?.filter((item) => item.job === "Producer")
                .map((item) => item.name)
                .join(", ")}
            </p>
          </div>

          <h2 className="my-2 text-lg font-bold text-white">Actors : </h2>
          <div className="my-4 grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData.cast
              ?.filter((cast) => cast.profile_path)
              .map((cast, i) => {
                return (
                  <div key={i}>
                    <div>
                      <Link
                        to={`https://id.wikipedia.org/wiki/${cast.name.replaceAll(" ", "_")}`}
                        target="_blank"
                        className="group"
                      >
                        <img
                          src={imageURL + "/" + cast.profile_path}
                          alt={cast.name}
                          className="h-24 w-24 rounded-full object-cover transition-all group-hover:scale-110"
                        />
                        <p className="text-center text-sm font-bold">
                          {cast.name}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard
          data={recommendationData}
          heading={`Recommended ${params.explore}`}
          media_type={params.explore}
        />
        <HorizontalScrollCard
          data={similarData}
          heading={`Similar ${params.explore}`}
          media_type={params.explore}
        />
      </div>

      {/* Play Video */}
      {playVideo && (
        <VideoPlay
          videoId={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params.explore}
        />
      )}
    </div>
  );
};

export default DetailPage;
