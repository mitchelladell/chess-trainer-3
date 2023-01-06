import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import translations from "../consts/translations";
import Header from "../components/Header/Header";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer/Footer";
import VariationBoard from "../components/VariationBoard/VariationBoard";

const Variations = () => {
  const lang = useSelector((state: any) => state.language.value);

  return (
    <div className="App">
      <div>
        <VariationBoard />
      </div>
    </div>
  );
};

export default Variations;
