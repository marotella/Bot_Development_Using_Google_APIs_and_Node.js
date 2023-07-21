const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive'];


async function searchFile(folderId){
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });
    const drives = google.drive({version: 'v3', auth});
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