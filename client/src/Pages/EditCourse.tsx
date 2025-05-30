import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import FactoryImg from "../pgns/factoryImg";
import { Dropdown, Form, Button } from "react-bootstrap";
import "./EditCourse.css";
import SaveChangesIcon from "../pgns/icons/SaveChangesIcon";
import CourseChapter from "../components/CourseChapter/CourseChapter";
import ChapterRemoveIcon from "../pgns/icons/ChapterRemoveIcon";
import ChapterEditIcon from "../pgns/icons/ChapterEditIcon";
import TruckInFactory from "../pgns/TruckInFactory";
import TruckInFactoryVideo from "../pgns/TruckInFactoryVideo";
import RemoveCourseModal from "../components/PaymentModal/RemoveCourseModal";
import dictNumbering from "../helpers/dictNumbering";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const EditCourse = () => {
  const [factoryOpen, setFactoryOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("معلومات عن الدورة");
  const [prespective, setPrespective] = useState("ابيض");
  const [courseLang, setcourseLang] = useState("العربية");
  const [courseType, setCourseType] = useState("محتوى مكتوب");
  const [courseCategory, setCourseCategory] = useState("نوع الدورة");
  const [showRemoveChapter, setShowRemoveChapter] = useState(false);
  const [indexToRemove, setIndexToRemove] = useState(null);

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
    const newChapters = [
      ...chapterCardItems,
      {
        id: chapterCardItems.length.toString(),
        item: `${chapterCardItems.length + 1} card`,
      },
    ];
    setChapterCardItems(newChapters);
    console.log("item", newChapters);
  };

  const handleRemoveConfirm = () => {
    console.log("indexToRemove", typeof indexToRemove);

    indexToRemove &&
      setChapterCardItems((prevItems: any) =>
        prevItems
          .filter((_: any, index: number) => index !== parseInt(indexToRemove))
          .map((item: any, index: number) => ({
            ...item,
            id: index.toString(),
          }))
      );

    console.log("updatedChapterCards", chapterCardItems);

    setShowRemoveChapter(false);
  };

  const handleRemoveClick = (id: any) => {
    setShowRemoveChapter(true);
    setIndexToRemove(id);
  };

  const handleEditCourse = (id: any) => {
    setIndexToRemove(id);
    setSelectedPhase("editCard");
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
          <Form>
            <div key={`new-${"checkbox"}`} className="mb-3">
              <Form.Check
                type={"checkbox"}
                id={`new`}
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  color: "#43BF82",
                }}
                label={
                  <div style={{ display: "flex", gap: "10px" }}>
                    جـــــديــــد
                    <div style={{ margin: "auto" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                      >
                        <circle
                          id="Ellipse_10"
                          data-name="Ellipse 10"
                          cx="7"
                          cy="7"
                          r="7"
                          fill="#43bf82"
                        />
                      </svg>
                    </div>
                  </div>
                }
              />
            </div>
            <div key={`amateur-${"checkbox"}`} className="mb-3">
              <Form.Check
                type={"checkbox"}
                id={`amateur`}
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  color: "#F6EE07",
                }}
                label={
                  <div style={{ display: "flex", gap: "10px" }}>
                    مبتـــــدئ{" "}
                    <div style={{ margin: "auto" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                      >
                        <circle
                          id="Ellipse_11"
                          data-name="Ellipse 11"
                          cx="7"
                          cy="7"
                          r="7"
                          fill="#f6ee07"
                        />
                      </svg>
                    </div>
                  </div>
                }
              />
            </div>
            <div key={`intermediate-${"checkbox"}`} className="mb-3">
              <Form.Check
                type={"checkbox"}
                id={`intermediate`}
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  color: "#20C7DA",
                }}
                label={
                  <div style={{ display: "flex", gap: "10px" }}>
                    متوسط
                    <div style={{ margin: "auto" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                      >
                        <circle
                          id="Ellipse_12"
                          data-name="Ellipse 12"
                          cx="7"
                          cy="7"
                          r="7"
                          fill="#20c7da"
                        />
                      </svg>
                    </div>
                  </div>
                }
              />
            </div>
            <div key={`advanced-${"checkbox"}`} className="mb-3">
              <Form.Check
                type={"checkbox"}
                id={`advanced`}
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  color: "#EF7373",
                }}
                label={
                  <div style={{ display: "flex", gap: "10px" }}>
                    متقــدم{" "}
                    <div style={{ margin: "auto" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                      >
                        <circle
                          id="Ellipse_13"
                          data-name="Ellipse 13"
                          cx="7"
                          cy="7"
                          r="7"
                          fill="#ef7373"
                        />
                      </svg>
                    </div>
                  </div>
                }
              />
            </div>
          </Form>{" "}
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
          <Button
            className="save_changes_button"
            onClick={() => setSelectedPhase("إدارة الفصول")}
          >
            {" "}
            <SaveChangesIcon /> حفظ التغيـرات{" "}
          </Button>{" "}
        </div>
      </div>
    );
  };

  const PGNUploadPhase = () => {
    return (
      <div
        className="learn_new_course_container"
        style={{ height: "fit-content", width: "100%" }}
      >
        <Container>
          <Row>
            <Col md={6} lg={4} sm={12}>
              <div className="course_chapter_wrapper">
                {" "}
                <CourseChapter chapterEdit={false} />
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
              <div style={{ marginTop: "50%" }}>
                <Button className="save_changes_button">
                  {" "}
                  <SaveChangesIcon /> حفظ التغيـرات{" "}
                </Button>{" "}
              </div>
            </Col>
            <Col md={6} lg={8} sm={12} style={{ margin: "auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginBottom: "15px",
                }}
              >
                <input type="file" style={{ height: "30px" }} />
                <div
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "30%",
                  }}
                >
                  <div className="payment_counts"> pgn رفع ملف للتعلم </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <input type="file" style={{ height: "30px" }} />
                <div
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: "30%",
                  }}
                >
                  <div className="payment_counts"> pgn رفع ملف التدريب </div>
                </div>
              </div>
              {courseType === "محتوى مكتوب ومرئـى" && (
                <div style={{ marginTop: "15px", marginBottom: "5px" }}>
                  <div className="payment_counts">
                    {" "}
                    رابط الفيديو الخاص بالدورة
                  </div>
                  <input type="text" style={{ width: "70%", height: "30px" }} />
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    {" "}
                  </div>
                </div>
              )}
              <div style={{ display: "flex" }}>
                {courseType === "محتوى مكتوب" ? (
                  <TruckInFactory />
                ) : (
                  <TruckInFactoryVideo />
                )}
              </div>{" "}
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  const ProfileSettingsCard = ({ id }: any) => {
    const [hovered, setHovered] = useState(false);
    const [inputFieldValue, setInputValue] = useState<any>("");

    return (
      <div
        className="learn_new_course_container"
        style={{ height: "fit-content", width: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        id={id}
      >
        <Container>
          <Row>
            <Col md={6} lg={4} sm={12}>
              <div
                className="course_chapter_wrapper"
                style={{ marginTop: "15px" }}
              >
                {" "}
                <CourseChapter />
                <div
                  className={`remove_icon_${hovered ? "hovered" : ""}`}
                  onClick={() => handleRemoveClick(id)}
                >
                  {" "}
                  <ChapterRemoveIcon />
                </div>
                <div
                  className={`edit_icon_${hovered ? "hovered" : ""}`}
                  onClick={() => handleEditCourse(id)}
                >
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
                الفصل {dictNumbering[id]} {inputFieldValue}
              </div>
            </Col>
            <Col md={6} lg={8} sm={12} style={{ margin: "auto" }}>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  value={inputFieldValue}
                  style={{ width: "70%", height: "30px" }}
                />
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

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(chapterCardItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const updatedItems = items.map((item: any, index) => {
      return {
        ...item,
        id: index.toString(),
      };
    });

    setChapterCardItems(updatedItems);
  };

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
            {chapterCardItems.length < 20 && (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "right",
                }}
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
            )}
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="chapterCardItems">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {chapterCardItems.map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ProfileSettingsCard id={item.id} index={item.id} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  };

  return (
    <div>
      <Container>
        <RemoveCourseModal
          show={showRemoveChapter}
          handleClose={() => setShowRemoveChapter(false)}
          handleConfirm={handleRemoveConfirm}
        />
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
              {selectedPhase === "معلومات عن الدورة" && <CourseInfo />}
              {selectedPhase === "إدارة الفصول" && <CourseSettings />}
              {selectedPhase === "editCard" && <PGNUploadPhase />}
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
                {selectedPhase === "editCard" && (
                  <div
                    className={
                      selectedPhase === "editCard"
                        ? "active_phase"
                        : "idle_phase"
                    }
                    onClick={() => setSelectedPhase("editCard")}
                  >
                    تعديل الفصل {indexToRemove && dictNumbering[indexToRemove]}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.5"
                      height="40"
                      viewBox="0 0 37.5 40"
                    >
                      <g
                        id="Group_68"
                        data-name="Group 68"
                        transform="translate(-218.511 -130.5)"
                      >
                        <line
                          id="Line_23"
                          data-name="Line 23"
                          y2="32"
                          transform="translate(254.511 130.5)"
                          fill="none"
                          stroke="#000"
                          stroke-width="3"
                        />
                        <line
                          id="Line_24"
                          data-name="Line 24"
                          x2="27"
                          transform="translate(227.511 162.5)"
                          fill="none"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-width="3"
                        />
                        <path
                          id="Polygon_5"
                          data-name="Polygon 5"
                          d="M8,0l8,13H0Z"
                          transform="translate(218.511 170.5) rotate(-90)"
                        />
                      </g>
                    </svg>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default EditCourse;
