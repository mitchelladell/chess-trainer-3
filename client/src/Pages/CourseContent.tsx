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
import { mySupabase } from "../mysuba";
import { useLocation } from "react-router-dom";

const CourseContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [data, setData] = useState<any>([]);

  const [courseInfo, setCourseInfo] = useState<any>({});

  const location = useLocation();

  console.log("location", location);

  const resetState = () => {
    setShowModal(false);
    setShowConfirmModal(true);
  };

  useEffect(() => {
    const matchedCourseNum = location.pathname.match(/\/(\d+)\/coursecontent/);

    if (matchedCourseNum) {
      const courseNum = matchedCourseNum[1];

      (async () => {
        let { data, error } = await mySupabase
          .from("courses")
          .select("*")
          .eq("id", courseNum)
          .single();

        setCourseInfo(data);

        console.log("courseINfo", data, error);
      })();

      (async () => {
        let { data, error } = await mySupabase
          .from("chapters")
          .select("*")
          .eq("course", courseNum);
        //   setCourseList(data);
        // console.log(coursesList);
        setData(data);

        console.log("dataIs", data, error);
      })();

      console.log(courseNum);
    } else {
      console.log("Number not found in the pathname");
    }
  }, [location]);

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
          <CourseCard
            name={courseInfo.name}
            author={courseInfo.authorname}
            description={courseInfo.description}
            buy={false}
            handleProgress={() => setShowModal(true)}
          />
        </div>
      </Container>
      <Container>
        <div className="course_name"> الفصول</div>
        <div className="course-content-container">
          {data.length > 0 &&
            data.map((item: any) => (
              <div key={item.id}>
                <Link
                  to={`/trainer/${encodeURIComponent(item.title)}`}
                  state={{
                    pgnWithName: { title: item.title, pgn: item.pgn },
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
