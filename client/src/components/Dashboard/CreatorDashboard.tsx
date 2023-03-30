import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link } from "react-router-dom";
import PGN from "pgn-parser";
import { useAppSelector } from "../../app/hooks";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../features/language/languageSlice";

import "./creator-dashboard.css";

import { BsThreeDotsVertical, BsBook } from "react-icons/bs";
import translations from "../../consts/translations";
import NoviceIcon from "../../pgns/icons/CoursesLevelColors/Novice";
import AmaterurIcon from "../../pgns/icons/CoursesLevelColors/Amateur";
import IntermediateIcon from "../../pgns/icons/CoursesLevelColors/Intermediate";
import AdvancedIcon from "../../pgns/icons/CoursesLevelColors/Advanced";
import { StarSign } from "../../pgns/icons/UserProfileIcons/StarSign";

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
const CreatorDashboard: React.FC<IProps> = (props) => {
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
    axios.get("http://localhost:5000/api/pgn/1").then((response) => {
      setData(response.data);
    });
  }, []);

  const pgnWithName = data.map((obj: any) => {
    const [name, pgn] = Object.entries(obj)[0];
    return { name, pgn };
  });

  console.log("pgnWithName", pgnWithName);
  let totalCount = 0;
  const theme = useAppSelector((state) => state.theme.value);

  /*  pgnWithName.forEach((pgnwithname: any) => {
    const matches = pgnwithname.pgn.match(/\(/g);
    const count = matches ? matches.length + 1 : 1;
    totalCount += count;
  }); */

  return (
    <div
      className="user_dashboard_container"
      style={{
        background: theme === "dark" ? "" : "white",
      }}
    >
      <Container>
        <Row>
          <Col sm={12} xs={12} md={5} lg={5} style={{ margin: "auto" }}>
            <div
              style={{
                display: "flex",
                margin: "auto",
                justifyContent: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {" "}
                <Link to="/editcourse">
                  <Button variant="warning" className="golden_button_creator">
                    تعديل{" "}
                  </Button>
                </Link>
                <Link to="/coursecontent">
                  <Button variant="warning" className="golden_button_creator">
                    ارسال للمراجعــة{" "}
                  </Button>
                </Link>
                <Link to="/coursecontent">
                  <Button variant="warning" className="golden_button_creator">
                    معاينة{" "}
                  </Button>
                </Link>{" "}
              </div>
            </div>{" "}
          </Col>
          <Col sm={12} xs={12} md={7} lg={7} align="right">
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "10px",
                padding: "15px",
              }}
            >
              <Col>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      marginTop: "30px",
                      marginBottom: "15px",
                      justifyContent: "right",
                    }}
                  >
                    <NoviceIcon />
                    <AmaterurIcon />
                    <IntermediateIcon />
                    <AdvancedIcon />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "right",
                    }}
                  >
                    <StarSign />
                    <StarSign /> <StarSign /> <StarSign />
                  </div>
                  <div
                    className="course-title"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    {" "}
                    اسم الدورة التدريبية
                  </div>
                  <div
                    className="course-title"
                    style={{
                      color: theme === "light" ? "black" : "white",
                    }}
                  >
                    {" "}
                    تاريخ انشاء الدورة{" "}
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  {" "}
                  <img className="dashboard-image" alt=""></img>
                </div>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreatorDashboard;
