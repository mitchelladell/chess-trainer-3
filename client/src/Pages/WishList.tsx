import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "../components/CourseCard/CourseCard";
import { useAppSelector } from "../app/hooks";
import "./WishList.css";
const WishList = () => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <div
      style={{
        background: theme === "dark" ? "" : "white",
      }}
    >
      <Container>
        <Row>
          <Col md={2} lg={2} sm={6} xs={6}>
            {" "}
            <div className={theme === "dark" ? "ads-area" : "ads-area-light"}>
              {" "}
              Hello
            </div>
          </Col>{" "}
          <Col md={12} lg={10} sm={6} xs={6}>
            <div
              className="wish_list_container"
              style={{
                background:
                  theme === "dark"
                    ? "#333333"
                    : "linear-gradient(to left top, #808080, #ffffff)",
              }}
            >
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
    </div>
  );
};

export default WishList;
