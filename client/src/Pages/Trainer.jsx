import React, { useState, useEffect } from "react";
import PGN from "pgn-parser";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header/Header";

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

  let pgnList = [pgn1, pgn2];

  const [position, setPosition] = useState("");
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);
  const [data, setData] = useState([]);
  const [whiteOrientation, setWhiteOrientation] = useState(true);
  const [pgn, setPgn] = useState(pgnList[0]);
  const [page, setPage] = useState(0);

  const [finalpgn, setFinalpgn] = useState([]);
  const [highlightedMoveIndex, setHighlightedMoveIndex] = useState(null);
  const [comments, setComments] = useState([]);
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
    setHighlightedMoveIndex(0);
  };

  const getLastMove = () => {
    loadPostion(moves.length - 1);
    setHighlightedMoveIndex(moves.length - 1);
  };

  const handleNextPageClick = () => {
    setPgn(pgnList[page + 1]);
    setPage(page + 1);
    game.reset();
    setPosition(game.fen());
    setCurrentMove(0);
    setHighlightedMoveIndex(0);
  };

  const handlePreviousPageClick = () => {
    setPgn(pgnList[page - 1]);
    setPage(page - 1);
    game.reset();
    setPosition(game.fen());
    setCurrentMove(0);
    setHighlightedMoveIndex(0);
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
      setFinalpgn(finalpgn);
      const ravs = finalpgn[0].moves.find((move) => move.ravs);

      const parsedMoves = finalpgn[0].moves.map((move) => move.move);
      // extract the comments from the parsed PGN data
      const parsedComments = finalpgn[0].moves
        .filter((move) => move.ravs)
        .map((move) => move.ravs[0].moves[0].comments[0].text); //comments from ravs

      /* const parsedComments = finalpgn[0].moves.map(   
        (move) => move.comments[0]?.text
      );  */ //comments from parent comment

      setComments(parsedComments);
      setMoves(parsedMoves);
      console.log("moves", moves);

      console.log("comments", parsedComments);

      const movesWithComments = finalpgn[0].moves.map((move) => {
        // Check if the move has a `ravs` property
        if (move.ravs) {
          // Extract the comment from the `ravs` property
          const comment = move.ravs[0].moves[0].comments[0].text;
          // Return an object with the move and the comment
          return { move: move.move, comment };
        } else {
          // If the move does not have a `ravs` property, return an object with the move and an empty comment
          return { move: move.move, comment: "" };
        }
      });
      setData(movesWithComments);
    });

    // Extract the initial position and solution from the parsed PGN
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

    // Update the component's state with the new position
    setPosition(game.fen());

    // Check if the move follows the PGN
    if (game.history()[currentMove] !== moves[currentMove]) {
      // The move does not follow the PGN, so add a delay before taking it back
      setTimeout(() => {
        // Undo the move
        game.undo();

        // Update the component's state with the new position
        setPosition(game.fen());
      }, 1000); // delay of 1 second
    } else {
      setTimeout(() => {
        // Increment the current move index by one
        setCurrentMove((prevMove) => prevMove + 1);

        // Check if the game is not over
        if (!game.game_over()) {
          // Get the next move in the `moves` array
          const nextMove = moves[currentMove + 1];

          // Make the next move on the chessboard
          game.move(nextMove);

          // Update the component's state with the new position
          setPosition(game.fen());

          // Increment the current move index
          setCurrentMove((prevMove) => prevMove + 1);
        }
      }, 1000);

      // The move follows the PGN, so do not undo the move
    }
  }

  /*   function onMove(from, to) {
    // Check if the move is legal
    const chess = new Chess(position);
    if (!chess.move({ from, to })) {
      alert("Illegal move!");
      return;
    }
    const newPosition = chess.fen();

    // Check if the move follows the PGN
    if (!pgn.includes(chess.pgn())) {
      alert("Move does not follow the PGN!");
      chess.undo();
      return;
    }

    // Update the history and the position
    setHistory((history) => [...history, { from, to }]);
    setPosition(newPosition);

    // Check if the move is correct
    const isCorrect = newPosition === solution;
    setCorrectMoves((correctMoves) => [...correctMoves, isCorrect]);
  } */

  function handleMove(from, to) {
    const move = finalpgn[0].moves.find((m) => m.from === from && m.to === to);

    // Extract the LAN move string from the move
    const lan = move.move;

    // Make the move on the chessboard
    game.move(lan);

    // Update the component's state with the new position
    setPosition(game.fen());
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
                lightSquareStyle={{ backgroundColor: "white" }}
                darkSquareStyle={{ backgroundColor: "black" }}
                boardWidth={dimensions.width}
                boardOrientation={whiteOrientation ? "white" : "black"}
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
                  </Row>
                </div>
              </Container>
            </Col>
            <Col>
              <div
                className="moves_container"
                style={{ height: dimensions.height }}
              >
                {data.map((move, index) => (
                  <div key={index} style={{ display: "flex" }}>
                    <div
                      className={
                        index === highlightedMoveIndex ? "highlighted-move" : ""
                      }
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        loadPostion(index);
                      }}
                    >
                      {index + 1}. {move.move}{" "}
                    </div>{" "}
                    &nbsp;
                    {move.comment}
                  </div>
                ))}
              </div>

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
