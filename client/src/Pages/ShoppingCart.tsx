import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "./ShoppingCart.css";
import ShoppingCard from "../components/shoppingCard/ShoppingCard";
import ShoppingCartIcon from "../pgns/icons/ShoppingCartIcon";

const ShoppingCart = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");
  const lang = useAppSelector((state: any) => state.language.value);

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div className="flex-container" style={{ flexDirection: direction }}>
        <Container>
          <Row>
            <Col>
              {" "}
              <Button className="shopping-buttons">hello</Button>
              <Button className="shopping-buttons">Hello</Button>
            </Col>
            <Col align={"right"}>
              {" "}
              <Button className="shopping-buttons" style={{ color: "white" }}>
                <div>
                  {" "}
                  سلة التسوق الخاصة بك <ShoppingCartIcon />
                </div>
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          {" "}
          <Row>
            <Col>
              {" "}
              <div
                className="profile_container"
                style={{ marginBottom: "20px" }}
              >
                {" "}
                <div className="orange-texts"> الاجمـالى </div>{" "}
                <div className="white-texts"> 600 EGP</div>{" "}
              </div>
              <div className="profile_container">
                {" "}
                <div className="orange-texts">
                  {" "}
                  ارسل المحتـــوى كهديـــة{" "}
                </div>{" "}
                <div className="white-texts"> 600 EGP</div>{" "}
              </div>
              <div style={{ textAlign: "center" }}>
                {" "}
                <Button className="shopping-buttons">
                  <div> تسوق المزيد</div>
                </Button>{" "}
              </div>
              <div style={{ textAlign: "center" }}>
                {" "}
                <Button className="shopping-buttons">
                  <div> الــــدفـــــع</div>
                </Button>
              </div>
            </Col>
            <Col align={"right"} sm={12} xs={12} md={9} lg={9}>
              <div className="profile_container">
                <Container>
                  <Row>
                    <Col>
                      <div className="orange-texts">السعــــــر </div>
                    </Col>

                    <Col>
                      {" "}
                      <div className="orange-texts">لقد حفظت 2 </div>
                    </Col>
                    <Col>
                      <div className="orange-texts">:الوصول الفوري إلى </div>
                    </Col>
                    <ShoppingCard />
                    <ShoppingCard />
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ShoppingCart;
