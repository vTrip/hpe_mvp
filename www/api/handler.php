<?php
	// Author: James Millar james@millar.name

	$call = explode('/',$_SERVER["REQUEST_URI"]);
	// var_dump("<pre>",$call,"</pre>");
	
	$object = $call[2];
	
	$id = explode(',',$call[3]);
	// var_dump("<pre>",$id,"</pre>");
	
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');

    sleep (1.5);
    
    $model = json_decode(file_get_contents($object.'.json'),TRUE);	

	if ($_SERVER['REQUEST_METHOD']=="GET")
	{
		header('Content-Type: application/json');

		if (count($call)>=4)
		{
			if (count($id)>1)
			{
				$filtered = [];	
			}
			
			foreach ($id as $an_id) 
			{
				foreach ($model as $record) {
					if ($an_id==$record['id'])
					{
						if (count($id)>1)
						{
							array_push($filtered, $record);
						}
						else
						{
							$model = $record;
						}
					}
				}
			}
			
			if (count($id)>1)
			{
				$model = $filtered;
			}
		}
		
		echo json_encode($model,JSON_PRETTY_PRINT);
	}
	else if ($_SERVER['REQUEST_METHOD']=="POST")
	{	
		$id = -1;
		foreach ($model as $record) 
		{
			$id = max($id,$record['id']);
		} 
		$id++;
		 
		$new = json_decode(file_get_contents('php://input'),TRUE);
		
		$new['id'] = $id;
		array_push($model, $new);
		
		file_put_contents($object.'.json', json_encode($model,JSON_PRETTY_PRINT));
		
		http_response_code(201);
	}
	else if ($_SERVER['REQUEST_METHOD']=="PUT")
	{
		$new = json_decode(file_get_contents('php://input'),TRUE);
		
		$model[$id[0]] = $new;
		
		foreach ($model as &$record) 
		{
			if (in_array($record['id'],$id))
			{
				$record = $new;
			}
		} 
		
		file_put_contents($object.'.json', json_encode($model,JSON_PRETTY_PRINT));
		
		http_response_code(204);
	}
	else if ($_SERVER['REQUEST_METHOD']=="PATCH")
	{
		$new = json_decode(file_get_contents('php://input'),TRUE);
		
		foreach ($model as &$record) 
		{
			if (in_array($record['id'],$id))
			{
				foreach ($new as $key => $value) 
				{
					$record[$key] = $value;
				}	
			}
		} 
		
		file_put_contents($object.'.json', json_encode($model,JSON_PRETTY_PRINT));
		
		http_response_code(204);
	}
	else if ($_SERVER['REQUEST_METHOD']=="DELETE")
	{
		$new_model = [];
		
		if (count($call)>=4)
		{
			foreach ($model as $record) {
				if (!in_array($record['id'],$id))
				{
					array_push($new_model, $record);
				}
			} 
			
			file_put_contents($object.'.json', json_encode($new_model,JSON_PRETTY_PRINT));
		
			http_response_code(204);
		}
	}

?>