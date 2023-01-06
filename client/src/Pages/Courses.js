import "./FrontPage.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import Footer from "../components/Footer/Footer";
import Video from "../components/VideoPlayer/VideoPlayer";

import "./Courses.css";
import NewsBoard from "../components/NewsBoard/NewsBoard";

const categories = [];

const Courses = (props) => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col sm={9} md={9} lg={9}>
            <Dashboard
              variationExist={true}
              now={60}
              numberOfVariations={`0/${props.numberOfVariations}`}
              courseName="Queen Opening"
            />
          </Col>
          <Col sm={3} md={3} lg={3}>
            {" "}
            <NewsBoard />
            <NewsBoard />
            {/*             <Video />
             */}{" "}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Courses;
