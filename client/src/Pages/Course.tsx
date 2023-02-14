import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "./Course.css";
import { StarSign } from "../pgns/icons/UserProfileIcons/StarSign";

const Course = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
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
            <Col xs={5} sm={5} md={3} lg={3}>
              <div className="ads-area"> Hello</div>
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
                      background: "white",
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
                    backgroundColor: "white",
                    width: "150px",
                    height: "150px",
                    margin: "10px",
                  }}
                ></div>
                <div className="">
                  {" "}
                  <div
                    style={{
                      color: "white",
                      fontSize: "1.2vw",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    شيس يوستــى
                  </div>
                  <div
                    style={{
                      color: "white",
                      fontSize: "1.6vw",
                      fontWeight: "bold",
                    }}
                  >
                    اسم الدورة التدريبية{" "}
                  </div>
                  <div
                    style={{
                      color: "#DAA520",
                      fontSize: "1.6vw",
                      fontWeight: "bold",
                    }}
                  >
                    اسم منشـئ المحتوى
                  </div>
                  <div>
                    {" "}
                    <StarSign />
                    <StarSign />
                    <StarSign />
                    <StarSign />
                    <StarSign />
                  </div>
                  <Button className="course-buy-buttons">شـراء </Button>
                  <Button className="course-buy-buttons">
                    شـراء الفيديوهات{" "}
                  </Button>
                </div>
              </div>
              <div
                style={{
                  background: "",
                  backgroundColor: "white",
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
                  color: "white",
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
