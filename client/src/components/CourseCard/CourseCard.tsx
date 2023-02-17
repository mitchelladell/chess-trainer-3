import { Container, Row, Col, Button } from "react-bootstrap";
import BookIcon from "../../pgns/icons/BookIcon";
import AdvancedIcon from "../../pgns/icons/CoursesLevelColors/Advanced";
import AmaterurIcon from "../../pgns/icons/CoursesLevelColors/Amateur";
import IntermediateIcon from "../../pgns/icons/CoursesLevelColors/Intermediate";
import NoviceIcon from "../../pgns/icons/CoursesLevelColors/Novice";
import { StarSign } from "../../pgns/icons/UserProfileIcons/StarSign";
import VideoIcon from "../../pgns/icons/VideoIcon";
import "./CourseCard.css";

const CourseCard = (props: any) => {
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
        {props.buy ? (
          <div>
            {" "}
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
            </Button>{" "}
          </div>
        ) : (
          <div className="course_description">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="265"
              height="1"
              viewBox="0 0 265 1"
            >
              <line
                id="Line_11"
                data-name="Line 11"
                x1="265"
                transform="translate(0 0.5)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
            </svg>{" "}
            تحكم فــي الجزء الحاسم من اللوحة وقم بتحويل التحكم المـركزي إلى
            انتصارات مذهلة{" "}
          </div>
        )}
      </Container>
    </div>
  );
};

export default CourseCard;
