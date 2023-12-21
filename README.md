# Projeto de Buscador - Desafio Backend

Este projeto é uma implementação de um buscador backend construído com Node.js e Express. O objetivo principal é fornecer uma API REST para buscar objetos em diversas tabelas de um sistema.

## Configuração do Projeto

 **Instalação de Dependências:**
   Certifique-se de ter o Node.js instalado em seu sistema. Execute o seguinte comando para instalar as dependências do projeto:
   ```bash
     npm install
   ```
  

## Execução do Projeto

Para iniciar o servidor, utilize o seguinte comando:

   ```bash
     npm run start
   ```
O servidor será iniciado em http://localhost:3000

## Estrutura do Projeto
src/: Contém o código-fonte do projeto.

controllers/: Controladores do projeto.

routes/: Rotas da API.

data/: Arquivos JSON simulando tabelas do sistema.

index.js: Ponto de entrada da aplicação.

  ## Uso da API
  A API oferece um serviço de consulta que aceita uma string de texto a ser buscada. Os resultados são normalizados antes de serem enviados ao cliente.

  Exemplo de Requisição:
  ```bash
     curl -X GET http://localhost:3000/buscar/Cortador
   ```
  Exemplo de Resposta:
  ```json
    {
      "resultados": [
        {
          "tipo": "Equipamento",
          "id": "CMRP1",
          "nome": "Cortador Tampo Mesa Retangular Pequeno"
        },
        {
          "tipo": "Equipamento",
          "id": "CMRG1",
          "nome": "Cortador Tampo Mesa Retangular Grande"
        },
        ...
      ]
    }
   ```
  
