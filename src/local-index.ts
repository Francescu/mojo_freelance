import server from "./server";

const port = process.env.PORT || 3000;
const onListen = () =>
  console.info(`Server running on http://localhost:${port}.`);

server.listen(port, onListen);
