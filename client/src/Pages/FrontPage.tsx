import "./FrontPage.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div>
      <div className="flex-container">
        <div className="intro_container flex-item item-text">
          <div className="intro_text">
            أنت لا تنسى أبدًا <br /> بدايات الدور الخاصة بك مرة أخرى <br />{" "}
            تقنيات التعلم المدعومة علميًا للمساعدة في زيادة الحفظ والتذكر بنسبة
            تصل إلى 95%. حتـى تتمكن من لعب بدايات الأدوار مثل كتاب ... وسط
            الأدوار مثل الساحر ونهاية الأدوار مثل العظماء
          </div>

          <div className="button_container">
            <Link to="/signup">
              <Button className="join_button">التحـق مجانا</Button>
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
              height: "88vh",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
