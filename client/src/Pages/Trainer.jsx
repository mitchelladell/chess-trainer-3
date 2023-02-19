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
import { useMeasure } from "react-measure";
import Focus from "../pgns/icons/Focus";
import annotaitons from "../consts/annotations";
/* import Bp from "../components/customPieces/gridPieces/Bp";
import Wk from "../components/customPieces/Wk"; */

import King from "../pgns/king";
import { css } from "@emotion/react";

import BB from "../components/customPieces/BoardPieces/BB";

import { MdFlipCameraAndroid } from "react-icons/md";
import {
  AiFillFastForward,
  AiFillFastBackward,
  AiFillStepBackward,
  AiFillStepForward,
} from "react-icons/ai";
import { MdCenterFocusWeak, MdCenterFocusStrong } from "react-icons/md";

import "./Trainer.css";
import translations from "../consts/translations";
import Footer from "../components/Footer/Footer";
import annotationShapes from "../consts/annotationShapes";

import { Nav, Navbar } from "react-bootstrap";
import { current } from "@reduxjs/toolkit";
import { update } from "../features/pgns/pgnSlice";
import SwapBoard from "../pgns/icons/SwapBoard";
import Wk from "../components/customPieces/BoardPieces/Wk";
import Wr from "../components/customPieces/BoardPieces/Wr";
import Wp from "../components/customPieces/BoardPieces/Wp";
import Wn from "../components/customPieces/BoardPieces/Wn";
import Wq from "../components/customPieces/BoardPieces/Wq";
import Wb from "../components/customPieces/BoardPieces/Wb";
import Bk from "../components/customPieces/BoardPieces/BK";
import Bq from "../components/customPieces/BoardPieces/BQ";
import Bn from "../components/customPieces/BoardPieces/BN";
import Br from "../components/customPieces/BoardPieces/BR";
import Bp from "../components/customPieces/BoardPieces/BP";
import gridShapes from "../consts/gridShapes";

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
  const [fromSquare, setFromSquare] = useState(null);
  const [toSquare, setToSquare] = useState(null);

  const [gridMoves, setGridMoves] = useState([]);

  const [tempDisplay, setTempDisplay] = useState("grid");

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

  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [direction, setDirection] = useState("row");

  useEffect(() => {
    setDirection(lang === "en" ? "row" : "row-reverse");
    console.log("lang", lang);
  }, [lang, setDirection]);

  useEffect(() => {
    const backgroundImage = new Image();
    backgroundImage.src = "../media/board.png";

    backgroundImage.onload = () => {
      setIsBackgroundLoaded(true);
    };
  }, []);

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
    const toSquareElement = document.querySelector(
      `[data-square="${toSquare}"]`
    );
    console.log("ToSquareelemnet", toSquareElement);

    if (toSquareElement) {
      const toSquareDecorator = document.createElement("div");
      toSquareElement.className = "decorator";

      toSquareDecorator.style.background = annotationShapes[selectedMove?.nags];
      toSquareDecorator.style.width = "30px";
      toSquareDecorator.style.height = "30px";
      toSquareDecorator.style.backgroundSize = "contain";

      toSquareDecorator.style.position = "absolute";
      toSquareDecorator.style.right = `${
        toSquareElement.offsetLeft - 15 - dimensions.width / 8
      }px`;
      toSquareDecorator.style.top = `${
        toSquareElement.offsetTop +
        toSquareElement.offsetHeight -
        15 -
        dimensions.width / 8
      }px`;
      toSquareDecorator.style.zIndex = "10";

      toSquareElement.parentNode.insertBefore(
        toSquareDecorator,
        toSquareElement
      );

      return () => {
        toSquareDecorator.remove();
      };
    }

    if (selectedMove === null) {
      setFromSquare(null);
      setToSquare(null);
    }
  }, [selectedMove, toSquare, dimensions.width]);

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
          ...(move.nags ? { nags: move.nags[0] } : null),

          color: move.color,
          comment: move.comments.length > 0 ? move.comments[0].text : "",
          depth: depth,
          ...(move.move_number ? { move_number: move.move_number } : null),
          isVariation: depth > 0, // true if move is a variation, false otherwise
        });
      }
      if (move.ravs) {
        for (let rav of move.ravs) {
          let subvariations = allExtractedMoves(rav.moves, depth + 1);
          moves = [...moves, ...subvariations];
        }
      }
    }
    return moves;
  }

  const ChessMove = ({ key, move }) => {
    const indent = move.depth * 2;

    return (
      <div
        style={{
          display:
            (move.ravs && move.depth < 1) ||
            (move.comments.length > 0 && move.ravs?.comments?.length > 0)
              ? "grid"
              : "flex",
          gridColumn: move.ravs || move.comments.length > 0 ? "-1 / 1" : "",

          marginLeft: indent,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            fontFamily: "Montserrat-Bold",
            fontSize: move.isVariation ? "15px" : "20px",
            margin: "5px",
          }}
          onClick={() => {
            let variantMoves = loadVariationMoves(formattedPgn, move);
            console.log("movee", move);

            loadPosition(
              variantMoves.findIndex((obj) => obj.id === move.id),

              variantMoves.map((move) => move.move)
            );
            setVariationEntered(false);
            setVariationMoves(variantMoves);
            console.log("variatnt Moves", variantMoves);

            setSelectedMove(move);
            setCurrentMove(move.id);
            setHighlightedVariationIndex(null);
          }}
          className={selectedMove?.id === move.id ? "highlighted-move" : ""}
        >
          <div style={{ display: "flex", flex: "0 0 100%" }}>
            {move.color === "b" ? "..." : `${move?.move_number}. `}
            {gridShapes[`${move.color}${move.move[0]}`] ? (
              <>
                {gridShapes[`${move.color}${move.move[0]}`]}
                {move.move.substr(1, move.move.length - 1)}
              </>
            ) : (
              move.move
            )}
            {annotaitons[move.nags]}
          </div>
        </div>
        <div
          style={{
            gridColumn: "-1 / 1",
            marginTop: "auto",
            marginBottom: "auto",
            color: "whitesmoke",
          }}
        >
          {move.comments.map((comment) => (
            <div key={comment.text}>{comment.text}</div>
          ))}
        </div>
        {move.ravs && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexShrink: "0",
              gridColumn: "-1 / 1",
              flexWrap: "wrap",
              maxWidth: "100%",
              textAlign: "start",
            }}
          >
            {move.ravs.map((rav, index) => (
              <div
                key={rav.moves[index].id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  maxWidth: "100%",
                  textAlign: "start",
                  flexShrink: "0",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    fontFamily: "Montserrat-Bold",
                    fontSize: "15px",
                    flexShrink: "0",
                    margin: "5px",
                  }}
                >
                  {index === 0 && "("}
                  {move.depth > 0 && "("}
                </div>
                {rav.moves.map((move) => (
                  <ChessMove key={move.id} move={move} />
                ))}
                <div
                  style={{
                    cursor: "pointer",
                    fontFamily: "Montserrat-Bold",
                    fontSize: "15px",
                    flexShrink: "0",
                    margin: "5px",
                  }}
                >
                  {move.depth > 0 && ")"}
                  {index === move.ravs.length - 1 && ")"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ChessMoves = ({ moves }) => {
    const myRef = useRef(null);

    const executeScroll = () => myRef.current.scrollIntoView();

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {moves.map((move) => (
          <ChessMove key={move.id} move={move} />
        ))}
      </div>
    );
  };

  function modifyDataStructure(data, depth = 0, id = 0, color = "w") {
    for (let move of data) {
      move.id = id++;
      move.isVariation = depth > 0;
      move.depth = depth;
      move.color = color;
      if (move.ravs) {
        for (let rav of move.ravs) {
          id = modifyDataStructure(
            rav.moves,
            depth + 1,
            id,
            color === "w" ? "w" : "b"
          );
        }
        color = color === "w" ? "b" : "w";
      } else {
        color = color === "w" ? "b" : "w";
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
            {translations[lang].correctMove}
          </div>
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
    console.log("nextMove", nextMove);
    console.log("variantMoves", variantMoves);

    loadPosition(
      nextMove,
      variantMoves.map((move) => move.move)
    );

    let gridMoveIndex = gridPGn.findIndex(
      (obj) =>
        obj?.move === variantMoves[nextMove].move &&
        obj?.id === variantMoves[nextMove].id &&
        obj?.move_number === variantMoves[nextMove].move_number
    );

    console.log("gridMoveIndex", gridMoveIndex);
    setSelectedMove(gridPGn[gridMoveIndex]);
    setCurrentMove(gridPGn[gridMoveIndex]);
  };

  const getPreviousMove = () => {
    const variantMoves = loadVariationMoves(formattedPgn, selectedMove);
    console.log("gridPGN", gridPGn);
    setVariationMoves(variantMoves);
    const nextMoveIndex =
      variantMoves.findIndex(
        (obj) =>
          obj?.move === selectedMove?.move &&
          obj?.id === selectedMove?.id &&
          obj?.move_number === selectedMove?.move_number
      ) - 1;

    console.log("nextMoveIndex", nextMoveIndex);
    if (nextMoveIndex < 0 || nextMoveIndex === undefined) {
      setSelectedMove(null);
      game.reset();
      return;
    }
    const nextMove = variantMoves[nextMoveIndex];
    console.log("nextMOve", nextMove);
    loadPosition(
      nextMoveIndex,
      variantMoves.map((move) => move.move)
    );
    const gridMoveIndex = gridPGn.findIndex(
      (obj) =>
        obj.move === nextMove.move &&
        obj.id === nextMove.id &&
        obj.move_number === nextMove.move_number
    );
    console.log("gridMovesIndex", gridMoveIndex);
    setSelectedMove(gridPGn[gridMoveIndex]);
    setCurrentMove(gridPGn[gridMoveIndex]);
  };

  const getFirstMove = () => {
    resetGame();
  };

  const getLastMove = () => {
    loadPosition(
      moves.length - 1,
      moves.map((move) => move.move)
    );
    setSelectedMove(moves[moves.length - 1]);
  };

  const resetGame = () => {
    setArrows([]);
    setFromSquare(null);
    setToSquare(null);
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
    console.log("pgnList", pgnList);
    setPgn(pgnList[page + 1].value);
    setPage(page + 1);
    resetGame();
  };

  const handlePreviousPageClick = () => {
    setPgn(pgnList[page - 1].value);
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
      e.preventDefault();

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
      e.preventDefault();

      getLastMove();
      setStudyStarted(true);
      // down arrow
    }
    const gameCopy = { ...game };

    setGame(gameCopy);
  }
  console.log("ravs", gridPGn);

  const MovesGrid = () => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {gridPGn.map((move, index) => {
          let prevDepth = index > 0 ? gridPGn[index - 1].depth : 0;

          return (
            <div
              key={index}
              style={{
                gridColumn: move.comment ? "-1 / 1" : "",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                  fontFamily: "Montserrat-Bold",
                  fontSize: "20px",
                  margin: "5px",
                  marginLeft: `${move.depth * 20}px`,
                }}
                className={
                  selectedMove?.id === move.id ? "highlighted-move" : ""
                }
                onClick={() => {
                  let variantMoves = loadVariationMoves(formattedPgn, move);

                  loadPosition(
                    variantMoves.findIndex((obj) => obj.id === move.id),
                    variantMoves.map((move) => move.move)
                  );
                  setVariationEntered(false);
                  setVariationMoves(variantMoves);

                  setSelectedMove(move);
                  setCurrentMove(index);
                  setHighlightedVariationIndex(null);
                }}
              >
                <div style={{ display: "flex", flex: "0 0 100%" }}>
                  {move.color === "b" ? "..." : `${move.move_number}. `}
                  {gridShapes[`${move.color}${move.move[0]}`] ? (
                    <>
                      {gridShapes[`${move.color}${move.move[0]}`]}
                      {move.move.substr(1, move.move.length - 1)}
                    </>
                  ) : (
                    move.move
                  )}
                  {annotaitons[move.nags]}
                </div>
              </div>

              <div className="comments">
                <div
                  style={{
                    fontSize: "18px",
                    fontFamily: "Montserrat-Medium",
                    color: "white",
                  }}
                >
                  {move.comment}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    console.log("sourceMove", sourceSquare);
    console.log("targetSqure", targetSquare);
    setFromSquare(sourceSquare);
    setToSquare(targetSquare);

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
      // console.log('')
    }
    console.log("gameHistory", game.history({ verbose: true }));
    setToSquare(
      game.history({ verbose: true })[
        game.history({ verbose: true }).length - 1
      ].to
    );

    setFromSquare(
      game.history({ verbose: true })[
        game.history({ verbose: true }).length - 1
      ].from
    );
    console.log("fromSquare", fromSquare);
    console.log("toSqure", toSquare);

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

  const GridYDirection = () => {
    const squares = ["8", "7", "6", "5", "4", "3", "2", "1"];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: whiteOrientation ? "column" : "column-reverse",
          height: dimensions.width,
          justifyContent: "space-evenly",
          marginRight: "5px",
        }}
      >
        {squares.map((square) => (
          <div
            style={{
              textAlign: "end",
              height: dimensions.width / 8,
              width: "min-content",
              color: "white",
            }}
            key={square}
          >
            {" "}
            {square}
          </div>
        ))}
      </div>
    );
  };

  const GridXDirection = () => {
    const squares = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return (
      <div
        style={{
          display: "flex",
          flexDirection: whiteOrientation ? "row" : "row-reverse",
          width: dimensions.width,
          justifyContent: "space-evenly",
        }}
      >
        {squares.map((square) => (
          <div
            style={{
              textAlign: "end",
              width: dimensions.width / 8,
              color: "white",
            }}
            key={square}
          >
            {" "}
            {square}
          </div>
        ))}
      </div>
    );
  };

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

  const BoardBackround = () => {
    return (
      <div
        style={{
          width: dimensions.width,
          height: dimensions.height,
          display: "flex",
        }}
      >
        <svg viewBox="0 0 4 3">
          <image
            href={`url('../media/board.png')`}
            width="100%"
            height="100%"
          />
        </svg>
      </div>
    );
  };

  return (
    <div>
      <div
        className={focusMode ? "trainer_container_focus" : "trainer_container"}
      >
        <Container>
          <Row style={{ display: "flex", flexDirection: direction }}>
            <Col>
              <div style={{ display: "inline-flex" }}>
                <GridYDirection />
                {isBackgroundLoaded && (
                  <Chessboard
                    onPieceDrop={onDrop}
                    position={game.fen()}
                    boardWidth={dimensions.width}
                    /* customDropSquareStyle={{ background: "red" }}
                    cusome */
                    /*                     customSquareStyles={{{to}: background:'green'}}
                     */ customPieces={{
                      wK: <Wk />,
                      wR: <Wr />,
                      wP: <Wp />,
                      wN: <Wn />,
                      wQ: <Wq />,
                      wB: <Wb />,
                      bK: <Bk />,
                      bQ: <Bq />,
                      bR: <Br />,
                      bB: <BB />,
                      bN: <Bn />,
                      bP: <Bp />,
                    }}
                    arePiecesDraggable={
                      trainingMode && boardEnabled && !variationSolved
                    }
                    customSquareStyles={{
                      [toSquare]: {
                        position: "relative",
                        background: "rgba(154, 133, 22, 0.7)",
                        /*        backgroundImage: `${
                          annotationShapes[selectedMove?.nags]
                        }`,
                        backgroundPosition: "right -4px top -4px",

                        backgroundRepeat: "no-repeat",
                        backgroundSize: "27px", */
                      },
                      [fromSquare]: {
                        background: "rgba(192, 182, 56, .7)",
                      },
                    }}
                    customLightSquareStyle={{ background: "transparent" }}
                    customDarkSquareStyle={{ background: "transparent" }}
                    customArrows={arrows.length > 0 ? [arrows] : []}
                    areArrowsAllowed={true}
                    boardOrientation={whiteOrientation ? "white" : "black"}
                    showBoardNotation={false}
                    customBoardStyle={{
                      borderRadius: "5px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5) ",
                      background: `url('../media/01board.png')`,
                      // background: <BoardBackround />,

                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                )}

                <div style={{ marginLeft: "5px" }}>
                  {" "}
                  <div
                    onClick={() => setWhiteOrientation(!whiteOrientation)}
                    className="d-flex justify-content-center align-items-center swap-board"
                  >
                    <SwapBoard />
                  </div>
                </div>
              </div>
              <GridXDirection />

              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  width: dimensions.width,
                  marginLeft: "11px",
                  //   justifyContent: "left",
                  /*                   marginLeft: "30px",
                   */
                }}
              >
                <audio ref={correctAudio} src="/correct-6033.mp3"></audio>

                {!trainingMode && (
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="warning"
                      className="trainer_buttons focus"
                      onClick={() => setFocusMode(!focusMode)}
                    >
                      {focusMode ? (
                        <div className="d-flex justify-content-center align-items-center">
                          <MdCenterFocusWeak />
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center align-items-center">
                          <Focus />
                        </div>
                      )}
                    </Button>
                    <Button
                      className="trainer_buttons"
                      variant="warning"
                      disabled={selectedMove === null}
                      onClick={() => {
                        getFirstMove();
                        setStudyStarted(false);
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <AiFillFastBackward />
                      </div>
                    </Button>
                    <Button
                      className="trainer_buttons"
                      variant="warning"
                      disabled={selectedMove === null}
                      onClick={(e) => {
                        getPreviousMove(e);
                        setStudyStarted(false);
                      }}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <AiFillStepBackward />
                      </div>
                    </Button>{" "}
                    <Button
                      variant="warning"
                      className=" trainer_buttons"
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
                      <div className="d-flex justify-content-center align-items-center">
                        <AiFillStepForward />
                      </div>
                    </Button>
                    <Button
                      variant="warning"
                      className=" trainer_buttons"
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
                      <div className="d-flex justify-content-center align-items-center">
                        <AiFillFastForward />
                      </div>
                    </Button>
                  </div>
                )}
                <Button
                  className={
                    !trainingMode
                      ? "trainer_buttons test_yourself_training"
                      : "trainer_buttons test_yourself"
                  }
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

                {trainingMode && (
                  <Button
                    variant="warning"
                    className="trainer_buttons test_yourself reset"
                    disabled={!hasMadeMove}
                    onClick={() => resetGame()}
                  >
                    {" "}
                    Reset Training{" "}
                  </Button>
                )}
              </div>
            </Col>

            <Col>
              {!trainingMode ? (
                <div
                  className="moves_container"
                  style={{
                    height: dimensions.height,
                  }}
                >
                  <ChessMoves moves={formattedPgn} />
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: "11px",
                  }}
                >
                  {" "}
                  <Button
                    disabled={page <= 0}
                    onClick={handlePreviousPageClick}
                    className="mx-2 trainer_buttons previous"
                    variant="warning"
                  >
                    {translations[lang].PreviousPage}
                  </Button>
                  <Button
                    className="mx-2 trainer_buttons next"
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
    </div>
  );
};

export default Trainer;
