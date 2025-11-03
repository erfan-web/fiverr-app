import React, { useEffect, useState } from "react";
import "./Orders.scss";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/orders`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
          console.log(data);
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
    fetchOrders();
  }, []);

  const handleContact = async (order) => {
    const { sellerId, buyerId } = order;
    const id = sellerId + buyerId;
    try {
      const res = await fetch(
        `http://localhost:8000/api/conversations/single/${id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      navigate(`/message/${data.id}`);
      if (!res.ok) {
        const res = await fetch(`http://localhost:8000/api/conversations`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            to: user && user.isSeller ? buyerId : sellerId,
          }),
          headers: { "content-type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          navigate(`/message/${data.id}`);
        }
      }
    } catch (err) {}
  };
  if (error)
    return (
      <>
        <div className="notLogin">
          <h1>Orders</h1>
          <p>{error}</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </>
    );

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
          {orders &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.image} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
