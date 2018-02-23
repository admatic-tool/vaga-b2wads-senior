Desafio de Desenvolvimento B2WAdds

===

# Desafio

Sistemas distribuídos têm inúmeros desafios, um deles é a gestão de transações distribuídas entre diferentes serviços.

Dada uma API que receba **COMPRA DE INGRESSOS** no seguinte formato:
```javascript
{
  "data_compra" : "2020-01-01",
  "account_id": "111111",
  "id_ingresso": "650540646064560",
  "id_show": "654321",
  "valor": 654.32
}
```

Ao receber uma **COMPRA DE INGRESSOS**, precisamos gravar na API_FOO o **INGRESSO** que foi comprado por show e na API_FIGHTERS o **VALOR** do ingresso comprado por show.

**INGRESSO POR SHOW**:
```javascript
{
  "id_ingresso": "650540646064560",
  "id_show": "654321"
}
```

**VALOR POR SHOW**:
```javascript
{
  "id_show": "654321",
  "valor": 654.32
}
```

A gravação desses dados deve ser feita de forma que não se crie inconsistências, por isso a necessidade de uma transação.

### Requisitos funcionais

- Desenvolva 3 microsserviços (Transação, API_FOO, API_FIGHTERS);
- O serviço de transação recebe dados da **COMPRA DE INGRESSOS** e cria uma nova transação;
- As transações têm 2 passos: gravar **INGRESSO POR SHOW** na API_FOO e **VALOR POR SHOW** na API_FIGHTERS;
- A execução dos passos das transações não precisa ser feita em nenhuma ordem específica;
- Quando algum passo da transação falha, este passo precisa ser retentado algumas vezes um tempo depois (pode ter um problema de rede momentâneo, por exemplo)

#### Sobre o serviço de Transação:
- É preciso poder consultar o estado e os dados da transação criada.
- Cada transação pode ter 4 estados: `pending`, `in_process`, `success` ou `fail`;
- Deve fazer com que as requisições à API_FOO e API_FIGHTERS sejam executadas com sucesso;
- É preciso poder saber o que aconteceu quando houver falhas.

#### Sobre o serviço API_FOO:
- O serviço API_FOO recebe dados da **COMPRA DE INGRESSOS** para armazenar os **INGRESSOS POR SHOW**;
- É preciso poder consultar a quantidade de ingressos por show;
- Dado uma consulta com `id_ingresso` e um `id_show`, é preciso saber se é uma combinação válida

#### Sobre o serviço API_FIGHTERS:
- O serviço API_FIGHTERS recebe dados da **COMPRA DE INGRESSOS** para armazenar os **VALORES POR SHOW**;
- É preciso poder consultar o valor total por show;
- É preciso poder consultar o tícket médio por show (soma dos valores / total de valores)

```cypher
(request) ---[COMPRA DE INGRESSOS]---> (Transação) -----> (API_FOO)
                                                   \
                                                    `---> (API_FIGHTERS)
```

### Exemplos:
Colocamos exemplos de endpoints da API_FOO e da API_FIGHTERS na pasta `endpoints-examples`

### Será avaliada:
- A clareza do código
- A escolha das tecnologias
- A eficiência e eficácia dos testes

### Procedimento:
- O projeto deve ser colocado em algum repositório público
- Em caso de dúvidas sobre o desafio, entre em contato 

### Tecnologias que usamos:
- Node.js ou Java
- MySQL ou MongoDB
- RabbitMQ