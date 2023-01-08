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
import SidebarMenu from "react-bootstrap-sidebar-menu";

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

  const [currentMove, setCurrentMove] = useState(0);
  const [whiteOrientation, setWhiteOrientation] = useState(true);
  const [pgn, setPgn] = useState(variation);
  const [page, setPage] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [navSelected, setNavSelected] = useState(null);

  const [variationsCount, setVariationsCount] = useState(0);

  const [correctMove, setCorrectMove] = useState(false);
  const [hasMadeMove, setHasMadeMove] = useState(false);
  const [showIncorrectMove, setShowIncorrectMove] = useState(false);
  const [correctMovesCount, setCorrectMovesCount] = useState(0);
  const [wrongMovesCount, setWrongMovesCount] = useState(0);

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

  function Sidebar() {
    return (
      <div>
        {!focusMode && (
          <div>
            {!collapsed && (
              <Navbar bg="light" className={collapsed ? "collapsed" : ""}>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="flex-column">
                    {pgnList.map((pgn) => (
                      <div>
                        <Nav.Link
                          onClick={() => {
                            setPgn(pgn.pgn);
                            game.reset();
                            setPosition(game.fen());
                            setCurrentMove(0);
                            setPage(findPgnIndex());
                            setCorrectMovesCount(0);
                            setHighlightedMoveIndex(-1);
                            setTrainningMode(false);
                            setHasMadeMove(false);
                            setNavSelected(pgn.name);
                          }}
                          style={{ fontFamily: "RobotoCondensed-Bold" }}
                          className={navSelected === pgn.name ? "active" : ""}
                        >
                          {pgn.name}
                        </Nav.Link>
                      </div>
                    ))}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            )}
          </div>
        )}
      </div>
    );
  }

  const correctAudio = useRef(null);

  function playCorrect() {
    correctAudio.current.play();
  }

  const findPgnIndex = () => {
    const index = pgnList.findIndex((element) => element.pgn === pgn);
    console.log("index", index);
    return index;
  };

  const rewardSystemEffect = () => {
    let percentage = moves.length / 2 - wrongMovesCount;
    console.log("percentage", percentage);
    const stars = [
      ...Array(
        Math.min(Math.floor((percentage * 200) / moves.length), 5)
      ).keys(),
    ];

    return (
      <div
        style={{
          borderRadius: "3px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "royalblue",
            fontSize: "35px",
            fontFamily: "RobotoCondensed-Bold",
            textAlign: "center",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
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
                  {stars.map((i) => (
                    <Star key={i} color="gold" backgroundColor="gold" />
                  ))}
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
            fontFamily: "RobotoCondensed-Bold",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          {" "}
          Correct Move
          <i class="bi bi-star"></i>
        </div>
        {variationSolved && <div>Congratulations!</div>}
      </div>
    );
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
    setCorrectMovesCount(0);
    setCurrentMove(0);
    setHighlightedMoveIndex(-1);
    setVariationSolved(false);
    setHasMadeMove(false);
  };

  const handlePreviousPageClick = () => {
    setPgn(pgnList[page - 1].pgn);
    setPage(page - 1);
    game.reset();
    setPosition(game.fen());
    setCorrectMovesCount(0);
    setCurrentMove(0);
    setHighlightedMoveIndex(-1);
    setVariationSolved(false);
    setHasMadeMove(false);
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
    return true;
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
    if (!trainingMode) {
      return false;
    }

    game.move(move);

    setHasMadeMove(true);
    // Update the component's state with the new position
    setPosition(game.fen());
    /*     moveSoundRef.current.play();
     */
    // Check if the move follows the PGN
    if (game.history()[currentMove] !== moves[currentMove]) {
      // The move does not follow the PGN, so add a delay before taking it back

      setCorrectMove(false);

      setShowIncorrectMove(true);
      setWrongMovesCount((prev) => prev + 1);

      setTimeout(() => {
        // Undo the move
        game.undo();

        // Update the component's state with the new position
        setPosition(game.fen());
        setShowIncorrectMove(false);
      }, 250); // delay of 1/4 second
    } else {
      playCorrect();

      setTimeout(() => {
        // Increment the current move index by one
        setCorrectMove(true);

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

  return (
    <div>
      {!focusMode && <Header />}
      <div
        className={focusMode ? "trainer_container_focus" : "trainer_container"}
      >
        <Container>
          <Row>
            {/*     <Col xs={1} sm={1} md={1} align={"center"}>
                <div
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {collapsed ? ">>" : "<<"}
                </div>
              </Col>
            </Row>
            {!collapsed && (
              <Col xs={3} sm={3} md={2}>
                {" "}
                <Sidebar />
              </Col>
            )} */}

            <Col align={"right"}>
              <Container>
                <Chessboard
                  onPieceDrop={onDrop}
                  position={game.fen()}
                  boardWidth={dimensions.width}
                  arePiecesDraggable={trainingMode}
                  areArrowsAllowed={true}
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
              </Container>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "end",
                }}
              >
                <Button
                  className="mx-1"
                  onClick={() => setWhiteOrientation(!whiteOrientation)}
                >
                  <MdFlipCameraAndroid />
                </Button>
                <audio ref={correctAudio} src="/correct-6033.mp3"></audio>

                {!trainingMode && (
                  <div>
                    <Button
                      className="mx-1"
                      disabled={currentMove <= 0}
                      onClick={() => getFirstMove()}
                    >
                      <AiFillFastBackward />
                    </Button>
                    <Button
                      className="mx-1"
                      disabled={currentMove <= 0}
                      onClick={(e) => getPreviousMove(e)}
                    >
                      <AiFillStepBackward />
                    </Button>{" "}
                    <Button
                      className="mx-1"
                      disabled={currentMove >= moves.length - 1}
                      onClick={(e) => getNextMove(e)}
                    >
                      <AiFillStepForward />
                    </Button>
                    <Button
                      className="mx-1"
                      onClick={() => getLastMove()}
                      disabled={currentMove >= moves.length - 1}
                    >
                      <AiFillFastForward />
                    </Button>{" "}
                  </div>
                )}
                <Button
                  className="mx-1"
                  onClick={() => setTrainningMode(!trainingMode)}
                >
                  {trainingMode
                    ? `${translations[lang].exitTraining}`
                    : `${translations[lang].testYourself}`}
                </Button>
                <Button
                  className="mx-1"
                  onClick={() => setFocusMode(!focusMode)}
                >
                  {focusMode ? "Exit Focus Mode" : "Focus Mode"}
                </Button>
              </div>
            </Col>
            <Col>
              {!trainingMode ? (
                <div
                  className="moves_container"
                  style={{ height: dimensions.height }}
                >
                  {finalpgn.length > 0 &&
                    finalpgn.map((move, index) => (
                      <div key={index}>
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
                          <div key={index} style={{ margin: "5px" }}>
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
                <div
                  style={{
                    visibility: hasMadeMove ? "visible" : "hidden",
                    height: dimensions.height,
                    display: "flex",
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
                          background: "royalblue",
                          color: "black",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
                          fontFamily: "RobotoCondensed-Bold",
                          width: "100%",
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        <Button
                          className="mx-2"
                          onClick={() => setShowHint(!showHint)}
                          variant="secondary"
                        >
                          {""}
                          {!correctMove && !showHint
                            ? `${translations[lang].showHint}`
                            : `${translations[lang].hideHint}`}
                        </Button>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          background: "#c33",
                          color: "white",
                          fontFamily: "RobotoCondensed-Bold",
                          fontSize: "30px",
                          boxShadow: "0 0 5px 5px rgb(255 255 255 / 50%)",
                        }}
                      >
                        {translations[lang].incorrectMove}
                      </div>
                      <div
                        style={{
                          backgroundColor: "white",
                          fontSize: "20px",
                          color: "black",
                          textAlign: "center",
                          fontFamily: "RobotoCondensed-Bold",
                          borderBottomLeftRadius: "5px",
                          animation: "shadow-glow 1s infinite",

                          borderBottomRightRadius: "5px",
                        }}
                      >
                        {showHint ? moves[currentMove] : ""}
                      </div>
                    </div>
                  ) : (
                    rewardSystemEffect()
                  )}
                </div>
              )}

              <div>
                <Container>
                  <Row>
                    <Col align={"right"}>
                      {" "}
                      <Button
                        disabled={page <= 0}
                        onClick={handlePreviousPageClick}
                      >
                        {translations[lang].PreviousPage}
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="mx-2"
                        disabled={page >= pgnList.length - 1}
                        onClick={handleNextPageClick}
                      >
                        {translations[lang].NextPage}
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
      {!focusMode && <Footer />}
    </div>
  );
};

export default Trainer;
