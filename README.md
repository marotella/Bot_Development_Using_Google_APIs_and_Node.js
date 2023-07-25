# Bot_Development_Using_Google_APIs_and_Node.js
This project demonstrates the integration of Google Sheets and Google Drive APIs using Node.js to manage data in a spreadsheet and fetch files from specific folders in Google Drive. The code is organized into three files: `index.js`, `index2.js`, and `test.js`, each serving specific functionalities.

## Prerequisites
1. Node.js: Make sure you have Node.js installed on your machine.
2. Google APIs: Create a project in the Google Developer Console and enable the Google Sheets and Google Drive APIs. Obtain the necessary credentials (OAuth2 client ID) and store them securely.

## Installation:
1. Clone the repository using git clone https://github.com/Tang20031010/Bot_Development_Using_Google_APIs_and_Node.js.git.
2. Navigate to the project folder using cd Bot_Development_Using_Google_APIs_and_Node.js.
3. Install the required dependencies using npm install.

## Configuration:
In the `index.js` and `index2.js` files, replace your_client_id with your OAuth2 client ID obtained from the Google Developer Console. Also, replace the range with your desired range. 

## Usage
1. Execute the test.js script using:
```JavaScript 
node test.js
```
2. The script will fetch data from the specified Google Sheets spreadsheet and the links of files from the specified Google Drive folder and its subfolders.
3. Based on the fetched data, the script will randomly select file links for each category and update the Google Sheets spreadsheet with the selected links.

## Notes:
1. Make sure you have the necessary permissions to access the specified Google Sheets spreadsheet and Google Drive folder.
2. Avoid sharing your OAuth2 client ID publicly to ensure the security of your credentials.

## Contributions:
This project is open to contributions. Feel free to submit bug reports, feature requests, or pull requests via GitHub.