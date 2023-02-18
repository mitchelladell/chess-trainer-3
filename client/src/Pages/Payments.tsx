import { Container, Row, Col } from "react-bootstrap";
import "./Payments.css";

const Payments = () => {
  return (
    <div>
      {" "}
      <Container>
        {" "}
        <Row>
          {" "}
          <div className="payments_keyword"> مشتـــريـــاتـــك</div>
          <div className="payments_container">
            {" "}
            <Container>
              {" "}
              <Row>
                {" "}
                <Col>
                  <div className="orange-texts">تاريخ الشـــراء </div>
                </Col>
                <Col>
                  <div className="orange-texts">صورة الدورة </div>
                </Col>
                <Col>
                  {" "}
                  <div className="orange-texts">مؤلف الدورة </div>
                </Col>
                <Col>
                  <div className="orange-texts">تكلفة الدورة </div>
                </Col>
                <Col>
                  <div className="orange-texts">
                    {" "}
                    البـريد الإلكتـرونـي للمشتــرى
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  background: "white",
                  height: "3px",
                  border: "3px solid white",
                  width: "80%",
                  margin: "auto",
                }}
              >
                {" "}
              </div>
              <Row>
                <Col>
                  <div className="white-texts">2022/4/13 </div>
                </Col>
                <Col>
                  <div className="white-texts">
                    <img width={"75px"} height="75px" alt="" />{" "}
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="white-texts">اسم مؤلف الدورة التدريبية </div>
                </Col>
                <Col>
                  <div className="white-texts"> 1200 EP </div>
                </Col>
                <Col>
                  <div className="white-texts"> lolasasa123@gmail.com </div>
                </Col>
                <div
                  style={{
                    background: "white",
                    height: "3px",
                    border: "3px solid white",
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  {" "}
                </div>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Payments;
