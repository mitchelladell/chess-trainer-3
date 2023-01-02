import {Row, Col, Container} from "react-bootstrap/";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Sign.css";


const SignUp = () => {
  return (
    <div className="App">
      <Header />
      <Container fluid>
        <Row>
          <Col sm={12} md={6} lg={6}>
             <div className="sign-form">
        {" "}
        <Form>
          <Form.Group className="mb-3" controlId="formbasicuserName">
            <Form.Label>User name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

          </Col>
          <Col sm={12} md={6} lg={6}>
            <img alt='image here'/> 
          </Col>
        </Row>
      </Container>
      <Footer/> 
    </div>
  );
};

export default SignUp;
