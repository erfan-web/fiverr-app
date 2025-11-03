import { useEffect } from "react";
import "./Gig.scss";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import { useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Gig = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/gigs/single/${id}`);
        const data = await res.json();
        setGig(data);
      } catch (err) {
        console.error("❌ Error fetching gigs:", err);
      }
    };
    fetchGig();
  }, []);
  useEffect(() => {
    const fetchGigUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/${gig.userId}`
        );
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          // console.log(data);
        } else {
          // console.log(data);
        }
      } catch (err) {
        console.error("❌ Error fetching gigs:", err);
      }
    };

    fetchGigUser();
  }, [gig]);

  const handleCheckout = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/orders/create-payment/${id}`,
        {
          credentials: "include",
          method: "POST",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await res.json();

      if (res.ok) {
        window.location.href = `https://gateway.zibal.ir/start/${data.trackId}`;
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (gig)
    return (
      <div className="gig">
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr {`>`} Graphics & Design {`>`}
            </span>
            <h1>{gig.title}</h1>
            {user && (
              <div className="user">
                <img
                  className="pp"
                  src={user.image || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{user.username}</span>
                {!isNaN(gig.totalStars / gig.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(gig.totalStars / gig.starNumber))
                      .fill()
                      .map((_, i) => (
                        <img key={i} src="/img/star.png" alt="" />
                      ))}
                    <span>{Math.round(gig.totalStars / gig.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <div className="slider">
              <Swiper
                modules={[Navigation]}
                navigation
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                centeredSlides
                className="slider"
              >
                {gig.images?.map((img) => (
                  <SwiperSlide key={img}>
                    <img key={img} src={img} alt="" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <h2>About This Gig</h2>
            <p>{gig.description}</p>
            {user && (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={user.image || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{user.username}</span>
                    {!isNaN(gig.totalStars / gig.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(gig.totalStars / gig.starNumber))
                          .fill()
                          .map((_, i) => (
                            <img key={i} src="/img/star.png" alt="" />
                          ))}
                        <span>
                          {Math.round(gig.totalStars / gig.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">USA</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  {user.desc && (
                    <>
                      <hr />
                      <p>{user.desc}</p>
                    </>
                  )}
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{gig.shortTitle}</h3>
              <h2>$ {gig.price}</h2>
            </div>
            <p>{gig.shortDescription}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{gig.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{gig.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {gig.features.map((item, index) => (
                <div className="item" key={index}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={handleCheckout}>Continue</button>
          </div>
        </div>
      </div>
    );
};

export default Gig;
