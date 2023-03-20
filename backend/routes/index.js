import sensorRouter from "./sensors.js";

export default function route(app) {
    app.use("/sensor", sensorRouter);

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
}
