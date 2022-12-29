import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../../consts/translations";
import ProgressBar from "react-bootstrap/ProgressBar";

import "./Dashboard.css";

import { BsThreeDotsVertical, BsBook } from "react-icons/bs";

type IProps = {
  variationExist: boolean;
  courseName: string;
  progress: number;
  numberOfVariations: string;
};

/* type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
  };
}; */
const Dashboard: React.FC<IProps> = (props) => {
  return (
    <div className="dashboard_container">
      <Container>
        <Row>
          <Col sm={2} md={2} lg={2}>
            <img className="dashboard-image" alt=""></img>
          </Col>
          <Col sm={8} md={8} lg={8}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              {props.courseName}{" "}
              <div>
                {" "}
                {props.variationExist && (
                  <BsBook />
                )} <BsThreeDotsVertical />{" "}
              </div>
            </div>
            <div className="spaced_divs">
              {" "}
              Number OF variations : {props.numberOfVariations}
            </div>
            <div className="progres_bar">
              {" "}
              <ProgressBar now={props.progress} />
            </div>
          </Col>
          <Col sm={2} md={2} lg={2}>
            {" "}
            <div className="spaced_divs">
              <Button> Enroll </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
