import app from ".";

const port = process.env.PORT || 3000;

const onListen = () => console.info(`Now listening on port ${port}.`);

app.listen(port, onListen);
