import React from "react";
import axios from "axios";
import { useState } from "react";
import Axios from "../../utils/axios";
export default function NewPost() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    await Axios.post("createpost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <form onSubmit={submit}>
      <input
        className="2xl"
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        accept="image/*"
      ></input>
      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        type="text"
        placeholder="Caption"
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}
