import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  stages: [
    { duration: "1m", target: 100 },
    { duration: "3m", target: 500 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  let baseURL = "http://localhost:8080/movies";

  let res = http.get(baseURL);
  check(res, {
    "GET /movies - Status 200": (r) => r.status === 200,
    "GET /movies - Tempo < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);
}
