import Modal from "react-modal";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

const steps: {
  title: string;
  description: React.ReactNode;
  image?: string;
}[] = [
  {
    title: "Acquire an Ad Space Token",
    description: (
      <span>
        Explore the available offers and decide whether to buy or bid based on the potential you
        see.
      </span>
    )
  },
  {
    title: "Submit Your Ad",
    description: (
      <span>
        As the token holder, you have the exclusive right to submit an ad for the designated space.
      </span>
    )
  },
  {
    title: "Wait for Ad Approval",
    description: <span>Once your ad is approved, it will appear on the relevant platforms.</span>,
    image: "/images/home/siborg-preview.png"
  },
  {
    title: "Keep or Sell Your Ad Space Token",
    description: (
      <span>
        You can update your ad at any time, or choose to sell your token whenever you wish.
      </span>
    )
  }
];

const Steps = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

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
              <div className="flex p-[1px] bg-secondaryBlack hover:-translate-y-1 duration-300 rounded-lg">
                <div
                  className="flex flex-col justify-between gap-4 p-6 bg-secondaryBlack rounded-lg relative"
                  key={index}
                >
                  <div className="gap-4 flex flex-col justify-between h-full">
                    <span className="text-white font-semibold">
                      {index + 1}. {step.title}
                    </span>

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

export default Steps;
