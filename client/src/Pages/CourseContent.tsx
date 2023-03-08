import { Container } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseChapter from "../components/CourseChapter/CourseChapter";
import ResetModal from "../components/PaymentModal/ResetModal";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import "./CourseContent.css";
import ResetConfirmedModal from "../components/PaymentModal/ResetConfirmedModal";

const CourseContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const resetState = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };
  const handleConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const theme = useAppSelector((state) => state.theme.value);
  return (
    <div style={{ background: theme === "light" ? "white" : "" }}>
      <ResetConfirmedModal
        show={showConfirmModal}
        handleConfirm={handleConfirmModal}
      />
      <ResetModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={resetState}
      />
      <Container>
        <div className="course_name"> اسم الدورة التدريبية </div>
        <div className="course_card_description_container">
          {" "}
          <CourseCard buy={false} handleProgress={() => setShowModal(true)} />
        </div>
      </Container>
      <Container>
        <div className="course_name"> الفصول</div>
        <div className="course-content-container">
          <div>
            {" "}
            <CourseChapter handleProgress={() => setShowModal(true)} />
            <div className="chapter_number"> chapter 1</div>
          </div>
          <CourseChapter handleProgress={() => setShowModal(true)} />
          <CourseChapter handleProgress={() => setShowModal(true)} />
          <CourseChapter handleProgress={() => setShowModal(true)} />
          <CourseChapter handleProgress={() => setShowModal(true)} />
          <CourseChapter handleProgress={() => setShowModal(true)} />
        </div>
      </Container>
    </div>
  );
};

export default CourseContent;
