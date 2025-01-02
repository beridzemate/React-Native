const fileSystem  = {
    folder1 : {
        file1: 'content1',
        file2: 'content2',
        subFolder1: {
            file3: 'content3',
        },
        subFolder2: {
            file4: 'content4',
        },
        subFolder3: {

        }
    },
    folder2: {
        file5: 'content5',
        file6: 'content6',

    }
}


function extractFilePaths(directory, parentPath = "", result = []) {
    for (const key in directory){
        const currentPath = parentPath + "/" + key;
        if(typeof directory[key] === object && directory[key] !== null){
            extractFilePaths(directory[key], currentPath, result);
        } else {
            result.push(currentPath);
        }
    }
    return result;
}
delete newData.gender // delete the a item using operator
const filePath = extractFilePaths(fileSystem);
localStorage.setItem('fileSystem', JSON.stringify(filePath));

const savedFilesPath = JSON.parse(localStorage.getItem('fileSystem'));
console.log("Saved Files Path: ", savedFilesPath);

