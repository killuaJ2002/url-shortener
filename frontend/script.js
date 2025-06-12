const inputBox = document.querySelector("#url-input");
const submitBtn = document.querySelector(".submitBtn");
const containerDiv = document.querySelector(".container");
const resultBox = document.querySelector("#resultBox");
const copyBtn = document.querySelector(".copyBtn");
const resultContainer = document.querySelector(".shortUrlContainer");

const copyUrl = () => {
  navigator.clipboard.writeText(resultBox.value);
  const copied = document.createElement("div");
  copied.textContent = "Copied successfully";
  resultContainer.appendChild(copied);
};

submitBtn.addEventListener("click", async () => {
  const url = inputBox.value;
  try {
    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url }),
    });
    const data = await response.json();
    const newUrl = data.shortUrl;
    resultContainer.style.display = "block";
    resultBox.value = newUrl;
  } catch (error) {
    console.log(error.message);
    const wrongUrl = document.createElement("div");
    wrongUrl.textContent = "Not a valid url";
    containerDiv.appendChild(wrongUrl);
  }
});

copyBtn.addEventListener("click", copyUrl);
