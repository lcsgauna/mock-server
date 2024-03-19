const faker  = require('@faker-js/faker');
const mocker = require('mocker-data-generator').default
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname,'input','db.json')

let user = {
    id:{
        incrementalId: 0
    },
    nome: {
        faker: 'faker.person.firstName()'
    },
    creditCard : {
        faker: 'faker.finance.creditCardNumber()'
    },
    cvv: {
        faker: 'faker.finance.creditCardCVV()'
    }
}

mocker()
    .addGenerator('faker', faker)
    .schema('users', user,10)
    .build(function(error,data) {
        if(error){
            throw error
        }
        fs.writeFile(filePath, JSON.stringify(data,null,2), 'utf8', (err) => {
            if (err) {
              console.log('Erro ao criar o arquivo: ',err);
              return;
            }
            console.log('Criado o arquivo db.json com sucesso');
          });
    });

    
