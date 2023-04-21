// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function Test() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const fd = new FormData();

//   const formData = (e) => {
//     fd.append("postText", e.postText);
//     fd.append("postImg", e.postImg[0]);
//     console.log(fd);
//     const config = { headers: { "Content-Type": "multipart/form-data" } };
//     axios
//       .post("http://127.0.0.1:3001/posts/createpost", fd, config)
//       .then((res) => {
//         console.log(res.data);
//       });
//   };
//   return (
//     <div>
//       <h1>tests</h1>
//       <form
//         className="h-2xl"
//         onSubmit={handleSubmit((e) => {
//           formData(e);
//         })}
//       >
//         <input
//           className="h-25px postImg"
//           type="file"
//           {...register(
//             "postImg"
//             //   { required: true }
//           )}
//         />
//         {errors.postImg && <span>required</span>}
//         <input
//           type="text"
//           className="postText"
//           {...register("postText", { required: true })}
//         />
//         {errors.postText && <span>required</span>}

//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// }

// export default Test;

var isPowerOfTwo = function (n) {
  if (n === 0) {
    return true;
  }
  if (n === 1) {
    return false;
  }
  while (n !== 1) {
    if (n % 2 === 0) {
      return;
    }
  }
};
