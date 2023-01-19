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
import { AiOutlineBell } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
  };
};

type IProps = {
  isLoggedIn?: boolean;
};

const Header: React.FC<IProps> = (props) => {
  const lang = useSelector((state: any) => state.language.value);

  return (
    <div>
      {!props.isLoggedIn ? (
        <div className="header_container">
          <Nav>
            <div
              style={{ display: "flex", width: "100%", justifyContent: "left" }}
            >
              <Nav.Link className="link" href="/courses">
                {(translations as Translation)[lang].courses}
              </Nav.Link>
            </div>
          </Nav>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "right" }}
          >
            {" "}
            <Nav>
              {" "}
              <Nav.Link className="link" href="/signup">
                {(translations as Translation)[lang].signUp}
              </Nav.Link>
              <Nav.Link className="link" href="/signin">
                {(translations as Translation)[lang].signIn}
              </Nav.Link>
            </Nav>
          </div>
        </div>
      ) : (
        <div className="header_container">
          <Container>
            <Row>
              <Col align={"center"} xs={7} md={7} lg={7}>
                {" "}
                <Dropdown className="custom-dropdown">
                  <Dropdown.Toggle
                    className="custom-dropdown-toggle"
                    id="dropdown-basic"
                  >
                    Courses
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      as={Link}
                      to="#/action-1"
                    >
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      as={Link}
                      to="#/action-1"
                    >
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      as={Link}
                      to="#/action-1"
                    >
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col align="right">
                <AiOutlineBell size={"28px"} />
              </Col>

              <Col>
                <FaUserAlt size={"28px"} />
              </Col>
            </Row>
          </Container>{" "}
        </div> //Trainer Header
      )}
    </div>
  );
};

export default Header;
