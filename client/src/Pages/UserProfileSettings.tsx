import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import "./user_profile_settings.css";

const UserProfileSettings = () => {
  const options = ["الكل", "من يتبعونى", "لا احد"];
  const theme = useAppSelector((state) => state.theme.value);

  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const [followFirstselectedOption, setfollowFirstSelectedOption] = useState(
    options[0]
  );
  const [followSecondselectedOption, setFollowSecondSelectedOption] = useState(
    options[0]
  );
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const items = [
    { "تـاريخ الانضمام": 100 },
    { "نقاط الخـبـرة المكتسبة": 90 },
    { "تـاريخ الانضمام": 90 },
    { "item 4": 90 },
  ];

  let coursesList = ["opening,", "endgame", "queen opening", "king opening"];
  const lang = useAppSelector((state: any) => state.language.value);

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div
        className="flex-container"
        style={{
          flexDirection: direction,
          background:
            theme === "dark"
              ? "#333333"
              : "linear-gradient(to left top, #808080, #ffffff)",
        }}
      >
        <Container>
          <div className="profile_container">
            <Row>
              <Col align={"end"} xs={8} sm={8} md={9} lg={9}>
                <div
                  className="settings_title"
                  style={{
                    color: theme === "dark" ? "#daa520" : "black",
                  }}
                >
                  {" "}
                  اعدادات الحساب الشخصى
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80%"
                    height="3"
                    viewBox="0 0 80% 3"
                  >
                    <path
                      id="Path_17"
                      data-name="Path 17"
                      d="M0,0H961"
                      transform="translate(0 1.5)"
                      fill="none"
                      stroke="#fff"
                      stroke-width="3"
                    />
                  </svg>
                </div>
                <div
                  className="user_settings_form"
                  style={{
                    color: theme === "dark" ? "white" : "black",
                  }}
                >
                  <Form>
                    <Form.Group className="mb-3" controlId="formbasicuserName">
                      <Form.Label>اسم المستخدم </Form.Label>
                      <Form.Control
                        className="inputs"
                        type="text"
                        //  onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formbasicuserName">
                      <Form.Label> البريد الإلكـتـروني</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="text"
                        //  onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>كلمة السر</Form.Label>
                      <Form.Control
                        className="inputs"
                        type="password"
                        //  onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div>من يستطيع رؤية ملفك الشخصى</div>
                    <Dropdown className="follow_button">
                      <Dropdown.Toggle>
                        {followFirstselectedOption}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {options.map((option) => (
                          <Dropdown.Item
                            key={option}
                            onClick={() => setfollowFirstSelectedOption(option)}
                          >
                            {option}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <div>من يستطيع رؤية الدورات التدريبية التـي تتعلمها</div>
                    <Dropdown className="follow_button">
                      <Dropdown.Toggle>
                        {followSecondselectedOption}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {options.map((option) => (
                          <Dropdown.Item
                            key={option}
                            onClick={() =>
                              setFollowSecondSelectedOption(option)
                            }
                          >
                            {option}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <div className="profile_save_container">
                      <Button className="user_profile_button">
                        {" "}
                        حفظ الاعدادات
                      </Button>
                    </div>
                  </Form>
                </div>
              </Col>
              <Col align={"end"} xs={4} sm={4} md={3} lg={3}>
                <div
                  style={{
                    backgroundImage: `url('../media/empty_profile_photo.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "90%",
                    width: "90%",
                  }}
                ></div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserProfileSettings;
