import { Row, Col, Container } from "react-bootstrap/";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Sign.css";
import { useDispatch } from "react-redux";
import { update } from "../features/language/languageSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const SignUp = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state) => state.language.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang, setDirection]);

  return (
    <div className="parent">
      <div className="flex-container" style={{ flexDirection: direction }}>
        <div className="intro_container flex-item item-text">
          <div className="intro_text">
            <div className="signup-intro"> انشاء حساب</div>
            <div className="sign-form">
              <Form>
                <Form.Group className="mb-3" controlId="formbasicuserName">
                  <Form.Label>اسم المستخدم</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter user name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>رقـم الهاتف</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>البريد الالكتروني</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>كلمة السر</Form.Label>
                  <Form.Control
                    className="inputs"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <div className="submit-container">
                  <Link to="/onboarding">
                    {" "}
                    <Button
                      className="join_button"
                      variant="warning"
                      type="submit"
                    >
                      <div> تسجيل</div>
                    </Button>
                  </Link>
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
