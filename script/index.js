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
    .then((json) => displayLevelWord(json.data));
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary text-sm ">
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

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
    <div class="bg-white p-8 space-y-8 rounded-xl shadow-sm">
        <div class="space-y-3 text-center">
          <h3 class="text-2xl font-semibold">${word.word}</h3>
          <h5 class="text-sm font-medium">Meaning / Pronounciation</h5>
          <h3 class="text-bangla text-xl font-extrabold text-[#35353a]">
            “${word.meaning} / ${word.pronunciation}”
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
