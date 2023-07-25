//Summary: Update and get information from the Google Sheet.

//Import modules from 'googleapis' library to access Google Sheets API
const { google } = require('googleapis');
const sheets = google.sheets('v4');

//Define the required scope for accessing Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Retrieves an authentication token to access Google Sheets API.
 * @returns {Promise<String>} - A Promise that resolves to a valid authentication token
 */
async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });
    const authToken = await auth.getClient();
    return authToken;
}

/**
 * Retrieves information about the Google Sheets.
 * @param {Object} params - An object containing the required parameters
 * @param {String} params.spreadsheetId - The ID of the target Google Sheets spreadsheets
 * @param {String} params.auth - The authentication token obtained from the 'getAuthToken()'
 * @returns {Promise<Object>} - A Promise that resolves to the response containing information about the spreadsheets
 */
async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
    });
    return res;
}

/**
 * Retrieves values from a column in the Google Sheets spreadsheet.
 * @param {Object} params - An object containing the required parameters
 * @param {String} params.spreadsheetId - The ID of the target Google Sheets spreadsheet
 * @param {string} params.auth - The authentication token obtained from `getAuthToken()`
 * @param {string} params.ran - The range of the sheet to retrieve values from
 * @returns {Promise<Object>} - A Promise that resolves to the response containing the sheet values
 */
async function getSpreadSheetValues({spreadsheetId, auth, ran}) {
    const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: ran
    });
    return res;
}

/**
 * Updates values in a specific range of a Google Sheets spreadsheet.
 * @param {string} spreadsheetId - The ID of the target Google Sheets spreadsheet
 * @param {string} range - The range of cells to be updated (e.g., 'Sheet1!A1:B2')
 * @param {Array<Array<any>>} elements - A 2D array containing the values to be updated in the spreadsheet
 * @returns {Promise<Object>} - A Promise that resolves to the response containing update information
 */
async function updateSpreadSheetValues(spreadsheetId, range, elements){

    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });

    const sheets2 = google.sheets({version: 'v4', auth: auth});
    const res2 = await sheets2.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: { values: elements}
    });
    return res2;
}

module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSpreadSheetValues,
    updateSpreadSheetValues,
}

