import React, { useState } from "react";
import validate from "../utils/validation";

const axios = require("axios").default;

export default function Search({ result }) {
  const [input, setInput] = useState("");
  const [state, setState] = useState("IDLE!");
  const [errorMessage, setErrorMessage] = useState("");

  const sendInput = async () => {
    setErrorMessage("");
    setState("LOADING!");

    const isValid = validate(input);
    if (isValid !== "VALID") {
      setErrorMessage(isValid);
      setState("ERROR:");
    }
    try {
      const response = await axios.post("/api/eori", { input });
      console.log(
        "🚀 ~ file: search.js ~ line 22 ~ sendInput ~ response",
        response
      );

      setState("SUCCESS!");
      result(JSON.stringify(response.data));
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.error);
      setState("ERROR!");
      result("");
    }
  };

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="mt-20 flex flex-col sm:w-2/4 md:w-2/5 lg:w-1/4">
      <label>Enter the UK EORI number</label>
      <input
        className="max-h-8 mt-2 p-2 block-inline sm:text-sm border border-gray-500 rounded-md "
        type="text"
        name="eoriInput"
        value={input}
        onChange={handleChangeInput}
      ></input>
      <button
        className="mt-2 rounded bg-blue-500 text-gray-50 font-semibold py-2 disabled:opacity-50  hover:bg-blue-700  "
        onClick={sendInput}
        disabled={state === "LOADING"}
      >
        Check
      </button>
      <div>{state}</div>
      <div>{errorMessage}</div>
    </div>
  );
}
