import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyGigs.scss";

function MyGigs() {
  const [gigs, setGigs] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        if (user) {
          const res = await fetch(
            `http://localhost:8000/api/gigs?userId=${user._id}`,
            {
              credentials: "include",
            }
          );
          const data = await res.json();
          if (res.ok) {
            setGigs(data);
          } else {
            setError(data.error);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching gigs:", err);
      }
    };
    fetchGigs();
  }, [user]);

  useEffect(() => {
    const isLogin = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("weeeeeeeeeeeeeee have error:" + err);
      }
    };
    isLogin();
  }, []);

  const handleClick = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/gigs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (err) {}
    const filtred = gigs.filter((gig) => gig._id !== id);
    setGigs(filtred);
  };
  if (user)
    return (
      <div className="myGigs">
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {user.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gigs &&
                gigs.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img className="image" src={gig.cover} />
                    </td>
                    <td>{gig.title}</td>
                    <td>{gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <img
                        onClick={() => handleClick(gig._id)}
                        className="delete"
                        src="./img/delete.png"
                        alt=""
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default MyGigs;
