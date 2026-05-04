const fs = require("fs");
const path = require("path");

function loadRoutes() {
  const campus = require("../server/dist/campus");

  if (!global.__campusEdgesLoaded) {
    const edgeFile = path.join(process.cwd(), "server", "data", "campus_edges.csv");
    const content = fs.readFileSync(edgeFile, "utf-8").trim();
    campus.parseEdges(content.split(/\r?\n/));
    global.__campusEdgesLoaded = true;
  }

  return require("../server/dist/routes");
}

function sendResponse(vercelRes, statusCode, payload) {
  vercelRes.statusCode = statusCode;

  if (typeof payload === "string") {
    vercelRes.setHeader("Content-Type", "text/plain; charset=utf-8");
    vercelRes.end(payload);
    return;
  }

  vercelRes.setHeader("Content-Type", "application/json; charset=utf-8");
  vercelRes.end(JSON.stringify(payload));
}

function createResponse(vercelRes) {
  let statusCode = 200;

  return {
    status(code) {
      statusCode = code;
      return this;
    },
    send(payload) {
      sendResponse(vercelRes, statusCode, payload);
    },
  };
}

function runRoute(routeName) {
  return (req, res) => {
    const routes = loadRoutes();
    const route = routes[routeName];

    if (!route) {
      sendResponse(res, 404, "Route not found");
      return;
    }

    route(
      {
        query: req.query || {},
        body: req.body || {},
      },
      createResponse(res)
    );
  };
}

module.exports = { runRoute };
