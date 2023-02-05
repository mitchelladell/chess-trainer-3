import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./user_profile.css";

const UserProfile = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");

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
              <Button className="user_profile_button">
                {" "}
                تعديل الملف الشخصـي
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="profile_container">
            <Row>
              <Col align={"end"} xs={12} sm={9} md={6} lg={6}>
                {items.map((item) => (
                  <div className="item_dashboard">
                    {Object.entries(item).map(([key, value]) => (
                      <div
                        className="item_style"
                        style={{
                          flexDirection: direction,
                        }}
                      >
                        <div className="item_keyword">{`${key}`}</div>
                        <div className="item_value">{`${value}`}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </Col>
              <Col align={"end"} xs={12} sm={9} md={6} lg={6}>
                <div
                  style={{
                    backgroundImage: `url('../media/empty_profile_photo.png')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                    backgroundSize: "contain",
                    height: "111px",
                    width: "95%",
                    marginTop: "15px",
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

export default UserProfile;
