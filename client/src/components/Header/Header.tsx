import "./Header.css";
import react, { useState } from "react";
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
import { FaHome } from "react-icons/fa";
import ProfilePic from "../../pgns/icons/ProfilePic";
import Notification from "../../pgns/icons/Notification";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import SignOutIcon from "../../pgns/icons/SignOut";
import UserProfileIcon from "../../pgns/icons/UserProfile";
import SettingsIcon from "../../pgns/icons/Settings";
import Form from "react-bootstrap/Form";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  console.log("isLoggedIn", props.isLoggedIn);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {!props.isLoggedIn ? (
        <div className="header_container">
          <div className="d-flex justify-content-center align-items-center">
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                className="custom-dropdown-toggle"
                id="dropdown-basic"
              >
                {(translations as Translation)[lang].courses}
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
          </div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "right" }}
          >
            <Link to="/signup">
              {" "}
              <Button className="singup_button">
                {(translations as Translation)[lang].signUp}
              </Button>{" "}
            </Link>

            <Link to="/login">
              {" "}
              <Button className="login_button">
                {(translations as Translation)[lang].signIn}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="header_container">
          <Container>
            <Row>
              <Col>
                <Link className="styledLink" to="/">
                  <FaHome size={50} />
                </Link>
              </Col>
              <Col align={"left"} xs={6} md={7} lg={7}>
                <div style={{ display: "flex" }}>
                  <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle
                      className="custom-dropdown-toggle"
                      id="dropdown-basic"
                    >
                      {(translations as Translation)[lang].courses}
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
                </div>
              </Col>
              <Col align="right">
                <div className="d-flex justify-content-center align-items-center">
                  <Notification />
                </div>
              </Col>
              <Col>
                <Dropdown className="custom-dropdown" onToggle={toggleDropdown}>
                  <Dropdown.Toggle
                    className="custom-dropdown-toggle-user"
                    id="dropdown-basic"
                    bsPrefix="p-0"
                  >
                    <div className="d-flex justify-content-center align-items-center ">
                      <div className="cornet">
                        {" "}
                        {isDropdownOpen ? (
                          <MdExpandLess
                            style={{
                              position: "absolute",
                              bottom: "0",
                            }}
                          />
                        ) : (
                          <MdExpandMore
                            style={{
                              position: "absolute",
                              bottom: "0",
                            }}
                          />
                        )}
                      </div>

                      <ProfilePic />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      as={Link}
                      to="#/action-1"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <UserProfileIcon />
                        <div className="profile"> الملف الشخصى </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      as={Link}
                      to="#/action-1"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        <SettingsIcon />
                        <div className="settings"> الاعدادات </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      onClick={(event) => {
                        event.preventDefault(); /* your custom logic here */
                      }}
                    >
                      <div className="theme">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              checked={lightTheme}
                              onChange={() => setLightTheme(!lightTheme)}
                            />
                          </Form>
                          الوضع النهارى{" "}
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="custom-dropdown-item"
                      as={Link}
                      to="#/action-1"
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <SignOutIcon />
                          <div className="sign-out"> تسجيل الخروج</div>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>{" "}
        </div> //Trainer Header
      )}
    </div>
  );
};

export default Header;
