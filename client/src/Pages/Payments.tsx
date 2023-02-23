import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import "./Payments.css";

const Payments = () => {
  const theme = useAppSelector((state) => state.theme.value);
  return (
    <div
      style={{
        background: theme === "dark" ? "" : "white",
        height: "100%",
      }}
    >
      {" "}
      <Container>
        {" "}
        <Row>
          {" "}
          <div className="payments_keyword"> مشتـــريـــاتـــك</div>
          <div
            className="payments_container"
            style={{
              background:
                theme === "dark"
                  ? "#333333"
                  : "linear-gradient(to left top, #808080, #ffffff)",
            }}
          >
            {" "}
            <Container>
              {" "}
              <Row>
                {" "}
                <Col>
                  <div
                    className="orange-texts"
                    style={{
                      color: theme === "dark" ? "" : "black",
                    }}
                  >
                    تاريخ الشـــراء{" "}
                  </div>
                </Col>
                <Col>
                  <div
                    className="orange-texts"
                    style={{
                      color: theme === "dark" ? "" : "black",
                    }}
                  >
                    صورة الدورة{" "}
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div
                    className="orange-texts"
                    style={{
                      color: theme === "dark" ? "" : "black",
                    }}
                  >
                    مؤلف الدورة{" "}
                  </div>
                </Col>
                <Col>
                  <div
                    className="orange-texts"
                    style={{
                      color: theme === "dark" ? "" : "black",
                    }}
                  >
                    تكلفة الدورة{" "}
                  </div>
                </Col>
                <Col>
                  <div
                    className="orange-texts"
                    style={{
                      color: theme === "dark" ? "" : "black",
                    }}
                  >
                    {" "}
                    البـريد الإلكتـرونـي للمشتــرى
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  background: "white",
                  height: "3px",
                  border: `3px solid ${theme === "dark" ? "white" : "black"}`,

                  width: "80%",
                  margin: "auto",
                }}
              >
                {" "}
              </div>
              <Row>
                <Col>
                  <div
                    className="white-texts"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    2022/4/13{" "}
                  </div>
                </Col>
                <Col>
                  <div>
                    <img width={"75px"} height="75px" alt="" />{" "}
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div
                    className="white-texts"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    اسم مؤلف الدورة التدريبية{" "}
                  </div>
                </Col>
                <Col>
                  <div
                    className="white-texts"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    {" "}
                    1200 EP{" "}
                  </div>
                </Col>
                <Col>
                  <div
                    className="white-texts"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    {" "}
                    lolasasa123@gmail.com{" "}
                  </div>
                </Col>
                <div
                  style={{
                    height: "3px",
                    border: `3px solid ${theme === "dark" ? "white" : "black"}`,
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
