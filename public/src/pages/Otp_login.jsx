import React from "react";
import Homepage from "./Home/Home";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import "../../src/App.css";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { checkPhone } from "../api/usersApi/user";
import { createJwt } from "../api/usersApi/user";
import { number } from "yup";
import { useNavigate } from "react-router-dom";
import { setLogin } from "./state";
import { useDispatch } from "react-redux";
export default function Otp_login() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  console.log(ph, "pppppppppppppppppppppppppppppppppp");
  const handlePhoneNumber = () => {
    console.log("Inside handle phoneno", ph);
    checkPhone(ph).then((result) => {
      console.log(result, "poooooooooooooooooooooooooooooooooo");
      if (result.userExist) {
        onSignup();
      }
    });
  };

  const createToken = () => {
    console.log("create token inside otplogin:jsx");
    createJwt(ph).then((result) => {
      console.log(result);

      dispatch(
        setLogin({
          token: result.token,
          user: result.user,
        })
      );
      navigate("/");

      console.log("token creation completed");
    });
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        await createToken(ph);

        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            <Homepage />
            {/* 👍 Login Success */}
          </h2>
        ) : (
          <div className="w-90 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to Gamers-DEN
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-l text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-l text-white text-center"
                >
                  Verify your phone number
                </label>
                <input
                  type={number}
                  name="phone"
                  country={"in"}
                  value={ph}
                  // onChange={setPh} />
                  onChange={(e) => setPh(e.target.value)}
                />

                <button
                  // onClick={onSignup}
                  onClick={handlePhoneNumber}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send Code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
