import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Messages.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Messages = () => {
  const [convSation, setConvSation] = useState(null);
  const [user, setUser] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/conversations`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setConvSation(data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error("❌ Error fetching gigs:", err);
      }
    };
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

    fetchMessages();
  }, []);
  const handleRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/conversations/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      if (res.ok) {
        setConvSation((prev) =>
          prev.map((c) =>
            c.id === id
              ? user.isSeller
                ? {
                    ...c,
                    readBySeller: true,
                  }
                : {
                    ...c,
                    readByBuyer: true,
                  }
              : c
          )
        );
      }
    } catch (err) {
      console.error("weeeeeeeeeeeeeee have error:" + err);
    }
  };
  if (convSation && user)
    return (
      <div className="messages">
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{user.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {convSation.map((c) => (
                <tr className="active" key={c._id}>
                  <td>{user.isSeller ? c.buyerId : c.sellerId}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{dayjs(c.updatedAt).fromNow()}</td>
                  <td>
                    {((user.isSeller && !c.readBySeller) ||
                      (!user.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Messages;
