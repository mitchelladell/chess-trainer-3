import { Row, Col, Container } from "react-bootstrap/";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Sign.css";
import { useAppSelector } from "../app/hooks";
import { update } from "../features/language/languageSlice";
import FacebookIcon from "../pgns/icons/FaceBookIcon";
import GoogleIcon from "../pgns/icons/GoogleIcon";
import { Justify } from "react-bootstrap-icons";
import { loginUserAsync } from "../features/user/userSlice";
import { useAppDispatch } from "../app/hooks";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const [logResponse, setLogResponse] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const lang = useAppSelector((state) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  const handleLogin = () => {
    dispatch(loginUserAsync({ email: email, password: password })).then(
      (response) => {
        console.log("responseee", response);
        if (response?.payload?.status === 200) {
          setLogResponse(response.payload.message);

          navigate("/courses");
        } else {
          setLogResponse(response.payload.response.data.error);
        }
        console.log("resposne", response);
      }
    );
  };
  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang, setDirection]);

  return (
    <div className="parent">
      <div
        className="flex-container"
        style={{
          flexDirection: direction,
          background: theme === "light" ? "white" : "black",
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
            <div className="signin-intro">تسجيل الدخول</div>
            <div
              className="sign-form"
              style={{
                color: theme === "dark" ? "#daa520" : "black",
              }}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formbasicuserName">
                  <Form.Label>اسم المستخدم أو البريد الإلكـتـروني</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter user name or passsword"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>كلمة السر</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div> {logResponse}</div>

                <div className="submit-container">
                  {/*                   <Link to="/courses">
                   */}{" "}
                  <Button
                    className="join_button"
                    variant="warning"
                    onClick={() => handleLogin()}
                  >
                    <div>الدخول</div>
                  </Button>
                  {/*                   </Link>
                   */}{" "}
                </div>

                <div className="or_keyword">أو</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginRight: "20%",
                    marginLeft: "20%",
                    marginBottom: "2%",
                  }}
                >
                  <FacebookIcon /> <GoogleIcon />
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
