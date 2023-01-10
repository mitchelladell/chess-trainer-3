import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import PGN from "pgn-parser";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../features/language/languageSlice";

import "./Dashboard.css";

import { BsThreeDotsVertical, BsBook } from "react-icons/bs";
import translations from "../../consts/translations";

type IProps = {
  variationExist: boolean;
  courseName: string;
  progress: number;
  numberOfVariations: string;
};

type Translation = {
  [key: string]: {
    learn: "string";
  };
};

/* type Translation = {
  [key: string]: {
    courses: string;
    signUp: string;
    signIn: string;
    lang: string;
  };

}; */

async function readPGN(pgn2: any) {
  // Read the PGN file and parse it

  const pgn = pgn2;
  console.log("pgn", pgn);

  const postion = PGN.parse(pgn);

  // Return the initial position and solution
  return postion;
}
const Dashboard: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState<any>([]);

  const [pgnList, setPgnList] = useState([]);

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      dispatch(update(lang));
    }
  }, [dispatch]);

  const lang = useSelector(
    (state: { language: { value: string } }) => state.language.value
  );
  const [totalVariations, setTotalVariations] = useState(0);
  const [pgn, setPgn] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/pgn/1").then((response) => {
      setData(response.data);
    });
  }, []);

  const pgnWithName = data.map((obj: any) => {
    const [name, pgn] = Object.entries(obj)[0];
    return { name, pgn };
  });

  console.log("pgnWithName", pgnWithName);
  let totalCount = 0;

  pgnWithName.forEach((pgnwithname: any) => {
    const matches = pgnwithname.pgn.match(/\(/g);
    const count = matches ? matches.length + 1 : 1;
    totalCount += count;
  });

  return (
    <div className="dashboard_container">
      <Container>
        <Row>
          <Col sm={3} md={3} lg={2} className="d-flex">
            <img className="dashboard-image" alt=""></img>
          </Col>
          <Col sm={7} md={7} lg={8}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <Link to="/courses/variation/">
                <div style={{ cursor: "pointer" }}>
                  {" "}
                  {/* Should be a react Link redirecting to Variations */}
                  {props.courseName}{" "}
                </div>
              </Link>
              <div>
                {" "}
                {props.variationExist && (
                  <BsBook />
                )} <BsThreeDotsVertical />{" "}
              </div>
            </div>
            <div className="spaced_divs"> 0 / {totalCount}</div>
            <div className="progres_bar">
              {" "}
              <ProgressBar now={props.progress} />
            </div>
          </Col>
          <Col sm={3} md={3} lg={2}>
            {" "}
            <div className="spaced_divs">
              <Link to="/courses/variation/">
                <Button variant="warning" className="golden_button">
                  {" "}
                  {(translations as Translation)[lang].learn}
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
