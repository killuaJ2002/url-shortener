const inputBox = document.querySelector("#url-input");
const submitBtn = document.querySelector(".submitBtn");
const containerDiv = document.querySelector(".container");

submitBtn.addEventListener("click", async () => {
  const url = inputBox.value;
  try {
    const response = await fetch("https://localhost:8000/api", {
      method: POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url }),
    });
    const newUrl = response.shortUrl;
  } catch (error) {
    console.log(error.message);
    const wrongUrl = document.createElement("div");
    wrongUrl.textContent = "Not a valid url";
    containerDiv.appendChild(wrongUrl);
  }
});
