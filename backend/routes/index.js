import sensorRouter from "./sensors.js";
import accountRouter from "./accounts.js";

export default function route(app) {
    app.use("/sensor", sensorRouter);

    app.use("/account", accountRouter)

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
}
