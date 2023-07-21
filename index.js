const { google } = require('googleapis');
const sheets = google.sheets('v4');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });
    const authToken = await auth.getClient();
    return authToken;
}


async function getSpreadSheet({spreadsheetId, auth}) {
    const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
    });
    return res;
}

async function getSpreadSheetValues({spreadsheetId, auth, sheetName}) {
    const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName
    });
    return res;
}


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

