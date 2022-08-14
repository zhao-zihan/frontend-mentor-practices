"use strict";

// selecting elements
const ratingsEl = document.querySelectorAll(".rating-btn");

const submitEl = document.querySelector(".submit");

const modalEl = document.querySelector(".modal");

const displayScoreEl = document.querySelector(".display");

let currentRating = 0;

const removeRating = function () {
  for (let i = 0; i < ratingsEl.length; i++) {
    ratingsEl[i].classList.remove("selected-rating");
  }
};

const setCurrent = function () {
  // to ensure there is only one active current rating
  if (currentRating) {
    document
      .getElementById(`btn-${currentRating}`)
      .classList.remove("selected-rating");

    // enable users to click again to cancel selection
    // close the function without adding selected rating
    if (currentRating === +this.textContent) {
      currentRating = 0;
      return;
    }
  }

  // keep a record of the current rating that will be displayed on the next page
  currentRating = +this.textContent;
  document
    .getElementById(`btn-${currentRating}`)
    .classList.add("selected-rating");
};

const goToThanks = function () {
  if (currentRating) {
    // use hidden instead of .hidden
    modalEl.classList.remove("hidden");
    displayScoreEl.textContent = currentRating;
  }
};

for (let i = 0; i < ratingsEl.length; i++) {
  ratingsEl[i].addEventListener("click", setCurrent);
}

// to allow users to unselect current rating by clicking the background
window.addEventListener("mousedown", function (e) {
  // event.target returns a single event
  // use event.target.matches for class with multiple elements
  // https://gomakethings.com/listening-for-events-on-multiple-elements-using-javascript-event-delegation/
  const isClickedInside =
    e.target === submitEl || e.target.matches(".rating-btn");
  if (!isClickedInside) {
    removeRating();
    console.log("removed");
  }
});

// go to thank you page by clicking submit button
submitEl.addEventListener("click", goToThanks);
