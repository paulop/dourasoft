<?php 
	function verificar_foreign($id,$tabela,$busca){
		$CI =& get_instance();
		 $query = $CI->db->query("select count(*) as quantidade from {$tabela} where {$busca}={$id}")->result();
		 return $query[0]->quantidade;
	}
	function formatdata($datatime){
		return (new DateTime($datatime))->format('d/m/Y');	
	}
 ?>