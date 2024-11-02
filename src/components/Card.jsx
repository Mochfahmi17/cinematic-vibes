import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="relative block h-80 w-full min-w-[230px] max-w-[230px] overflow-hidden rounded duration-300 ease-in-out hover:scale-105"
    >
      {data.poster_path ? (
        <img src={imageURL + data.poster_path} alt={data.title || data.name} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-center">
          No image found
        </div>
      )}

      <div className="absolute top-4">
        {trending && (
          <div className="rounded-br rounded-tr bg-black/60 px-4 py-1 backdrop-blur-3xl">
            #{index} Trending
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-16 w-full bg-black/60 p-2 backdrop-blur-3xl">
        <h2 className="line-clamp-1 text-ellipsis text-lg font-semibold">
          {data.title || data.name}
        </h2>
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <p>{moment(data.first_air_date || data.release_date).format("LL")}</p>
          <p className="rounded-full bg-black px-1 text-xs text-white">
            Rating : {Number(data.vote_average).toFixed(1)}+
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
