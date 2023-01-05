import { Container, Row, Col, Button } from "react-bootstrap";
import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./VariationBoard.css";
import axios from "axios";

type IProps = {};

const VariationBoard: React.FC<IProps> = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/pgn/1")
      .then((response) => setData(response.data));
  }, []);

  const pgnWithName = data.map((obj) => {
    const [name, pgn] = Object.entries(obj)[0];
    return { name, pgn };
  });

  console.log("pgnNames", pgnWithName);

  return (
    <Container fluid>
      {data.map((obj) => (
        <div key={Object.keys(obj)[0]}>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <div className="variation_board">
                <div className="variation_name">
                  <Link
                    to={`/trainer/${encodeURIComponent(
                      obj[Object.keys(obj)[0]]
                    )}`}
                    state={{ pgnWithName: pgnWithName }}
                  >
                    {" "}
                    {Object.keys(obj)[0]}:
                  </Link>
                </div>{" "}
                <div className="variation">
                  <Link
                    to={`/trainer/${encodeURIComponent(
                      obj[Object.keys(obj)[0]]
                    )}`}
                    state={{ pgnWithName: pgnWithName }}
                  >
                    {obj[Object.keys(obj)[0]]}
                  </Link>
                </div>{" "}
                <div>
                  <Link
                    to={`/trainer/${encodeURIComponent(
                      obj[Object.keys(obj)[0]]
                    )}`}
                    state={{ pgnWithName: pgnWithName }}
                  >
                    <Button>Learn</Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default VariationBoard;
