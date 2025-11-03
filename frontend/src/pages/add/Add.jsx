import React, { useEffect, useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, initialState } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useNavigate } from "react-router-dom";
const Add = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [coverImg, setCoverImg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, initialState);

  useEffect(() => {
    const isLogin = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          dispatch({ type: "ADD_ID", payload: data.user._id });
        }
      } catch (err) {
        console.error("weeeeeeeeeeeeeee have error:" + err);
      }
    };
    isLogin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", payload: { name, value } });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    dispatch({ type: "ADD_FEATURES", payload: value });
    e.target[0].value = "";
  };
  const handleUploads = async (e) => {
    setUploading(true);
    try {
      const cover = await upload(coverImg);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  const handleCreateGig = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/gigs`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(state),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/mygigs`);
      } else {
        alert(data.error);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
              name={"title"}
            />
            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setCoverImg(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUploads}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
            ></textarea>
            <button onClick={handleCreateGig}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              onChange={handleChange}
              placeholder="e.g. One-page web design"
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDescription"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form className="addFeatureForm" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURES", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <input type="text" placeholder="e.g. file uploading" />
            <input type="text" placeholder="e.g. setting up a domain" />
            <input type="text" placeholder="e.g. hosting" />
            <label htmlFor="">Price</label>
            <input name="price" onChange={handleChange} type="number" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
