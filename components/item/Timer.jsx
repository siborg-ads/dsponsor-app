"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";
const Completionist = () => (
  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center space-x-1 rounded-full bg-white py-2.5 px-6 text-2xs font-medium">
    {" "}
    <span>This auction has ended</span>
  </div>
);

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <>
        {window !== undefined && (
          <div
            className="js-countdown-single-timer mt-3 flex space-x-4"
            data-countdown="2023-09-07T19:40:30"
            data-expired="This auction has ended"
          >
            <span className="countdown-days text-light-base dark:text-white">
              <span className="js-countdown-days-number text-lg font-medium lg:text-[1.5rem]">
                {days}
              </span>
              <span className="block text-xs font-medium tracking-tight">
                Days
              </span>
            </span>
            <span className="countdown-hours text-light-base dark:text-white">
              <span className="js-countdown-hours-number text-lg font-medium lg:text-[1.5rem]">
                {hours}
              </span>
              <span className="block text-xs font-medium tracking-tight">
                Hrs
              </span>
            </span>
            <span className="countdown-minutes text-light-base dark:text-white">
              <span className="js-countdown-minutes-number text-lg font-medium lg:text-[1.5rem]">
                {minutes}
              </span>
              <span className="block text-xs font-medium tracking-tight">
                Min
              </span>
            </span>
            <span className="countdown-seconds text-light-base dark:text-white">
              <span className="js-countdown-seconds-number text-lg font-medium lg:text-[1.5rem]">
                {seconds}
              </span>
              <span className="block text-xs font-medium tracking-tight">
                Sec
              </span>
            </span>
          </div>
        )}
      </>
    );
  }
};

export default function Timer() {
  const [showTimer, setShowTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    new Date(
      new Date().getTime() +
        Math.floor(Math.random() * 24 * 60 * 60 * 1000 * 365)
    ).toISOString()
  );
  useEffect(() => {
    setShowTimer(true);
  }, []);
  return (
    <>{showTimer && <Countdown date={remainingTime} renderer={renderer} />}</>
  );
}
