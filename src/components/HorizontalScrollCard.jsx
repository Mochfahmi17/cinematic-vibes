import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrev = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto my-10 px-3">
      <h2 className="mb-3 text-xl font-bold capitalize text-white lg:text-2xl">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="scrollbar-none relative z-10 grid grid-flow-col grid-cols-[repeat(auto-fit,230px)] gap-6 overflow-hidden overflow-x-scroll scroll-smooth transition-all"
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className="absolute top-0 hidden h-full w-full items-center justify-between lg:flex">
          <button
            onClick={handlePrev}
            className="z-10 -ml-2 rounded-full bg-white p-1 text-black opacity-40 transition-all hover:opacity-100"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="z-10 -mr-2 rounded-full bg-white p-1 text-black opacity-40 transition-all hover:opacity-100"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
