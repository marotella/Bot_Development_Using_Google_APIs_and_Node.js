// Import the required modules and functions from other files
const { google } = require('googleapis');
const {
    getAuthToken,
    getSpreadSheetValues,
    updateSpreadSheetValues,
} = require('./index.js');

const {
    searchFile
} = require('./index2.js')

// Define spreadsheet and folder IDs, and initialize variables
const spreadsheetId = 'spreadsheetId';
const sheetName = 'Sheet1!D2:D6';
var testData = '';
var categoryArray = [];

const folderId = 'folderId';
var subFoldersId = [];


/**
 * Retrieves spreadsheet values from the specified sheet and stores them in categoryArray.
 * Also, converts the data to a JSON string and stores it in testData.
 * @async
 * @function testGetSpreadSheetValues
 * @returns {void}
 */
async function testGetSpreadSheetValues() {
    try {
        // Obtain authentication token
        const auth = await getAuthToken();
        // Get spreadsheet values from the specified sheet
        const response = await getSpreadSheetValues({
            spreadsheetId,
            sheetName,
            auth
        })
        // Extract the values from the response and populate categoryArray
        const temp = response.data.values;
        for (var i = 0; i < temp.length; i++){
            categoryArray.push(temp[i][0]);
        }
        console.log(categoryArray);
        testData = JSON.stringify(response.data.values, null, 2);
    } catch(error) {
        console.log(error.message, error.stack);
    }
}

// Create a map to store folder names as keys and arrays of subfolder links as values
const map = new Map();
var imageLink = [];

/**
 * Searches for files within the main folder and its subfolders in Google Drive.
 * Populates the map with folder names as keys and arrays of subfolder links as values.
 * Randomly selects an image link based on the categoryArray and updates the spreadsheet with the image links.
 * @async
 * @function testGetFolders
 * @returns {void}
 */
async function testGetFolders(){
    try{
        // Search for files within the main folder in Google Drive
        const res = await searchFile(folderId);
        const subSumFoldersId = res.data.files;
        console.log(subSumFoldersId);
        var foldersName = [];
        // Populate subFoldersId with the IDs and foldersName with the names of subfolders
        for (var k = 0; k < subSumFoldersId.length; k++){
            subFoldersId.push(res.data.files[k].id);
            foldersName.push(res.data.files[k].name);
        }
        // Iterate through subfolders and obtain links of files within each subfolder
        for(let i = 0; i < subFoldersId.length; i++){
            const subFolderRes = await searchFile(subFoldersId[i]);
            const tempLinksArray = subFolderRes.data.files;
            var tempArr = [];
            for (let j = 0; j < tempLinksArray.length; j++){
                const tempLink = tempLinksArray[j].webViewLink;
                tempArr.push(tempLink);
            }
            // Store the folder name as key and an array of links as value in the map
            map.set(foldersName[i], tempArr);
        }
        console.log(map);

        // Define the range in the spreadsheet to be updated
        const range = 'Sheet1!AT2:AT6';
        var element = '';
        // Iterate through the categoryArray to select an image link randomly based on the category
        for (var i = 0; i < categoryArray.length; i++){
            if (categoryArray[i] == 'Art'){
                const tempA = map.get('Art');
                element = tempA[(Math.floor(Math.random() * tempA.length))];
            }else{
                const tempA = map.get('Crypto');
                element = tempA[(Math.floor(Math.random() * tempA.length))];
            }
            // Prepare the image link to be updated in the spreadsheet
            const tempVal = [];
            tempVal.push(element);
            imageLink.push(tempVal);
        }
        
        console.log(imageLink);
        // Update the spreadsheet with the selected image links
        const res2 = await updateSpreadSheetValues(
            spreadsheetId, 
            range,
            imageLink
        );
        console.log(res2.data);
    } catch(err){
        console.log(err.message);
    }
}





function main() {
    testGetSpreadSheetValues();
    testGetFolders();
}

main()