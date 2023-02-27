import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';


const dirPathEnv = './src/environments';
const environmentTs = getEnvironment(dirPathEnv);
const secretKey = readEnvironment(environmentTs);

if(secretKey){
    const dirPath = './src/app/';
    const filesWithQueryTs = getFilesWithQueryTs(dirPath);
    filesWithQueryTs.forEach(filepath => {
        encryptQuery(filepath,secretKey);
    });
} else {
    console.log("-------------------------------- Please specify a 'key' in the environment file --------------------------------");
}


export function getEnvironment(dirPath) {
    const filesTS = []
    const fileList = fs.readdirSync(dirPath);
    fileList.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            getEnvironment(filePath, filesTS);
        } else if (filePath.endsWith('environment.ts')) {
            filesTS.push(filePath);
        }
    });

    return filesTS;
}

export function readEnvironment(filePathEnv){
    const fileContent = fs.readFileSync(filePathEnv[0], 'utf8');
    const matchResult = fileContent.match(/key: '(.*)'/) || fileContent.match(/key: "(.*)"/);
    return matchResult ? matchResult[1] : null;
}


export function encryptQuery(filePath,secretKey) {
    let constList = '';

    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = fileContent.replace(/import {gql} from "graphql-tag";\n/, '');

    const constants = [];

    const regex = /export const (\w+)\s*=\s*([^;]+);/g;

    let match;
    while (match = regex.exec(fileContent)) {
        const constantName = match[1];
        const constantValue = match[2].replace('gql', '').replace('`', '').replace('`', '');
        constants.push({
            nameConst: constantName,
            valueConst: constantValue
        });
    }

    constants.forEach(data => {
        const encryptedQuery = CryptoJS.AES.encrypt(data.valueConst, secretKey).toString();
        constList = constList + `export const ${data.nameConst} = \`${encryptedQuery}\`` + '\n';
    });
    fs.writeFileSync(filePath, constList);
    console.log('--------------------------------');
    console.log('Encrypt Complete path: ' + filePath);
    console.log('--------------------------------');
}

export function getFilesWithQueryTs(dirPath, files = []) {
    const fileList = fs.readdirSync(dirPath);

    fileList.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getFilesWithQueryTs(filePath, files);
        } else if (filePath.endsWith('.query.ts')) {
            files.push(filePath);
        }
    });

    return files;
}


