// homeRouter.js:

"use strict";

// load all necessary modules
const { BaseRouter } = require("zyx-base");

class NavBarRouter extends BaseRouter {
  define() {
    // return the home page
    this.get("/", (req, res) => {
      console.log("home page");
      res.render("home", {});
    });

    // return the about page
    this.get("/about", (req, res) => {
      console.log("about page");
      res.render("about", {});
    });

    // return the contact page
    this.get("/contact", (req, res) => {
      console.log("contact page");
      res.render("contact", {});
    });

    // return the support page
    this.get("/", (req, res) => {
      console.log("support page");
      res.render("support", {});
    });
  }
}

module.exports = NavBarRouter;
