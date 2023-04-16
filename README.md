# Installation

> `npm i ofuscate-graphql --save-dev`

# The purpose

* This package is to obfuscate graphql-tag in the production application code, not in the payload

# How use this package

* First Step: Add 'key' in file environment.
* Example:

```typescript
export const environment = {
    key: "your-key",
    ...
}
```


* Second step: Your file must end with the .query.ts extension

* Example:

> `your-file.query.ts`   OR   `your-file.mutation.ts`

* And your querys must be "const export":

```typescript
export const your_query = gql`
    query your_query {
    ...
    }
`
```


* Third step: Run the command before the final build of the project

* Example:

> `node node_modules/ofuscate-graphql/index.mjs`

* You can also add this command in the 'script' of 'package.json'

> `"build": "node node_modules/ofuscate-graphql/index.mjs && ng build"`

* After being encrypted by 'CryptoJS' you can decrypt it before making the request

* Example:

```typescript
import * as CriptoJS from 'crypto-js'
import { gql } from "graphql-tag"

removeCryptography(my_query: string) {
    const decrypted = CryptoJS.AES.decrypt(my_query, environment.key);
    const decryptedQuery = decrypted.toString(CryptoJS.enc.Utf8);
    return gql(decryptedQuery);
}

```



* ATTENTION step remember this command will rewrite your graphql-tag



### Additional Details
* Dependencies: CryptoJS(https://github.com/brix/crypto-js)

# Credits
These definitions were written by [Alexandre_Nunes](https://github.com/amnzera).

GitHub [Ofuscate-graphql](https://github.com/amnzera/ofuscate-graphql).
