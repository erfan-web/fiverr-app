import { useState } from "react";
import Review from "../review/Review";
import "./Reviews.scss";
import { useEffect } from "react";
const Reviews = ({ gigId }) => {
  const [gigReviews, setGigReviews] = useState(null);
  const fetchGigReviews = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/reviews/${gigId}`);
      const data = await res.json();
      setGigReviews(data);
    } catch (err) {
      console.error("❌ Error fetching gigs:", err);
    }
  };

  useEffect(() => {
    fetchGigReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = e.target[0].value;
    const star = e.target[1].value;
    try {
      const res = await fetch(`http://localhost:8000/api/reviews`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ star, description, gigId }),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        fetchGigReviews();
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error("❌ Error Create Review:", err);
    }
  };
  if (gigReviews)
    return (
      <div className="reviews">
        <h2>Reviews</h2>
        {gigReviews.map((rev) => (
          <Review key={rev._id} {...rev} />
        ))}
        <div className="add">
          <h3>Add a Reveiw</h3>
          <form className="addForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="write your opinion" />
            <select name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button>Send</button>
          </form>
        </div>
      </div>
    );
};
export default Reviews;
