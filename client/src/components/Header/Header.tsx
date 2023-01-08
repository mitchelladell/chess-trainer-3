import "./Header.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../../consts/translations";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "react-bootstrap";

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
          <Nav>
            <Col md={9}>
              {" "}
              <Nav.Link className="link" href="/courses">
                {(translations as Translation)[lang].courses}
              </Nav.Link>{" "}
            </Col>
            <Col>
              {" "}
              <Nav.Link className="link" href="/signup">
                {(translations as Translation)[lang].signUp}
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link className="link" href="/signin">
                {(translations as Translation)[lang].signIn}
              </Nav.Link>
            </Col>
          </Nav>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
