const express = require("express");
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  next();
});

app.use(bodyParser.json());

app.use("/sounds", express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listening on ${5000}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/pgn/1", (req, res) => {
  //Each Pgn param returns the whole course variations.
  res.json([
    {
      "king opening":
        '[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *',
    },
    {
      "Queen Opening":
        "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.} 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2",
    },
    {
      " Another Queen Opening":
        '[Event "San Sebastian"][Site "San Sebastian"][Date "1911.??.??"][Round "?"][White "Capablanca, Jose"][Black "Burn, Amos"][Result "1-0"] 1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.d3 { This is a very solid development, to which I was much addicted at the time, because of my ignorance of the multiple variations of the openings. } 5...d6 6.c3 Be7 ( { In this variation there is the alternative of developing this Bishop via **g7**, after } 6...g6 ) 7.Nbd2 O-O 8.Nf1 b5 9.Bc2 d5 10.Qe2 dxe4 11.dxe4 Bc5 { Evidently to make room for the Queen at **e7**, but I do not think the move advisable at this stage. } ( 11...Be6 { is a more natural and effective move. It develops a piece and threatens Bc4 which would have to be stopped. } ) 12.Bg5 Be6 { Now it is not so effective, because White\'s Queen\'s Bishop is out, and the Knight, in going to **e3** } 13.Ne3 { defends **c4** and does not block the Queen\'s Bishop. } 13...Re8 14.O-O Qe7 { # This is bad. Black\'s game was already not good. He probably had no choice but to take the Knight with the Bishop before making this move. } 15.Nd5 Bxd5 16.exd5 Nb8 { In order to bring it to **d7**, to support the other Knight and also his King\'s Pawn. White, however, does not allow time for this, and by taking advantage of his superior position is able to win a Pawn. } 17.a4 b4 ( { Since he had no way to prevent the loss of a Pawn, he should have given it up where it is, and played } 17...Nbd7 { in order to make his position more solid. The text move not only loses a Pawn, but leaves Black\'s game very much weakened. } ) 18.cxb4 Bxb4 19.Bxf6 Qxf6 20.Qe4 Bd6 21.Qxh7+ Kf8 { With a Pawn more and all his pieces ready for action, while Black is still backward in development, it only remains for White to drive home his advantage before Black can come out with his pieces, in which case, by using the open h-file, Black might be able to start a strong attack against White\'s King. White is able by his next move to eliminate all danger. # } 22.Nh4 Qh6 { This is practically forced. } ( { Black could not play } 22...g6 { because of } 23.Bxg6 { White meanwhile threatened } ) 23.Qxh6 gxh6 24.Nf5 h5 25.Bd1 Nd7 26.Bxh5 Nf6 27.Be2 Nxd5 28.Rfd1 Nf4 29.Bc4 Red8 30.h4 a5 { Black must lose time assuring the safety of this Pawn. } 31.g3 Ne6 32.Bxe6 fxe6 33.Ne3 Rdb8 34.Nc4 Ke7 { Black fights a hopeless battle. He is two Pawns down for all practical purposes, and the Pawns he has are isolated and have to be defended by pieces. } 35.Rac1 Ra7 { White threatened } 36.Re1 Kf6 37.Re4 Rb4 38.g4 Ra6 ( { If } 38...Rxa4 { then } 39.Nxd6 { would of course win a piece. } ) 39.Rc3 Bc5 40.Rf3+ Kg7 41.b3 Bd4 42.Kg2 Ra8 43.g5 Ra6 44.h5 Rxc4 45.bxc4 Rc6 46.g6 { Black resigns. } 1-0',
    },
    {
      "Test PGN":
        "1. d4 d5 2. Nf3 c5 (2... Nc6) 3. Bf4 Nc6 4. c3 e6 5. Nbd2 Bd6 (5... Be7 6. e3 Nf6 (6... h6 7. Bd3)) 1/2-1/2",
    },
    {
      "Tough PGN":
        " 1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 (4. dxe6 fxe6 5. Bg5 (5. Nc3 d5 6. cxd5 exd5 7. Bg5 d4 8. Ne4 Be7 9. Nxf6+ Bxf6 10. Bxf6 Qxf6 $15) 5... Be7 6. Nc3 O-O 7. Nf3 Nc6 $11) (4. Nf3 exd5 5. cxd5 d6 6. e4 a6 (6... g6 $11) 7. Bd3 Bg4 8. Nbd2 Nbd7 9. h3 Ne5 10. Be2 Bxf3 11. Nxf3 Nxf3+ 12. Bxf3 Be7 13. O-O Nd7 $11) (4. Bg5 h6 $5 (4... exd5 5. cxd5 d6 $11) 5. Bh4 (5. Bxf6 Qxf6 6. Nc3 d6 7. Nf3 e5 8. e4 Be7 9. Be2 O-O $11) 5... g5 6. Bg3 Qb6 7. Nc3 $5 (7. Be5 Bg7 8. Nc3 d6 9. Bxf6 Bxf6 $11) 7... Qxb2 8. Be5 (8. Rc1 d6 9. e4 exd5 10. cxd5 a6 11. Nf3 Bg4 $13) 8... Ne4 9. Bxh8 (9. Rc1 f6 10. Nf3 Nxf2 11. Kxf2 fxe5 12. Nb5 e4 $36) 9... Nxc3 10. Qc1 Qxc1+ 11. Rxc1 Nxa2 12. Rb1 exd5 13. cxd5 Nb4 $11) 4... exd5 5. cxd5 d6 6. Nf3 (6. e4 g6 7. Be2 (7. Bb5+ Bd7 (7... Nbd7 $11) 8. a4 Bg7 9. Nf3 O-O 10. O-O Bg4 11. h3 Bxf3 12. Qxf3 Nbd7 $11) 7... Bg7 8. Bg5 O-O 9. Qd2 { King's Indian} Re8 10. f3 a6 11. a4 Qa5 $11) 6... g6 7. Nd2 (7. Bg5 h6 (7... Bg7 $11) 8. Bh4 g5 9. Bg3 Nh5 10. e3 Nxg3 11. hxg3 Bg7 12. Bd3 Nd7 13. Qc2 Qe7 $11) 7... Bg7 8. Nc4 O-O 9. Bf4 (9. g3 b6 10. a4 Ba6 11. Nb5 Ne8 12. Bg2 Bxb5 13. axb5 Nd7 14. Bf4 Ne5 $11 (14... Qe7 15. O-O g5 $5 $13)) (9. Bg5 Qe7 10. Qd2 b6 11. Qf4 Rd8 12. O-O-O (12. Ne4 Nbd7 13. Nexd6 h6 14. Bh4 g5 15. Nf5 Qf8 16. Bxg5 hxg5 17. Qxg5 b5 $13) 12... Ba6 13. e4 Bxc4 14. Bxc4 a6 $11) 9... b6 $5 ( 9... Ne8 $11) 10. Bxd6 (10. e3 Ne8 (10... Nh5 $13) 11. Qd2 Ba6 12. a4 f5 $11) 10... Re8 11. e3 (11. Bg3 Nh5 12. e3 Nxg3 13. hxg3 Bxc3+ 14. bxc3 Bb7 15. d6 b5 16. Nb2 Re6 $44) 11... Ne4 12. Nxe4 Rxe4 13. Bg3 b5 14. Nd6 (14. Nd2 Rb4 15. b3 c4 16. Rc1 Qa5 17. bxc4 17. Nd7 $11) 14... Rb4 $44 *",
    },

    {
      h6: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. Nd2 Bg7 8. Nc4 O-O 9. Bf4 b6 10. Bxd6 Re8 11. e3 Ne4 12. Nxe4 Rxe4 (12... f5 13. Nc3 Bxc3+ (13... h6 { strong move } 14. a3) 14. bxc3) 13. Bg3 b5 14. Nd6 Rb4 *",
    },
    {
      tester:
        "1. d4 Nf6 2. c4 c5 3. d5 e6 4. g3 exd5 5. cxd5 b5 $5 (5... d6 { Tranposition to 'normal' fianchetto}) 6. Bg2 (6. e4 Nxe4 7. Qe2 (7. Bg2 Nd6 8. Nf3 Be7 9. O-O O-O 10. Bf4 (10. a4 Bb7 11. Bf4 b4 12. Nbd2 Ne8 13. Ne4 d6 $11) 10... Na6 11. Re1 Bb7 (11... Re8 $5 $11) 12. Nc3 Nc7 $11) 7... Qe7 8. Bg2 f5 $5 (8... Nd6 9. Be3 Na6 $11) 9. Nh3 (9. d6 Qe6 10. Nc3 Bxd6 11. g4 g6 12. gxf5 gxf5 $13) 9... b4 10. d6 (10. Be3 g6 11. Qc2 d6 12. Nd2 Bg7 13. Nxe4 fxe4 14. Ng5 O-O 15. Bxe4 Bf5 $11) (10. O-O Ba6 11. Qc2 Bxf1 12. Kxf1 h6 13. Nd2 Nd6 14. Nb3 Qf6 15. Nxc5 Be7 $11) 10... Qxd6 11. f3 Ba6 12. Qe3 Nc6 13. fxe4 Be7 14. e5 $6 (14. Qd2 Nd4 15. e5 Qxe5+ $36) (14. exf5 O-O 15. Qe4 Rae8 16. Qd5+ Kh8 17. Qxd6 Bxd6+ 18. Kd1 Rxf5 $36) 14... Nxe5 $1 15. Bxa8 O-O $36) (6. Nf3 Bb7 7. e4 Nxe4 8. Bg2 (8. Bxb5 Qa5+ 9. Nfd2 Bxd5 10. O-O Qxb5 11. Nxe4 Qc6 12. Nbc3 Be6 $11) 8... Bd6 (8... Be7 $11) 9. O-O (9. Nh4 Nf6 10. Nf5 O-O 11. Nxd6 Qe7+ 12. Ne4 Nxe4 13. O-O Nd6 $11) 9... O-O 10. Nh4 (10. Re1 f5 11. Nc3 Nxc3 12. bxc3 Na6 $11) 10... Nf6 11. Nf5 Be5 12. f4 Bd4+ 13. Nxd4 cxd4 14. Qxd4 Na6 $11) 6... d6 7. b4 (7. e4 Nbd7 8. f4 (8. Ne2 g6 9. O-O Bg7 10. Bf4 Qb6 11. Nd2 O-O 12. a4 Nh5 13. Bg5 b4 $11) 8... g6 9. Qe2 Bg7 10. e5 dxe5 (10... O-O $5 11. exf6 Nxf6 12. Qxb5 Re8+ 13. Ne2 Rb8 $36) 11. fxe5 O-O 12. exf6 Nxf6 13. Qxb5 Rb8 14. Qd3 (14. Qxb8 $2 Re8+ 15. Ne2 Rxe2+ $19) 14... Re8+ $36) 7... Bb7 8. bxc5 dxc5 9. e4 Bd6 10. Nd2 O-O 11. Ne2 Re8 12. O-O Nbd7 13. a4 (13. Bb2 a5 14. Rc1 a4 15. a3 Ne5 16. Qc2 Qd7 $11) 13... b4 14. Nc4 Ne5 15. Nxd6 Qxd6 $11 *",
    },
  ]);
});

/* const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Ombarkab1",
  database: "chess_test",
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err.stack);
    return;
  }
  console.log("Connected to PostgreSQL");
});

client.query("SELECT to_regclass('public.users');", (err, res) => {
  if (!res.rows[0].to_regclass) {
    client.query(
      "CREATE TABLE users (id serial PRIMARY KEY, name VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(100) NOT NULL);",
      (err, res) => {
        console.log(err ? err.stack : res.command + " table created");
        // client.end();
      }
    );
  } else {
    console.log("Table already exists");
    //  client.end();
  }
});

client.query(
  "SELECT * FROM users WHERE email = $1",
  ["mitchelladel@gmail.com"],
  (err, res) => {
    if (err) {
      console.log(err.stack);
    } else if (res.rows.length === 0) {
      client.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)",
        [
          "mitchell",
          "mitchelladel@gmail.com",
          "ombarkab",
          "admin",
          "yahya",
          "yahyabarghash@gmai.com",
          "yahyayahya",
          "admin",
        ],
        (err, res) => {
          console.log(err ? err.stack : res.rowCount + " rows inserted");
          client.end();
        }
      );
    } else {
      console.log("Email already Exists in the table, population Stopped");
    }
  }
);

app.post("/api/session", (req, res) => {
  const email = req.body.email;
  console.log("email", email);
  const password = req.body.password;
  console.log("password", password);

  //client.connect();

  client.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to retrieve user" });
      }

      const user = result.rows[0];

      if (!user) {
        res.status(400).json({ error: "Invalid email or password" });
      } else if (user.password !== password) {
        res.status(400).json({ error: "Invalid email or password" });
      } else {
        const token = jwt.sign(
          {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userRole: user.role,
          },
          "secret-key"
        );
        res.cookie("token", token);
        res.json({ token: token });
      }
    }
  );
});
app.post("/api/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.send({ message: "Successfully logged out" });
});
 */
