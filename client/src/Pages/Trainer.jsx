import React, { useState, useEffect } from "react";
import PGN from "pgn-parser";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";

import { MdFlipCameraAndroid } from "react-icons/md";
import {
  AiFillFastForward,
  AiFillFastBackward,
  AiFillStepBackward,
  AiFillStepForward,
} from "react-icons/ai";

import "./Trainer.css";

async function readPGN(pgn2) {
  // Read the PGN file and parse it
  const pgn = pgn2;

  const postion = PGN.parse(pgn);

  // Return the initial position and solution
  return postion;
}

const Trainer = () => {
  let pgndata = useLocation();

  let pgnList = pgndata.state.pgnWithName;

  console.log("list", pgnList);

  const { variation } = useParams();
  console.log("variation", variation);

  const [position, setPosition] = useState("");
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [whiteOrientation, setWhiteOrientation] = useState(true);
  const [pgn, setPgn] = useState(variation);
  const [page, setPage] = useState(0);

  const [correctMove, setCorrectMove] = useState(false);
  const [hasMadeMove, setHasMadeMove] = useState(false);
  const [showIncorrectMove, setShowIncorrectMove] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const [finalpgn, setFinalpgn] = useState([]);
  const [highlightedMoveIndex, setHighlightedMoveIndex] = useState(null);
  const [trainingMode, setTrainningMode] = useState(false);
  const [game, setGame] = useState(new Chess());

  const [dimensions, setDimensions] = useState({
    width:
      window.innerWidth > window.innerHeight
        ? window.innerHeight * 0.7
        : window.innerWidth * 0.9,
    height:
      window.innerWidth > window.innerHeight
        ? window.innerHeight * 0.7
        : window.innerWidth * 0.7,
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const handleResize = () => {
    if (window.innerWidth > window.innerHeight) {
      setDimensions({
        width: window.innerHeight * 0.7,
        height: window.innerHeight * 0.7,
      });
    } else {
      setDimensions({
        width: window.innerWidth * 0.7,
        height: window.innerWidth * 0.7,
      });
    }
  };

  const getNextMove = (e) => {
    // Get the next move in the `moves` array
    const nextMove = moves[currentMove];
    // Make the move on the chessboard
    game.move(nextMove);
    // Update the component's state with the new position and current move index
    setCurrentMove(currentMove + 1);
    setHighlightedMoveIndex(highlightedMoveIndex + 1);
    setPosition(game.fen());
  };

  const getPreviousMove = (e) => {
    // Undo the last move on the chessboard
    game.undo();

    // Update the component's state with the new position and current move index
    setCurrentMove(currentMove - 1);
    setHighlightedMoveIndex(highlightedMoveIndex - 1);
    setPosition(game.fen());
  };

  const getFirstMove = () => {
    loadPostion(-1);
    setHighlightedMoveIndex(-1);
  };

  const getLastMove = () => {
    loadPostion(moves.length - 1);
    setHighlightedMoveIndex(moves.length - 1);
  };

  const handleNextPageClick = () => {
    setPgn(pgnList[page + 1].pgn);
    setPage(page + 1);
    game.reset();
    setPosition(game.fen());
    setCurrentMove(0);
    setHighlightedMoveIndex(-1);
  };

  const handlePreviousPageClick = () => {
    setPgn(pgnList[page - 1].pgn);
    setPage(page - 1);
    game.reset();
    setPosition(game.fen());
    setCurrentMove(0);
    setHighlightedMoveIndex(-1);
  };

  document.onkeydown = checkKey;

  function checkKey(e: any) {
    e = e || window.event;

    // up arrow
    if (e.keyCode == "37") {
      getPreviousMove(e);
      // left arrow
    } else if (e.keyCode == "39") {
      getNextMove(e);
      // right arrow
    }
    const gameCopy = { ...game };

    setGame(gameCopy);
  }

  useEffect(() => {
    readPGN(pgn).then((finalpgn) => {
      const parsedMoves = finalpgn[0].moves.map((move) => move.move);
      setMoves(parsedMoves);
      setFinalpgn(finalpgn[0].moves);
    });
  }, [pgn]);

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
  }

  const loadPostion = (index) => {
    // Reset the game to the initial position
    game.reset();
    // Highlight the selected move
    setHighlightedMoveIndex(index);

    // Make all the moves up to the selected move
    for (let i = 0; i <= index; i++) {
      game.move(moves[i]);
    }

    // Update the component's state with the new position and current move index
    setPosition(game.fen());
    setCurrentMove(index + 1);
  };

  function makeAMove(move) {
    // Make the move on the chessboard
    game.move(move);
    setHasMadeMove(true);
    // Update the component's state with the new position
    setPosition(game.fen());

    // Check if the move follows the PGN
    if (game.history()[currentMove] !== moves[currentMove]) {
      // The move does not follow the PGN, so add a delay before taking it back

      setCorrectMove(false);
      setShowIncorrectMove(true);

      setTimeout(() => {
        // Undo the move
        game.undo();

        // Update the component's state with the new position
        setPosition(game.fen());
        setShowIncorrectMove(false);
      }, 250); // delay of 1/4 second
    } else {
      setTimeout(() => {
        // Increment the current move index by one
        setCorrectMove(true);
        setCurrentMove((prevMove) => prevMove + 1);
        //  setHighlightedMoveIndex((prevMove) => prevMove + 1);

        // Check if the game is not over
        if (!game.game_over()) {
          // Get the next move in the `moves` array
          const nextMove = moves[currentMove + 1];

          // Make the next move on the chessboard
          game.move(nextMove);

          // Update the component's state with the new position
          setPosition(game.fen());
          setShowHint(false);

          // Increment the current move index
          setCurrentMove((prevMove) => prevMove + 1);
          //  setHighlightedMoveIndex((prevMove) => prevMove + 1);
        }
      }, 500);
    }
  }

  return (
    <div>
      <Header />
      <div style={{ padding: "10px" }}>
        <Container>
          <Row no-gutters="true">
            <Col>
              <Chessboard
                onPieceDrop={onDrop}
                position={game.fen()}
                boardWidth={dimensions.width}
                boardOrientation={whiteOrientation ? "white" : "black"}
                showBoardNotation={true}
                customSquareStyles={{
                  "square:hover": {
                    boxShadow: "inset 0 0 1px 6px rgba(255, 0, 0)", // red color
                  },
                }}
                customBoardStyle={{
                  borderRadius: "5px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
                }}
                customDropSquareStyle={{
                  boxShadow: "inset 0 0 1px 6px rgba(255, 240, 0)",
                }}
              />
              <Container>
                <div>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => setWhiteOrientation(!whiteOrientation)}
                      >
                        <MdFlipCameraAndroid />
                      </Button>
                      &nbsp;
                      <Button
                        disabled={currentMove <= 0}
                        onClick={() => getFirstMove()}
                      >
                        <AiFillFastBackward />
                      </Button>
                      &nbsp;
                      <Button
                        disabled={currentMove <= 0}
                        onClick={(e) => getPreviousMove(e)}
                      >
                        <AiFillStepBackward />
                      </Button>{" "}
                      &nbsp;
                      <Button
                        disabled={currentMove >= moves.length - 1}
                        onClick={(e) => getNextMove(e)}
                      >
                        <AiFillStepForward />
                      </Button>
                      &nbsp;
                      <Button
                        onClick={() => getLastMove()}
                        disabled={currentMove >= moves.length - 1}
                      >
                        <AiFillFastForward />
                      </Button>
                    </Col>
                    <Col>
                      <Button onClick={() => setTrainningMode(!trainingMode)}>
                        {trainingMode ? "Exit Training" : "Test Yourself"}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </Col>
            <Col>
              {!trainingMode ? (
                <div
                  className="moves_container"
                  style={{ height: dimensions.height }}
                >
                  {finalpgn.length > 0 &&
                    finalpgn.map((move, index) => (
                      <div>
                        <div
                          key={index}
                          className={
                            index === highlightedMoveIndex
                              ? "highlighted-move"
                              : ""
                          }
                          style={{ fontWeight: "bold", cursor: "pointer" }}
                          onClick={() => {
                            loadPostion(index);
                          }}
                        >
                          <div key={index}>
                            {" "}
                            {move.move_number ? `${move.move_number}.` : "..."}
                            {move.move}
                          </div>
                        </div>
                        {move.comments.length > 0 && (
                          <div>
                            {move.comments.map((c) => c.text).join(" ")}
                          </div>
                        )}
                        {move.ravs && move.ravs.length > 0 && (
                          <div>
                            {move.ravs[0].moves.map((variation, index) => (
                              <div key={index}>
                                {variation.move}{" "}
                                {variation.comments.length &&
                                  variation.comments[0].text}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div style={{ visibility: hasMadeMove ? "visible" : "hidden" }}>
                  {!correctMove ? (
                    <div style={{ marginBottom: "20px" }}>
                      Incorrect move, Try again :(
                      <div>
                        <Button onClick={() => setShowHint(!showHint)}>
                          {""}
                          {!correctMove && !showHint
                            ? "Show Hint"
                            : " Hide Hint"}
                        </Button>
                      </div>
                      <div>{showHint ? moves[currentMove] : ""}</div>
                    </div>
                  ) : (
                    <div>"Correct move!"</div>
                  )}
                </div>
              )}

              <div>
                <Container>
                  <Row className="no-gutters">
                    <Col align={"end"}>
                      {" "}
                      <Button
                        disabled={page <= 0}
                        onClick={handlePreviousPageClick}
                      >
                        Previous Page
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        disabled={page >= pgnList.length - 1}
                        onClick={handleNextPageClick}
                      >
                        Next Page
                      </Button>
                    </Col>
                  </Row>
                </Container>
                &nbsp;
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Trainer;
