import { useState, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { Container, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ShoppingCart.css";
import ShoppingCard from "../components/shoppingCard/ShoppingCard";
import ShoppingCartIcon from "../pgns/icons/ShoppingCartIcon";
import WorldMap from "../pgns/icons/WorldMap";
import QuestionMark from "../pgns/icons/QuestionMark";

const ShoppingCart = () => {
  const [direction, setDirection] = useState<"row" | "row-reverse">("row");

  const [firstCurrencyOption, setFirstCurrencyOption] = useState("USD $");
  const [countrySelection, setCountrySelection] = useState("اختـــر دولتـــك");

  const lang = useAppSelector((state: any) => state.language.value);
  const theme = useAppSelector((state) => state.theme.value);

  let paymentCurrencies = ["USD $", "EGP"];
  let countryOptions = ["USA", "EGYPT", "UK"];

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang]);
  return (
    <div>
      <div
        className="flex-container"
        style={{
          flexDirection: direction,
          background: theme === "dark" ? "" : "white",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div style={{ display: "flex" }}>
                <div>
                  {" "}
                  <QuestionMark />
                </div>
                <Dropdown className="currency_dropdown">
                  <Dropdown.Toggle>{firstCurrencyOption}</Dropdown.Toggle>

                  <Dropdown.Menu>
                    {paymentCurrencies.map((currency) => (
                      <Dropdown.Item
                        key={currency}
                        onClick={() => setFirstCurrencyOption(currency)}
                      >
                        {currency}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="currency_dropdown">
                  <Dropdown.Toggle style={{ background: "#DAA520" }}>
                    {" "}
                    <WorldMap /> {countrySelection}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {countryOptions.map((country) => (
                      <Dropdown.Item
                        key={country}
                        onClick={() => setCountrySelection(country)}
                      >
                        {country}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
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
                <div
                  className="white-texts"
                  style={{ color: theme === "light" ? "black" : "" }}
                >
                  {" "}
                  600 EGP
                </div>{" "}
              </div>
              <div className="profile_container">
                {" "}
                <div className="orange-texts">
                  {" "}
                  ارسل المحتـــوى كهديـــة{" "}
                </div>{" "}
                <div
                  className="white-texts"
                  style={{ color: theme === "light" ? "black" : "" }}
                >
                  {" "}
                  600 EGP
                </div>{" "}
              </div>
              <div style={{ textAlign: "center" }}>
                <Link to="/allcourses">
                  {" "}
                  <Button className="shopping-buttons">
                    <div> تسوق المزيد</div>
                  </Button>{" "}
                </Link>
              </div>
              <div style={{ textAlign: "center" }}>
                {" "}
                <Link to="/payment">
                  {" "}
                  <Button className="shopping-buttons">
                    <div> الــــدفـــــع</div>
                  </Button>{" "}
                </Link>
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
