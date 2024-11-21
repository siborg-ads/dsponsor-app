import { StepType } from "../../profile/tabs/OwnedTokens";

import React, { useState } from "react";
import renderNumberToHumanString from "@/utils/misc/renderNumberToHumanString";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

const AdText = ({
  stepsRef,
  styles,
  step,
  setText,
  currentSlide,
  numSteps
}: {
  stepsRef: React.MutableRefObject<any[]>;
  styles: {
    readonly [key: string]: string;
  };
  step: StepType;
  setText: (text: string) => void;
  currentSlide: number;
  numSteps: number;
}) => {
  const [markdownText, setMarkdownText] = useState(step.data || "");
  const maxSize = parseInt(step.adParameter.split("-")[2]);

  return (
    <div
      ref={(el) => {
        stepsRef.current[1] = el;
      }}
      className={styles.form__step}
    >
      <div className="pl-2 pr-6">
        <h3 className="mb-12 text-jacarta-200">
          Step {currentSlide + 1}/{numSteps} : Ad Text
        </h3>
        {/* <!-- Link --> */}
        <div className="mb-6">
          <p className="block mb-2 font-display text-jacarta-900 dark:text-white">
            Markdown text<span className="text-red">*</span>
          </p>
          <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
            Enter the text that will be displayed on the ad. This text can be formatted using
            markdown syntax.
          </p>
          <p className="mb-3 dark:text-jacarta-100 text-jacarta-100 text-2xs">
            There is{" "}
            <span className="text-green">
              {renderNumberToHumanString(maxSize - markdownText.length)}
            </span>{" "}
            characters remaining.
          </p>

          <MdEditor
            value={markdownText}
            onChange={(val) => {
              setText(val || "");
              setMarkdownText(val || "");
            }}
            placeholder="Please enter Markdown text"
            maxLength={maxSize}
            language="en-US"
            theme="dark"
            toolbars={[
              "italic",
              "underline",
              "bold",
              "-",
              "title",
              "unorderedList",
              "orderedList",
              "=",
              "pageFullscreen",
              "fullscreen",
              "-",
              "preview",
              "previewOnly"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AdText;
