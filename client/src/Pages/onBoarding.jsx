import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import { useAppSelector } from "../app/hooks";
import "./onBoarding.css";
import { Link } from "react-router-dom";

const Onboarding = () => {
  const [level, setLevel] = useState(null);
  const [direction, setDirection] = useState("row");
  const lang = useAppSelector((state) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);
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
                fontSize: "16px",
              }}
            >
              <div
                style={{
                  color: theme === "dark" ? "#daa520" : "black",
                  marginRight: "10px",
                }}
              >
                {" "}
                  I am new to the game              
                  </div>{" "}
              <div style={{ color: "#43BF82", marginLeft: "10px" }}>
                {" "}
                new
              </div>{" "}
            </div>
          }
          value="new"
          name="level"
          onClick={(e) => setLevel(e?.target?.value)}
          id="radio"
          className="radio_check_option"
          style={{
            background: theme === "dark" ? "#707070" : "white",
          }}
        />

        <Form.Check
          type={"radio"}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
              }}
            >
              <div
                style={{
                  color: theme === "dark" ? "#daa520" : "black",
                  marginRight: "10px",
                }}
              >
                I Know some rules and strategies   
                {" "}
           </div>{" "}
              <div style={{ color: "#F6EE07", marginLeft: "10px" }}>
                {" "}
                Amateur
              </div>{" "}
            </div>
          }
          name="level"
          value="amateur"
          onClick={(e) => setLevel(e?.target?.value)}
          id="radio"
          className="radio_check_option"
          style={{
            background: theme === "dark" ? "#707070" : "white",
          }}
        />
        <Form.Check
          type={"radio"}
          label={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
              }}
            >
              <div
                style={{
                  color: theme === "dark" ? "#daa520" : "black",
                  marginRight: "10px",
                }}
              >
                {" "}
              I have decent understanding              </div>{" "}
              <div style={{ color: "#20C7DA", marginLeft: "10px" }}>
                {" "}
               Intermediate
              </div>{" "}
            </div>
          }
          value="intermediate"
          name="level"
          onClick={(e) => setLevel(e?.target?.value)}
          id="type"
          className="radio_check_option"
          style={{
            background: theme === "dark" ? "#707070" : "white",
          }}
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
              <div
                style={{
                  color: theme === "dark" ? "#daa520" : "black",
                  marginRight: "10px",
                }}
              >
                {" "}
                Almost professional              
                </div>
              <div style={{ color: "#EF7373", marginLeft: "10px" }}>
                {" "}
                Advanced              
                </div>
            </div>
          }
          value="advanced"
          name="level"
          onClick={(e) => setLevel(e?.target?.value)}
          id="type"
          className="radio_check_option"
          style={{
            background: theme === "dark" ? "#707070" : "white",
          }}
        />
      </Form>
    );
  }

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");    console.log("lang", lang);
  }, [lang]);
  return (
    <div className="parent">
      <div
        className="flex-container_onboarding"
        style={{
          flexDirection: direction,
          background: theme === "light" ? "white" : "black",
        }}
      >
        <div
          className="intro_container flex-item item-text-onboarding"
          style={{
            background:
              theme === "dark"
                ? "#333333"
                : "linear-gradient(to left top, #808080, #ffffff)",
          }}
        >
          <div
            className="onboarding_text"
            style={{
              color: theme === "dark" ? "#daa520" : "black",
            }}
          >
            <div
              className="signin-intro"
              style={{
                color: theme === "dark" ? "#daa520" : "black",
              }}
            >
              Choose your level
            </div>
            <div>{levelOptions()}</div>
            <div className="confirm_button_container">
              <Link to="/courses">
                <Button
                  variant="warning"
                  className="confirmation_button"
                  /*                   style={{
                    background:
                      theme === "dark" ? "rgb(112, 112, 112)" : "#DAA520",
                  }} */
                >
                  {" "}
                  <div /* style={{ marginTop: "20%" }} */> Confirm</div>
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
              height: "75vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
