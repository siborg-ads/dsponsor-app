const Step_2_Create = ({ stepsRef, styles, setName,name, description, setDescription, numSteps, currentSlide }) => {
  return (
    <>
      {currentSlide === 1 && (
        <div ref={(el) => (stepsRef.current[1] = el)} className={styles.form__step}>
          <div className="pr-6 pl-2 relative items-center flex flex-col gap-8">
            <div className="absolute top-0 right-0">
              {currentSlide + 1}/{numSteps}
            </div>
            <div className="flex flex-col w-full items-center border-b-1 border-primaryPurple shadow-2xl pb-2 ">
              <h3 className="mb-2 text-jacarta-100 bg-primaryPurple rounded-md px-4 py-2">
                Name & Description
              </h3>
              <p className="text-center pt-2   dark:text-white">
                Provide offer&apos;s name and a brief description.
              </p>
            </div>
            {/* <!-- Name --> */}
            <div className="w-full">
              <label
                htmlFor="item-name"
                className="font-display text-jacarta-900 mb-2 block dark:text-white text-center"
              >
                Title<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="dark:bg-secondaryBlack border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Provide a title for your offer."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {/* <!-- Description --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-900 mb-2 block dark:text-white text-center"
              >
                Description<span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-100 text-jacarta-100 text-2xs mb-3  text-center">
                The description should briefly introduce your media, specify the location of the ad
                space, and describe the type of content expected.
              </p>
              <textarea
                id="item-description"
                className="dark:bg-secondaryBlack border-jacarta-100 hover:ring-primaryPurple/10 focus:ring-primaryPurple dark:border-primaryPurple dark:placeholder:text-jacarta-100 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows="4"
                maxLength="250"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This is a description of the offer. characters limit : 250"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Step_2_Create;
