<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>BOOTSTRAP CRUD LAYOUT</title>
	<link rel="stylesheet" href="{{ asset('site/bootstrap.css') }}">
    <script src="{{ asset('site/jquery.js') }}"></script> 
    <script src="{{ asset('site/bootstrap.js') }}"></script> 
    <link rel="stylesheet" href="{{ asset('site/css/style.css') }}">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css">
	<link rel="stylesheet" href="resources/css/bootstrap.min.css">
</head>

<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Projeto</a>
			</div>
			
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<li>
						<a href="#">Vendas</a>
					</li>
					<li>
						<a href="#">Estoque</a>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
							Cadastros <span class="caret"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li>
								<a href="#">Clientes</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="#">Produtos</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="#">Pedidos</a>
							</li>
						</ul>
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
							Relatórios <span class="caret"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li>
								<a href="#">Vendas</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="#">Financeiro</a>
							</li>
						</ul>
					</li>
				</ul>

				<ul class="nav navbar-nav navbar-right">
					<li>
						<a href="#">Logado como: Fulano</a>
					</li>
					<li>
						<a href="#">Sair</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	
	<div class="container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title text-center">CLIENTES CADASTRADOS</h3>
			</div>
			
			<div class="panel-body">
				<a href="formulario.html" class="btn btn-primary">
					<span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Novo
				</a>
				
				<div class="table-responsive">
					<table class="table table-striped table-hover">
						<thead>
							<tr>
								<th>ID</th>
								<th>NOME</th>
								<th>EMAIL</th>
								<th>TELEFONE</th>
								<th>AÇÕES</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>1</td>
								<td>João</td>
								<td>jo@ao.com</td>
								<td>(99)9999-9999</td>
								<td>
									<a href="#" class="btn btn-info">
										<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar
									</a>
									<a href="#" class="btn btn-danger">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Excluir
									</a>
								</td>
							</tr>
							<tr>
								<td>2</td>
								<td>Maria</td>
								<td>ma@ria.com</td>
								<td>(99)9999-9999</td>
								<td>
									<a href="#" class="btn btn-info">
										<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar
									</a>
									<a href="#" class="btn btn-danger">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Excluir
									</a>
								</td>
							</tr>
							<tr>
								<td>3</td>
								<td>Pedro</td>
								<td>pe@dro.com</td>
								<td>(99)9999-9999</td>
								<td>
									<a href="#" class="btn btn-info">
										<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar
									</a>
									<a href="#" class="btn btn-danger">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Excluir
									</a>
								</td>
							</tr>
							<tr>
								<td>4</td>
								<td>Leandro</td>
								<td>le@andro.com</td>
								<td>(99)9999-9999</td>
								<td>
									<a href="#" class="btn btn-info">
										<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar
									</a>
									<a href="#" class="btn btn-danger">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Excluir
									</a>
								</td>
							</tr>
							<tr>
								<td>5</td>
								<td>Raquel</td>
								<td>ra@quel.com</td>
								<td>(99)9999-9999</td>
								<td>
									<a href="#" class="btn btn-info">
										<span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Editar
									</a>
									<a href="#" class="btn btn-danger">
										<span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Excluir
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			
				<nav class="text-center">
					<ul class="pagination">
						<li>
							<a href="#" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>
						<li><a href="#">1</a></li>
						<li><a href="#">2</a></li>
						<li><a href="#">3</a></li>
						<li><a href="#">4</a></li>
						<li><a href="#">5</a></li>
						<li>
							<a href="#" aria-label="Next">
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
	
	<script src="resources/js/jquery.min.js"></script>
	<script src="resources/js/bootstrap.min.js"></script>
</body>
</html>