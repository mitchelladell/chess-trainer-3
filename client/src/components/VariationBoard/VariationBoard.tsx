import { Container, Row, Col, Button } from "react-bootstrap";
import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import translations from "../../consts/translations";
import { useSelector } from "react-redux";
import Video from "../VideoPlayer/VideoPlayer";

import "./VariationBoard.css";
import axios from "axios";
import Footer from "../Footer/Footer";

type IProps = {};

type Translation = {
  [key: string]: {
    turboCoach: "string";
  };
};

const VariationBoard: React.FC<IProps> = (props) => {
  const [data, setData] = useState([]);

  const lang = useSelector(
    (state: { language: { value: string } }) => state.language.value
  );
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pgn/1")
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
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="variation_board">
                <div className="variation_name">
                  <Link
                    to={`/trainer/${encodeURIComponent(
                      obj[Object.keys(obj)[0]]
                    )}`}
                    state={{ pgnWithName: pgnWithName }}
                  >
                    {" "}
                    {Object.keys(obj)[0]}: {obj[Object.keys(obj)[0]]}
                  </Link>
                </div>{" "}
                <div className="variation">
                  <Video />
                </div>{" "}
                <div>
                  <Link
                    to={`/trainer/${encodeURIComponent(
                      obj[Object.keys(obj)[0]]
                    )}`}
                    state={{ pgnWithName: pgnWithName }}
                  >
                    <Button variant="warning">
                      {" "}
                      {(translations as Translation)[lang].turboCoach}
                    </Button>
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
