import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { useState } from "react";

import "./AddCourse.css";
import { Link } from "react-router-dom";

const AddCourse = () => {
  const [courseLang, setcourseLang] = useState("العربية");
  const [courseType, setCourseType] = useState("محتوى مكتوب");

  const courseLangs = ["English", "العربية"];
  const [courseCategory, setCourseCategory] = useState("نوع الدورة");

  const courseTypes = ["محتوى مكتوب", "محتوى مكتوب ومرئـى"];
  const courseCategories = [
    "بدايات الدور",
    "وسط الدور",
    "نهايات الدور",
    "استـراتجيات",
    "تـــكـــتيكـــــات ",
    "اللعب الموقفــي",
    "افخاخ الشطرنج",
  ];

  return (
    <div>
      <Container>
        <Row>
          <Col sm={3} lg={3} md={3}>
            <div className="ads-area"></div>
          </Col>
          <Col sm={9} lg={9} md={9}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <div
                className="intro_text_add_course"
                style={{ textAlign: "right", marginBottom: "20px" }}
              >
                أهلا بك فـى صفحـة انشاء المحتوى نرجو منك ملـئ بيانات الدورة
                الجديده
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input type="text" style={{ width: "30%", height: "30px" }} />
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: "25%",
                  textAlign: "right",
                }}
              >
                <div className="payment_counts"> اســــم الدورة</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input type="text" style={{ width: "30%", height: "30px" }} />
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: "25%",
                  textAlign: "right",
                }}
              >
                <div className="payment_counts"> اسم منشـــئ المحتوى </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input type="text" style={{ width: "50%", height: "30px" }} />
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: "25%",
                  textAlign: "right",
                }}
              >
                <div className="payment_counts"> إضافة أعضاء فريق </div>
              </div>
            </div>
            <div className="into_grey_text">
              {" "}
              يمكن إضافة اكثـر من اسم عن طريق إضافة ; بيـن الاسمـاء
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "right",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Dropdown className="course_types_dropdown">
                <Dropdown.Toggle>{courseCategory}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {courseCategories.map((cat) => (
                    <Dropdown.Item
                      key={cat}
                      onClick={() => setCourseCategory(cat)}
                    >
                      {cat}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: "25%",
                  textAlign: "right",
                }}
              >
                <div className="payment_counts"> اختـر نوع الدورة التدريبة</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "right",
              }}
            >
              <Dropdown className="currency_dropdown">
                <Dropdown.Toggle>{courseLang}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {courseLangs.map((lang) => (
                    <Dropdown.Item
                      key={lang}
                      onClick={() => setcourseLang(lang)}
                    >
                      {lang}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: "25%",
                  textAlign: "right",
                }}
              >
                <div className="payment_counts"> لغة الدورة </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "30px",
                justifyContent: "right",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Dropdown className="currency_dropdown coursetypes">
                <Dropdown.Toggle>{courseType}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {courseTypes.map((type) => (
                    <Dropdown.Item
                      key={type}
                      onClick={() => setCourseType(type)}
                    >
                      {type}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  width: "25%",
                  textAlign: "right",
                }}
              >
                <div className="payment_counts"> هيئة الدورة</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <Link to="/editcourse">
                <Button className="save_changes_button">إنشــــــــاء</Button>{" "}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddCourse;
