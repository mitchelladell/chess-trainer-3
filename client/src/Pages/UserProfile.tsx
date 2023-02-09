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

const UserProfile = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const subScribtedCourses = [1, 2, 3, 4];
  const coursesMade = [1, 2, 3, 4];

  const lang = useAppSelector((state: any) => state.language.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <Container>
          <Row>
            <Col xs={12} sm={9} md={6} lg={6}>
              {" "}
              <div className="profile-intro-text">
                ملف أسم صاحب الحساب الشخصى{" "}
              </div>
            </Col>
            <Col align={"end"} xs={12} sm={9} md={6} lg={6}>
              {" "}
              <Button className="user_profile_button">المشتـــريات</Button>
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
          <div className="profile_container">
            <Row style={{ flexDirection: direction }}>
              <Col align={"end"} xs={12} sm={9} md={9} lg={9}>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div className="item_dashboard">
                    <div className="item_style">
                      {" "}
                      <div className="item_keyword">Hello</div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <StarSign />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div className="item_dashboard">
                    <div className="item_style">
                      {" "}
                      <div className="item_keyword">Hello</div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <JoinDate />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div className="item_dashboard">
                    <div className="item_style">
                      {" "}
                      <div className="item_keyword">Hello</div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <WhomIFollow />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div className="item_dashboard">
                    <div className="item_style">
                      {" "}
                      <div className="item_keyword">Hello</div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <WhoFollowsMe />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div className="item_dashboard">
                    <div className="item_style">
                      {" "}
                      <div className="item_keyword">Hello</div>
                      <div className="item_value">Hello</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                    <Streak />
                  </div>
                </div>
                <div style={{ display: "inline-flex", width: "100%" }}>
                  <div className="item_dashboard">
                    <div className="item_style">
                      {" "}
                      <div className="item_keyword">Hello</div>
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
          <div className="profile-intro-text" style={{ textAlign: "right" }}>
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
              <div
                style={{
                  backgroundImage: ``,
                  background: "gold",
                  height: "10vw",
                  width: "15vw",
                  minHeight: "100px",
                  margin: "15px",
                  minWidth: "100px",
                }}
              ></div>
            ))}
          </div>
          <div className="profile-intro-text" style={{ textAlign: "right" }}>
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
              <div
                style={{
                  backgroundImage: ``,
                  background: "gold",
                  backgroundRepeat: "no-repeat",
                  height: "10vw",
                  width: "15vw",
                  margin: "15px",
                  minHeight: "100px",
                  minWidth: "100px",
                }}
              ></div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserProfile;
