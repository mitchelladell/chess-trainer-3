import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./user_profile.css";
import { StarSign } from "../pgns/icons/UserProfileIcons/StarSign";
import { JoinDate } from "../pgns/icons/UserProfileIcons/JoinDate";
import { WhomIFollow } from "../pgns/icons/UserProfileIcons/WhomIFollow";
import { WhoFollowsMe } from "../pgns/icons/UserProfileIcons/whoFollowsMe";
import { Streak } from "../pgns/icons/UserProfileIcons/Streak";
import { MaxStreak } from "../pgns/icons/UserProfileIcons/MaxStreak";
import CourseCard from "../components/CourseCard/CourseCard";

const UserProfile = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const subScribtedCourses = [1, 2, 3, 4];
  const coursesMade = [1, 2, 3, 4];

  const lang = useAppSelector((state: any) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div
        className="flex-container"
        style={{
          flexDirection: direction,
          background: theme === "light" ? "white" : "",
        }}
      >
        <Container>
          <Row>
            <Col xs={12} sm={9} md={6} lg={6}>
              {" "}
              <div className="profile-intro-text">
                ملف أسم صاحب الحساب الشخصى{" "}
              </div>
            </Col>
            <Col align={"end"} xs={12} sm={9} md={6} lg={6}>
              <Link to="/payments">
                {" "}
                <Button className="user_profile_button">المشتـــريات</Button>
              </Link>{" "}
              <Link to="/profilesettings">
                <Button className="user_profile_button">
                  {" "}
                  تعديل الملف الشخصـي
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <div
            className="profile_container"
            style={{
              background:
                theme === "dark"
                  ? "#333333"
                  : "linear-gradient(to left top, #808080, #ffffff)",
            }}
          >
            <Row style={{ flexDirection: direction }}>
              <Col align={"end"} xs={12} sm={9} md={9} lg={9}>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div
                    className="item_dashboard"
                    style={{
                      color: theme === "dark" ? "" : "black",
                      background: theme === "dark" ? "" : "white",
                    }}
                  >
                    <div className="item_style">
                      {" "}
                      <div
                        className="item_keyword"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                      <div
                        className="item_value"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <StarSign />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div
                    className="item_dashboard"
                    style={{
                      color: theme === "dark" ? "" : "black",
                      background: theme === "dark" ? "" : "white",
                    }}
                  >
                    <div className="item_style">
                      {" "}
                      <div
                        className="item_keyword"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <JoinDate />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div
                    className="item_dashboard"
                    style={{
                      color: theme === "dark" ? "" : "black",
                      background: theme === "dark" ? "" : "white",
                    }}
                  >
                    <div className="item_style">
                      {" "}
                      <div
                        className="item_keyword"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <WhomIFollow />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div
                    className="item_dashboard"
                    style={{
                      color: theme === "dark" ? "" : "black",
                      background: theme === "dark" ? "" : "white",
                    }}
                  >
                    <div className="item_style">
                      {" "}
                      <div
                        className="item_keyword"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <WhoFollowsMe />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div
                    className="item_dashboard"
                    style={{
                      color: theme === "dark" ? "" : "black",
                      background: theme === "dark" ? "" : "white",
                    }}
                  >
                    <div className="item_style">
                      {" "}
                      <div
                        className="item_keyword"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <Streak />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div
                    className="item_dashboard"
                    style={{
                      color: theme === "dark" ? "" : "black",
                      background: theme === "dark" ? "" : "white",
                    }}
                  >
                    <div className="item_style">
                      {" "}
                      <div
                        className="item_keyword"
                        style={{
                          color: theme === "dark" ? "" : "black",
                        }}
                      >
                        Hello
                      </div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <MaxStreak />
                  </div>
                </div>
              </Col>
              <Col align={"end"} xs={12} sm={3} md={3} lg={3}>
                <div
                  style={{
                    backgroundImage: `url('../media/empty_profile_photo.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right top",
                    backgroundSize: "contain",
                    height: "100%",
                    width: "100%",
                    minHeight: "100px",
                    minWidth: "100px",
                  }}
                ></div>
              </Col>
            </Row>
          </div>
          <div
            className="profile-intro-text"
            style={{
              textAlign: "right",
              color: theme === "dark" ? "#daa520" : "black",
            }}
          >
            {" "}
            الدورات التـي قمت بدراستها
          </div>
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              overflowX: "auto",
              justifyContent: "center",
            }}
          >
            {subScribtedCourses.map((course) => (
              <CourseCard />
            ))}
          </div>
          <div
            className="profile-intro-text"
            style={{
              textAlign: "right",
              color: theme === "dark" ? "#daa520" : "black",
            }}
          >
            {" "}
            الدورات التـي قمت بإعدادها
          </div>
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              overflowX: "auto",
              justifyContent: "center",
            }}
          >
            {subScribtedCourses.map((course) => (
              <CourseCard />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserProfile;
