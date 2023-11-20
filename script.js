let fields = [null, null, null, null, null, null, null, null, null];

function init() {
  render();
}

// Funktion zum Rendern der Tabelle
function render() {
  const currentPlayer =
    fields.filter((field) => field).length % 2 === 0 ? "circle" : "cross";

  // Zugriff auf das Hauptelement
  const content = document.getElementById("content");

  // Erstellen der Tabelle
  const table = document.createElement("table");

  // Loop für die Zeilen
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");

    // Loop für die Spalten
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("td");

      // Berechnen des Index im Felder-Array
      const index = i * 3 + j;

      // Ersetzen des Inhalts durch SVGs basierend auf dem Felder-Array
      if (fields[index] === "cross") {
        cell.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">' +
          '<line x1="2" y1="2" x2="22" y2="22" stroke="#FFC000" stroke-width="4" />' +
          '<line x1="2" y1="22" x2="22" y2="2" stroke="#FFC000" stroke-width="4" />' +
          "</svg>";
      } else if (fields[index] === "circle") {
        cell.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">' +
          '<circle cx="12" cy="12" r="10" fill="none" stroke="lightblue" stroke-width="4" />' +
          "</svg>";
      }

      // Hinzufügen des Klick-Eventhandlers
      cell.setAttribute("onclick", `onCellClick(${index})`);

      // Hinzufügen der Zelle zur Zeile
      row.appendChild(cell);
    }

    // Hinzufügen der Zeile zur Tabelle
    table.appendChild(row);
  }

  // Hinzufügen der Tabelle zum Hauptelement
  content.innerHTML = `
  <h1 id="winner" style="">
  <i id="player">${currentPlayer}</i>
  <span id="text"> is next!</span>
</h1>`;
  content.appendChild(table);
}

// Function triggered when a cell is clicked
function onCellClick(index) {
  // Check if the clicked cell is empty
  if (!fields[index]) {
    // Determine the current player based on the count of non-empty fields:
    // If the count of non-empty fields is even, assign 'circle'; otherwise, assign 'cross'.
    const currentPlayer =
      fields.filter((field) => field).length % 2 === 0 ? "circle" : "cross";

    // Set the current player's marker in the clicked cell
    fields[index] = currentPlayer;

    // Remove the onclick attribute to prevent further clicks on the cell
    const cell = document.querySelectorAll("td")[index];
    cell.removeAttribute("onclick");

    // Re-render the table to reflect the updated state
    render();
    checkWinner();
  }
}

function checkWinner() {
  const winningConditions = [
    // Horizontale Linien
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertikale Linien
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonale Linien
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      const cells = document.querySelectorAll("td");
      cells[a].classList.add("win-cell", fields[a]);

      cells[b].classList.add("win-cell", fields[a]);
      cells[c].classList.add("win-cell", fields[a]);

      // Spiel beenden und Gewinner anzeigen
      endGame(fields[a]);

      // Rückgabe des Gewinners
      return fields[a];
    }
  }

  const isBoardFilled = fields.every((field) => field !== null);

  if (isBoardFilled) {
    endGame("draw");
    return "draw";
  }

  return null; // Kein Gewinner gefunden
}

function endGame(winner) {
  // Keine weiteren Eingaben erlauben
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.removeAttribute("onclick");
  });

  // Anzeige des Gewinners über dem Spielfeld
  const winnerPlayer = document.getElementById("player");
  const winnerText = document.getElementById("text");

  const winnerElement = document.getElementById("winner");
  winnerElement.style.display = "block";

  if (winner === "draw") {
    winnerText.textContent = "It's a draw!";
  } else {
    winnerPlayer.classList.add(winner);
    winnerPlayer.textContent = `${winner === "cross" ? "Cross" : "Circle"}`;
    winnerText.textContent = `wins!`;
  }

  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "block";
  restartButton.addEventListener("click", restartGame);
}

function restartGame() {
  // Logik für das Neustarten des Spiels
  // Hier setzt du das Spielfeld zurück und blende den Gewinner-Text aus

  const winnerElement = document.getElementById("winner");
  winnerElement.style.display = "none";

  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "none";

  // Logik, um das Spiel zurückzusetzen
  // Setze das Feld auf den Anfangszustand zurück
  fields = [null, null, null, null, null, null, null, null, null];

  // ... Aufruf der Funktion, um das Spielfeld neu zu rendern oder initialisieren
  render();
}
