import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import PGN from "pgn-parser";
import { useAppSelector } from "../../app/hooks";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../features/language/languageSlice";

import "./user-dashboard.css";

import NoviceIcon from "../../pgns/icons/CoursesLevelColors/Novice";
import AmaterurIcon from "../../pgns/icons/CoursesLevelColors/Amateur";
import IntermediateIcon from "../../pgns/icons/CoursesLevelColors/Intermediate";
import AdvancedIcon from "../../pgns/icons/CoursesLevelColors/Advanced";
import { StarSign } from "../../pgns/icons/UserProfileIcons/StarSign";

type IProps = {
  variationExist: boolean;
  courseName: string;
  progress: number;
  numberOfVariations: string;
  courseNumber: string;
};

const UserDashboard: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      dispatch(update(lang));
    }
  }, [dispatch]);

  const theme = useAppSelector((state) => state.theme.value);

  return (
    <div
      className="user_dashboard_container"
      style={{
        background: theme === "dark" ? "" : "white",
      }}
    >
      <Container>
        <Row>
          <Col sm={12} xs={12} md={5} lg={5} style={{ margin: "auto" }}>
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "left",
              }}
            >
              <Link to={`${props.courseNumber}/coursecontent`}>
                <Button variant="warning" className="golden_button">
                  Learn
                </Button>
              </Link>
            </div>{" "}
          </Col>
          <Col sm={12} xs={12} md={7} lg={7} align="right">
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "10px",
                padding: "15px",
              }}
            >
              <Col>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      marginTop: "30px",
                      marginBottom: "15px",
                      justifyContent: "right",
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
                    }}
                  >
                    <StarSign />
                    <StarSign /> <StarSign /> <StarSign />
                  </div>
                  <div
                    className="course-title"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    {" "}
                    Course Name
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  {" "}
                  <img className="dashboard-image" alt=""></img>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
