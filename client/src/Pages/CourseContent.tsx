import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard/CourseCard";
import CourseChapter from "../components/CourseChapter/CourseChapter";
import ResetModal from "../components/PaymentModal/ResetModal";
import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import "./CourseContent.css";
import ResetConfirmedModal from "../components/PaymentModal/ResetConfirmedModal";

const CourseContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [data, setData] = useState([]);

  const resetState = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pgn/1")
      .then((response: any) => setData(response.data));
  }, []);

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
          {data.length > 0 &&
            data.map((item: any) => (
              <div key={item.id}>
                <Link
                  to={`/trainer/${encodeURIComponent(item.value)}`}
                  state={{
                    pgnWithName: data,
                  }}
                >
                  <CourseChapter
                    handleProgress={() => setShowModal(true)}
                    chapterEdit={true}
                  />
                </Link>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default CourseContent;
