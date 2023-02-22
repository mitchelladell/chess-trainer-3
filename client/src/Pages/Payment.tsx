import { Container, Row, Col, Button } from "react-bootstrap";
import CheckMark from "../pgns/icons/CheckMark";
import { useState } from "react";
import EtisalatIcon from "../pgns/icons/EtisalatIcon";
import MasterCardIcon from "../pgns/icons/MasterCardIcon";
import PayPalIcon from "../pgns/icons/PayPalIcon";
import VodafoneIcon from "../pgns/icons/VodafoneIcon";
import PaymentModal from "../components/PaymentModal/PaymentModal";
import EtisalatModal from "../components/PaymentModal/EtisalatModal";
import VodafoneModal from "../components/PaymentModal/VodafoneModal";
import { useAppSelector } from "../app/hooks";
import "./Payment.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("MasterCard");
  const theme = useAppSelector((state) => state.theme.value);
  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        background: theme === "dark" ? "" : "white",
      }}
    >
      {" "}
      <Container>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            <EtisalatModal show={show} handleClose={() => setShow(!show)} />

            <div
              className="payment-container"
              style={{
                background: theme === "dark" ? "" : "white",
              }}
            >
              <div style={{ textAlign: "center" }}>
                {" "}
                <div className="payment_keyword">الاجمـالــــــى</div>
                <div
                  className="payment_counts"
                  style={{
                    color: theme === "light" ? "black" : "",
                  }}
                >
                  {" "}
                  600 EGP{" "}
                </div>
              </div>{" "}
            </div>
            <div
              className="payment-container"
              style={{
                background: theme === "dark" ? "" : "white",
              }}
            >
              {" "}
              <div
                className="payment_counts"
                style={{
                  color: theme === "light" ? "black" : "",
                }}
              >
                وصول غيـر محدود إلى الدورات الرقمية &nbsp;
                <CheckMark />
              </div>
              <div
                className="payment_counts"
                style={{
                  color: theme === "light" ? "black" : "",
                }}
              >
                معاملات آمنة &nbsp;
                <CheckMark />
              </div>
              <div
                className="payment_counts"
                style={{
                  color: theme === "light" ? "black" : "",
                }}
              >
                دخول فوري &nbsp;
                <CheckMark />
              </div>
            </div>
            <div
              className="payment-container"
              style={{
                background: theme === "dark" ? "" : "white",
              }}
            >
              {" "}
              <div className="payment_keyword">
                الدفع عن طريق كارت الدفع اونلاين
              </div>
              <div
                className="payment_counts"
                style={{
                  color: theme === "light" ? "black" : "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    onClick={() => setShow(true)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <EtisalatIcon />{" "}
                  </div>
                  <div
                    onClick={() => setShow(true)}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    <VodafoneIcon />{" "}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8} align="right">
            <div
              className="payment-container"
              style={{
                background: theme === "dark" ? "" : "white",
              }}
            >
              {" "}
              <div className="payment_keyword"> الدفـع </div>
              <div
                className="payment_counts"
                style={{
                  color: theme === "light" ? "black" : "",
                }}
              >
                {" "}
                2 &nbsp; دورة تدريبية فـى سلة التسوق الخاصة بك{" "}
              </div>
            </div>

            <div
              className="payment-container"
              style={{
                background: theme === "dark" ? "" : "white",
              }}
            >
              {" "}
              <div className="payment_keyword"> اختــر طريقة الدفع </div>
              <div
                className="payment_counts"
                style={{
                  color: theme === "light" ? "black" : "",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "right",
                  }}
                >
                  <div onClick={() => setPaymentMethod("MasterCard")}>
                    {" "}
                    <MasterCardIcon />
                  </div>

                  <div onClick={() => setPaymentMethod("PayPal")}>
                    {" "}
                    <PayPalIcon />
                  </div>
                </div>
              </div>
              {paymentMethod === "MasterCard" && (
                <div>
                  {" "}
                  <form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <input type="text" style={{ width: "40%" }} />
                      <div style={{ width: "20%" }}>
                        {" "}
                        <div
                          className="payment_counts"
                          style={{
                            color: theme === "light" ? "black" : "",
                          }}
                        >
                          {" "}
                          رقــــم الكــــارت{" "}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <input type="text" value="" style={{ width: "15%" }} />
                      <div style={{ width: "20%" }}>
                        {" "}
                        <div
                          className="payment_counts"
                          style={{
                            color: theme === "light" ? "black" : "",
                          }}
                        >
                          {" "}
                          كـود التــأميــن{" "}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <input type="text" value="" style={{ width: "15%" }} />
                      <input type="text" value="" style={{ width: "15%" }} />
                      <div style={{ width: "20%" }}>
                        {" "}
                        <div
                          className="payment_counts"
                          style={{
                            color: theme === "light" ? "black" : "",
                          }}
                        >
                          {" "}
                          تاريخ الانتهاء{" "}
                        </div>
                      </div>
                    </div>
                  </form>{" "}
                </div>
              )}
              {paymentMethod === "PayPal" && (
                <div>
                  <form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <input type="text" style={{ width: "40%" }} />
                      <div style={{ width: "20%" }}>
                        <div
                          className="payment_counts"
                          style={{
                            color: theme === "light" ? "black" : "",
                          }}
                        >
                          {" "}
                          البريد الالكترونى{" "}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        gap: "15px",
                        marginBottom: "15px",
                      }}
                    >
                      <input type="text" value="" style={{ width: "15%" }} />
                      <div style={{ width: "20%" }}>
                        <div
                          className="payment_counts"
                          style={{
                            color: theme === "light" ? "black" : "",
                          }}
                        >
                          {" "}
                          كلمة المرور{" "}
                        </div>
                      </div>
                    </div>
                  </form>{" "}
                </div>
              )}
            </div>
            <div className="payment_keyword">
              {" "}
              عندما تدفع ، فإنك توافق على شــروط شـــراء المحتوى الرقمــــي فـي
              شيش يـوسيـتـى <br />
              احصل على وصول فوري وابدأ التعلم الآن!
            </div>

            <Button className="shopping-buttons"> الــــدفـــع</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
