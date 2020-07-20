const input = document.querySelector("input.input");
const submitBtn = document.querySelector("button.button");
const resultBox = document.querySelector(".box");
const phrases = [
  "Why can't you look it up on Google?",
  "If had a dollar for every dumb word you search. I’ll be rich.",
  "How do you not know that word?",
  "Stop typing gibberish!!",
];

function randomize(range) {
  return Math.floor((Math.random() * 100) % range);
}

document.querySelector("form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  if (!input.value) {
    resultBox.classList.add("is-hidden");
    return;
  }
  submitBtn.classList.add("is-loading");
  try {
    const data = await (
      await fetch(`https://api.urbandictionary.com/v0/define?term=${input.value}`)
    ).json();
    // resultBox.innerText = data.list[randomize(data.list.length)].definition;
    resultBox.classList.remove("is-hidden");
    resultBox.innerText = data.list[0].definition;
    submitBtn.classList.remove("is-loading");
  } catch (err) {
    console.error(err);
    resultBox.innerText = phrases[randomize(phrases.length)];
    submitBtn.classList.remove("is-loading");
  }
  input.blur();
});
