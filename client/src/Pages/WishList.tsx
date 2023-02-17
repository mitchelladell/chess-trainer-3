import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import "./WishList.css";
const WishList = () => {
  return (
    <Container>
      <Row>
        <Col md={2} lg={2} sm={6} xs={6}>
          {" "}
          <div className="ads-area"> Hello</div>
        </Col>{" "}
        <Col md={12} lg={10} sm={6} xs={6}>
          <div className="wish_list_container">
            {" "}
            <CourseCard buy={true} />
            <CourseCard buy={true} />
            <CourseCard buy={true} />
            <CourseCard buy={true} />
            <CourseCard buy={true} />
            <CourseCard buy={true} />
            <CourseCard buy={true} />
          </div>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default WishList;
