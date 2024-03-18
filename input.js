const fs = require('node:fs');
const path = require('node:path');
const { faker, ar } = require('@faker-js/faker');
const content = [];
const arrayName  = 'users';

for (let i = 0; i < 50; i++) {
  const randomPayload = {
    id: faker.number.int({min:1, max: 50}),
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    amount: faker.finance.amount({ min: 10, max: 1000, dec: 2 }),
  };
  content.push(randomPayload);
}

fs.mkdir('input',(err) => {
  if(err){
    console.log('Erro ao criar o diretorio input', err);
    return;
  }else{
    console.log('Diretorio input criado');
  }
});

const jsonContent = JSON.stringify(content, null, 2);
const routeContent = { [arrayName]: JSON.parse(jsonContent) };
const payload = JSON.stringify(routeContent, null, 2);
const filePath = path.join(__dirname,'input','db.json')

fs.writeFile(filePath, payload, 'utf8', (err) => {
  if (err) {
    console.log('Erro ao criar o arquivo: ',err);
    return;
  }
  console.log('Criado o arquivo db.json com sucesso');
});
