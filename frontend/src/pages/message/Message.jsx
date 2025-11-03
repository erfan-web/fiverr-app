import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useEffect } from "react";
import { useState } from "react";

const Message = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);
  async function fetchMessages() {
    try {
      if (id) {
        const res = await fetch(`http://localhost:8000/api/messages/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setMessages(data);
        } else {
          setError(data.error);
        }
      }
    } catch (err) {
      console.error("❌ Error fetching gigs:", err);
    }
  }

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
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        conversationId: id,
        description: e.target[0].value,
      };
      console.log(formData.conversationId);

      const res = await fetch(`http://localhost:8000/api/messages`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        await fetchMessages();
      }
    } catch (err) {
      console.error("weeeeeeeeeeeeeee have error:" + err.message);
    }
    e.target[0].value = "";
  };
  if (messages && user)
    return (
      <div className="message">
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages</Link> {">"} John Doe {">"}
          </span>
          <div className={`messages`}>
            {messages.map((msg) => (
              <div className={`item ${msg.userId === user._id ? "owner" : ""}`} key={msg._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{msg.description}</p>
              </div>
            ))}
          </div>
          <hr />
          <form onSubmit={handleSubmit} className="write">
            <textarea type="text" placeholder="write a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
};

export default Message;
