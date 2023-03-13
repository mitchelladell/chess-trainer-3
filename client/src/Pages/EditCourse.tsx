import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import FactoryImg from "../pgns/factoryImg";
import { Dropdown, Form, Button } from "react-bootstrap";
import "./EditCourse.css";
import SaveChangesIcon from "../pgns/icons/SaveChangesIcon";
import CourseChapter from "../components/CourseChapter/CourseChapter";
import ChapterRemoveIcon from "../pgns/icons/ChapterRemoveIcon";
import ChapterEditIcon from "../pgns/icons/ChapterEditIcon";

const EditCourse = () => {
  const [factoryOpen, setFactoryOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("معلومات عن الدورة");
  const [prespective, setPrespective] = useState("ابيض");
  const [courseLang, setcourseLang] = useState("العربية");
  const [courseType, setCourseType] = useState("محتوى مكتوب");
  const [courseCategory, setCourseCategory] = useState("نوع الدورة");

  const prespectives = ["ابيض", "اسود", "كلاهما"];
  const courseLangs = ["English", "العربية"];
  const courseTypes = ["محتوى مكتوب", "محتوى مكتوب ومرئـى"];
  const [chapterCardItems, setChapterCardItems] = useState<any>([]);

  const courseCategories = [
    "بدايات الدور",
    "وسط الدور",
    "نهايات الدور",
    "استـراتجيات",
    "تـــكـــتيكـــــات ",
    "اللعب الموقفــي",
    "افخاخ الشطرنج",
  ];

  const courseChapters = () => {
    const newChapters = [...chapterCardItems, "item"];
    setChapterCardItems(newChapters);
    console.log("item", newChapters);
  };

  const CourseInfo = () => {
    return (
      <div className="intro_container flex-item">
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "right",
            padding: "15px",
          }}
        >
          <Dropdown className="currency_dropdown">
            <Dropdown.Toggle>{prespective}</Dropdown.Toggle>

            <Dropdown.Menu>
              {prespectives.map((prespective) => (
                <Dropdown.Item
                  key={prespective}
                  onClick={() => setPrespective(prespective)}
                >
                  {prespective}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="factory_white_texts"> المنظور </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "right",
          }}
        >
          <div> Hello There</div>
          <div className="factory_white_texts"> مستوى الدورة </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "right",
          }}
        >
          <Form style={{ width: "40%" }}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={1} />
            </Form.Group>
          </Form>{" "}
          <div className="factory_white_texts"> اســـم الدورة </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "right",
            padding: "15px",
          }}
        >
          <Dropdown className="currency_dropdown">
            <Dropdown.Toggle>{courseCategory}</Dropdown.Toggle>

            <Dropdown.Menu>
              {courseCategories.map((cat) => (
                <Dropdown.Item key={cat} onClick={() => setCourseCategory(cat)}>
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="factory_white_texts"> اختـر نوع الدورة التدريبة </div>
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
                <Dropdown.Item key={lang} onClick={() => setcourseLang(lang)}>
                  {lang}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="factory_white_texts"> لغة الدورة </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "right",
            padding: "15px",
          }}
        >
          <Dropdown className="currency_dropdown">
            <Dropdown.Toggle>{courseType}</Dropdown.Toggle>

            <Dropdown.Menu>
              {courseTypes.map((type) => (
                <Dropdown.Item key={type} onClick={() => setCourseType(type)}>
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <div className="factory_white_texts"> هيئة الدورة </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "right",
            padding: "15px",
          }}
        >
          <Form style={{ width: "40%" }}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={4} />
            </Form.Group>
          </Form>{" "}
          <div className="factory_white_texts"> وصف الدورة</div>
        </div>
        <div className="save_button_container">
          {" "}
          <Button className="save_changes_button">
            {" "}
            <SaveChangesIcon /> حفظ التغيـرات{" "}
          </Button>{" "}
        </div>
      </div>
    );
  };

  const ProfileSettingsCard = ({ id }: any) => {
    return (
      <div
        className="learn_new_course_container"
        style={{ height: "fit-content", width: "100%" }}
        id={id}
      >
        <Container>
          <Row>
            <Col md={6} lg={4} sm={12}>
              <div className="course_chapter_wrapper">
                {" "}
                <CourseChapter />
                <div className="remove_icon">
                  {" "}
                  <ChapterRemoveIcon />
                </div>
                <div className="edit_icon">
                  {" "}
                  <ChapterEditIcon />
                </div>
              </div>
              <div
                style={{
                  color: "#DAA520",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                الفصل الاول
              </div>
            </Col>
            <Col md={6} lg={8} sm={12} style={{ margin: "auto" }}>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <input type="text" style={{ width: "70%", height: "30px" }} />
                <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                  <div className="payment_counts"> عنوان الفصل </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  function handleDragStart(event: any) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  function handleDragEnter(event: any) {
    event.preventDefault();
    // Add CSS class to indicate hover state
    event.target.classList.add("hover");
  }

  function handleDragLeave(event: any) {
    // Remove CSS class for hover state
    event.target.classList.remove("hover");
  }

  function handleDragOver(event: any) {
    event.preventDefault();
  }

  function handleDrop(event: any) {
    event.preventDefault();
    // Get the ID of the dragged item
    const id = event.dataTransfer.getData("text/plain");
    // Get the target element and remove the CSS class for hover state
    const target = event.target;
    target.classList.remove("hover");
    // Move the dragged item to the target position
    const draggedItem = document.getElementById(id);
    target.parentNode.insertBefore(draggedItem, target.nextSibling);
  }

  const CourseSettings = () => {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {" "}
            {chapterCardItems.length && (
              <Button className="save_changes_button">
                {" "}
                <SaveChangesIcon /> حفظ التغيـرات{" "}
              </Button>
            )}
          </div>
          <div>
            <div
              style={{ display: "flex", gap: "20px", justifyContent: "right" }}
            >
              {" "}
              <div className="add_new_chapter_text"> إضافة فصل جديد</div>{" "}
              <Button
                className="add_chapter_button"
                onClick={() => courseChapters()}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <g id="_" data-name="+" transform="translate(0.286 0.286)">
                    <line
                      id="Line_3"
                      data-name="Line 3"
                      x2="30"
                      transform="translate(-0.286 14.714)"
                      fill="none"
                      stroke="#fff"
                      stroke-width="2"
                    />
                    <line
                      id="Line_4"
                      data-name="Line 4"
                      y2="30"
                      transform="translate(14.714 -0.286)"
                      fill="none"
                      stroke="#fff"
                      stroke-width="2"
                    />
                  </g>
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {chapterCardItems &&
          chapterCardItems.map((item: any, index: number) => (
            <div>
              <ProfileSettingsCard key={index} id={index} index={index} />
              <div> {index}</div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col align="right">
            <div
              style={{ display: "flex", gap: "15px", justifyContent: "right" }}
            >
              <div
                className="white-texts"
                style={{ textAlign: "right", margin: "0" }}
              >
                {" "}
                مصنع الدورات{" "}
              </div>{" "}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setFactoryOpen(!factoryOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="19"
                  viewBox="0 0 38 19"
                >
                  <g
                    id="ha_icon"
                    data-name="ha icon"
                    transform="translate(-1553 -154)"
                  >
                    <path
                      id="Path_29"
                      data-name="Path 29"
                      d="M0,0H35"
                      transform="translate(1554.5 155.5)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-width="3"
                    />
                    <line
                      id="Line_17"
                      data-name="Line 17"
                      x2="35"
                      transform="translate(1554.5 163.5)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-width="3"
                    />
                    <line
                      id="Line_18"
                      data-name="Line 18"
                      x2="35"
                      transform="translate(1554.5 171.5)"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-width="3"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </Col>{" "}
        </Row>{" "}
        {!factoryOpen ? (
          <Row>
            <Col align="right">
              <div className="intro_container flex-item">
                <FactoryImg />
              </div>
            </Col>
          </Row>
        ) : (
          <Row align="right">
            <Col md={9} sm={9} lg={9} align="right">
              {selectedPhase === "معلومات عن الدورة" ? (
                <CourseInfo />
              ) : (
                <CourseSettings />
              )}
            </Col>

            <Col md={3} sm={3} lg={3} align="right">
              {" "}
              <div className="intro_container flex-item">
                {" "}
                <div
                  className={
                    selectedPhase === "معلومات عن الدورة"
                      ? "active_phase"
                      : "idle_phase"
                  }
                  onClick={() => setSelectedPhase("معلومات عن الدورة")}
                >
                  معلومات عن الدورة{" "}
                </div>{" "}
                <div
                  className={
                    selectedPhase === "إدارة الفصول"
                      ? "active_phase"
                      : "idle_phase"
                  }
                  onClick={() => setSelectedPhase("إدارة الفصول")}
                >
                  إدارة الفصول
                </div>{" "}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default EditCourse;
