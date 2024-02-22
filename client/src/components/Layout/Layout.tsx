import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateCoursesList } from "../../features/courses/coursesSlice";

import Cookies from "js-cookie";
import "./layout.css";
import {
  IDecodedResponse,
  updateUserInfo,
} from "../../features/user/userSlice";
import { mySupabase } from "../../mysuba";

const Layout: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const theme = useAppSelector(
    (state: { theme: { value: string } }) => state.theme.value
  );
  console.log("theme", theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const lang = useAppSelector((state) => state.language.value);
  const [subscribedCourses, setSubscribedCourses] = useState<any>([]);

  useEffect(() => {
    let token = Cookies.get("token");

    if (!token) {
      navigate("/");
    }
    if (token) {
      const decodedResponse: IDecodedResponse = jwt_decode(token);
      dispatch(updateUserInfo(decodedResponse));
      // navigate("/courses");
    }
  }, []);

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
          setSubscribedCourses(coursesData);
          dispatch(updateCoursesList(coursesData));
          // Use the course data as needed
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    } else {
      console.log("no courses");
    }
  }, [userInfo]);

  return (
    <div className="layout_container">
      <Header />
      <div
        className="children_content"
        style={{ background: theme === "light" ? "white" : "" }}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
