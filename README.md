
# Authentication System in Nest Js 

Authentication System Using JWT access tokena and refresh token



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Create User

```http
  POST /api/v1/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**. 
|`lastname` | `string` | **Required**.
|`email`    | `string` | **Required**.
|`password` | `string` | **Required**.

#### Login User

```http
  POST /api/v1/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.|
|`password`| `string` | **Required**.



