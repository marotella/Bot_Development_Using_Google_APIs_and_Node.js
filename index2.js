// Summary: Get information from the Google folder.

//Import modules from 'googleapis' library to access Google Drive API.
const { google } = require('googleapis');

//Define the required scope for accessing Google Sheets API.
const SCOPES = ['https://www.googleapis.com/auth/drive'];


/**
 * Searches for files within a specific folder in Google Drive.
 * @param {string} folderId - The ID of the target folder in Google Drive.
 * @returns {Promise<Object>} - A Promise that resolves to the response containing the list of files found in the folder.
 **/
async function searchFile(folderId){

    // Create an authentication instance with the specified scopes
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });

    // Create a Google Drive API instance
    const drives = google.drive({version: 'v3', auth});

     // Perform a files.list request to search for files within the specified folder
    const res = await drives.files.list({
        q: `'${folderId}' in parents`,
        fields: 'nextPageToken, files(id, name, webViewLink)',
        spaces: 'drive',
    })
    return res;
}

module.exports = {
    searchFile
}