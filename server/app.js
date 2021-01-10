const express = require("express");
const app = express();
const routes = require("./routes");
const yaml = require("./utils/handleYaml")
const port = yaml.system.port;

app.use(express.json());

routes(app);

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`)
})
