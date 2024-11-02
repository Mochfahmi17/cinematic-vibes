import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (params.explore) {
      window.scrollTo(0, 0);
      setData([]);
    }
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/discover/${params.explore}`, {
          params: {
            page: pageNo,
          },
        });
        setData((prev) => {
          return [...prev, ...response.data.results];
        });
        setTotalPageNo(response.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [pageNo, params.explore]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center gap-6 lg:justify-start">
          {data.map((exploreData, i) => {
            return (
              <Card
                key={exploreData.id + "exploreSection" + i}
                data={exploreData}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
