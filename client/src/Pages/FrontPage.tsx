import "./FrontPage.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const FrontPage = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state) => state.language.value);

  useEffect(() => {
    setDirection(lang === "ar" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <div className="intro_container flex-item item-text_front_page">
          <div className="intro_text_front_page">
            أنت لا تنسى أبدًا <br /> بدايات الدور الخاصة بك مرة أخرى <br />{" "}
            تقنيات التعلم المدعومة علميًا للمساعدة في زيادة الحفظ والتذكر بنسبة
            تصل إلى 95%. حتـى تتمكن من لعب بدايات الأدوار مثل كتاب ... وسط
            الأدوار مثل الساحر ونهاية الأدوار مثل العظماء
          </div>

          <div className="button_container">
            <Link to="/signup">
              <Button className="join_button">
                <div> التحـق مجانا</div>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-item item-picture">
          <div
            style={{
              backgroundImage: `url('../media/front_page_background.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "68vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
