import { Container, Row, Col, Button } from "react-bootstrap";
import BookIcon from "../../pgns/icons/BookIcon";
import AdvancedIcon from "../../pgns/icons/CoursesLevelColors/Advanced";
import AmaterurIcon from "../../pgns/icons/CoursesLevelColors/Amateur";
import IntermediateIcon from "../../pgns/icons/CoursesLevelColors/Intermediate";
import NoviceIcon from "../../pgns/icons/CoursesLevelColors/Novice";
import { StarSign } from "../../pgns/icons/UserProfileIcons/StarSign";
import VideoIcon from "../../pgns/icons/VideoIcon";
import "./CourseCard.css";

const CourseCard = () => {
  return (
    <div className="course_card_container">
      {" "}
      <Container>
        <Row>
          <Col sm={12} md={7} lg={7} xs={12}>
            <div
              style={{ marginTop: "12px", textAlign: "right", width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "right",
                  width: "100%",
                }}
              >
                <NoviceIcon />
                <AmaterurIcon />
                <IntermediateIcon />
                <AdvancedIcon />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "right",
                  width: "100%",
                }}
              >
                {" "}
                <StarSign /> <StarSign /> <StarSign /> <StarSign /> <StarSign />{" "}
              </div>

              <div className="course_name"> اسم الدورة التدريبية</div>
              <div className="creator_name"> اسم منشـئ المحتوى </div>
            </div>
          </Col>{" "}
          <div className="course_img_container">
            <img alt="" src="" />
          </div>
        </Row>
        <Button className="buy_button">
          {" "}
          <div style={{ display: "flex" }}>
            <BookIcon />
            شـــــراء
          </div>{" "}
        </Button>
        <Button className="buy_button">
          {" "}
          <div style={{ display: "flex" }}>
            <VideoIcon />
            شـراء الفيديوهات{" "}
          </div>{" "}
        </Button>
      </Container>
    </div>
  );
};

export default CourseCard;
