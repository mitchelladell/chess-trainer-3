import "./Courses.css";

import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import UserDashboard from "../components/Dashboard/UserDashboard";
const Courses = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state: any) => state.language.value);

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <div className="flex-item">
          <div className="no_subsbcriptions_text d-flex justify-content-center align-items-center">
            ليـس لديك أي شـي ء للمراجعة هنا . قد تحتاج إلى البدء فـي تعلم شـي ء
            جديد!
          </div>
          <div
            style={{ textAlign: lang === "ar" ? "end" : "start" }}
            className="user_courses_text"
          >
            لوحة القيادة الخاصة بك
          </div>

          <UserDashboard
            variationExist={true}
            courseName="first"
            progress={0}
            numberOfVariations={"60"}
          />
          <UserDashboard
            variationExist={true}
            courseName="first"
            progress={0}
            numberOfVariations={"60"}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
