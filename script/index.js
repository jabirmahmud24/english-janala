const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const removeActive = () => {
  const lessonsButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonsButtons);
  lessonsButtons.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      //   console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `<div>
              <h2 class="text-2xl font-bold bangla-font">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})
              </h2>
            </div>
            <div>
              <h2 class="font-bold">Meaning</h2>
              <p class="bangla-font">${word.meaning}</p>
            </div>
            <div>
              <h2 class="font-bold">Example</h2>
              <p>${word.sentence}</p>
            </div>
            <div>
              <h2 class="font-bold">Synonmaes</h2>
              <span class="btn">Syn 1</span>
              <span class="btn">Syn 1</span>
              <span class="btn">Syn 1</span>
            </div>`;
  document.getElementById("word_modal").showModal();
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="bangla-font text-center col-span-full">
    <img class="mx-auto" src="./assets/alert-error.png" alt="Error" />    
    <p class="text-xl font-medium text-gray-400 rounded-xl py-10">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>`;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `  <div
          class="bg-white rounded-lg shadow-sm text-center py-20 px-5 space-y-4"
        >
          <h2 class="font-bold text-2xl">${
            word.word ? word.word : "শব্দ পাওয়া যায়নি"
          }</h2>
          <p class="font-semibold">Meaning of Pronounciation</p>
          <div class="bangla-font text-2xl font-medium">${
            word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
          } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি"
    }</div>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${
              word.id
            })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
              <i class="fa-solid fa-volume-low"></i>
            </button>
          </div>
        </div>`;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = ` <button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                    <i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}
                  </button>`;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
