import React, { useState, useEffect, useRef } from "react";
import PGN from "pgn-parser";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Star, MdOutlineKeyboardArrowDown } from "react-bootstrap-icons";
import { ProgressBar } from "react-bootstrap";
import Stars from "../components/Stars/Star";

import { MdFlipCameraAndroid } from "react-icons/md";
import {
  AiFillFastForward,
  AiFillFastBackward,
  AiFillStepBackward,
  AiFillStepForward,
} from "react-icons/ai";

import "./Trainer.css";
import translations from "../consts/translations";
import Footer from "../components/Footer/Footer";

import { Nav, Navbar } from "react-bootstrap";
import { current } from "@reduxjs/toolkit";
import { update } from "../features/pgns/pgnSlice";

async function readPGN(pgn2) {
  // Read the PGN file and parse it
  const pgn = pgn2;

  const postion = PGN.parse(pgn);

  // Return the initial position and solution
  return postion;
}

const Trainer = () => {
  let pgndata = useLocation();
  const dispatch = useDispatch();

  const lang = useSelector((state: any) => state.language.value);

  let pgnList = pgndata.state.pgnWithName;

  console.log("list", pgnList);

  const { variation } = useParams();
  console.log("variation", variation);

  const [position, setPosition] = useState("");

  const [focusMode, setFocusMode] = useState(false);
  const [moves, setMoves] = useState([]);

  const [selectedMove, setSelectedMove] = useState(0);

  const [currentMove, setCurrentMove] = useState(0);
  const [incorrectMoves, setIncorrectMoves] = useState(new Set());

  const [whiteOrientation, setWhiteOrientation] = useState(true);
  const [pgn, setPgn] = useState(variation);
  const [page, setPage] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [navSelected, setNavSelected] = useState(null);
  const [arrows, setArrows] = useState([]);
  const [percent, setPercent] = useState(0);

  const [variantMoves, setVariantMoves] = useState([]);

  const [variationsCount, setVariationsCount] = useState(0);

  const [correctMove, setCorrectMove] = useState(false);
  const [hasMadeMove, setHasMadeMove] = useState(false);
  const [showIncorrectMove, setShowIncorrectMove] = useState(false);
  const [correctMovesCount, setCorrectMovesCount] = useState(0);
  const [wrongMovesCount, setWrongMovesCount] = useState(0);
  const [boardEnabled, setBoardEnabled] = useState(true);

  const [numberOfTries, setNumberOfTries] = useState(0);

  const [hintRequested, setHintRequested] = useState(true);

  const [variationSolved, setVariationSolved] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const [finalpgn, setFinalpgn] = useState([]);
  const [highlightedMoveIndex, setHighlightedMoveIndex] = useState(null);
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

  const correctAudio = useRef(null);

  function playCorrect() {
    correctAudio.current.play();
  }

  const findPgnIndex = () => {
    const index = pgnList.findIndex((element) => element.pgn === pgn);
    console.log("index", index);
    return index;
  };

  const calculateStars = () => {
    const percentage =
      ((moves.length / 2 - wrongMovesCount) * 200) / moves.length;

    setPercent(percentage);
    console.log("percentage", percentage);
  };

  const rewardSystemEffect = () => {
    return (
      <div
        style={{
          borderRadius: "3px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              background: "royalblue",
              fontSize: "35px",
              fontFamily: "Montserrat-Medium",
              textAlign: "center",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
          >
            {" "}
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "100%" }}>
                <div style={{ width: "100%", margin: "auto" }}>
                  <ProgressBar
                    animated={true}
                    variant="success"
                    style={{ width: "100%" }}
                    now={(correctMovesCount * 200) / moves.length}
                    max={100}
                    label={`${Math.floor(
                      (correctMovesCount * 200) / moves.length
                    )}%`}
                  />
                </div>
                {variationSolved && (
                  <div>
                    {" "}
                    <Stars percent={percent} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              background: "black",
              fontSize: "20px",
              color: "white",
              textAlign: "center",
              fontFamily: "SourceSerifPro-Bold",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            {" "}
            {translations[lang].correctMove}
          </div>{" "}
        </div>

        {variationSolved && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {translations[lang].congratulations}
          </div>
        )}
      </div>
    );
  };

  const handleTryAgain = () => {
    setHintRequested(true);
    setNumberOfTries(numberOfTries + 1);
    setTimeout(() => {
      // Undo the move
      game.undo();

      // Update the component's state with the new position
      setPosition(game.fen());
      setShowIncorrectMove(false);
    }, 250); // delay of 1/4 second
    setBoardEnabled(true);
    setCorrectMove(true);
  };

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
    loadPosition(-1);
    setHighlightedMoveIndex(-1);
  };

  const getLastMove = () => {
    loadPosition(moves.length - 1);
    setHighlightedMoveIndex(moves.length - 1);
  };

  const resetGame = () => {
    setArrows([]);
    game.reset();
    setPosition(game.fen());
    setCorrectMovesCount(0);
    setCurrentMove(0);
    setHighlightedMoveIndex(-1);
    setVariationSolved(false);
    setHasMadeMove(false);
    setPercent(0);
  };

  const handleNextPageClick = () => {
    setPgn(pgnList[page + 1].pgn);
    setPage(page + 1);
    resetGame();
  };

  const handlePreviousPageClick = () => {
    setPgn(pgnList[page - 1].pgn);
    setPage(page - 1);
    resetGame();
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
      console.log("finalpgn", finalpgn);
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
    return true;
  }

  const handleHint = () => {
    // Undo the move
    game.undo();

    // Update the component's state with the new position
    setPosition(game.fen());

    setShowIncorrectMove(false);
    console.log("correct", moves[currentMove]);

    setTimeout(() => {
      const move = game.move(moves[currentMove], { verbose: true });
      setArrows([move.from, move.to]);
      game.undo();
      setPosition(game.fen());
      setHasMadeMove(false);
      setBoardEnabled(true);
      setCorrectMove(true);
      setNumberOfTries(0);
      setHintRequested(false);
    }, 250); // delay of 1/4 second
  };

  function findParentMoves(move) {
    const moves = finalpgn;
    const previousMoves = [];

    function extractMoves(move, targetMoveNumber, previousMoves) {
      if (move.move_number === targetMoveNumber) {
        return previousMoves;
      }
      if (move.ravs) {
        for (let i = 0; i < move.ravs[0].moves.length; i++) {
          previousMoves.push(move.ravs[0].moves[i].move);
          return extractMoves(
            move.ravs[0].moves[i],
            targetMoveNumber,
            previousMoves
          );
        }
      } else {
        previousMoves.push(move.move);
      }
    }

    for (let i = 0; i < moves.length; i++) {
      if (moves[i].move_number === move.targetMoveNumber) {
        const extractedMoves = extractMoves(
          moves[i],
          move.targetMoveNumber,
          previousMoves
        );
        console.log(extractedMoves);
        return extractedMoves;
      }
    }
  }

  const loadPosition = (index) => {
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

  const playMoves = (index, depth = 0) => {
    finalpgn.forEach((move, i) => {
      if (move.ravs) {
        playMoves(move.ravs, index, depth + 1);
      } else if (i === index) {
        console.log("Playing moves till index: " + i);
        console.log("Depth: " + depth);
        loadPosition(i);
        // Code to play the moves till this point
      }
    });
  };

  /*   const moveSoundRef = useRef(null);
   */
  /*   return <audio ref={moveSoundRef} src="C:\Users\aamagebril\ownfiles\chess-typescript\chess-alpha\client\public\correct-6033.mp3" />;
   */
  function makeAMove(move) {
    // Make the move on the chessboard

    if (!game.move(move)) {
      return false;
      // The move is legal
    }

    if (variationSolved) {
      return false;
    }
    game.move(move);

    // Update the component's state with the new position
    setPosition(game.fen());

    setHasMadeMove(true);
    setHintRequested(false);

    calculateStars();

    /*     moveSoundRef.current.play();
     */
    // Check if the move follows the PGN
    if (game.history()[currentMove] !== moves[currentMove]) {
      if (!incorrectMoves.has(moves[currentMove])) {
        console.log("getting In");
        setWrongMovesCount((prev) => prev + 1);
        incorrectMoves.add(moves[currentMove]);
      }
      setBoardEnabled(false);
      setCorrectMove(false);

      setShowIncorrectMove(true);
    } else {
      playCorrect();
      setArrows([]);
      setCorrectMove(true);

      setTimeout(() => {
        // Increment the current move index by one

        setCurrentMove((prevMove) => prevMove + 1);

        setCorrectMovesCount((prev) => prev + 1);
        setHighlightedMoveIndex((prev) => prev + 1);

        console.log("correctCount", correctMovesCount);

        // Check if the game is not over
        if (!game.game_over()) {
          // Get the next move in the `moves` array
          const nextMove = moves[currentMove + 1];

          // Make the next move on the chessboard
          game.move(nextMove);

          // Update the component's state with the new position
          setPosition(game.fen());
          setShowHint(false);
          setHighlightedMoveIndex((prev) => prev + 1);

          // Increment the current move index
          setCurrentMove((prevMove) => prevMove + 1);

          console.log("nextMove", nextMove);
          console.log("currentMove", currentMove);

          if (nextMove === moves[moves.length - 1]) {
            setVariationSolved(true);
            return;
          }
        }
      }, 500);
    }
    return;
  }

  const DisplayMoves = ({ variationMoves, depth = 0 }) => {
    return variationMoves.map((move, index) => (
      <div key={index}>
        <div
          style={{
            marginRight: "5px",
            marginLeft: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            const varMoves = magic(finalpgn, move);
            console.log("varMoves", varMoves);

            game.reset();
            // Highlight the selected move
            //   setHighlightedMoveIndex(index);

            // Make all the moves up to the selected move
            for (let i = 0; i <= varMoves.length; i++) {
              game.move(varMoves[i]);
            }

            // Update the component's state with the new position and current move index
            setPosition(game.fen());
            //  setCurrentMove(index + 1);
          }}
        >
          {"-".repeat(depth)} {move.move}
        </div>
        <div
          style={{
            marginRight: "5px",
            marginLeft: "5px",
            color: "royalblue",
          }}
        >
          <div>{move.comments.length > 0 && move.comments[0].text}</div>
        </div>
        {move.ravs &&
          move.ravs.length > 0 &&
          move.ravs.map((subMoves, i) => (
            <DisplayMoves
              variationMoves={subMoves.moves}
              depth={depth + 1}
              key={i}
            />
          ))}
      </div>
    ));
  };

  function equals(obj1, obj2) {
    return obj1.move_number == obj2.move_number && obj1.move == obj2.move;
  }

  function magic(d: any, find: any): any {
    const ret = [];
    for (const e of d) {
      if (equals(e, find)) {
        ret.push(e.move);
        return ret;
      }
      if (e.ravs) {
        for (const rav of e.ravs) {
          const ret2 = magic(rav.moves, find);
          if (ret2) return [...ret, ...ret2];
        }
      }
      ret.push(e.move);
    }
    return undefined;
  }

  return (
    <div>
      {!focusMode && <Header />}
      <div
        className={focusMode ? "trainer_container_focus" : "trainer_container"}
      >
        <Container>
          <Row>
            <Col>
              <Chessboard
                onPieceDrop={onDrop}
                position={game.fen()}
                boardWidth={dimensions.width}
                arePiecesDraggable={
                  trainingMode && boardEnabled && !variationSolved
                }
                customArrows={arrows.length > 0 && [arrows]}
                areArrowsAllowed={true}
                boardOrientation={whiteOrientation ? "white" : "black"}
                showBoardNotation={true}
                customBoardStyle={{
                  borderRadius: "5px",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
                }}
              ></Chessboard>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "left",
                }}
              >
                <Button
                  className="mx-1 trainer_buttons"
                  variant="warning"
                  onClick={() => setWhiteOrientation(!whiteOrientation)}
                >
                  <MdFlipCameraAndroid />
                </Button>
                <audio ref={correctAudio} src="/correct-6033.mp3"></audio>

                {!trainingMode && (
                  <div>
                    <Button
                      className="mx-1 trainer_buttons"
                      variant="warning"
                      disabled={currentMove <= 0}
                      onClick={() => getFirstMove()}
                    >
                      <AiFillFastBackward />
                    </Button>
                    <Button
                      className="mx-1 trainer_buttons"
                      variant="warning"
                      disabled={currentMove <= 0}
                      onClick={(e) => getPreviousMove(e)}
                    >
                      <AiFillStepBackward />
                    </Button>{" "}
                    <Button
                      variant="warning"
                      className="mx-1 trainer_buttons"
                      disabled={currentMove >= moves.length - 1}
                      onClick={(e) => getNextMove(e)}
                    >
                      <AiFillStepForward />
                    </Button>
                    <Button
                      variant="warning"
                      className="mx-1 trainer_buttons"
                      onClick={() => getLastMove()}
                      disabled={currentMove >= moves.length - 1}
                    >
                      <AiFillFastForward />
                    </Button>{" "}
                  </div>
                )}
                <Button
                  className="mx-1 trainer_buttons"
                  variant="warning"
                  onClick={() => {
                    setTrainningMode(!trainingMode);
                    resetGame();
                  }}
                >
                  {trainingMode
                    ? `${translations[lang].exitTraining}`
                    : `${translations[lang].testYourself}`}
                </Button>
                <Button
                  variant="warning"
                  className="mx-1 trainer_buttons"
                  onClick={() => setFocusMode(!focusMode)}
                >
                  {focusMode
                    ? `${translations[lang].exitFocusMode}`
                    : `${translations[lang].enterFocusMode}`}
                </Button>
              </div>
            </Col>
            <Col>
              {!trainingMode ? (
                <div
                  className="moves_container"
                  style={{ height: dimensions.height }}
                >
                  {finalpgn.length > 0 && (
                    <div>
                      {finalpgn.map((move, moveIndex) => (
                        <div key={moveIndex}>
                          <div
                            key={moveIndex}
                            className={
                              moveIndex === highlightedMoveIndex
                                ? "highlighted-move"
                                : ""
                            }
                            style={{
                              cursor: "pointer",
                              fontFamily: "Montserrat-Bold",
                              fontSize: "20px",
                              margin: "5px",
                            }}
                            onClick={() => {
                              loadPosition(moveIndex);
                            }}
                          >
                            <div key={moveIndex}>
                              {" "}
                              {move.move_number
                                ? `${move.move_number}.`
                                : "..."}
                              {move.move}
                            </div>
                          </div>

                          <div style={{ margin: "5px", color: "royalblue" }}>
                            {" "}
                            {move.comments.length > 0 &&
                              move.comments
                                .map((c) => c.text + "test")
                                .join(" ")}
                          </div>

                          {move.ravs && move.ravs.length > 0 && (
                            <div style={{ display: "flex", margin: "5px" }}>
                              <DisplayMoves
                                variationMoves={move.ravs[0].moves}
                              />{" "}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    visibility: hasMadeMove ? "visible" : "hidden",
                    height: dimensions.height,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {hasMadeMove && !variationSolved && !correctMove ? (
                    <div
                      style={{
                        borderRadius: "3px",
                        width: "100%",
                        boxShadow:
                          "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "35px",
                          background: "white",
                          color: "black",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
                          fontFamily: "Montserrat-Bold",
                          width: "100%",
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            background: "red",
                            color: "white",
                            fontSize: "30px",
                          }}
                        >
                          {translations[lang].incorrectMove}
                        </div>
                        {numberOfTries > 1 ? (
                          <Button
                            variant="warning"
                            className="mx-2 trainer_buttons"
                            onClick={() => handleHint()}
                          >
                            {translations[lang].showHint}
                          </Button>
                        ) : (
                          <Button
                            variant="warning"
                            className="mx-2 trainer_buttons"
                            onClick={() => handleTryAgain()}
                          >
                            {translations[lang].tryAgain}
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>{!hintRequested && rewardSystemEffect()}</div>
                  )}
                </div>
              )}

              {!trainingMode && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <Button
                    disabled={page <= 0}
                    onClick={handlePreviousPageClick}
                    className="mx-2 trainer_buttons"
                    variant="warning"
                  >
                    {translations[lang].PreviousPage}
                  </Button>
                  <Button
                    className="mx-2 trainer_buttons"
                    variant="warning"
                    disabled={page >= pgnList.length - 1}
                    onClick={handleNextPageClick}
                  >
                    {translations[lang].NextPage}
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      {!focusMode && <Footer />}
    </div>
  );
};

export default Trainer;
