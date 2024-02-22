import "./allCourses.css";

import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard/CourseCard";
import NoviceIcon from "../pgns/icons/CoursesLevelColors/Novice";
import AmaterurIcon from "../pgns/icons/CoursesLevelColors/Amateur";
import IntermediateIcon from "../pgns/icons/CoursesLevelColors/Intermediate";
import AdvancedIcon from "../pgns/icons/CoursesLevelColors/Advanced";
import { mySupabase } from "../mysuba";

export interface ICourse {
  /*   name: string;
  authorname: string;
  author: any;
   */

  [key: string]: any;
}

const AllCourses = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");

  const [langFilterChoice, setLangFilterChoice] = useState("");
  const [coursesList, setCourseList] = useState([] as any);

  const [coursesFilterChoice, setCoursesFilterChoice] = useState("");
  const [levelsFilterChoice, setLevelsFilterChoice] = useState("");
  const subscribedCourses = useAppSelector(
    (state) => state.courses.subscribedCourses
  );

  const [subscribedCoursesIds, setSubscribedCoursesIds] = useState<ICourse[]>(
    []
  );

  useEffect(() => {
    let subscribedCoursesIds = subscribedCourses.map((course: any) => {
      return course.id;
    });

    setSubscribedCoursesIds(subscribedCoursesIds);
  }, []);

  const theme = useAppSelector((state) => state.theme.value);

  const handleCancelFilters = () => {
    setLangFilterChoice("");
    setCoursesFilterChoice("");
    setLevelsFilterChoice("");
  };
  useEffect(() => {
    (async () => {
      let { data, error } = await mySupabase.from("courses").select("*");
      setCourseList(data);
      console.log(coursesList);
    })();
  }, []);

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
  const levelsFilter = [
    { label: "Novice", icon: <NoviceIcon /> },
    { label: "Beginner", icon: <AmaterurIcon /> },
    { label: "Intermediate", icon: <IntermediateIcon /> },
    { label: "Advanced", icon: <AdvancedIcon /> },
  ];

  //this function filters the courses based on the filters:
  const filterCourses = () => {
    console.log("courseList", coursesList);
    let courses = coursesList.filter(
      (course: ICourse) => course.language === langFilterChoice
    );

    console.log("langFilter", langFilterChoice);
    console.log("coures", courses);
  };
  filterCourses();

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
        <div>
          <Container>
            <Row>
              <div style={{ color: "white" }}>
                {" "}
                <Link to="/">Chessusity </Link>
                {">"} All Courses
              </div>
              <Col xs={7} sm={9} md={9} lg={9}>
                {" "}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    textAlign: "end",
                  }}
                >
                  {coursesList.map((course: ICourse) => (
                    <Link
                      to={
                        subscribedCoursesIds.includes(course?.id)
                          ? `/courses/${course?.id}/coursecontent`
                          : `/courses/${course?.id}`
                      }
                      key={course?.id}
                    >
                      <CourseCard
                        buy={true}
                        name={course.name}
                        author={course.authorname}
                      />
                    </Link>
                  ))}
                </div>{" "}
              </Col>
              <Col xs={5} sm={3} md={3} lg={3}>
                <div className="courses_controller">
                  <div className="filter_title">{"هيئة اللعب"} </div>
                  {coursesFilter.map((item) => (
                    <div style={{ display: "flex" }} key={item}>
                      <div
                        className="filter_item"
                        onClick={() => setCoursesFilterChoice(item)}
                      >
                        {item}
                      </div>
                      <div
                        className={coursesFilterChoice === item ? "arrow" : ""}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          marginTop: "auto",
                          marginLeft: "3px",
                          marginRight: "3px",
                          marginBottom: "auto",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                  ))}
                  <div className="filter_title"> {"اللغـــة"}</div>

                  {langFilter.map((item) => (
                    <div style={{ display: "flex" }} key={item}>
                      <div
                        className="filter_item"
                        onClick={() => setLangFilterChoice(item)}
                      >
                        {item}
                      </div>
                      <div
                        className={langFilterChoice === item ? "arrow" : ""}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          marginTop: "auto",
                          marginLeft: "3px",
                          marginRight: "3px",
                          marginBottom: "auto",
                          backgroundPosition: "center",
                        }}
                      >
                        {" "}
                      </div>
                    </div>
                  ))}
                  <div className="filter_title"> {"مدى الصعوبة"}</div>

                  {levelsFilter.map((item) => (
                    <div style={{ display: "flex" }} key={item.label}>
                      <div
                        className="filter_item"
                        onClick={() => setLevelsFilterChoice(item.label)}
                      >
                        {item.label}
                        <div style={{ display: "flex", margin: "auto" }}>
                          {" "}
                          {item.icon}
                        </div>
                      </div>
                      <div
                        className={
                          levelsFilterChoice === item.label ? "arrow" : ""
                        }
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundRepeat: "no-repeat",
                          marginTop: "auto",
                          marginLeft: "3px",
                          marginRight: "3px",
                          marginBottom: "auto",
                          backgroundPosition: "center",
                        }}
                      >
                        {" "}
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: "30px", textAlign: "center" }}>
                    {" "}
                    <Button
                      className="cancel_filter_button"
                      onClick={() => handleCancelFilters()}
                    >
                      الغاء كل المرشحات
                    </Button>{" "}
                  </div>
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
