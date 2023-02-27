# Installation
> `npm i ofuscate-graphql --save-dev`

# How use this package

* First Step: Add 'keyOfuscate' in file environment.
* Example:

> `export const environment = {
key: "118ed793f750d7b8212874e99f8495f3"
};
`


* Second step: Your file must end with the .query.ts extension

* Example:

> `your-file.query.ts`

* And your querys must be "const export":


> `export const Your_Query = gql`
query YourQuery {\
data {  \
subData\
}\
}
`;`

* Third step: Run the command before the final build of the project

* Example:

> `node node_modules/ofuscate-graphql/index.mjs`

* You can also add this command in the 'script' of 'package.json'

> `"build": "node node_modules/ofuscate-graphql/index.mjs && ng build"`

* After being encrypted by 'CryptoJS' you can decrypt it before making the request

* Example:

> `import * as CriptoJS from 'crypto-js`

> `import { gql } from "graphql-tag";`

> `const decrypted = CryptoJS.AES.decrypt(My_query, environment.keyOfuscate);`

> `const decrypted = CryptoJS.AES.decrypt(My_query, environment.keyOfuscate);`

> `const originalQuery = decrypted.toString(CryptoJS.enc.Utf8);`

> `return gql(decryptedQuery);`




* ATTENTION step remember this command will rewrite your graphql-tag



### Additional Details
 * Dependencies: CryptoJS(https://github.com/brix/crypto-js)

# Credits
These definitions were written by [Alexandre_Nunes](https://github.com/amnzera).
