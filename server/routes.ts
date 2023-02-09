import { Router, Request, Response } from "express";
import { prisma } from "../prisma";
import * as jwt from "jsonwebtoken";

const router = Router();

router.get("/api/users", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany({});

  console.log("allusers", allUsers);
  res.json(allUsers);
});

router.post("/api/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.send({ message: "Successfully logged out" });
});

router.get("/api/pgn/1", async (req: Request, res: Response) => {
  const allpgns = await prisma.pgn.findMany({});

  console.log("allusers", allpgns);
  res.json(allpgns);
});

router.post("/api/session", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  console.log("user", user);

  if (!user) {
    res.status(400).send({ error: "Email not found" });
  } else if (user.password !== req.body.password) {
    res.status(400).send({ error: "Incorrect password" });
  } else {
    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        /*         userRole: user.role,
         */
      },
      "secret-key"
    );
    res.cookie("token", token);
    // res.json({ token: token });
    res
      .status(200)
      .send({ status: 200, message: "Successfully logged in", token });
  }
});
export default router;
