import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import HeaderComponent from "../../components/HeaderComponent";
function EditProfilepage() {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("someID");
  const token = useSelector((state) => state.token);
  const preloadedValues = { ...user };

  const [caption, setCaption] = useState("someID");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: preloadedValues,
  });

  console.log("herreeeeeeeeeeeeeeeeee");
  // console.log(preloadedValues);
  const handlePost = async (event) => {
    // event.preventDefault();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>", event.picturePath[0]); //className[index]==image[0]

    const formData = new FormData();
    formData.append("image", event.picturePath[0]);
    formData.append("firstName", event.firstName);
    formData.append("lastName", event.lastName);
    formData.append("userName", event.userName);
    formData.append("email", event.email);
    formData.append("phoneNumber", event.phoneNumber);
    formData.append("city", event.city);
    formData.append("desc", event.desc);
    formData.append("from", event.from);

    formData.append("occupation", event.occupation);

    await axios.put(
      ` http://localhost:3001/users/updateUser/${user._id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // const fetchUser = async (userId) => {
    //   console.log("fetch posts");
    //   let res = await axios.get("/posts/profile/" + userId);
    //   // console.log(res);
    //   // setPosts(res.data);
    //   dispatch(
    //     setPosts({
    //       posts: res.data,
    //     })
    //   );
    // };
  };

  return (
    <>
      <HeaderComponent />

      <h1 className="text-3xl font-bold text-center text-gray-800 p-4 bg-gradient-to-br from-indigo-400 to-purple-400 font-mono w rounded-3xl">
        Edit Profile
      </h1>
      <form
        onSubmit={handleSubmit((e) => {
          handlePost(e);
        })}
        className="grid grid-cols-2 w-1/2 gap-4 p-8 bg-gradient-to-br from-yellow-200 to-orange-200 font-mono w rounded-3xl text-center p-6 mt-5 rounded-lg shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-md"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-80 text-white rounded-md p-2"
        >
          first name
        </label>
        <input
          className="firstName   border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
          placeholder={user.firstName}
          {...register("firstName", { required: true })}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && <p role="alert">First name is required</p>}

        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          last name
        </label>
        <input
          className=" lastName   border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ref={user.lastName}
          {...register("lastName", { required: true })}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && <p role="alert">last name is required</p>}

        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          user name
        </label>
        <input
          className="userName   border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={user.userName}
          {...register("userName", { required: true })}
          aria-invalid={errors.userName ? "true" : "false"}
        />
        {errors.userName && <p role="alert">user name is required</p>}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          email:{" "}
        </label>
        <input
          className="email   border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={user.email}
          {...register("email", { required: true })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p role="alert">{errors.email?.message}</p>}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          phone number:
        </label>
        <input
          placeholder={user.phoneNumber}
          className="phoneNumber  border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ref={user.phoneNumber}
          {...register("phoneNumber", { required: true })}
          aria-invalid={errors.phoneNumber ? "true" : "false"}
        />
        {errors.phoneNumber && (
          <p role="alert">{errors.phoneNumber?.message}</p>
        )}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          status
        </label>
        <input
          placeholder={user.desc}
          className="desc  border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("desc", { required: true })}
          aria-invalid={errors.desc ? "true" : "false"}
        />
        {errors.desc && <p role="alert">{errors.desc?.message}</p>}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          city:
        </label>
        <input
          placeholder={user.city}
          className="city  border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("city", { required: true })}
          aria-invalid={errors.city ? "true" : "false"}
        />
        {errors.city && <p role="alert">{errors.city?.message}</p>}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          From:
        </label>
        <input
          placeholder={user.from}
          className="from border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("from", { required: true })}
          aria-invalid={errors.from ? "true" : "false"}
        />
        {errors.from && <p role="alert">{errors.city?.from}</p>}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          Occupation
        </label>
        <input
          placeholder={user.occupation}
          className="occupation border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("occupation", { required: true })}
          aria-invalid={errors.occupation ? "true" : "false"}
        />
        {errors.occupation && <p role="alert">{errors.occupation?.message}</p>}
        <label
          htmlFor="someID"
          className="bg-gray-800 text-xl bg-opacity-50 text-white rounded-md p-2"
        >
          Profile Pic
        </label>
        <input
          className="picturePath border border-gray-300 bg-gray-50 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          placeholder="add Image"
          {...register("picturePath", { required: true })}
          aria-invalid={errors.picturePath ? "true" : "false"}
        ></input>
        {errors.picturePath && (
          <p role="alert">{errors.picturePath?.message}</p>
        )}
        <div>
          <div className="w-1/2"></div>
          <input
            className=" align-middle bg-emerald-600 py-2 px-4 rounded-md shadow-md backdrop-filter backdrop-blur-lg backdrop-saturate-150 hover:shadow-xl hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200"
            type="submit"
          ></input>
        </div>
      </form>
    </>
  );
}

export default EditProfilepage;
