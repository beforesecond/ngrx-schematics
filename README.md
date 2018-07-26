# Getting Started With Schematics
Are you boring when create action, state, reducer and selector for ngrx every time in every project? Let's do it automagically with *ngrx-schematics*

This generated code following by [NgRx — Best Practices for Enterprise Angular Applications](https://itnext.io/ngrx-best-practices-for-enterprise-angular-applications-6f00bcdf36d7) 

## Installation
```
npm i ngrx-schematics@latest --save
```

## Usage
Generate the root store schematic (`root-store` is recommended)
```
ng g ngrx-schematics:root <store_name>
```

Example
```
BeforeSecond:<project_directory> BeforeSecond$ ng g ngrx-schematics:root root-store
```

Result
```
<project_directory>/src/app/<store_name>/root-store-logger.ts
<project_directory>/src/app/<store_name>/root-store-selector.ts
<project_directory>/src/app/<store_name>/root-store-state.ts
<project_directory>/src/app/<store_name>/root-store.module.ts
<project_directory>/src/app/index.ts
```

Generate feature in root store
```
ng g ngrx-schematics:store root-store/feature-store
```


### Required Dependencies
```
@ngrx/effects
@ngrx/entity
@ngrx/store
@ngrx/store-devtools
ngrx-store-logger
```

Install them, with npm
```
npm i @ngrx/effects @ngrx/entity @ngrx/store @ngrx/store-devtools ngrx-store-logger --save
```

or yarn
```
yarn add @ngrx/effects @ngrx/entity @ngrx/store @ngrx/store-devtools ngrx-store-logger
```


## License
The MIT License (MIT)

Copyright (c) 2018 BeforeSecond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.