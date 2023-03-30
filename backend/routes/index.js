import sensorRouter from "./sensors.js";
import accountRouter from "./accounts.js";
import deviceRouter from "./devices.js"

export default function route(app) {
    app.use("/sensor", sensorRouter);

    app.use("/account", accountRouter)

    app.use("/device", deviceRouter)

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
}
