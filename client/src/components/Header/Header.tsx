import "./Header.css";
import react, { useState, useEffect } from "react";
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
import ChessUsityLogo from "../../pgns/icons/ChessUsityLogo";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { logoutAsync } from "../../features/user/userSlice";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  console.log("isLoggedIn", props.isLoggedIn);

  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("token") ? true : false
  );

  useEffect(() => {
    setIsLoggedIn(Cookies.get("token") ? true : false);
  }, [Cookies.get("token")]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("cliced");
    dispatch(logoutAsync());
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="header_container">
          <Container fluid>
            {" "}
            <Row>
              <Col sm={4} md={4} lg={2}>
                <Link to="/">
                  <ChessUsityLogo />
                </Link>
              </Col>

              <Col style={{ margin: "auto" }}>
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
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "right",
                    }}
                  >
                    <Link to="/signup">
                      <Button variant="" className="signup_button">
                        {(translations as Translation)[lang].signUp}
                      </Button>{" "}
                    </Link>

                    <Link to="/login">
                      <Button variant="" className="login_button">
                        {(translations as Translation)[lang].signIn}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="header_container">
          <Container fluid>
            <Row>
              <Col sm={4} md={4} lg={2}>
                <Link to="/">
                  <ChessUsityLogo />
                </Link>
              </Col>
              <Col style={{ margin: "auto" }}>
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
              <Col align="right" xs={1} sm={1} md={1} lg={1}>
                <div className="d-flex justify-content-center align-items-center">
                  <Notification />
                </div>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3}>
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
                      onClick={() => handleLogout()}
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
