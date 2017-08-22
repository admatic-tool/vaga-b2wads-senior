Desenvolvedor Sênior - b2wads
===

Desenvolvedor Senior para compor a equipe de desenvolvimento do b2wads


# Requisitos:

- nodejs
- sql
- mongodb
- rabbitmq (ou outro sistema de mensagens)
- métodos ágeis

### Diferencial
 - interesses por técnicas de recomendação 
 - datawarehouse

# Desafio

Sistemas distribuídos tem inúmeros desafios, um deles é a gestão de transações distribuidas entre diferentes serviços.

Dada uma api de incremento de cliques, e uma api de débito, sempre que um anúncio é clicado, a contagem de cliques daquele anúncio precisa ser incrementada, bem como realizar o débito da conta do cliente.

Exemplo de dados anúncio em json

```javascript
{
  "ad_id": "123456",
  "account_id": "654321",
  "cpc": 0.30
}
``` 
**obs.:** cpc significa, custo por clique



### Requisitos funcionais

- desenvolva 3 microsserviços(transação , estatística, debito).
- o serviço de estatística recebe dados do clique e incrementa sua contagem em um registro
- o serviço de débito recebe dados do clique e acrescenta ao débito da conta o seu valor de `cpc` (custo por clique) 
- o servico de transação, recebe  o dado do clique , cria uma transação que garante que tanto a estatística quanto débito
serão executados com sucesso
- quando uma transação falha, ela precisa ser retentada algumas vezes um tempo depois(pode ter um problema de rede momentâneo) retentando 

Sobre o serviço de transação:

- cada transação pode ter 4 estados: "pending", "in_process", "success" e "fail"
- é preciso poder consultar o estado da transação criada.
- é preciso poder saber o que aconteceu quando houver falhas. 

```cypher
(request) ---[event:clique]---> (transação) ----> (estatistica)
                                    |
                                     --------> (débito)
```


### Será avaliada:
 - a clareza do código
 - a escolha das tecnologias
 - a eficiência e eficácia dos testes

### Procedimento
 - o projeto deve ser colocado em algum repositório público
 - Em caso de dúvidas sobre o desafio entre em contato 
