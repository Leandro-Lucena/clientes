import "@testing-library/jest-dom";
import {
  TextEncoder as NodeTextEncoder,
  TextDecoder as NodeTextDecoder,
} from "util";
import { config } from "dotenv";
import { resolve } from "path";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

config({ path: resolve(__dirname, ".env.test") });

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = NodeTextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = NodeTextDecoder as any;
}
