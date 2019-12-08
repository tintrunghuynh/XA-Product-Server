import express from "express";
export const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  //console.log("index");
  res.render("index", { title: "Express" });
});

