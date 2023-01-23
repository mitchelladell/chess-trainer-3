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
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                {" "}
                <div> Info</div>
                <div>Blog </div>
                <div> Trainer</div>
                <div>Sciences </div>
                <div> Jobs</div>
                <div> News</div>
                <div> Leader Board</div>
                <div> Road map</div>
                <div>Help?</div>
                <div>Privacy</div>
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
