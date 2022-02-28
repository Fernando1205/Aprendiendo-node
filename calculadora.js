'user strict'

let args = process.argv.slice(2);

let n1 = parseFloat(args[0]);
let n2 = parseFloat(args[1]);

let plantilla = `
    La suma es: ${ n1+n2 }
    La resta es: ${ n1-n2 }
    La multiplicacion es: ${ n1*n2 }
    La divisiom es: ${ n1/n2 }
`;

console.log(plantilla);