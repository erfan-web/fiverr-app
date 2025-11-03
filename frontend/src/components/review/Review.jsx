import { useEffect, useState } from "react";
import "./Review.scss";
const Review = ({ description, star, userId }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchReviewUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("❌ Error fetching ReviewUser:", err);
      }
    };

    fetchReviewUser();
  }, []);
  if (user)
    return (
      <div className="item-review">
        <div className="user">
          <img className="pp" src={user.image || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{user.username}</span>
          </div>
        </div>
        <div className="stars">
          {Array(star)
            .fill()
            .map((_, i) => (
              <img key={i} src="/img/star.png" alt="" />
            ))}
          <span>{star}</span>
        </div>
        <p>{description}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
      </div>
    );
};
export default Review;
