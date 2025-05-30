import "./FrontPage.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const FrontPage = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
  }, [lang]);
  return (
    <div style={{ background: theme === "dark" ? "#333333" : "white" }}>
      <div
        className="flex-container"
        style={{
          flexDirection: direction,
        }}
      >
        <div
          className="intro_container flex-item item-text_front_page"
          style={{
            background:
              theme === "dark"
                ? "#333333"
                : "linear-gradient(to left top, #808080, #ffffff)",
          }}
        >
          <div className="intro_text_front_page">
            <div className="front-page-intro-golden">
              {" "}
              You never forget the openings
            </div>{" "}
            <div
              className="front-page-intro-extra"
              style={{
                color: theme === "light" ? "black" : "white",
              }}
            >
              Learning and support techniques help increase retention and recall
              by up to 95%. Even from the beginning of painful play, like a
              book... to the middle of change, like an actor, and the end of
              impact, like the greats.
            </div>
          </div>

          <div className="button_container">
            <Link to="/signup">
              <Button className="join_button">
                <div> Join for Free</div>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-item item-picture">
          <div
            style={{
              backgroundImage: `url('../media/front_page_background.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "68vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
