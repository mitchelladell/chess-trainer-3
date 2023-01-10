import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import translations from "../consts/translations";
import { useSelector } from "react-redux";
import "./Sign.css";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { update } from "../features/language/languageSlice";

const SignIn = () => {
  const lang = useSelector((state: any) => state.language.value);

  const dispatch = useDispatch();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      dispatch(update(lang));
    }
  }, [dispatch]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <div className="sign-form">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label> {translations[lang].email}</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>{translations[lang].password}</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label={translations[lang].keep_signIn}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  className="singin_button"
                  type="submit"
                >
                  {translations[lang].signIn}
                </Button>
              </Form>
            </div>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <img alt="Image Goes here"></img>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
