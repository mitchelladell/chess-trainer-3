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
import _ from "lodash";

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
  let currentMoveIndex = 0;
  const dispatch = useDispatch();

  const lang = useSelector((state: any) => state.language.value);

  let pgnList = pgndata.state.pgnWithName;

  const { variation } = useParams();

  const [position, setPosition] = useState("");

  const [focusMode, setFocusMode] = useState(false);
  const [moves, setMoves] = useState([]);

  const [selectedMove, setSelectedMove] = useState(null);

  const [variantionEntered, setVariationEntered] = useState(false);

  const [currentMove, setCurrentMove] = useState(-1);
  const [incorrectMoves, setIncorrectMoves] = useState(new Set());

  const [whiteOrientation, setWhiteOrientation] = useState(true);
  const [pgn, setPgn] = useState(variation);
  const [page, setPage] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [navSelected, setNavSelected] = useState(null);
  const [arrows, setArrows] = useState([]);
  const [percent, setPercent] = useState(0);
  const [gridPGn, setGridPGN] = useState([]);

  const [gridMoves, setGridMoves] = useState([]);

  const [correctMove, setCorrectMove] = useState(false);
  const [hasMadeMove, setHasMadeMove] = useState(false);
  const [showIncorrectMove, setShowIncorrectMove] = useState(false);
  const [correctMovesCount, setCorrectMovesCount] = useState(0);
  const [wrongMovesCount, setWrongMovesCount] = useState(0);
  const [boardEnabled, setBoardEnabled] = useState(true);
  const [studyStarted, setStudyStarted] = useState(false);

  const [numberOfTries, setNumberOfTries] = useState(0);

  const [hintRequested, setHintRequested] = useState(true);

  const [variationSolved, setVariationSolved] = useState(false);
  const [variantionMoves, setVariationMoves] = useState([]);
  const [tempVariantionMoves, setTempVariationMoves] = useState([]);

  const [showHint, setShowHint] = useState(false);
  const [allMoves, setAllMoves] = useState([]);

  const [formattedPgn, setFormattedPgn] = useState([]);

  const [highlightedMoveIndex, setHighlightedMoveIndex] = useState(-1);
  const [highlightedVariationIndex, setHighlightedVariationIndex] =
    useState(-1);

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
    readPGN(pgn).then((formattedPgn) => {
      const parsedMoves = formattedPgn[0].moves;
      setMoves(parsedMoves);

      const newFormatted = modifyDataStructure(formattedPgn[0].moves, 0);
      console.log("newFormatted", newFormatted);
      setFormattedPgn(parsedMoves);
      console.log("formattedPGn", formattedPgn);

      setGridPGN(allExtractedMoves(formattedPgn[0].moves, 0));
      setGridMoves(
        allExtractedMoves(formattedPgn[0].moves, 0).map((move) => move.move)
      );
    });
  }, [pgn]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const correctAudio = useRef(null);

  function playCorrect() {
    correctAudio.current.play();
  }

  const calculateStars = () => {
    const percentage =
      ((moves.length / 2 - wrongMovesCount) * 200) / moves.length;

    setPercent(percentage);
  };

  function allExtractedMoves(pgn, depth = 0) {
    let moves = [];
    for (let move of pgn) {
      if (move.move) {
        moves.push({
          move: move.move,
          id: move.id,
          comment: move.comments.length > 0 ? move.comments[0].text : "",
          depth: depth,
          ...(move.move_number ? { move_number: move.move_number } : null),
          isVariation: depth > 0, // true if move is a variation, false otherwise
        });
      }
      if (move.ravs) {
        let subvariations = allExtractedMoves(move.ravs[0].moves, depth + 1);
        moves = [...moves, ...subvariations];
      }
    }
    return moves;
  }

  function modifyDataStructure(data, depth = 0, id = 0) {
    for (let move of data) {
      move.id = id++;
      move.isVariation = depth > 0;
      move.depth = depth;
      if (move.ravs) {
        id = modifyDataStructure(move.ravs[0].moves, depth + 1, id);
      }
    }
    return id;
  }

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
    //   let nextMove = gridPGn.findIndex((obj) => obj.id === selectedMove.id) + 1;

    // Get the next move in the `moves` array
    /*   while (gridPGn[nextMove].isVariation) {
      nextMove++;
    } */

    /*   if (!selectedMove) {
      setSelectedMove(gridPGn[0]);
    } */

    let variantMoves = loadVariationMoves(
      formattedPgn,
      selectedMove ? selectedMove : gridPGn[0]
    );

    setVariationMoves(variantMoves);

    let nextMove =
      variantMoves.findIndex(
        (obj) =>
          obj?.move === selectedMove?.move && obj?.id === selectedMove?.id
      ) + 1;
    console.log("variantMoves", variantMoves);

    loadPosition(
      nextMove,
      variantMoves.map((move) => move.move)
    );

    let gridMoveIndex = gridPGn.findIndex(
      (obj) =>
        obj.move === variantMoves[nextMove].move &&
        obj.id === variantMoves[nextMove].id &&
        obj.move_number === variantMoves[nextMove].move_number
    );

    console.log("gridMoveIndex", gridMoveIndex);
    setSelectedMove(gridPGn[gridMoveIndex]);
    setCurrentMove(gridPGn[gridMoveIndex]);
  };

  const getPreviousMove = () => {
    console.log("currentMove", currentMove);

    let variantMoves = loadVariationMoves(formattedPgn, selectedMove);
    setVariationMoves(variantMoves);

    let nextMove =
      variantMoves.findIndex(
        (obj) =>
          obj?.move === selectedMove?.move &&
          obj?.id === selectedMove?.id &&
          obj?.move_number === selectedMove?.move_number
      ) - 1;

    if (nextMove < 0 || nextMove === undefined) {
      console.log("test");
      setSelectedMove(null);
      game.reset();

      console.log("selectedMove", selectedMove);
      return;
    }

    //   if (variantionEntered) {
    console.log("selectedMove", selectedMove);
    console.log("move", gridPGn[nextMove]);
    console.log("gridPGN", gridPGn);
    loadPosition(
      nextMove,
      variantMoves.map((move) => move.move)
    );
    let gridMoveIndex = gridPGn.findIndex(
      (obj) =>
        obj.move === variantMoves[nextMove].move &&
        obj.id === variantMoves[nextMove].id &&
        obj.move_number === variantMoves[nextMove].move_number
    );

    console.log("gridMoveIndex", gridMoveIndex);
    setSelectedMove(gridPGn[gridMoveIndex]);
    setCurrentMove(gridPGn[gridMoveIndex]);

    console.log("variantMoves[nextMove]", variantMoves[nextMove - 1]);
    //  } else {
    // Get the next move in the `moves` array   //tbh get moves till the end of the variation
    /*       while (gridPGn[nextMove].isVariation) {
        nextMove--;
      }

      setSelectedMove(gridPGn[nextMove]);

      loadPosition(
        nextMove,
        variantMoves.map((move) => move.move)
      );
      setCurrentMove((prev) => prev - 1);
      nextMove--; */
    // }
  };

  const getFirstMove = () => {
    loadPosition(-1, moves);
    setHighlightedMoveIndex(-1);
  };

  const getLastMove = () => {
    loadPosition(moves.length - 1, gridMoves);
    // setHighlightedMoveIndex(moves.length - 1);
    setSelectedMove(moves[moves.length - 1]);
    console.log("selectedMOve", selectedMove);
    // console.log("lastMOve", moves[moves.length - 1]);
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
    setSelectedMove(null);
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
      e.preventDefault();

      getPreviousMove(e);

      // left arrow
    }
    if (e.keyCode == "38") {
      resetGame();
      // up arrow
    } else if (e.keyCode == "39") {
      e.preventDefault();
      if (!selectedMove) {
        setSelectedMove(gridPGn[0]);
      }
      getNextMove(e);
      setStudyStarted(true);
    }
    // right arrow
    else if (e.keyCode == "40") {
      getLastMove();
      setStudyStarted(true);
      // down arrow
    }
    const gameCopy = { ...game };

    setGame(gameCopy);
  }

  const movesGrid = () => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {" "}
        {gridPGn.map((move, index) => (
          <div key={index} style={{ gridColumn: move.comment ? "1 / -1" : "" }}>
            {!move.isVariation ? ( //A main Line Div
              <div
                style={{
                  cursor: "pointer",
                  fontFamily: "Montserrat-Bold",
                  fontSize: "20px",
                  margin: "5px",
                  gridColumn: "1 / -1",
                }}
                className={
                  selectedMove?.id === move.id ? "highlighted-move" : ""
                }
                onClick={() => {
                  let variantMoves = loadVariationMoves(formattedPgn, move);
                  console.log("selectedMove", selectedMove);
                  console.log("gridPGN", gridPGn);
                  console.log("varMoves", variantMoves);

                  loadPosition(
                    variantMoves.findIndex((obj) => obj.id === move.id),
                    //    gridPGn.map((move) => move.move)
                    variantMoves.map((move) => move.move)
                  );
                  setVariationEntered(false);
                  setVariationMoves(variantMoves);

                  setSelectedMove(move);
                  setCurrentMove(index);
                  setHighlightedVariationIndex(null);
                }}
              >
                {" "}
                {move.move_number ? `${move.move_number}.` : "..."} {move.move}
              </div>
            ) : (
              <div //A variations Div
                style={{
                  cursor: "pointer",
                  fontFamily: "Montserrat-Medium",
                  fontSize: "18px",
                  margin: "5px",
                  /*   display: "flex",
                    flexWrap: "nowrap", */
                }}
                className={
                  selectedMove?.id === move.id ? "highlighted-move" : ""
                }
                onClick={() => {
                  console.log("formattedPGN", formattedPgn);
                  console.log("selectedMove", selectedMove);

                  let variantMoves = loadVariationMoves(formattedPgn, move);

                  //   setHighlightedMoveIndex(index);
                  console.log("gridPGN", gridPGn);
                  console.log("varMoves", variantMoves);

                  loadPosition(
                    variantMoves.findIndex((obj) => obj.id === move.id),
                    variantMoves.map((move) => move.move)
                  );
                  setVariationEntered(true);
                  //  setHighlightedVariationIndex(index);
                  // setHighlightedMoveIndex(null);

                  setCurrentMove(index);

                  // setHighlightedVariationIndex(null);

                  setSelectedMove(move);
                  setVariationMoves(variantMoves);
                  setTempVariationMoves(variantMoves);
                }}
              >
                {" "}
                {move.move_number ? move.move_number : "..."}{" "}
                {move.depth ? "*".repeat(move.depth) : ""} {move.move}
              </div>
            )}

            <div className="comments">
              <div
                style={{
                  fontSize: "18px",
                  fontFamily: "Montserrat-Medium",
                  color: "royalblue",

                  /*  flexGrow: 1,
                  flexShrink: 0, */
                }}
              >
                {" "}
                {move.comment}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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

    setTimeout(() => {
      const move = game.move(moves[currentMove].move, { verbose: true });
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

  const loadPosition = (index, moves) => {
    console.log("moves", moves);
    // Reset the game to the initial position
    game.reset();
    // Highlight the selected move

    // Make all the moves up to the selected move
    for (let i = 0; i <= index; i++) {
      game.move(moves[i]);
    }

    // Update the component's state with the new position and current move index
    setPosition(game.fen());
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
    console.log("moves", moves);
    console.log("currentMove", moves[currentMove]);
    console.log("game.history()[currentMove] ", game.history()[currentMove]);

    /*     moveSoundRef.current.play();
     */
    // Check if the move follows the PGN
    if (game.history()[currentMove] !== moves[currentMove].move) {
      if (!incorrectMoves.has(moves[currentMove].move)) {
        setWrongMovesCount((prev) => prev + 1);
        incorrectMoves.add(moves[currentMove].move);
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

        // Check if the game is not over
        if (!game.game_over()) {
          // Get the next move in the `moves` array
          const nextMove = moves[currentMove + 1].move;

          // Make the next move on the chessboard
          game.move(nextMove);

          // Update the component's state with the new position
          setPosition(game.fen());
          setShowHint(false);
          setHighlightedMoveIndex((prev) => prev + 1);

          // Increment the current move index
          setCurrentMove((prevMove) => prevMove + 1);

          if (nextMove === moves[moves.length - 1].move) {
            setVariationSolved(true);
            return;
          }
        }
      }, 500);
    }
    return;
  }

  function equals(obj1, obj2) {
    return (
      obj1.move_number === obj2.move_number &&
      obj1.move === obj2.move &&
      obj1.depth === obj2.depth &&
      obj1.isVariation === obj2.isVariation &&
      obj1.id === obj2.id
    );
  }

  function loadVariationMoves(
    d: any,
    find: any,
    isMain: boolean = true,
    depth = 0
  ): any {
    const ret = [];
    const seen = new Set();

    for (const e of d) {
      if (equals(e, find)) {
        ret.push(...d.filter((move) => !seen.has(move)));

        return ret;
      }
      if (e.ravs) {
        for (const rav of e.ravs) {
          const ret2 = loadVariationMoves(rav.moves, find, false, depth + 1);
          if (ret2) return [...ret, ...ret2];
        }
      }

      if (!seen.has(e)) {
        seen.add(e);
        ret.push({
          move: e.move,
          id: e.id,
          comment: e.comments.length > 0 ? e.comments[0].text : "",
          depth: depth,
          ...(e.move_number ? { move_number: e.move_number } : null),
          isVariation: depth > 0,
        });
      }
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
                      disabled={selectedMove === null}
                      onClick={() => {
                        getFirstMove();
                        setStudyStarted(false);
                      }}
                    >
                      <AiFillFastBackward />
                    </Button>
                    <Button
                      className="mx-1 trainer_buttons"
                      variant="warning"
                      disabled={selectedMove === null}
                      onClick={(e) => {
                        getPreviousMove(e);
                        setStudyStarted(false);
                      }}
                    >
                      <AiFillStepBackward />
                    </Button>{" "}
                    <Button
                      variant="warning"
                      className="mx-1 trainer_buttons"
                      disabled={
                        studyStarted &&
                        selectedMove?.id ===
                          variantionMoves[variantionMoves.length - 1]?.id
                      }
                      onClick={(e) => {
                        getNextMove(e);
                        setStudyStarted(true);
                      }}
                    >
                      <AiFillStepForward />
                    </Button>
                    <Button
                      variant="warning"
                      className="mx-1 trainer_buttons"
                      onClick={() => {
                        getLastMove();
                        setStudyStarted(true);
                      }}
                      disabled={
                        studyStarted &&
                        selectedMove?.id ===
                          variantionMoves[variantionMoves.length - 1]?.id
                      }
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
                  {movesGrid()}
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
                        {numberOfTries > 0 ? (
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
