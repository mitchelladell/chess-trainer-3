import "./Header.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../../consts/translations";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePic from "../../pgns/icons/ProfilePic";
import Notification from "../../pgns/icons/Notification";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import SignOutIcon from "../../pgns/icons/SignOut";
import UserProfileIcon from "../../pgns/icons/UserProfile";
import SettingsIcon from "../../pgns/icons/Settings";
import Form from "react-bootstrap/Form";
import ChessUsityLogo from "../../pgns/icons/ChessUsityLogo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { logoutAsync } from "../../features/user/userSlice";
import { updateTheme } from "../../features/Theme/themeSlice";

type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
    allCourses: string;
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
  const coursesList = useAppSelector(
    (state) => state.courses.subscribedCourses
  );

  const isLoggedIn = useAppSelector((state) => state.user.userLoggedIn);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleThemeChange = () => {
    setLightTheme(!lightTheme);
    dispatch(updateTheme(!lightTheme ? "light" : "dark"));
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
              <Col sm={7} md={7} lg={7} jusify="end">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {" "}
                  <Link to={isLoggedIn ? "/courses" : "/"}>
                    <ChessUsityLogo />
                  </Link>
                  <div
                    style={{
                      backgroundImage: "url('../media/v_line.png')",
                      width: "4.66px",
                      height: "auto",
                      marginRight: "15px",
                      marginLeft: "15px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="d-flex justify-content-center align-items-center">
                    {isLoggedIn && (
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
                            Course 1
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="custom-dropdown-item"
                            as={Link}
                            to="#/action-1"
                          >
                            Course 2
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="custom-dropdown-item"
                            as={Link}
                            to="#/action-1"
                          >
                            Course 3
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
              </Col>

              <Col style={{ margin: "auto" }}>
                {" "}
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
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="header_container">
          <Container fluid>
            <Row>
              <Col sm={9} md={9} lg={9} align="end">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {" "}
                  <Link to={isLoggedIn ? "/courses" : "/"}>
                    <ChessUsityLogo />
                  </Link>
                  <div
                    style={{
                      backgroundImage: "url('../media/v_line.png')",
                      width: "4.66px",
                      height: "auto",
                      marginRight: "15px",
                      marginLeft: "15px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="d-flex justify-content-center align-items-center"></div>
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
                          to="/allcourses"
                        >
                          {(translations as Translation)[lang].allCourses}
                        </Dropdown.Item>

                        {coursesList.map((course: any) => {
                          return (
                            <Dropdown.Item
                              className="custom-dropdown-item"
                              as={Link}
                              to={`/courses/${course.id}/coursecontent`}
                              key={course.id}
                            >
                              {course.name}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Col>

              <Col align="end">
                <div
                  style={{
                    justifyContent: "right",
                    display: "flex",
                  }}
                >
                  <Notification />
                  <Dropdown
                    className="custom-dropdown"
                    onToggle={toggleDropdown}
                  >
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
                        to="/profile"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <UserProfileIcon />
                          <div className="profile"> Profile </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="custom-dropdown-item"
                        as={Link}
                        to="/profilesettings"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <SettingsIcon />
                          <div className="settings"> Settings </div>
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
                                onChange={() => handleThemeChange()}
                              />
                            </Form>
                            Bright Theme
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
                            <div className="sign-out"> Sign out</div>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Container>
        </div> //Trainer Header
      )}
    </div>
  );
};

export default Header;
