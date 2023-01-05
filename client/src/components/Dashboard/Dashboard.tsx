import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import translations from "../../consts/translations";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";

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
  const handleClick = () => {
    console.log("hello");
  };

  return (
    <div className="dashboard_container">
      <Container>
        <Row>
          <Col sm={3} md={3} lg={2} className="d-flex">
            <img className="dashboard-image" alt=""></img>
          </Col>
          <Col sm={7} md={7} lg={8}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <Link to="/courses/variation/">
                <div style={{ cursor: "pointer" }} onClick={handleClick}>
                  {" "}
                  {/* Should be a react Link redirecting to Variations */}
                  {props.courseName}{" "}
                </div>
              </Link>
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
          <Col sm={3} md={3} lg={2}>
            {" "}
            <div className="spaced_divs">
              <Link to="/courses/variation/">
                <Button> Enroll </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
