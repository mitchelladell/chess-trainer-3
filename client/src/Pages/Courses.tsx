import "./Courses.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import UserDashboard from "../components/Dashboard/UserDashboard";
import { Button } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import CreatorDashboard from "../components/Dashboard/CreatorDashboard";
import { mySupabase } from "../mysuba";
import { ICourse } from "./AllCourses";
const Courses = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const [subscribedCoursesIds, setSubscribedCoursesIds] = useState<any>([]);
  const [subscribedCourses, setSubscribedCourses] = useState<any>([]);

  const lang = useAppSelector((state: any) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  const [showCreatedCourses, setShowCreatedCourses] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  console.log(userInfo);

  useEffect(() => {
    if (userInfo?.sub) {
      (async () => {
        try {
          // Fetch subscribed course IDs
          const { data: subscribedCoursesData, error: subscribedCoursesError } =
            await mySupabase
              .from("purchases")
              .select("course")
              .eq("user_", userInfo.sub);

          if (subscribedCoursesError) {
            console.error(
              "Error fetching subscribed courses:",
              subscribedCoursesError.message
            );
            return;
          }

          console.log("subscribedCoursesData", subscribedCoursesData);

          // Extract subscribed course IDs
          const subscribedCourseIds = subscribedCoursesData.map(
            (course) => course.course
          );

          // Fetch details of courses based on IDs
          const { data: coursesData, error: coursesError } = await mySupabase
            .from("courses")
            .select("*")
            .in("id", subscribedCourseIds);

          if (coursesError) {
            console.error("Error fetching courses:", coursesError.message);
            return;
          }

          // Handle the fetched course data
          console.log("Fetched courses:", coursesData);
          setSubscribedCourses(coursesData);
          // Use the course data as needed
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    } else {
      console.log("no courses");
    }
  }, [userInfo]);

  console.log(subscribedCourses, "subscribed");

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div
        style={{
          textAlign: lang === "ar" ? "end" : "start",
          background: theme === "dark" ? "" : "white",
        }}
        className="user_courses_text"
      >
        Your Courses Dashboard
      </div>
      <div className="flex-container" style={{ justifyContent: "right" }}>
        {" "}
        <div style={{ display: "flex", gap: "15px " }}>
          {" "}
          <Button
            className="created_courses_button"
            onClick={() => setShowCreatedCourses(false)}
          >
            {" "}
            My Courses +
          </Button>
          <Button
            className="created_courses_button"
            onClick={() => setShowCreatedCourses(true)}
          >
            {" "}
            Courses That I have Created +
          </Button>
        </div>
      </div>

      <div
        className="flex-container"
        style={{
          flexDirection: direction,
          background: theme === "dark" ? "" : "white",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            className="flex-item"
            style={{
              padding: "30px",
              borderRadius: "10px",
              background: "linear-gradient(to left top, #808080, #ffffff)",
            }}
          >
            {subscribedCourses.length === 0 && (
              <div className="no_subsbcriptions_text d-flex justify-content-center align-items-center">
                You have no subscriptions; you may need to add new ones
              </div>
            )}
            {!showCreatedCourses ? (
              subscribedCourses.map((course: ICourse) => {
                return (
                  <UserDashboard
                    variationExist={true}
                    courseName="first"
                    progress={0}
                    numberOfVariations={"60"}
                    courseNumber={course.id}
                    key={course.id}
                  />
                );
              })
            ) : (
              <CreatorDashboard
                variationExist={true}
                courseName="first"
                progress={0}
                numberOfVariations={"60"}
              />
            )}
            <div style={{ textAlign: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50.109"
                height="30"
                viewBox="0 0 50.109 30"
              >
                <path
                  id="Arrow_22_-_www.Shapes4FREE.com1"
                  data-name="Arrow 22 - www.Shapes4FREE.com1"
                  d="M879.8,55.192a4.787,4.787,0,0,0,1.6,3.542L904.854,80.2l23.454-21.466a4.72,4.72,0,0,0,.027-7.06,5.748,5.748,0,0,0-7.661-.024l-15.82,14.478L889.034,51.65a5.748,5.748,0,0,0-7.661.024A4.784,4.784,0,0,0,879.8,55.192Z"
                  transform="translate(-879.8 -50.2)"
                  fill="#fff"
                />
              </svg>
            </div>
            <div
              className="learn_new_course_container"
              style={{
                backgroundColor: theme === "light" ? "white" : "",
              }}
            >
              <div
                className="course-title"
                style={{
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {!showCreatedCourses
                  ? "Learn A new Course"
                  : "Create a new Course"}{" "}
              </div>{" "}
              <Link to={showCreatedCourses ? "/addcourse" : "/allcourses"}>
                <Button className="new_course_button">
                  <div className="d-flex justify-content-center align-items-center">
                    +{" "}
                  </div>
                </Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
