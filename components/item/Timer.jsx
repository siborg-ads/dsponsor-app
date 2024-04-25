"use client";

import { useEffect, useState } from "react";
import Countdown from "react-countdown";
const Completionist = () => (
  <div className="mt-3 space-x-4 bottom-4  flex items-center justify-center rounded-full bg-white py-2.5 px-6 text-2xs font-medium">
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

export default function Timer({ endTime }) {
  const [showTimer, setShowTimer] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    setShowTimer(true);

    // Calculate remaining time until endTime
    const now = new Date().getTime();
    const timeRemaining = 1713438665404 - now;
    setRemainingTime(timeRemaining);
  }, [endTime]);
  return (
    <>
      {showTimer && (
        <Countdown date={Date.now() + remainingTime} renderer={renderer} />
      )}
    </>
  );
}
