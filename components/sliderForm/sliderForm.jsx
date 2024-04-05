import React, { useEffect, useState, useRef, useCallback } from "react";
import DatePicker from "react-datepicker";

import { FileUploader } from "react-drag-drop-files";

const SliderForm = ({ styles, handlePreviewModal, stepsRef, numSteps, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const stepContainerRef = useRef(null);
  const stepFormContainerRef = useRef(null);

  const bulletsRef = useRef([]);

  const animateSlider = () => {
    if (stepContainerRef.current && stepFormContainerRef) {
      
      const stepWidth = stepFormContainerRef.current.offsetWidth ;

      stepContainerRef.current.style.transform = `translateX(${-stepWidth * currentSlide}px)`;
    }

    bulletsRef.current.forEach((bullet, index) => {
      if (bullet) {
        bullet.classList.toggle(styles["form__bullet--active"], index === currentSlide);
      }
    });
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (stepContainerRef.current && stepFormContainerRef) {
        
        const stepWidth = stepFormContainerRef.current.offsetWidth ;

        stepsRef.current.forEach((step) => {
          if (step) {
            step.style.width = `${stepWidth}px`;
          }
        });

        stepContainerRef.current.style.width = `${stepWidth * numSteps}px`;

        animateSlider();
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [currentSlide, numSteps]);

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
      <div className={`${styles.modal} dark:bg-jacarta-700 dark:border-jacarta-700 rounded-lg ring-accent/10 ring-2`}>
        <div className={styles.modal__form__container} ref={stepFormContainerRef}>
          <form className={styles.form}>
            <div className={styles.form__step__container} ref={stepContainerRef}>
              {/* Steps */}
              {children}
              {/*End Steps */}
            </div>
            <div className={styles.form__bullet__container}>
              {Array.from({ length: numSteps }).map((_, index) => (
                <div
                  key={index}
                  ref={(el) => (bulletsRef.current[index] = el)}
                  onClick={() => handleBulletClick(index)}
                  className={`${styles.form__bullet} ${index === currentSlide ? styles["form__bullet--active"] : ""}`}
                ></div>
              ))}
            </div>
            <div className={`${styles.form__nav} bg-accent rounded-lg`}>
              <button type="button" onClick={handlePrevClick} className={`${styles.form__nav__prev} ${currentSlide === 0 ? "disabled" : ""}`}>
                Back
              </button>
              {currentSlide === numSteps - 1 ? (
                <button type="button" className="bg-accent cursor-pointer rounded-full py-3 px-3 text-end font-semibold text-white transition-all" onClick={handlePreviewModal}>
                  Show preview
                </button>
              ) : (
                <button type="button" onClick={handleNextClick} className={`${styles.form__nav__next} ${currentSlide === numSteps - 1 ? "disabled" : ""}`}>
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
