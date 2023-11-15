let fields = [
  "cross",
  "circle",
  "cross",
  null,
  "circle",
  null,
  null,
  "cross",
  null,
];

function init() {
  render();
}

// Function to render the table
function render() {
  // Access the main element
  const content = document.getElementById("content");

  // Create the table
  const table = document.createElement("table");

  // Loop for rows
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");

    // Loop for columns
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");

      // Calculate the index in the fields array
      const index = i * 3 + j;

      // Replace the content with SVGs based on the fields array
      if (fields[index] === "cross") {
        cell.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">' +
          '<line x1="2" y1="2" x2="22" y2="22" stroke="black" stroke-width="2" />' +
          '<line x1="2" y1="22" x2="22" y2="2" stroke="black" stroke-width="2" />' +
          "</svg>";
      } else if (fields[index] === "circle") {
        cell.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">' +
          '<circle cx="12" cy="12" r="10" fill="none" stroke="black" stroke-width="2" />' +
          "</svg>";
      }

      // Add a click event handler
      cell.addEventListener("click", () => onCellClick(index));

      // Add the cell to the row
      row.appendChild(cell);
    }

    // Add the row to the table
    table.appendChild(row);
  }

  // Add the table to the main element
  content.innerHTML = "";
  content.appendChild(table);
}

function onCellClick(index) {
  render();
}
