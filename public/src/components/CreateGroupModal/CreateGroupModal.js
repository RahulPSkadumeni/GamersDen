import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/axios";
// import { setPosts } from "../state";
function CreateGroupModal() {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [image, setImage] = useState(null);
  //   const [post, setPost] = useState("someID");
  const token = useSelector((state) => state.token);
  //   const preloadedValues = { ...user };

  const [caption, setCaption] = useState("someID");
  //   const {
  //     register,
  //     formState: { errors },
  //     handleSubmit,
  //   } = useForm({
  //     // defaultValues: preloadedValues,
  //   });
  const [showModal, setShowModal] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object to send the form data with the image
    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("description", description);
    formData.append("avatar", avatar);

    try {
      // Send a POST request to the server to create the new group
      const response = await Axios.post(`group/create/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  //   const handleCreateGroup = async (event) => {
  //     // event.preventDefault();
  //     console.log(">>>>>>>>>>>>>>>>>>>>>>>", event.picturePath[0]); //className[index]==image[0]

  //     const formData = new FormData();
  //     formData.append("image", event.picturePath[0]);
  //     formData.append("groupName", event.groupName);
  //     formData.append("description", event.description);
  //     console.log(formData.get("image"));
  //     await axios.post(
  //       ` http://localhost:3001/group/create/${user._id}`,
  //       formData,

  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     // const fetchUser = async (userId) => {
  //     //   console.log("fetch posts");
  //     //   let res = await axios.get("/posts/profile/" + userId);
  //     //   // console.log(res);
  //     //   // setPosts(res.data);
  //     //   dispatch(
  //     //     setPosts({
  //     //       posts: res.data,
  //     //     })
  //     //   );
  //     // };
  //   };

  return (
    <>
      <button
        className="m-3 p-3  rounded-3xl bg-pink-900  hover:bg-lime-700"
        onClick={toggleModal}
      >
        Open Modal
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Group</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="groupName">Group Name:</label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <label htmlFor="avatar">Avatar:</label>
              <input type="file" id="avatar" onChange={handleAvatarChange} />

              <button type="submit">Create Group</button>
            </form>

            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateGroupModal;

// <form
// onSubmit={handleSubmit((e) => {
//   handleCreateGroup(e);
// })}
// className="bg-slate-500  grid grid-cols-2 w-3/5"
// >
// <label htmlFor="someID">Group Name</label>
// <input
//   className="groupName bg-slate-500 "
//   placeholder="Group Name"
//   {...register("groupName", { required: true })}
//   aria-invalid={errors.groupName ? "true" : "false"}
// />
// {errors.groupName && <p role="alert">Group name is required</p>}

// <label htmlFor="someID">Description</label>
// <input
//   placeholder="Description"
//   className=" bg-slate-500 description"
//   {...register("description", { required: true })}
//   aria-invalid={errors.description ? "true" : "false"}
// />
// {errors.description && <p role="alert">last name is required</p>}

// <label htmlFor="someID">Profile pic</label>

// <input
//   className="picturePath"
//   onChange={(e) => setFile(e.target.files[0])}
//   type="file"
//   accept="image/*"
//   placeholder="add Image"
//   {...register("picturePath", { required: true })}
//   aria-invalid={errors.picturePath ? "true" : "false"}
// ></input>
// {errors.picturePath && (
//   <p role="alert">{errors.picturePath?.message}</p>
// )}

// <input className="bg-gray-400" type="submit" />
// </form>
