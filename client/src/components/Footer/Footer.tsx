import React from "react";
import "./Footer.css";
import translations from "../../consts/translations";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/language/languageSlice";
import { Container, Row, Col } from "react-bootstrap";
type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
  };
};

const Footer: React.FC = () => {
  const lang = useSelector(
    (state: { language: { value: string } }) => state.language.value
  );
  const dispatch = useDispatch();
  return (
    <div className="footer">
      <footer>
        <Container>
          <Row>
            <Col sm={10} lg={10} md={10} xl={10}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ margin: "5px" }}> Info</div>
                <div style={{ margin: "5px" }}>Blog </div>
                <div style={{ margin: "5px" }}> Trainer</div>
                <div style={{ margin: "5px" }}>Sciences </div>
                <div style={{ margin: "5px" }}> Jobs</div>
                <div style={{ margin: "5px" }}> News</div>
                <div style={{ margin: "5px" }}> Leader Board</div>
                <div style={{ margin: "5px" }}> Road map</div>
                <div style={{ margin: "5px" }}>Help?</div>
                <div style={{ margin: "5px" }}>Privacy</div>
              </div>
            </Col>
            <Col sm={2} lg={2} md={2} xl={2}>
              <Dropdown className="lang_button">
                <Dropdown.Toggle variant="warning">
                  {(translations as Translation)[lang].lang}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    variant="warning"
                    onClick={() => dispatch(update("en"))}
                  >
                    {(translations as Translation).en.lang}
                  </Dropdown.Item>
                  <Dropdown.Item
                    variant="warning"
                    onClick={() => dispatch(update("ar"))}
                  >
                    {(translations as Translation).ar.lang}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "space-evenly",
              }}
            ></div>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
