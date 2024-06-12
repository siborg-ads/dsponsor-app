import React, { useEffect, useState, useRef, useCallback } from "react";

const SliderForm = ({
  styles,
  handlePreviewModal,
  stepsRef,
  numSteps,
  children,
  files,
  selectedIntegration
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const stepContainerRef = useRef(null);
  const stepFormContainerRef = useRef(null);

  const bulletsRef = useRef([]);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = touchStartX.current;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.touches[0].clientX;
    const moveX = touchCurrentX.current - touchStartX.current;
    const stepWidth = stepFormContainerRef.current.offsetWidth;
    stepContainerRef.current.style.transition = "none";
    stepContainerRef.current.style.transform = `translateX(${-stepWidth * currentSlide + moveX}px)`;
  };
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const moveX = touchCurrentX.current - touchStartX.current;
    const threshold = 50; // Seuil pour changer de slide
    if (Math.abs(moveX) > threshold) {
      if (moveX > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1); // Glisser vers la droite pour revenir au slide précédent
      } else if (moveX < 0 && currentSlide < numSteps - 1) {
        setCurrentSlide(currentSlide + 1); // Glisser vers la gauche pour aller au slide suivant
      }
    }
    // Réinitialiser la position avec une transition douce
    stepContainerRef.current.style.transition = "transform 0.3s ease";
    stepContainerRef.current.style.transform = `translateX(${-stepFormContainerRef.current.offsetWidth * currentSlide}px)`;
  };
  const adjustHeight = useCallback(() => {
    const stepHeight = stepsRef.current[currentSlide].offsetHeight;
    stepFormContainerRef.current.style.height = `${stepHeight}px `;
    stepContainerRef.current.style.height = `${stepHeight}px `;
  }, [currentSlide, stepsRef, stepFormContainerRef, stepContainerRef]);

  useEffect(() => {
    const animateSlider = () => {
      if (stepContainerRef.current && stepFormContainerRef) {
        const stepWidth = stepFormContainerRef.current.offsetWidth;
        stepContainerRef.current.style.transform = `translateX(${-stepWidth * currentSlide}px)`;
        adjustHeight();
        //      const topPosition = stepFormContainerRef.current.getBoundingClientRect().top + window.pageYOffset - 150;
        //      window.scrollTo({ top: topPosition, behavior: "smooth" });
      }

      bulletsRef.current.forEach((bullet, index) => {
        if (bullet) {
          bullet.classList.toggle(styles["form__bullet--active"], index === currentSlide);
        }
      });
    };

    stepFormContainerRef.current.style.height = `auto `;
    stepContainerRef.current.style.height = `auto `;
    const updateDimensions = () => {
      if (stepContainerRef.current && stepFormContainerRef) {
        const stepWidth = stepFormContainerRef.current.offsetWidth;

        stepsRef.current.forEach((step) => {
          if (step) {
            step.style.width = `${stepWidth}px`;
            step.style.height = "100%";
          }
        });

        stepContainerRef.current.style.width = `${stepWidth * numSteps}px`;
        adjustHeight();
        animateSlider();
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [
    currentSlide,
    numSteps,
    stepsRef,
    styles,
    files,
    selectedIntegration,
    handlePreviewModal,
    children,
    stepContainerRef,
    stepFormContainerRef,
    bulletsRef,
    adjustHeight
  ]);

  useEffect(() => {
    stepFormContainerRef.current.style.height = `auto `;
    stepContainerRef.current.style.height = `auto `;
    const updateDimensions = () => {
      if (stepContainerRef.current && stepFormContainerRef) {
        const stepWidth = stepFormContainerRef.current.offsetWidth;

        stepsRef.current.forEach((step) => {
          if (step) {
            step.style.width = `${stepWidth}px`;
            step.style.height = "100%";
          }
        });

        stepContainerRef.current.style.width = `${stepWidth * numSteps}px`;
        adjustHeight();
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [
    currentSlide,
    numSteps,
    stepsRef,
    styles,
    files,
    selectedIntegration,
    handlePreviewModal,
    children,
    stepContainerRef,
    stepFormContainerRef,
    bulletsRef,
    adjustHeight
  ]);

  const handleNextClick = () => {
    if (currentSlide < numSteps - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleBulletClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.modal__container}>
      <div
        className={`${styles.modal} dark:bg-secondaryBlack dark:border-jacarta-700 rounded-lg ring-primaryPurple/10 ring-2`}
      >
        <div
          className={styles.modal__form__container}
          ref={stepFormContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <form className={styles.form}>
            <div className={styles.form__step__container} ref={stepContainerRef}>
              {/* Steps */}
              {children}
              {/*End Steps */}
            </div>
            <div className={`${styles.form__bullet__container} sm:mt-4`}>
              {Array.from({ length: numSteps }).map((_, index) => (
                <div
                  key={index}
                  ref={(el) => (bulletsRef.current[index] = el)}
                  onClick={() => handleBulletClick(index)}
                  className={`${styles.form__bullet} ${index === currentSlide ? styles["form__bullet--active"] : ""}`}
                ></div>
              ))}
            </div>
            <div className={`${styles.form__nav} bg-primaryPurple rounded-lg`}>
              <button
                type="button"
                onClick={handlePrevClick}
                className={`${styles.form__nav__prev} ${currentSlide === 0 ? "disabled opacity-25" : ""}`}
              >
                Back
              </button>
              {currentSlide === numSteps - 1 ? (
                <button
                  type="button"
                  className="bg-primaryPurple cursor-pointer rounded-full py-3 px-3 text-end font-semibold text-white transition-all"
                  onClick={handlePreviewModal}
                >
                  Show preview
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextClick}
                  className={`${styles.form__nav__next} ${currentSlide === numSteps - 1 ? "disabled" : ""}`}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SliderForm;
