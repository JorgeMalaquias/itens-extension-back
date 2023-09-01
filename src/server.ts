import app from "./app";
import sanitizedConfig from "./config";

const port:number = sanitizedConfig.PORT;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});