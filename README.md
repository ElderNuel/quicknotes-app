# QuickNotes

QuickNotes is a responsive, client-side web application that lets users quickly capture, categorize, and organize their daily thoughts, tasks, and ideas in an intuitive, accessible layout without complicated setups.

## Features
* **Note Creation:** Easily add text notes up to 200 characters.
* **Categorization:** Classify your entries into Personal, Work, or Study buckets, each dynamically applying color-coded styling.
* **Live Search:** Filter your notes in real-time.
* **Validation:** Prevents the addition of empty or excessively long notes.
* **Data Persistence:** Your notes and preferences survive browser refreshes automatically using `localStorage`.
* **Deletion Support:** Individually delete notes or confidently clear all at once using the confirmation-prompted "Clear all" button.

## How to Run Locally
1. Clone this repository or extract the project folder locally.
2. Open the `quicknotes-app` folder on your machine.
3. Open `index.html` in any modern web browser (e.g., Google Chrome or Firefox), or utilize the VS Code Live Server extension. 

## What I Learned
* **Flexible UI Layouts:** How to adapt form controls using Flexbox and responsive `@media` query conditions to transition gracefully to mobile views.
* **Data Sanitization and Security:** How to defensively add data to the DOM via `document.createElement` and `textContent` to securely prevent Cross-Site Scripting (XSS) risks instead of using `innerHTML`.
* **Browser Persistence:** The fundamentals of converting array and object structures via `JSON.stringify` and `JSON.parse` to persist web-app state through `localStorage`.