import { Row, Col, Container } from "react-bootstrap/";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { update } from "../features/language/languageSlice";
import "./onBoarding.css";
import { Link } from "react-router-dom";

const Onboarding = () => {
  const [level, setLevel] = useState(null);
  const [direction, setDirection] = useState("row");
  const lang = useAppSelector((state) => state.language.value);
  console.log("language", lang);

  console.log("value", level);

  function levelOptions() {
    return (
      <Form>
        <Form.Check
          type={"radio"}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
            >
              <div style={{ color: "#DAA520", marginRight: "10px" }}>
                {" "}
                انا جديد فـي اللعبة
              </div>{" "}
              <div style={{ color: "#43BF82", marginLeft: "10px" }}>
                {" "}
                جـديد
              </div>{" "}
            </div>
          }
          value="new"
          name="level"
          onClick={(e) => setLevel(e?.target?.value)}
          id="radio"
          className="radio_check_option"
        />

        <Form.Check
          type={"radio"}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
            >
              <div style={{ color: "#DAA520", marginRight: "10px" }}>
                {" "}
                اعرف القواعد وبعض الاستـراتيجيات
              </div>{" "}
              <div style={{ color: "#F6EE07", marginLeft: "10px" }}>
                {" "}
                مبتـدئ
              </div>{" "}
            </div>
          }
          name="level"
          value="amateur"
          onClick={(e) => setLevel(e?.target?.value)}
          id="radio"
          className="radio_check_option"
        />
        <Form.Check
          type={"radio"}
          style={{ backgroundImage: "green" }}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
            >
              <div style={{ color: "#DAA520", marginRight: "10px" }}>
                {" "}
                لدي فهم لائـق فـي جميع الجوانب{" "}
              </div>{" "}
              <div style={{ color: "#20C7DA", marginLeft: "10px" }}>
                {" "}
                متوسط{" "}
              </div>{" "}
            </div>
          }
          value="intermediate"
          name="level"
          onClick={(e) => setLevel(e?.target?.value)}
          id="type"
          className="radio_check_option"
        />
        <Form.Check
          type={"radio"}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "17px",
              }}
            >
              <div style={{ color: "#DAA520", marginRight: "10px" }}>
                {" "}
                انا فـي مستوى الاحتـراف او اقـتـرب من مستوى الاحتـراف{" "}
              </div>{" "}
              <div style={{ color: "#EF7373", marginLeft: "10px" }}>
                {" "}
                متقــدم{" "}
              </div>{" "}
            </div>
          }
          value="advanced"
          name="level"
          onClick={(e) => setLevel(e?.target?.value)}
          id="type"
          className="radio_check_option"
        />
      </Form>
    );
  }

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div className="parent">
      <div
        className="flex-container_onboarding"
        style={{ flexDirection: direction }}
      >
        <div className="intro_container flex-item item-text-onboarding">
          <div className="onboarding_text">
            <div className="signin-intro">تسجيل الدخول</div>
            <div>{levelOptions()}</div>
            <div className="confirm_button_container">
              <Link to="/courses">
                <Button variant="warning" className="confirmation_button">
                  {" "}
                  <div /* style={{ marginTop: "20%" }} */> تأكيد </div>
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
              backgroundSize: "contain",
              height: "68vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
