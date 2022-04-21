# Trabalho Prático da disciplina de Redes de Computadores 2

## Enunciado do trabalho:
    - Você tem 3 servidores de temperatura em lugares extremos do mundo: ou normalmente muito frios ou normalmente muito quentes. Cada um destes servidores recebem uma resposta e simplemente mandam uma resposta com um número inteiro que mais se aproxima da temperatura medida.
  
    - Um cliente não acessa os servidores individualmente, e sim uma cache que mantém os últimos valores recebidos dos 3 servidores. Assim evitamos que o cliente tenha que fazer 3 acessos muito distantes, para fazer 1 acesso mais próximo.
   
    - A cache mantém uma tabela cache com os dados, com um prazo de validade para cada entrada de 30 segundos. Implemente o cliente. Implemente também a tabela cache da maneira eficiente que foi apresentada em sala de aula. Quando chega uma requisição e algum valor expirou, deve ser feita nova consulta ao servidor original.
  
    - Para os 3 servidores, a dupla pode tanto implementá-los como servidores do trabalho, utilizando número aleatórios dentro de uma faixa razoável para os valores de temperatura ou, alternativamente, obter as informações adequadamente na Web.
  
    - Devem ser apresentados logs para múltiplas execuções. Mostre com clareza situações em que uma requisição de usuário encontra/não encontra a cache com informações válidas.

## Professor:
    Prof Elias P. Duarte Jr.

## Alunos:
    Nome: Pedro Martins e Sá.
    GRR: GRR20186104.

    Nome: Pedro Henrique Souza Flores.
    GRR: GRR20186071.

## Arvore de diretórios:
    client: 
        - client.js arquivo onde está implementado o cliente

    cache: 
        - cache.js arquivo onde está implementada a cache do sistema.

    servers: 
        - server1.ts arquivo onde está implementado o servidor que retorna a temperatura da região do Atacama.
        - server2.ts arquivo onde está implementado o servidor que retorna a temperatura da região da Atartida.
        - server3.ts arquivo onde está implementado o servidor que retorna a temperatura da região do Saara.

## Como executar o trabalho:
```
    git clone https://github.com/pmartinsesa/trabalho-redes2.git
```

### Cliente:
    Da pasta raiz da aplicação use o comando:

        cd client
    
    Depois disso use:

        npm i

    para instalar as bibliotecas do cliente, e então:

        npm run client

### Cache:
     Da pasta raiz da aplicação use o comando:

        cd cache
    
    Depois disso use:

        npm i

    para instalar as bibliotecas da cache, e então:

        npm run cache

### Servidores:
     Da pasta raiz da aplicação use o comando:

        cd server
    
    Depois disso use:

        npm i

    para instalar as bibliotecas dos servidores, e então:

        npm run server1,
        npm run server2,
        npm run server3

    para executar os servidores, lembre-se de usar o comando run em terminais separados.