<?php
	// echo 'Path: '.$_SERVER["REQUEST_URI"]."<br>";	
	// echo 'Type: '.$_SERVER['REQUEST_METHOD']."<br>";
	
	$call = explode('/',$_SERVER["REQUEST_URI"]);
	$object = $call[2];
	
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');

    sleep (1.5);	

	if ($_SERVER['REQUEST_METHOD']=="GET")
	{
		header('Content-Type: application/json');
		// header('Access-Control-Allow-Origin: *');
		
		$model = json_decode(file_get_contents($object.'.json'),TRUE);
		
		if (count($call)>=4)
		{
			$id = explode(',',$call[3]);
			
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
			
			// foreach ($model as $record) {
			// 	if (in_array($record['id'],$id))
			// 	{
			// 		if (count($id)>1)
			// 		{
			// 			array_push($filtered, $record);
			// 		}
			// 		else
			// 		{
			// 			$model = $record;
			// 		}
			// 	}
			// } 
			
			if (count($id)>1)
			{
				$model = $filtered;
			}
		}
		
		echo json_encode($model,JSON_PRETTY_PRINT);
	}
	else if ($_SERVER['REQUEST_METHOD']=="POST")
	{
		$model = json_decode(file_get_contents($object.'.json'),TRUE);
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
	else if ($_SERVER['REQUEST_METHOD']=="PATCH")
	{

		
		$model = json_decode(file_get_contents($object.'.json'),TRUE);
		
		$id = explode(',',$call[3]);
		
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
		
		// echo "Chicken";
	}
	else if ($_SERVER['REQUEST_METHOD']=="DELETE")
	{
		$model = json_decode(file_get_contents($object.'.json'),TRUE);
		
		$new_model = [];
		
		if (count($call)>=4)
		{
			$id = explode(',',$call[3]);
			
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