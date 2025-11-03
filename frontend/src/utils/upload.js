const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/erfan/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const { url } = await res.json();
    return url;
  } catch (err) {
    console.log(err);
  }
};
export default upload;
