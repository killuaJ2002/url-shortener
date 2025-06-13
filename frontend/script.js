const inputBox = document.querySelector("#url-input");
const submitBtn = document.querySelector(".submitBtn");
const containerDiv = document.querySelector(".container");
const resultBox = document.querySelector("#resultBox");
const copyBtn = document.querySelector(".copyBtn");
const resultContainer = document.querySelector(".shortUrlContainer");

const copyUrl = () => {
  navigator.clipboard.writeText(resultBox.value);

  // Remove any existing success messages
  const existingMessages = resultContainer.querySelectorAll(".success-message");
  existingMessages.forEach((msg) => msg.remove());

  // Create new success message
  const copied = document.createElement("div");
  copied.textContent = "Copied successfully!";
  copied.className = "success-message";
  resultContainer.appendChild(copied);

  // Remove the message after animation completes
  setTimeout(() => {
    if (copied.parentNode) {
      copied.remove();
    }
  }, 3000);
};

submitBtn.addEventListener("click", async () => {
  const url = inputBox.value.trim();

  // Remove any existing error messages
  const existingErrors = containerDiv.querySelectorAll(".error-message");
  existingErrors.forEach((error) => error.remove());

  if (!url) {
    const emptyError = document.createElement("div");
    emptyError.textContent = "Please enter a URL";
    emptyError.className = "error-message";
    containerDiv.appendChild(emptyError);

    setTimeout(() => {
      if (emptyError.parentNode) {
        emptyError.remove();
      }
    }, 3000);
    return;
  }

  try {
    submitBtn.textContent = "Shortening...";
    submitBtn.disabled = true;

    const response = await fetch("http://localhost:8000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await response.json();
    const newUrl = data.shortUrl;

    resultContainer.classList.add("show");
    resultBox.value = newUrl;
  } catch (error) {
    console.log(error.message);
    const wrongUrl = document.createElement("div");
    wrongUrl.textContent = "Not a valid URL or server error";
    wrongUrl.className = "error-message";
    containerDiv.appendChild(wrongUrl);

    setTimeout(() => {
      if (wrongUrl.parentNode) {
        wrongUrl.remove();
      }
    }, 3000);
  } finally {
    submitBtn.textContent = "Shorten URL";
    submitBtn.disabled = false;
  }
});

// Allow Enter key to submit
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

copyBtn.addEventListener("click", copyUrl);
