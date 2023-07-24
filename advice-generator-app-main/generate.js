const adviceNumber = document.querySelector(".advice-id");
const generatedAdvice = document.querySelector(".generated-advice");
const diceGenerate = document.querySelector(".dice");

const fetchdata = async function () {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();
  adviceNumber.innerHTML = `#${data.slip.id}`;
  generatedAdvice.innerHTML = data.slip.advice;
};

diceGenerate.addEventListener("click", fetchdata);
