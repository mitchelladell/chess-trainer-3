import React, { useState, useEffect } from "react";
import PGN from "pgn-parser";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Container, Row, Col, Button } from "react-bootstrap";

async function readPGN(pgn2) {
  // Read the PGN file and parse it
  const pgn = pgn2;

  const postion = PGN.parse(pgn);
  console.log("game", postion);

  // Return the initial position and solution
  return postion;
}

function Trainer2() {
  const pgn =
    '[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *';
  const [position, setPosition] = useState("");
  const [history, setHistory] = useState([]);
  const [initialPosition, setInitialPosition] = useState("");
  const [solution, setSolution] = useState("");
  const [correctMoves, setCorrectMoves] = useState([]);
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0); // track the current move
  const [data, setData] = useState([]);

  const [side, setSide] = useState("w");
  const [turn, setTurn] = useState("w"); // "w" for white, "b" for black

  const [finalpgn, setFinalpgn] = useState([]);

  const [comments, setComments] = useState([]);
  const [game, setGame] = useState(new Chess());

  useEffect(() => {
    // Read the PGN file and extract the initial position and solution
    readPGN(pgn).then(({ initialPosition, solution }) => {
      setInitialPosition(initialPosition);
      setSolution(solution);
      console.log("solution", initialPosition);
      setPosition(initialPosition);
    });
  }, []);

  const getNextMove = (e) => {
    // Get the next move in the `moves` array
    const nextMove = moves[currentMove];
    // Make the move on the chessboard
    game.move(nextMove);
    // Update the component's state with the new position and current move index
    setPosition(game.fen());
    setCurrentMove(currentMove + 1);
  };

  const getPreviousMove = (e) => {
    // Undo the last move on the chessboard
    game.undo();
    // Update the component's state with the new position and current move index
    setPosition(game.fen());
    setCurrentMove(currentMove - 1);
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
      setFinalpgn(finalpgn);
      const ravs = finalpgn[0].moves.find((move) => move.ravs);

      const parsedMoves = finalpgn[0].moves.map((move) => move.move);
      // extract the comments from the parsed PGN data
      const parsedComments = finalpgn[0].moves
        .filter((move) => move.ravs)
        .map((move) => move.ravs[0].moves[0].comments[0].text);

      setComments(parsedComments);
      setMoves(parsedMoves);
      console.log("moves", moves);

      console.log("comments", parsedComments);

      const initialPosition =
        finalpgn[0].headers.find((header) => header.name === "FEN")?.value ||
        "";

      const side = finalpgn[0].headers.find(
        (header) => header.name === "White"
      ).value;

      setSide("me" ? "White" : "Black");

      console.log("playingWithSide", side);
      const solution = finalpgn[0].moves.slice(-1)[0].result || "";

      console.log("solution", solution);
      console.log("initialPosition", initialPosition);

      setInitialPosition(initialPosition);
      setSolution(solution);
      setPosition(initialPosition);

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
  }, []);

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
  }

  function makeAMove(move) {
    // Make the move on the chessboard
    const result = game.move(move);

    const sideToMove = game.turn();

    console.log("sideTomove", sideToMove);
    console.log("side", side);

    // Update the component's state with the new position
    setPosition(game.fen());

    // Check if the move follows the PGN
    if (!pgn.includes(game.pgn())) {
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
        setCurrentMove(currentMove + 1);

        // Check if the game is not over
        if (!game.game_over()) {
          // Get the next move in the `moves` array
          const nextMove = moves[currentMove + 1];

          // Make the next move on the chessboard
          game.move(nextMove);

          // Update the component's state with the new position
          setPosition(game.fen());

          // Increment the current move index
          setCurrentMove(currentMove + 1);
        }
      }, 1000);

      // The move follows the PGN, so do not undo the move
    }
  }

  function onMove(from, to) {
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
  }

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
      <Container>
        <Row>
          <Col>
            <Chessboard
              onPieceDrop={onDrop}
              position={game.fen()}
              lightSquareStyle={{ backgroundColor: "white" }}
              darkSquareStyle={{ backgroundColor: "black" }}
            />

            <Container>
              <Row>
                <Col xs={6}>
                  <Button
                    disabled={currentMove <= 0}
                    onClick={(e) => getPreviousMove(e)}
                  >
                    Previous
                  </Button>
                </Col>
                <Col xs={6}>
                  {" "}
                  <Button
                    disabled={currentMove >= moves.length - 1}
                    onClick={(e) => getNextMove(e)}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col>
            <div>
              {data.map((move, index) => (
                <div
                  key={index}
                  onClick={() => handleMove(move.from, move.to)}
                  style={{ display: "flex" }}
                >
                  <div style={{ fontWeight: "bold", cursor: "pointer" }}>
                    {move.move}{" "}
                  </div>{" "}
                  {move.comment}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Trainer2;
