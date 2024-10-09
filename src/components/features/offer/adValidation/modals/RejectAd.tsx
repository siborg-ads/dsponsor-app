import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextArea from "@/components/ui/TextArea";
import StyledWeb3Button from "@/components/ui/buttons/StyledWeb3Button";
import { Address } from "thirdweb";
import { ChainObject } from "@/types/chain";

const RejectAd = ({
  chainConfig,
  selectedItems,
  successFullModalObject,
  closeRefuseModal,
  handleCommentChange,
  handleItemSubmit,
  successFullRefuseModal,
  comments
}: {
  chainConfig: ChainObject;
  selectedItems: any;
  successFullModalObject: any;
  closeRefuseModal: () => void;
  // eslint-disable-next-line no-unused-vars
  handleCommentChange: (tokenId: string, value: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleItemSubmit: (b: boolean) => Promise<unknown> | (() => Promise<unknown>);
  successFullRefuseModal: boolean;
  comments: { [key: string]: string };
}) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [allCommentsOk, setAllCommentsOk] = useState(false);

  useEffect(() => {
    for (const item of selectedItems) {
      if (item?.reason?.length < 3) {
        setAllCommentsOk(false);
      } else {
        setAllCommentsOk(true);
      }
    }
  }, [selectedItems]);

  useEffect(() => {
    const itemsMap = new Map();

    const uniqueItems = selectedItems?.filter((item) => {
      const alreadyExists = itemsMap?.has(item?.proposalId);
      if (!alreadyExists) {
        itemsMap.set(item?.proposalId, true);
        return true;
      }
      return false;
    });

    setFilteredItems(uniqueItems);
  }, [selectedItems]);

  return (
    <div className="modal-dialog  w-full sm:max-w-[450px]">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="placeBidLabel">
            {successFullRefuseModal ? successFullModalObject.title : "Comments"}
          </h5>
          <button type="button" className="btn-close" onClick={() => closeRefuseModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="w-6 h-6 fill-jacarta-700 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
            </svg>
          </button>
        </div>
        <div className="modal-body max-h-[400px] overflow-auto p-6 flex gap-4 flex-col items-center ">
          {!successFullRefuseModal ? (
            <>
              {filteredItems?.map((item: any) => {
                const tokenId = item?.tokenId;

                return (
                  <div key={item?.proposalId} className="w-full mb-6 ">
                    <div className="flex justify-between">
                      <div>
                        <label
                          htmlFor="item-description"
                          className="block mb-2 font-display text-jacarta-900 dark:text-white"
                        >
                          Comments
                          <span className="text-red">*</span>
                        </label>
                      </div>
                      <div className="block mb-2 font-display text-jacarta-900 dark:text-white">
                        Space # <span className="text-primaryPurple">{tokenId}</span>
                      </div>
                      <div className="block mb-2 font-display text-jacarta-900 dark:text-white">
                        Type:{"  "}
                        <span className="text-primaryPurple">
                          {item?.adParameter.startsWith("imageURL") ? "Image" : "Link"}
                        </span>
                      </div>
                    </div>
                    <TextArea
                      id={item.proposalId}
                      className="w-full"
                      rows={4}
                      required
                      value={comments[item.proposalId?.toString()] || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        handleCommentChange(item.proposalId?.toString(), e.target.value)
                      }
                      placeholder="Provide a comment of your refuse. min characters 3"
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex gap-2">
              <p>{successFullModalObject.body}</p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center gap-4">
              {!successFullRefuseModal ? (
                <StyledWeb3Button
                  contractAddress={chainConfig?.smartContracts?.DSPONSORADMIN?.address as Address}
                  onClick={async () => {
                    await toast.promise(handleItemSubmit(false), {
                      pending: "Waiting for confirmation 🕒",
                      success: "Transaction confirmed 👌",
                      error: "Transaction rejected 🤯"
                    });
                  }}
                  isDisabled={!allCommentsOk}
                  defaultText="Refuse Ad Proposal"
                  isRed
                />
              ) : (
                <button
                  onClick={() => closeRefuseModal()}
                  className="!rounded-full !py-3 !px-8 !text-center !font-semibold !text-white !transition-all !bg-primaryPurple !cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectAd;
