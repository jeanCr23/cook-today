const baseURL = "http://localhost:3001";

function navigate(page) {
  const content = document.getElementById("content");

  if (page === "find") {
    content.innerHTML = `
      <h2>Find Recipe</h2>
      <!-- Add your form here -->
    `;
  } else if (page === "create") {
    content.innerHTML = `
      <h2>Create Recipe</h2>
      <!-- Add your form here -->
    `;
  }
  // Add similar sections for other buttons
}

// Example: Fetch data
async function fetchData() {
  const res = await fetch(`${baseURL}/data`);
  const data = await res.json();
  console.log(data);
}
