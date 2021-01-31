import {server} from "./app";
const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server works on http://localhost:${port}`));
