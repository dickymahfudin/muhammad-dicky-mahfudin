<h1 align="center">Hapijs, React</h1>

## Backend

```bash
# Clone this project
$ git clone https://github.com/dickymahfudin/muhammad-dicky-mahfudin.git .

# Access
$ cd backend

# Install dependencies
$ npm install
or
$ yarn install

# Copy .env-example .env
$ cp .env-example .env

#Edit file .env sesuai dengan database local dan port
```

> env file

![alt text](https://github.com/dickymahfudin/muhammad-dicky-mahfudin/blob/master/github/fileenv.jpg?raw=true)

> membuat migrasi database dan seed

```bash
npm run migrate-seed
or
yarn migrate-seed
```

> Membuat Bearer Token (Digunakan untuk akses Backend)

```bash
npm run token
or
yarn token
```

![alt text](https://github.com/dickymahfudin/muhammad-dicky-mahfudin/blob/master/github/generatetoken.jpg?raw=true)

> Menjalankan project

```bash
npm run dev
or
yarn dev
```

> Menjalankan Unit Testing (Configurasi database harus sesuai dengan lokal)

```bash
npm run test
or
yarn test
```

![alt text](https://github.com/dickymahfudin/muhammad-dicky-mahfudin/blob/master/github/unittesting.jpg?raw=true)

## Frontend

```bash
# Access
$ cd frontend

# Install dependencies
$ npm install --legacy-peer-deps
or
$ yarn install

# Copy .env-example .env
$ cp .env-example .env

#Edit file .env sesuai dengan url backend dan token yang tadi dibuat
```

> env file

![alt text](https://github.com/dickymahfudin/muhammad-dicky-mahfudin/blob/master/github/fileenvfe.jpg?raw=true)

> Menjalankan project

```bash
npm run start
or
yarn start
```

<a href="#top">Back to top</a>
