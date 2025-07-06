// homeRouter.js:

"use strict";

// load all necessary modules
const { BaseRouter } = require("zyx-base");

class HomeRouter extends BaseRouter {
  define() {
    // GET /
    this.get("/", (req, res) => {
      console.log("home page");
      res.render("home", {});
    });
  }
}

module.exports = HomeRouter;
