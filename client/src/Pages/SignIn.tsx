import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./Sign.css";
import { useAppSelector } from "../app/hooks";
import FacebookIcon from "../pgns/icons/FaceBookIcon";
import GoogleIcon from "../pgns/icons/GoogleIcon";
import { loginUserAsync } from "../features/user/userSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { mySupabase } from "../mysuba";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const userInfo = useAppSelector((state) => state.user);

  const lang = useAppSelector((state) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  const handleLogin = async () => {
    dispatch(loginUserAsync({ email: email, password: password }));
    if (userInfo.userLoggedIn) {
      navigate("/courses");
    } else {
      setError("Login Failed");
    }
  };

  useEffect(() => {
    if (userInfo.userLoggedIn) {
      navigate("/courses");
    }
  }, [userInfo, navigate]);

  const handleGoogleLogin = async () => {
    console.log("loggin");

    let { data, error } = await mySupabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(data, error);
  };

  const handleFacebookLogin = async () => {
    console.log("login");
    let { data, error } = await mySupabase.auth.signInWithOAuth({
      provider: "facebook",
    });

    console.log(data, error);
  };
  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang, setDirection]);

  return (
    <div className="parent">
      <div
        className="flex-container"
        style={{
          flexDirection: direction,
          background: theme === "light" ? "white" : "",
        }}
      >
        <div
          className="intro_container flex-item item-text"
          style={{
            background:
              theme === "dark"
                ? "#333333"
                : "linear-gradient(to left top, #808080, #ffffff)",
          }}
        >
          <div className="intro_text">
            <div className="signin-intro">Login</div>
            <div
              className="sign-form"
              style={{
                color: theme === "dark" ? "#daa520" : "black",
              }}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formbasicuserName">
                  <Form.Label> Name or Email</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter user name or passsword"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <div className="sign-error"> {error}</div>}
                <div className="submit-container">
                  <Button
                    className="join_button"
                    variant="warning"
                    onClick={() => handleLogin()}
                  >
                    <div>Login</div>
                  </Button>
                </div>

                <div className="or_keyword">Or Login With</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginRight: "20%",
                    marginLeft: "20%",
                    marginBottom: "2%",
                  }}
                >
                  <div
                    onClick={handleFacebookLogin}
                    className="external_login_icons"
                  >
                    <FacebookIcon />{" "}
                  </div>
                  <div
                    onClick={handleGoogleLogin}
                    className="external_login_icons"
                  >
                    {" "}
                    <GoogleIcon />{" "}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="flex-item item-picture">
          <div
            style={{
              backgroundImage: `url('../media/sign_in_background.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "75vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
