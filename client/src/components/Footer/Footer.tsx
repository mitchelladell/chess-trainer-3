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
        <Container fluid>
          <Row>
            <Col>
              <p>Copyright 2023 Contact us at :chessarabs.gmail.com</p>
            </Col>
            <Col className="d-flex justify-content-end">
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
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
