# Passos para começar um projeto

1) Criar **package.json**: `npm init -y`
2) Criar **tsconfig.json**: `tsc --init`

```
{
  "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "sourceMap": true,
      "outDir": "./build",
      "rootDir": "./src",
      "removeComments": true,
      "noImplicitAny": true,
      "esModuleInterop": true
  }
}
```

 4) Criar pasta **src**
 5) Criar comando **npm start**: `"tsc && node ./build/index.js"`
 6) Criar **gitignore**: `touch .gitignore` e adicionar node_modules e build
 7) Instalar **express** e tipos do express: `npm i express` e `npm i @types/express -D`
 8) Instalar **cors** e tipos do cors: `npm i cors` e `npm i @types/cors -D`