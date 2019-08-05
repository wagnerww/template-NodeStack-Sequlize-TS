import * as redis from "redis";
const host: string = "localhost";
const port: number = 6379;
const client = redis.createClient(port, host);

client.on("connect", function() {
  if (process.env.NODE_ENV === "development") {
    console.log("==> Conexão com o REDIS OK!");
  }
});

client.on("error", function(err) {
  console.log("==> Falha na conexão com o REDIS: " + err);
});

export default client;
