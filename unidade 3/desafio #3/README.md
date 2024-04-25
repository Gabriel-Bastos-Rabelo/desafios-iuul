## Baixando o projeto
```sh
git clone 

cd desafio #3
npm install
```

## Iniciando o ambiente docker - Desenvolvimento
```sh
sudo docker build -t my-postgres .
sudo docker run -d -p 5432:5432 --name my-postgres-container my-postgres
```

### Acessar container postgres
```sh
sudo docker exec -it my-postgres-container psql -U postgres
```
