// all user apis are listed here//

export const login = async (email, password) => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (userDetails) => {
  console.log("userdetail in register api", userDetails);
  console.log(typeof userDetails.phoneNumber);
  const response = await fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  });
  return response.json();
};

export const OtpLogin = async (phoneNo) => {
  const response = await fetch("http://localhost:3001/auth/OtpLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });
  return response.json();
};

export const checkPhone = async (phoneNo) => {
  console.log("inside checkphone api", phoneNo);
  const response = await fetch("http://localhost:3001/auth/checkphone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });

  return response.json();
};
export const createJwt = async (phoneNo) => {
  console.log("inside createJwt api", phoneNo);
  const response = await fetch("http://localhost:3001/auth/createJwt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNo }),
  });
  return response.json();
};
