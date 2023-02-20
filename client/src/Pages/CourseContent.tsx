import { Container } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseChapter from "../components/CourseChapter/CourseChapter";
import ResetModal from "../components/PaymentModal/ResetModal";
import { useState } from "react";
import "./CourseContent.css";

const CourseContent = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <ResetModal
        show={show}
        handleClose={() => setShow(false)}
        handleConfirm={() => setShow(false)}
      />
      <Container>
        <div className="course_name"> اسم الدورة التدريبية </div>{" "}
        <div className="course_card_description_container">
          {" "}
          <CourseCard buy={false} />
        </div>
      </Container>
      <Container>
        <div className="course_name"> الفصول</div>
        <div className="course-content-container">
          <div>
            {" "}
            <CourseChapter handleProgress={() => setShow(true)} />
            <div className="chapter_number"> chapter 1</div>
          </div>
          <CourseChapter handleProgress={() => setShow(true)} />
          <CourseChapter handleProgress={() => setShow(true)} />
          <CourseChapter handleProgress={() => setShow(true)} />
          <CourseChapter handleProgress={() => setShow(true)} />
          <CourseChapter handleProgress={() => setShow(true)} />
        </div>
      </Container>
    </div>
  );
};

export default CourseContent;
