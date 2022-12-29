import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../components/Header/Header";
import translations from "../consts/translations";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";

import { Button } from "react-bootstrap";

export default function Trainer() {
  const [game, setGame] = useState(new Chess());
  const lang = useSelector((state: any) => state.language.value);

  const [moveState, setMovestate] = useState(true);

  const [expectedNextMove, setExpectedNextMove] = useState("");

  const [SequenceState, setSequenceState] = useState("");
  const [orientationWhite, setOrientationWhite] = useState(true);





 const [dimensions, setDimensions] = useState({
    width: window.innerWidth /2.5 ,
    height: window.innerHeight/2.5,
  });
console.log( 'dimensions',dimensions);
const handleResize = () => {


  if (window.innerWidth < 500) {
    setDimensions({
      width: window.innerWidth * 0.95,
      height: window.innerHeight *0.95
    })
  }
  else{
      setDimensions({
    width: window.innerWidth /2,
    height: window.innerHeight / 2,
    });

  }
  
  }
useEffect(() => {
  window.addEventListener("resize", handleResize, false);
}, []);


let boardWidth =window.screen.width / 3;

console.log('width', boardWidth)

  document.onkeydown = checkKey;
  function checkKey(e: any) {
    e = e || window.event;

    // up arrow
    if (e.keyCode == "37") {
      console.log(game.fen());
      e.preventDefault();
      game.undo();

      // left arrow
    } else if (e.keyCode == "39") {
      e.preventDefault();

      // right arrow
    }
    const gameCopy = { ...game };

    setGame(gameCopy);
  }

  const pgn = "1. d4 d5 2. Nf3 Nc6";
  var listPgn = pgn.split(" ");

  const filteredList = listPgn.filter((item) => !item.match(/[0-9]+\./)); //this returns an array of pgn moves without move number

  console.log("noDigits", filteredList);

  function makeAMove(move: any) {
    const gameCopy = { ...game };

    if (SequenceState === "Solved") {
      return false;
    }

    const result = gameCopy.move(move);
    if (!pgn.includes(game.pgn())) {
      game.undo();
      setMovestate(false);
      setExpectedNextMove(
        `Move should be  ${filteredList[game.history().length]}`
      );
      return false;
    }

    if (pgn === game.pgn()) {
      window.alert("success, You solved it");
      setSequenceState("Solved");
      return false;
    }

    setGame(gameCopy);
    setMovestate(true);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
  }

  return (
    <div> 
      <Header />

      <div className="main" id='contain'>

    <Container fluid>
      <Row>
<Col xs={12} sm={9} md={8} lg={6} >          
<Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            areArrowsAllowed={true}
            showBoardNotation={true}
            arePiecesDraggable={true}
            arePremovesAllowed={true}
            boardWidth={dimensions.width}
            boardOrientation={orientationWhite ? 'white' : 'black'}
          />
        </Col>
        <Col xs={12} sm={3} md={4} lg={6}>
          <Button onClick={()=>setOrientationWhite(!orientationWhite)}> Flip The board </Button>
          {!moveState ? <div> {translations[lang].wrongMove} </div> : ""}{" "}
          {!moveState ? <div> {expectedNextMove} </div> : ""}
        </Col>
      </Row>
    </Container>
    </div>
    <Footer/>
    </div>

  );
}
