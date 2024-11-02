import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);

  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(() => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  }, [bannerData, currentImage]);

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData, currentImage, handleNext]);

  return (
    <section className="h-full w-full">
      <div className="flex max-h-[95vh] min-h-full overflow-hidden">
        {bannerData.map((data, i) => {
          return (
            <div
              key={data.id + "bannerHome" + i}
              className="group relative min-h-[450px] min-w-full overflow-hidden duration-500 lg:min-h-full"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="h-full w-full">
                <img
                  src={imageURL + data.backdrop_path}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Button next and prev image */}
              <div className="absolute top-0 hidden h-full w-full items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrev}
                  className="z-10 rounded-full bg-white p-1 text-2xl text-black"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="z-10 rounded-full bg-white p-1 text-2xl text-black"
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 h-full w-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto">
                <div className="absolute bottom-0 w-full max-w-md px-3">
                  <h2 className="text-2xl font-bold text-white drop-shadow-2xl lg:text-4xl">
                    {data.title || data.name}
                  </h2>
                  <p className="my-2 line-clamp-3 text-ellipsis">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <Link
                    to={`/${data.media_type}/${data.id}`}
                    className="mt-4 inline-block rounded bg-white from-red-700 to-orange-500 px-4 py-2 font-bold text-black shadow-md transition-all hover:scale-105 hover:bg-gradient-to-l hover:text-white"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
