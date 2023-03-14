const checkbox = document.querySelector("#mobile-nav-sticky>input[type='checkbox']");

/**
 * A function used to close the hamburger navigation 
 * once a link inside it has been clicked.
 * @returns {boolean}
 */
function closeMobileNav() {
    if (checkbox.checked == true) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
}