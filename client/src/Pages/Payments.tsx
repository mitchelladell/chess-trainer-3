import { Container, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import { mySupabase } from "../mysuba";
import "./Payments.css";
import { useEffect, useState } from "react";
import { ICourse } from "./AllCourses";
import { RootState } from "../app/store";

interface IPurchase {
  course: ICourse;
}

const Payments = () => {
  const theme = useAppSelector((state: RootState) => state.theme.value);

  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);

  const [purchases, setPurchases] = useState<any>([]);
  const subscribedCoures = useAppSelector(
    (state: RootState) => state.courses.subscribedCourses
  );

  useEffect(() => {
    (async () => {
      let { data, error } = await mySupabase
        .from("purchases")
        .select(userInfo.sub);

      if (error) {
        console.error("Error fetching course:", error.message);
      } else {
        console.log("Course:", data);

        setPurchases(data);
      }
    })();
  }, [userInfo.sub]);

  const PurchasesInfo = (props: IPurchase) => {
    return (
      <Row>
        <Col>
          <div
            className="white-texts"
            style={{
              color: theme === "light" ? "black" : "white",
            }}
          >
            {
              purchases.find(
                (purchase: any) => purchase.course === props.course.id
              ).boughtat
            }
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
            {props.course.authorname}
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
    );
  };

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
                    صورة الدورة
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
                    مؤلف الدورة
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
              {subscribedCoures.map((course: any) => {
                return <PurchasesInfo course={course} />;
              })}
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Payments;
