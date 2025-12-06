const textArea = document.getElementById("textArea");
const counter = document.getElementById("counter");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeToggle");
const statusEl = document.getElementById("status");

textArea.value = localStorage.getItem("savedText") || "";
counter.textContent = `${textArea.value.length} characters`;


textArea.addEventListener("input", () => {
  counter.textContent = `${textArea.value.length} characters`;
  localStorage.setItem("savedText", textArea.value);
});


function showStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.className = "";
  statusEl.classList.add(isError ? "status-error" : "status-success");

  setTimeout(() => {
    statusEl.textContent = "";
    statusEl.className = "";
  }, 2000);
}


copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(textArea.value);
    showStatus("Copied!");
    copyBtn.classList.add("copied");
    setTimeout(() => copyBtn.classList.remove("copied"), 400);
  } catch {
    showStatus("Copy failed.", true);
  }
});


pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    textArea.value = text;
    counter.textContent = `${text.length} characters`;
    showStatus("Pasted!");
  } catch {
    showStatus("Paste blocked by browser.", true);
  }
});


clearBtn.addEventListener("click", () => {
  textArea.value = "";
  counter.textContent = "0 characters";
  localStorage.removeItem("savedText");
  showStatus("Cleared!");
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    themeBtn.textContent = "🌙 Dark Mode";
  }
});
