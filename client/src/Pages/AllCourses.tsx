import "./allCourses.css";

import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllCourses = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");

  const [langFilterChoice, setLangFilterChoice] = useState("");
  const [coursesFilterChoice, setCoursesFilterChoice] = useState("");
  const [levelsFilterChoice, setLevelsFilterChoice] = useState("");

  let coursesList = [
    "opening,",
    "endgame",
    "queen opening",
    "king opening",
    "king opening",
  ];
  const lang = useAppSelector((state: any) => state.language.value);
  const coursesFilter = [
    "All Courses",
    "Openings",
    "Middle Game",
    "End Game",
    "Strategies",
    "Tactics",
    "Positional",
    "Chess Traps",
    "Puzzles",
  ];
  const langFilter = ["English", " Arabic"];
  const levelsFilter = ["novice", "beginner", "intermdiate", "advance"];

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <div>
          <Container>
            <Row>
              <div style={{ color: "white" }}>
                {" "}
                <Link to="/">Chessusity </Link>
                {">"} All Courses
              </div>
              <Col xs={5} sm={3} md={3} lg={3}>
                <div
                  style={{
                    background: "#8B8B8B",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <div className="filter_title">{"هيئة اللعب"} </div>
                  {coursesFilter.map((item) => (
                    <div
                      className="filter_item"
                      onClick={() => setCoursesFilterChoice(item)}
                    >
                      {item}{" "}
                    </div>
                  ))}
                  <div className="filter_title"> {"اللغـــة"}</div>

                  {langFilter.map((item) => (
                    <div
                      className="filter_item"
                      onClick={() => setLangFilterChoice(item)}
                    >
                      {item}{" "}
                    </div>
                  ))}
                  <div className="filter_title"> {"مدى الصعوبة"}</div>

                  {levelsFilter.map((item) => (
                    <div
                      className="filter_item"
                      onClick={() => setLevelsFilterChoice(item)}
                    >
                      {item}{" "}
                    </div>
                  ))}

                  <div style={{ marginTop: "15px" }}>
                    {" "}
                    <Button className="cancel_filter_button">
                      الغاء كل المرشحات
                    </Button>{" "}
                  </div>
                </div>
              </Col>
              <Col xs={7} sm={9} md={9} lg={9}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {coursesList.map((course) => (
                    <div key={course} className="course-item" />
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
