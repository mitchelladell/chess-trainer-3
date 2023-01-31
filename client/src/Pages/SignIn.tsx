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
import { Link } from "react-router-dom";

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
            <div className="signin-intro">تسجيل الدخول</div>
            <div className="sign-form">
              <Form>
                <Form.Group className="mb-3" controlId="formbasicuserName">
                  <Form.Label>اسم المستخدم أو البريد الإلكـتـروني</Form.Label>

                  <Form.Control
                    className="inputs"
                    type="text"
                    placeholder="Enter user name"
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
                  <Link to="/courses">
                    <Button
                      className="join_button"
                      variant="warning"
                      type="submit"
                    >
                      <div>الدخول</div>
                    </Button>
                  </Link>
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
              backgroundSize: "contain",
              height: "65vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
