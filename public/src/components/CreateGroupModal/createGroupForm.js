// import { useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const CreateGroupForm = () => {
//   const [groupName, setGroupName] = useState("");
//   const [description, setDescription] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const user = useSelector((state) => state.user);
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Create a new FormData object to send the form data with the image

//     console.log("groupName", groupName);
//     const formData = new FormData();
//     formData.append("groupName", groupName);
//     formData.append("description", description);
//     formData.append("avatar", avatar);
//     console.log(formData.get(groupName));
//     try {
//       // Send a POST request to the server to create the new group
//       const response = await axios.post(
//         `http://localhost:3001/group/create/${user._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(response.data);
//       // Reset the form after the group has been created
//       setGroupName("");
//       setDescription("");
//       setAvatar(null);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAvatarChange = (event) => {
//     setAvatar(event.target.files[0]);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="groupName">Group Name:</label>
//       <input
//         type="text"
//         id="groupName"
//         value={groupName}
//         onChange={(event) => setGroupName(event.target.value)}
//       />

//       <label htmlFor="description">Description:</label>
//       <textarea
//         id="description"
//         value={description}
//         onChange={(event) => setDescription(event.target.value)}
//       />

//       <label htmlFor="avatar">Avatar:</label>
//       <input type="file" id="avatar" onChange={handleAvatarChange} />

//       <button type="submit">Create Group</button>
//     </form>
//   );
// };

// export default CreateGroupForm;

import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object to send the form data with the image
    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("description", description);
    formData.append("avatar", avatar);

    try {
      // Send a POST request to the server to create the new group
      const response = await axios.post(
        `http://localhost:3001/group/create/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      // Reset the form after the group has been created
      setGroupName("");
      setDescription("");
      setAvatar(null);
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
  return (
    // <form className="bg-slate-500" onSubmit={handleSubmit}>
    //   <label htmlFor="groupName">Group Name:</label>
    //   <input
    //     className="bg-slate-500"
    //     type="text"
    //     id="groupName"
    //     value={groupName}
    //     onChange={(event) => setGroupName(event.target.value)}
    //   />

    //   <label htmlFor="description">Description:</label>
    //   <textarea
    //     className="bg-slate-500"
    //     id="description"
    //     value={description}
    //     onChange={(event) => setDescription(event.target.value)}
    //   />

    //   <label htmlFor="avatar">Avatar:</label>
    //   <input
    //     className="avatar"
    //     type="file"
    //     id="avatar"
    //     onChange={handleAvatarChange}
    //   />

    //   <button type="submit">Create Group</button>
    // </form>
    <>
      <button
        className="m-3 p-3  rounded-3xl bg-pink-900  hover:bg-lime-700"
        onClick={toggleModal}
      >
        Create Group
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Group</h2>
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label
                  htmlFor="groupName"
                  className="block  text-white  font-bold mb-2"
                >
                  Group Name:
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(event) => setGroupName(event.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4  text-white font-bold">
                <label
                  htmlFor="description"
                  className="block  text-white font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="avatar"
                  className="block  text-white font-bold mb-2"
                >
                  Avatar:
                </label>
                <input
                  type="file"
                  id="avatar"
                  onChange={handleAvatarChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Group
                </button>
              </div>
            </form>

            <button
              className="m-3 p-3  rounded-3xl bg-pink-900  hover:bg-lime-700"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroupForm;
