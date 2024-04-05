const activeMobileMenu = () => {
    const header = document.getElementsByClassName("js-page-header")[0];
    const body = document.body;
    const mobileMenu = document.getElementsByClassName("js-mobile-menu")[0];
    const mobileMenuActiveButton =
      document.getElementsByClassName("js-mobile-toggle")[0];
    if (header && mobileMenu) {
      const toggleFunction = () => {
        body.classList.add("nav-open-noscroll");
        header.classList.add("h-full");
        mobileMenu.classList.add("nav-menu--is-open");
      };
      mobileMenuActiveButton.addEventListener("click", () => {
        toggleFunction();
      });
    }
  };
  
  const inActiveMobileMenu = () => {
    const header = document.getElementsByClassName("js-page-header")[0];
    const body = document.body;
    const mobileMenu = document.getElementsByClassName("js-mobile-menu")[0];
  
    const mobileMenuInActiveButton =
      document.getElementsByClassName("js-mobile-close")[0];
    if (header && mobileMenu) {
      const toggleFunction = () => {
        body.classList.remove("nav-open-noscroll");
        header.classList.remove("h-full");
        mobileMenu.classList.remove("nav-menu--is-open");
      };
      mobileMenuInActiveButton.addEventListener("click", () => {
        toggleFunction();
      });
    }
  };
  export const removeMenuActive = () => {
    const header = document.getElementsByClassName("js-page-header")[0];
    const body = document.body;
    const mobileMenu = document.getElementsByClassName("js-mobile-menu")[0];
    if (true) {
      body.classList.remove("nav-open-noscroll");
      header?.classList.remove("h-full");
      mobileMenu?.classList.remove("nav-menu--is-open");
    }
  };
  export const addMobileMenuToggle = () => {
    removeMenuActive();
    activeMobileMenu();
    inActiveMobileMenu();
  };
  
  