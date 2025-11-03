import "./Gigs.scss";
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    min: "",
    max: "",
  });

  const [gigs, setGigs] = useState([]);
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setFilters({
      category: params.category || "",
      min: params.min || "",
      max: params.max || "",
    });

    const fetchGigs = async () => {
      try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(
          `http://localhost:8000/api/gigs?${query}&sort=${sort}`
        );
        const data = await res.json();
        setGigs(data);
      } catch (err) {
        console.error("❌ Error fetching gigs:", err);
      }
    };

    fetchGigs();
  }, [searchParams, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const apply = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setSearchParams(params);
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          Liverr {">"} Graphics & Design {">"}
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input
              onChange={handleFilterChange}
              name={"min"}
              value={filters.min}
              type="text"
              placeholder="min"
            />
            <input
              onChange={handleFilterChange}
              name={"max"}
              value={filters.max}
              type="text"
              placeholder="max"
            />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales"
                ? "Best Selling"
                : sort === "createdAt"
                ? "Newest"
                : sort === "price"
                ? "Expensivest"
                : sort === "popular"
                ? "Popular"
                : "Sort"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {
                  <>
                    {sort !== "sales" && (
                      <span onClick={() => reSort("sales")}>Best Selling</span>
                    )}
                    {sort !== "createdAt" && (
                      <span onClick={() => reSort("createdAt")}>Newest</span>
                    )}
                    {sort !== "price" && (
                      <span onClick={() => reSort("price")}>Expensivest</span>
                    )}
                    {/* {sort !== "popular" && (
                      <span onClick={() => reSort("popular")}>Popular</span>
                    )} */}
                  </>
                }
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs?.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
