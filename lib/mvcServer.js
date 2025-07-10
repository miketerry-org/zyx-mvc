// mvcServer.js

"use strict";

// Load necessary modules
const { engine } = require("express-handlebars");
const flash = require("connect-flash");
const { BaseServer } = require("zyx-base");
const system = require("zyx-system");

/**
 * MVCServer extends BaseServer to provide:
 * - Flash message support
 * - Handlebars-based view engine setup
 * - 404 and general error handling
 *
 * Intended for tenant-aware web applications.
 */
class MVCServer extends BaseServer {
  /**
   * Initializes session-related middleware.
   * - Adds flash message support.
   * - Makes flash messages available to templates via `res.locals`.
   */
  initSession() {
    super.initSession();

    // Attach flash middleware
    this.express.use(flash());

    // Middleware to expose flash messages to views
    this.express.use((req, res, next) => {
      res.locals.success_msg = req.flash("success");
      res.locals.error_msg = req.flash("error");
      next();
    });
  }

  /**
   * Configures the Handlebars view engine for Express.
   * Sets up default layout, layout and partial directories,
   * and enables view caching in production.
   */
  initViewEngine() {
    this.express.engine(
      "hbs",
      engine({
        defaultLayout: this.expressConfig.views_default_layout,
        layoutsDir: this.expressConfig.views_layouts_path,
        partialsDir: this.expressConfig.views_partials_path,
        extname: "hbs",
      })
    );

    this.express.set("view engine", "hbs");
    this.express.set("views", this.expressConfig.views_path);

    if (system.isProduction) {
      this.express.enable("view cache");
    }
  }

  /**
   * Handles unmatched routes.
   * Returns a placeholder 404 response.
   * (Should be customized for JSON or HTML depending on the app.)
   */
  init404Error() {
    this.express.use((req, res, next) => {
      res.status(404).send("404 error handler not implemented");
    });
  }

  /**
   * Centralized Express error handler.
   * - Logs error using request-bound logger if available.
   * - Sends detailed errors in development; generic errors in production.
   *
   * Note: The actual response body should be improved per app needs.
   */
  initErrorHandler() {
    this.express.use((err, req, res, next) => {
      // Log error if logger is attached to request
      req.log?.error?.(err.stack || err.message);

      const message = system.isDevelopment ? err.message : "Server Error";

      res.status(err.status || 500).send("error handler not implemented");
    });
  }
}

module.exports = MVCServer;
