import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "./Course.css";
import { StarSign } from "../pgns/icons/UserProfileIcons/StarSign";
import NoviceIcon from "../pgns/icons/CoursesLevelColors/Novice";
import AmaterurIcon from "../pgns/icons/CoursesLevelColors/Amateur";
import IntermediateIcon from "../pgns/icons/CoursesLevelColors/Intermediate";
import AdvancedIcon from "../pgns/icons/CoursesLevelColors/Advanced";
import FavoriteIcon from "../pgns/icons/FavoriteIcon";
import NotFavoriteIcon from "../pgns/icons/NotFavoriteIcon";
const Course = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state: any) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  const [addedToFavorite, setAddedToFavorte] = useState(false);

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
          background: theme === "light" ? "white" : "",
        }}
      >
        <Container>
          <Row>
            <Col xs={5} sm={5} md={3} lg={3}>
              <div
                className={theme === "dark" ? "ads-area" : "ads-area-light"}
              ></div>
            </Col>

            <Col xs={9} sm={9} md={3} lg={3}>
              <div className="course-info">
                <div className="info-title"> معلومات الدورة التدريبية</div>{" "}
                <div className="prespective">
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="37"
                      height="36"
                      viewBox="0 0 37 36"
                    >
                      <image
                        id="BKS"
                        width="37"
                        height="36"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="37"
                      height="36"
                      viewBox="0 0 37 36"
                    >
                      <image
                        id="WKS"
                        width="37"
                        height="36"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAkCAYAAAAOwvOmAAAACXBIWXMAAC4jAAAuIwF4pT92AAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTAyLTAzVDE5OjU5OjIyKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wMi0wM1QyMToxMDoyNSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wMi0wM1QyMToxMDoyNSswMjowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MGI5YTU5Ny01MjBhLWQ2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"
                      />
                    </svg>
                  </div>
                  <div className="key-title"> :المنظور</div>
                </div>
                <div className="key-title">نوع الدورة </div>
                <div className="key-value" style={{ textAlign: "right" }}>
                  {" "}
                  استــراتيجيات الشطرنج
                </div>
                <div className="key-title">مــــدة الدورة</div>
                <div className="course-time">
                  <div className="key-value"> 14</div>
                  <div className="key-value"> ساعة</div>
                </div>
                <div className="course-time">
                  <div className="key-value"> 14</div>
                  <div className="key-value"> دقيقة</div>
                </div>
                <div className="course-time">
                  <div className="key-value"> 14</div>
                  <div className="key-value"> ثانية</div>
                </div>
                <div className="key-title"> عدد التفريعات </div>
                <div className="key-value" style={{ textAlign: "right" }}>
                  {" "}
                  30
                </div>
              </div>
              <div className="course-info">
                <div className="key-title">دورات التدريبية المرشحة </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    {" "}
                    name{" "}
                  </div>{" "}
                  <div
                    style={{
                      background: theme === "light" ? "black" : "white",
                      width: "50px",
                      height: "50px",
                      paddingLeft: "5px",
                    }}
                  >
                    {" "}
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} align="right">
              <div
                className="course-intro"
                style={{ flexDirection: "row-reverse" }}
              >
                <div
                  style={{
                    background: "",
                    backgroundColor: theme === "dark" ? "white" : "black",
                    width: "150px",
                    height: "150px",
                    margin: "10px",
                  }}
                ></div>

                <div className="">
                  {" "}
                  <div
                    className="white-texts"
                    style={{
                      color: theme === "light" ? "black" : "white",
                      textAlign: "right",
                      marginTop: "0px",
                      marginBottom: "0px",
                    }}
                  >
                    {" "}
                    شيس يوستــى
                  </div>
                  <div
                    className="white-texts"
                    style={{
                      color: theme === "light" ? "black" : "white",
                      textAlign: "right",
                      marginTop: "0px",
                      marginBottom: "0px",
                    }}
                  >
                    اسم الدورة التدريبية{" "}
                  </div>
                  <div
                    style={{
                      color: "#DAA520",
                      textAlign: "right",
                      marginTop: "0px",
                      marginBottom: "0px",
                      fontWeight: "bold",
                    }}
                    className="white-texts"
                  >
                    اسم منشـئ المحتوى
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      gap: "5px",
                    }}
                  >
                    <NoviceIcon />
                    <AmaterurIcon />
                    <IntermediateIcon />
                    <AdvancedIcon />
                  </div>
                  <div>
                    {" "}
                    <StarSign />
                    <StarSign />
                    <StarSign />
                    <StarSign />
                    <StarSign />
                  </div>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <div className="white-texts"> 600 EGP</div>
                    <Button className="course-buy-buttons">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                      >
                        <image
                          id="book"
                          width="30"
                          height="30"
                          xlinkHref="data:image/png;base64,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"
                        />
                      </svg>
                      شـراء{" "}
                    </Button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "right",
                }}
              >
                <div style={{ display: "flex", gap: "15px" }}>
                  <div className="white-texts"> 900 EGP</div>
                  <Button className="course-buy-buttons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <image
                        id="zoom"
                        width="30"
                        height="30"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </svg>{" "}
                    شـراء الفيديوهات{" "}
                  </Button>
                </div>
                <Button className="course-buy-buttons">
                  {" "}
                  <div
                    style={{ display: "flex", gap: "10px" }}
                    onClick={() => setAddedToFavorte(!addedToFavorite)}
                  >
                    {addedToFavorite ? <FavoriteIcon /> : <NotFavoriteIcon />}
                    اضف إلى المفضله{" "}
                  </div>
                </Button>
              </div>
              <div
                style={{
                  background: "",
                  backgroundColor: theme === "light" ? "black" : "white",
                  width: "100%",
                  height: "300px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></div>

              <div
                style={{
                  color: theme === "light" ? "black" : "white",
                  fontSize: "1.2vw",
                  fontWeight: "bold",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                {" "}
                اعمال صيانة فك وتركيب عدد اتنين مجرة درج 35 سم وتثبيت خمس اوشاش
                ادراج عدد اثنين غيرمثبته وعدد تلاته رفع كفاءة بواصة زوايا معدنية
                وسوبر جلو تثبيت وعمل صيانة لكالون الكاشير
              </div>

              <Form style={{ width: "50%" }}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    {" "}
                    <div
                      style={{
                        color: "white",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      اضف تعليق{" "}
                    </div>
                  </Form.Label>
                  <Form.Control as="textarea" rows={4} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Course;
