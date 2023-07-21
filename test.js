const { google } = require('googleapis');
const {
    getAuthToken,
    getSpreadSheetValues,
    updateSpreadSheetValues,
} = require('./index.js');

const {
    searchFile
} = require('./index2.js')

    const spreadsheetId = '1U6NMJvXl6LW3WGllW-juoFzRbmBZ4G_X6JvZBR3MXE4';
    const sheetName = 'Sheet1!D2:D6';
    var testData = '';
    var categoryArray = [];

    const folderId = '1XG94SB-OSfGbUuyEnbkUvfsw9mWBfgXG';
    var subFoldersId = [];



async function testGetSpreadSheetValues() {
    try {
        const auth = await getAuthToken();
        const response = await getSpreadSheetValues({
        spreadsheetId,
        sheetName,
        auth
    })
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

const map = new Map();
var imageLink = [];

async function testGetFolders(){
    try{
        const res = await searchFile(folderId);
        const subSumFoldersId = res.data.files;
        console.log(subSumFoldersId);
        var foldersName = [];
        for (var k = 0; k < subSumFoldersId.length; k++){
            subFoldersId.push(res.data.files[k].id);
            foldersName.push(res.data.files[k].name);
        }
        for(let i = 0; i < subFoldersId.length; i++){
            const subFolderRes = await searchFile(subFoldersId[i]);
            const tempLinksArray = subFolderRes.data.files;
            var tempArr = [];
            for (let j = 0; j < tempLinksArray.length; j++){
                const tempLink = tempLinksArray[j].webViewLink;
                tempArr.push(tempLink);
            }
            map.set(foldersName[i], tempArr);
        }
        console.log(map);

        const range = 'Sheet1!AT2:AT6';
        var element = '';
        for (var i = 0; i < categoryArray.length; i++){
            if (categoryArray[i] == 'Art'){
                const tempA = map.get('Art');
                element = tempA[(Math.floor(Math.random() * tempA.length))];
            }else{
                const tempA = map.get('Crypto');
                element = tempA[(Math.floor(Math.random() * tempA.length))];
            }
            const tempVal = [];
            tempVal.push(element);
            imageLink.push(tempVal);
        }
        
        console.log(imageLink);
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