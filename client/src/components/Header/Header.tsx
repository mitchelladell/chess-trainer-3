import "./Header.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../../consts/translations";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
              <Link to="/courses">
                {" "}
                <Button className="courses_nav_tab"> Courses</Button>
              </Link>
            </div>
          </Col>
          <Col align={"right"} xs={6} md={6} lg={6}>
            <Button href="/signup" className="signUp">
              {" "}
              {(translations as Translation)[lang].signUp}
            </Button>{" "}
            <Button href="/signin" className="login">
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
