import { Row, Col, Container } from "react-bootstrap/";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Sign.css";
import { useDispatch } from "react-redux";
import { update } from "../features/language/languageSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { mySupabase } from "../mysuba";

const SignUp = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const lang = useAppSelector((state) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang, setDirection]);
  useEffect(() => {
    console.log("weird");
  }, []);

  const userInfo = useAppSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo.email) {
      navigate("/courses");
    }
  }, [userInfo]);
  const handleSignUp = async (e: any) => {
    e.preventDefault();

    let { data, error } = await mySupabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(data, error);
  };

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
            <div className="signup-intro"> انشاء حساب</div>
            <div
              className="sign-form"
              style={{
                color: theme === "dark" ? "#daa520" : "black",
              }}
            >
              <Form>
                <Form.Group className="mb-3" controlId="formbasicuserName">
                  <Form.Label>اسم المستخدم</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter user name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <Form.Label>رقـم الهاتف</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>البريد الالكتروني</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>كلمة السر</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="submit-container">
                  {/*     <Link to="/onboarding">
                    {" "} */}
                  <Button
                    className="join_button"
                    variant="warning"
                    type="submit"
                    onClick={(e: any) => handleSignUp(e)}
                  >
                    <div> تسجيل</div>
                  </Button>
                  {/*     // </Link> */}
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="flex-item item-picture">
          <div
            style={{
              backgroundImage: `url('../media/sign_up_background.png')`,
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
