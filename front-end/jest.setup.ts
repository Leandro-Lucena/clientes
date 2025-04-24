import "@testing-library/jest-dom";
import {
  TextEncoder as NodeTextEncoder,
  TextDecoder as NodeTextDecoder,
} from "util";

// Verifica se o tipo já existe e o substitui com o correto
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = NodeTextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = NodeTextDecoder as any;
}
