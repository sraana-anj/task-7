const userContainer = document.getElementById("userContainer");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUserData() {
  try {
    userContainer.innerHTML = "<p>Loading data...</p>";
    errorMsg.textContent = "";

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Handle network or HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    errorMsg.textContent = "Failed to fetch data. Please check your internet connection.";
    userContainer.innerHTML = "";
    console.error("Error:", error);
  }
}

// Display user details
function displayUsers(users) {
  userContainer.innerHTML = "";
  users.forEach(user => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    userContainer.appendChild(userCard);
  });
}

// Reload data on button click
reloadBtn.addEventListener("click", fetchUserData);

// Fetch data when the page loads
fetchUserData();
