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
          <Col>
            <div
              style={{ marginTop: "12px", textAlign: "right", width: "100%" }}
            >
              <div style={{ display: "flex" }}>
                {!props.buy && (
                  <div
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={props.handleProgress}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        id="Arrow_-_www.Shapes4FREE.com_1"
                        data-name="Arrow - www.Shapes4FREE.com 1"
                        d="M933,204a10,10,0,1,1,10-10A10,10,0,0,1,933,204Zm-4.81-4.989,1.054-.949a6.305,6.305,0,0,0,4.007,1.675,5.652,5.652,0,0,0,5.475-4.25l-2.245-.574a3.357,3.357,0,0,1-3.251,2.521,4.091,4.091,0,0,1-2.3-.937l1.109-1-4.677-1.256Zm9.717-10.022-1.054.949a6.305,6.305,0,0,0-4.007-1.675,5.652,5.652,0,0,0-5.474,4.25l2.245.574a3.357,3.357,0,0,1,3.251-2.521,4.092,4.092,0,0,1,2.3.937l-1.109,1,4.676,1.256Z"
                        transform="translate(-922.999 -183.999)"
                      />
                    </svg>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "right",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <NoviceIcon />
                  <AmaterurIcon />
                  <IntermediateIcon />
                  <AdvancedIcon />
                </div>
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

              <div className="course_card_name"> اسم الدورة التدريبية</div>
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
