import { Row, Col, Container } from "react-bootstrap/";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import "./Sign.css";
import { useDispatch } from "react-redux";
import { update } from "../features/language/languageSlice";
import "./onBoarding.css";
import { Link } from "react-router-dom";

const Onboarding = () => {
  const [level, setLevel] = useState(null);
  console.log("value", level);

  function levelOptions() {
    return (
      <Form>
        <Form.Check
          type={"radio"}
          label="radio"
          value="new"
          name="level"
          onClick={(e) => setLevel(e.target.value)}
          id="radio"
          className="radio_check_option"
        />

        <Form.Check
          type={"radio"}
          label="radio"
          name="level"
          value="amateur"
          onClick={(e) => setLevel(e.target.value)}
          id="radio"
          className="radio_check_option"
        />
        <Form.Check
          type={"radio"}
          label="radio"
          value="intermediate"
          name="level"
          onClick={(e) => setLevel(e.target.value)}
          id="type"
          className="radio_check_option"
        />
        <Form.Check
          type={"radio"}
          label="radio"
          value="advanced"
          name="level"
          onClick={(e) => setLevel(e.target.value)}
          id="type"
          className="radio_check_option"
        />
      </Form>
    );
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      dispatch(update(lang));
    }
  }, [dispatch]);
  return (
    <div className="parent">
      <div className="flex-container">
        <div className="intro_container flex-item item-text">
          <div className="intro_text">
            <div className="signin-intro">تسجيل الدخول</div>
            <div>{levelOptions()}</div>
            <div className="confirm_button_container">
              <Link to="/courses">
                <Button variant="warning" className="confirmation_button">
                  {" "}
                  تأكيد
                </Button>{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-item item-picture">
          <div
            style={{
              backgroundImage: `url('../media/onboarding_background.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "88vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
