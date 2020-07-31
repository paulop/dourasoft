/*

Devemos ter no minimo 100 cadastros aleatórios
Devemos ter no mínimo 10 tags
Quase todos os cadastros devem ter tags e alguns mais do que uma tag
Devemos ter no mínimo 10 categorias
Devemos ter no mínio 1000 lançamentos entre contas a pagar e receber, liquidadas, abertas

Vou precisar de todos os scripts utilizados na criação do banco de dados.
Se souber sobre git pode usar
Se souber sobre migrations pode usar


cadastros
	- id - primary key
	- nome
	- documento (cpf, cnpj)
	- cep
	- estado
	- cidade
	- endereco

tags
	- id
	- titulo

cadastros_tags
	- cadastro_id
	- tag_id
	
categorias
	- id
	- titulo
	
lancamentos
	- id - primary key
	- tipo - (pagar, receber)	
	- status - aberto, liquidado
	- descricao
	- valor
	- valor_liquidado
	- vencimento
	- liquidacao
	- cadastro_id - pode ser nulo foreing key cadastros
	- categoria_id - pode ser nulo


- Relatórios
	- Lista de cadastros com tags
	- colunas 
		- nome, estado, cidade, tags (string com as tags)
	
	- Lista de receitas Liquidadas em um determinado período
	- colunas 
		- nome, documento, descricao, liquidacao, valor_liquidado
		- atenção trazer os valores mesmo se o cadastro_id estiver nulo
		
	Total de Receitas Liquidadas, por categoria Mensal
		Trazer um relatório Mês a Mês com o total de receitas por categoria


	- Lista de despesas em aberto
	- colunas 
		- nome, documento, descricao, vencimento, valor
		- atenção trazer os valores mesmo se o cadastro_id estiver nulo

	Total de Despesas Liquidadas, por categoria Mensal
		Trazer um relatório Mês a Mês com o total de despesas por categoria
		
*/
