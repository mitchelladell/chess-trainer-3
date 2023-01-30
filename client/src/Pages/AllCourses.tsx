import "./allCourses.css";

import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";

const AllCourses = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");

  let coursesList = ["opening,", "endgame", "queen opening", "king opening"];
  const lang = useAppSelector((state: any) => state.language.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <div
          className="intro_container flex-item"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {coursesList.map((course) => (
            <div
              key={course}
              style={{
                width: "350px",
                height: "350px",
                background: "#8B8B8B",
                margin: "10px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
