import { Container } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseChapter from "../components/CourseChapter/CourseChapter";
import "./CourseContent.css";

const CourseContent = () => {
  return (
    <div>
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
            <CourseChapter />
            <div className="chapter_number"> chapter 1</div>
          </div>
          <CourseChapter />
          <CourseChapter />
          <CourseChapter />
          <CourseChapter />
          <CourseChapter />
        </div>
      </Container>
    </div>
  );
};

export default CourseContent;
