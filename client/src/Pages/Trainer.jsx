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
  const pgn1 =
    '[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *';

  const pgn2 =
    "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.} 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2";
  let pgndata = useLocation();

  let pgnList = pgndata.state.pgnWithName;

  console.log("list", pgnList);

  const { variation } = useParams();
  console.log("variation", variation);

  const [position, setPosition] = useState("");
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [data, setData] = useState([]);
  const [whiteOrientation, setWhiteOrientation] = useState(true);
  const [pgn, setPgn] = useState(variation);
  const [page, setPage] = useState(0);

  const [testPgn, setTestPGN] = useState([]);

  const [correctMove, setCorrectMove] = useState(false);
  const [hasMadeMove, setHasMadeMove] = useState(false);
  const [showIncorrectMove, setShowIncorrectMove] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const [finalpgn, setFinalpgn] = useState([]);
  const [highlightedMoveIndex, setHighlightedMoveIndex] = useState(null);
  const [comments, setComments] = useState([]);

  const [trainingMode, setTrainningMode] = useState(false);
  const [game, setGame] = useState(new Chess());

  const [dimensions, setDimensions] = useState({
    width:
      window.innerWidth > window.innerHeight
        ? window.innerHeight * 0.7
        : window.innerWidth * 0.7,
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
      console.log("finalPgn", finalpgn);
      const parsedMoves = finalpgn[0].moves.map((move) => move.move);
      setMoves(parsedMoves);

      setTestPGN(finalpgn[0].moves);
      console.log("testPgn", finalpgn[0].moves);
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
          <Row>
            <Col>
              <Chessboard
                onPieceDrop={onDrop}
                position={game.fen()}
                boardWidth={dimensions.width}
                boardOrientation={whiteOrientation ? "white" : "black"}
                showBoardNotation={true}
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
                <Button disabled={page <= 0} onClick={handlePreviousPageClick}>
                  Previous Page
                </Button>
                &nbsp;
                <Button
                  disabled={page >= pgnList.length - 1}
                  onClick={handleNextPageClick}
                >
                  Next Page
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Trainer;
