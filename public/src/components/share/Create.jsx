import axios from "axios";
import React from "react";
import { useState } from "react";
import Axios from "../../utils/axios";

export default function Create() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    await Axios.post("posts/createpostWithImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <div className="w-5/4">
      <form onSubmit={submit}>
        <input
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
    </div>
  );
}
