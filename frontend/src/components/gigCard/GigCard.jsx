import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const GigCard = ({ item }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchGigUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/${item.userId}`
        );
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("❌ Error fetching gigs:", err);
      }
    };

    fetchGigUser();
  }, []);

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src={user.image || "/img/noavatar.jpg"} alt="" />
            <span>{user.username}</span>
          </div>
          <p className="desc">{item.description}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
