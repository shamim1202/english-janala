// Load Lessons API Call -------------------------------------
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

// Load Lessons Word API Call -------------------------------------
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const btnActiveLesson = document.getElementById(`lesson-btn-${id}`);
      btnActiveLesson.classList.add("active");
      displayLevelWord(json.data);
    });
};

// Remove Active Button ---------------------------------
const removeActive = () => {
  const btnLessons = document.querySelectorAll(".btn-lessons");
  btnLessons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// Display Every Lesson Via API Call -------------------------------------
const displayLessons = (lessons) => {
  // Get container and initially erase it ----------------
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // Get every lesson individually --------------------
  for (const lesson of lessons) {
    // Create a div element to show every data -------------------
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button 
      id="lesson-btn-${lesson.level_no}" 
      onclick="loadLevelWord(${lesson.level_no})" 
      class="btn btn-outline btn-primary text-sm btn-lessons">
        <i class="fa-solid fa-book-open"></i>
        Lesson - ${lesson.level_no}
    </button>`;
    // Append dynamic div with data into the container ------------
    levelContainer.append(btnDiv);
  }
};

// Display Lesson wise Word from API
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="p-6 text-center space-y-3 col-span-full">
        <img class="mx-auto" src="./assets/alert-error.png" alt="" srcset="">
        <p class="text-bangla text-xs text-[#79716B]">
          এই <span class="text-sm">Lesson</span> এ এখনো কোন <span class="text-sm">Vocabulary</span> যুক্ত করা হয়নি।    
        </p>
        <h3 class="text-bangla text-xl font-bold text-[#292524]">
          নেক্সট <span class="text-2xl font-semibold">Lesson </span>এ যান
        </h3>
      </div>
    `;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="bg-white p-8 space-y-8 rounded-xl shadow-sm">
      <div class="space-y-3 text-center">
        <h3 class="text-2xl font-semibold">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h3>
        <h5 class="text-sm font-medium">Meaning / Pronounciation</h5>
        <h3 class="text-bangla text-xl font-extrabold text-[#35353a]">
            “${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
      word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"
    }”
        </h3>
      </div>

      <div class="flex justify-between items-center">
        <button
            id="btn-info"
            class="p-3 bg-[#badeff42] rounded-md cursor-pointer"
        >
            <i class="fa-solid fa-circle-info"></i>
        </button>
        <button
            id="btn-hear"
            class="p-3 bg-[#badeff42] rounded-md cursor-pointer"
        >
            <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
      </div>
    `;
    wordContainer.append(wordCard);
  });
};

loadLessons();
