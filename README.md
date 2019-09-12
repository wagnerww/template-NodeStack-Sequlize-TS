`...::: Projeto criado por ®WW(Wagner Ricardo Wagner) | wagnerricardonet@gmail.com :::..`

## Template Node.js Stack TS + SEQUELIZE ![alt text](https://www.prchecker.info/free-icons/64x64/rocket_64_px.png)

Este template é "casca" inicial de uma aplicação, visado a produtividade. O projeto é feito em typescript. Nele contém o cadastro de usuários, usuarios X endereços, filas de agendamentos, upload cloud-storage, scheduler, migrations, etc. A stack dele é composta pelo Express, sequelize, multer, redis....

Siga os passos abaixo para entender e configurar o seu ambiente pq a coisa fico fodax ;)

#### Comece por aqui:

- Execute o`yarn` para instalar as dependências;

- instale de forma global o sequelize `yarn global add sequelize` ou `npm i -g sequelize`;

- instale de forma global o typecript `yarn global add typescript` ou `npm i -g typescript`;

- crie um arquivo `.env` na raíz do projeto e copie o conteúdo do `.env.example`.

- Configure as varáveis de ambiente;

#### Transpilando o TS:

- Na pasta raíz execute o comando `tsc`. A pasta de saída será `dist`;

#### Criando a base:

Crie sua base de dados no banco pg;

- Com o seu terminal vá até o diretório raíz do projeto e execute `sequelize db:migrate`;

- Após rodar as migrations, rodar os seeds: `sequelize db:seed`;

#### Start:

- Para roda a api em ambiente de desenvolvimento execute `yarn dev`:

- Para executar os envios de emails `yarn emails`;

[Acesse aqui a sua api](http://localhost:3001`)
