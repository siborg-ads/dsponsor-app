import React from "react";
import { useRouter } from "next/navigation";

//TODO : maybe add a props "message" to make the displayed message personnalized
function ThankYouModal({ setShowThankYouModal, showThankYouModal }) {
  const router = useRouter();

  return (
    <div
      className="modal fade show block"
      tabIndex="-1"
      aria-labelledby="thankYouModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog max-w-2xl">
        <div className="modal-content bg-sigray-light border-sigray-border">
          <div className="modal-header">
            <h5 className="modal-title text-white" id="thankYouModalLabel">
              Thank You!
            </h5>
            <button
              onClick={() => setShowThankYouModal(false)}
              className="close-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-6 w-6 fill-jacarta-700 fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            </button>
          </div>
          <div className="modal-body p-6">
            <p className="text-white">
              Your action has been successfully completed.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => router.push("/marketplace")}
                className="inline-block w-full max-w-xs rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouModal;
