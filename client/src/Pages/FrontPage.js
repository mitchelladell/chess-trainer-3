import "./FrontPage.css";
import Button from "react-bootstrap/Button";
import background from "../Media/background.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../consts/translations";
import { useSelector } from "react-redux";

import axios from "axios";
import { useState } from "react";
const FrontPage = () => {
  const lang = useSelector((state) => state.language.value);

  const [greeting, setGreeting] = useState("");

  axios.get("http://localhost:8080/test").then((response) => {
    // handle response
    console.log("respone", response);
    setGreeting(response.data);
  });

  return (
    <div
      className="frontpage-container"
      style={{
        background: `url(${background})`,
        width: "100vw",
        height: "85vh",
        backgroundSize: "contain",
      }}
    >
      <Container align={"left"}>
        <div className="intro"> {greeting}</div>
        <Row>
          <Col>
            <Button
              style={{ color: "white", background: "#43bf82" }}
              size="lg"
              href="/signup"
            >
              {translations[lang].singIn}{" "}
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FrontPage;
