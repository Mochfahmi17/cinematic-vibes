import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/search/multi`, {
          params: {
            query: location.search.slice(3),
            page: page,
          },
        });
        setData((prev) => {
          return [...prev, ...response.data.results];
        });
      } catch (error) {
        console.log(error);
      }
    };

    setPage(1);
    setData([]);
    fetchData();
  }, [location.search, page]);

  return (
    <div className="py-16">
      <div className="sticky top-[70px] z-30 mx-2 my-2 lg:hidden">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={location.search.slice(3).replaceAll("%20", " ")}
          className="w-full rounded-full px-4 py-1 text-lg text-neutral-900"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="my-3 text-lg font-semibold capitalize lg:text-xl">
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center gap-6 lg:justify-start">
          {data.map((searchData, i) => {
            return (
              <Card
                key={searchData.id + "search" + i}
                data={searchData}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
