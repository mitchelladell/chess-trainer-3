import "./Header.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import translations from "../../consts/translations";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/language/languageSlice";

type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
  };
};

const Header: React.FC = () => {
  const lang = useSelector(
    (state: { language: { value: string } }) => state.language.value
  );
  const dispatch = useDispatch();

  return (
    <div className="header_container">
      <Container fluid>
        <Row>
          <Col align={"left"} xs={6} md={6} lg={6}>
            <div>
              {" "}
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {(translations as Translation)[lang].courses}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/trainer">trainer</Dropdown.Item>
                  <Dropdown.Item href="/courses">courses</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Col align={"right"} xs={6} md={6} lg={6}>
            <Button
              style={{ color: "white", background: "#43bf82" }}
              size="lg"
              href="/signup"
            >
              {" "}
              {(translations as Translation)[lang].signUp}
            </Button>{" "}
            <Button
              style={{ color: "#093c87", background: " white" }}
              size="lg"
              href="/signin"
            >
              {" "}
              {(translations as Translation)[lang].signIn}
            </Button>
            <div style={{ marginTop: "20px" }}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {(translations as Translation)[lang].lang}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => dispatch(update("en"))}>
                    {(translations as Translation).en.lang}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(update("ar"))}>
                    {(translations as Translation).ar.lang}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
