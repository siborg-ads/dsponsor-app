import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";

const steps = [
  {
    title: "Find a Keyword",
    description: (
      <span>
        Find a keyword to bid on. Remember that{" "}
        <span className="font-semibold text-white">
          each ad space is linked to a unique search keyword
        </span>
        .
      </span>
    )
  },
  {
    title: "Bid To Earn",
    description: (
      <span>
        Participate in the &quot;bid to earn&quot; auction to secure ad space or{" "}
        <span className="font-semibold text-white">earn money by being outbid</span>!
      </span>
    )
  },
  {
    title: "Get Mystery Boxes",
    description: (
      <span>
        In addition to winning an auction, the ad owner will{" "}
        <span className="font-semibold text-white">
          receive mystery boxes, a new type of incentive
        </span>{" "}
        with contents to be revealed later.
      </span>
    )
  },
  {
    title: "Submit Ad Proposal",
    description: (
      <span>
        <span className="font-semibold text-white">Submit an ad proposal</span> that will be
        displayed in the SiBorg App once approved.
      </span>
    ),
    image: "/images/home/siborg-preview.png"
  }
];

const HowDoesItWork = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <span className="text-xl font-semibold text-white ">How does it work?</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                className="flex p-[1px] bg-primaryBlack hover:-translate-y-1 duration-300 rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(176deg, #ea465c, #8a4cef 18%, #b649ac 51%, #ea465c 86%, #8a4cef)"
                }}
              >
                <div
                  className="flex flex-col justify-between gap-4 p-6 bg-primaryBlack rounded-lg relative"
                  key={index}
                >
                  <div className="gap-4 flex flex-col">
                    <span className="text-white text-center font-semibold">
                      {index + 1}. {step.title}
                    </span>

                    <div
                      className="flex w-full h-[1px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(176deg, #ea465c, #8a4cef 18%, #b649ac 51%, #ea465c 86%, #8a4cef)"
                      }}
                    />

                    <span className="text-jacarta-100 text-sm">{step.description}</span>
                  </div>

                  {step.image && (
                    <button onClick={() => openModal(step.image)} className="text-left">
                      <span className="underline text-white hover:text-jacarta-100 text-left text-xs cursor-pointer">
                        See example with &apos;Bitcoin&apos; search keyword
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Image"
        className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-0"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
      >
        <div className="bg-white rounded-lg px-4 pb-4 relative mx-4">
          <div className="absolute top-O right-0 p-2">
            <button
              onClick={closeModal}
              className="hover:bg-jacarta-100 p-1 rounded-full text-black"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <Image
            src={selectedImage}
            alt="SiBorg Ad Preview"
            width={500}
            height={300}
            className="rounded-lg mt-12"
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default HowDoesItWork;
