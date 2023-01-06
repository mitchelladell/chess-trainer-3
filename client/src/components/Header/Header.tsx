import "./Header.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../../consts/translations";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";

type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
  };
};

const Header: React.FC = () => {
  const lang = useSelector((state: any) => state.language.value);

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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
