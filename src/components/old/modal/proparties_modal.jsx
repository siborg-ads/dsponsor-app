import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closePropatiesModal } from "../../redux/counterSlice";
import Input from "../ui/input";

const Proparties_modal = () => {
  const { propartiesModalValue } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={propartiesModalValue ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPropertiesLabel">
                Add properties
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(closePropatiesModal())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              <p className="dark:text-jacarta-100 mb-8">
                Item Properties show up underneath your item, are clickable, and can be filtered in
                your {"collection's"}
                sidebar.
              </p>

              <div className="relative my-3 flex items-center">
                <button className="dark:bg-secondaryBlack dark:border-jacarta-800 hover:bg-jacarta-100 border-jacarta-100 bg-jacarta-50 flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 dark:fill-jacarta-300 h-6 w-6"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                  </svg>
                </button>

                <div className="flex-1">
                  <label className="font-display text-jacarta-900 mb-3 block text-base font-semibold dark:text-white">
                    Type
                  </label>
                  <Input type="text" placeholder="Character" />
                </div>

                <div className="flex-1">
                  <label className="font-display text-jacarta-900 mb-3 block text-base font-semibold dark:text-white">
                    Name
                  </label>
                  <Input type="text" placeholder="Male" />
                </div>
              </div>

              <button className="hover:bg-primaryPurple border-primaryPurple text-primaryPurple mt-2 rounded-full border-2 py-2 px-8 text-center text-sm font-semibold transition-all hover:text-white">
                Add More
              </button>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  className="bg-primaryPurple shadow-primaryPurple-volume hover:bg-primaryPurple-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proparties_modal;
