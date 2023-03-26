export const getPosts = async (id) => {
  const response = await fetch(`http://localhost:3001/posts/timeline/${id}`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
