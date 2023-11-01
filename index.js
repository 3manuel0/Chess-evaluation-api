const chessapi = require("chess-analysis-api");
const express = require("express");
const app = express();

// get the best move and the evaluation based on the fen notation
app.get("/:fen(*)", async (req, res) => {
  fen = decodeURI(req.url).replace("/", "");
  console.log(fen);
  let data = {};
  chessapi.chessAnalysisApi
    .getAnalysis({
      //
      fen: fen,

      depth: 12,

      multipv: 2,

      excludes: [
        chessapi.PROVIDERS.LICHESS_BOOK,
        chessapi.PROVIDERS.LICHESS_CLOUD_EVAL,
      ],
    })
    .then((result) => {
      data = result.moves;
      res.send(data);
      // ...
    })
    .catch((error) => {
      //  error
      res.send({ error: "fen tring error" });
    });
});
app.listen(4000, () => {
  console.log("listening to port 4000");
});
