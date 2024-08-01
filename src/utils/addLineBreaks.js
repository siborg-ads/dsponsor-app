import React from "react";

export function addLineBreaks(text) {
  if (typeof text !== "string") return text;

  return text.split("\n").map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
}
