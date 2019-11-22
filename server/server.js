
log.warn("|[INIT]| BEGIN INITIALIZATION...");
var config = require(__dirname + "/../config.json");
var app = express();
var port = 8080;
declare("init", new Sequence(() => {
  require(__dirname + "/net/net.js");
  app.listen(port, () => {
    log.success("|[SERVER UP]| Listening on port " + port);
    global.READY_TIME = (new Date()).getTime();
    var seconds = (READY_TIME - START_TIME) / 1000;
    log.info("|[READY]| Took " + seconds + "s to initialize");
    log("");
    log("");
    var str = "You can visit at " + chalk.greenBright("localhost:" + port);
    log.blue(str);
    log(("―".repeat(str.length * 0.773)));
    log("");
  });
}));
var ready = init.checkpoint();

app.use(require("./router.js"));

require("./utility/dist.js")(app);

ready();
