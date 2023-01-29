import "./allCourses.css";

import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";

const AllCourses = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state: any) => state.language.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <div className="intro_container flex-item">
          <div className="no_subsbcriptions_text">
            ليـس لديك أي شـي ء للمراجعة هنا . قد تحتاج إلى البدء فـي تعلم شـي ء
            جديد!
          </div>
          <div>لوحة القيادة الخاصة بك</div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
