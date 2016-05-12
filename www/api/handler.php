<?php
	// Author: James Millar james@millar.name

	$call = explode('/',$_SERVER["REQUEST_URI"]);
	
	while(in_array('api',$call))
	{
		array_shift($call);
	}
	
	$object = $call[0];										//var_dump("<pre>",$object,"</pre>");

	$id = ($call[1]!="")?explode(',',$call[1]):NULL;	    //var_dump("<pre>",$id,"</pre>");

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header('Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS');

    sleep (1.5);
    
    $model = load_resource($object);						//var_dump("<pre>",$model,"</pre>");

	if ($_SERVER['REQUEST_METHOD']=="GET")
	{
		header('Content-Type: application/json');

		if ($id)
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
		 
		 
		if ($object=='guest')
		{
			$data = json_decode(file_get_contents('php://input'),TRUE);
			$game_id = $data['game_id'];
			$contact_id = $data['contact_id'];
			
			$game = load_item('game',$game_id);
			$contact = load_item('contact',$contact_id);
			
			array_push($game['guests'], $id);
			save_item('game',$game_id,$game);
			
			$contact['status'] = NULL;
			$contact['contact_id'] = $id;
			$new = $contact;
		} 
		else
		{
			$new = json_decode(file_get_contents('php://input'),TRUE);
		}

		$new['id'] = $id;
		
		array_push($model, $new);
		
		file_put_contents($object.'.json', json_encode($model,JSON_PRETTY_PRINT));
		
		echo json_encode($new,JSON_PRETTY_PRINT);
		ob_flush();
		http_response_code(201);
	}
	else if ($_SERVER['REQUEST_METHOD']=="PUT")
	{
		$item = json_decode(file_get_contents('php://input'),TRUE);
		
		save_item($object,$id,$item);
		
		http_response_code(204);
	}
	else if ($_SERVER['REQUEST_METHOD']=="PATCH")
	{
		$item = json_decode(file_get_contents('php://input'),TRUE);

		update_item($object,$id,$item);

		ob_flush();
		http_response_code(204);
	}
	else if ($_SERVER['REQUEST_METHOD']=="DELETE")
	{
		$new_model = [];
		
		if ($id)
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
		http_response_code(404);
	}

	function load_resource($resource)
	{
		$model = json_decode(file_get_contents($resource.'.json'),TRUE);	
		return $model;
	}
	
	function load_item($resource,$id)
	{
		$model = json_decode(file_get_contents($resource.'.json'),TRUE);
		
		foreach ($model as $record) 
		{
			if ($id==$record['id'])
			{
				return $record;
			}
		}
	}
	
	function save_item($resource,$id, $new)
	{
		$model = load_resource($resource);
		
		foreach ($model as &$record) 
		{
			if ($record['id']==$id)
			{
				$record = $new;
			}
		} 
		
		file_put_contents($resource.'.json', json_encode($model,JSON_PRETTY_PRINT));	
	}
	
	function update_item($resource,$id,$new)
	{
		$model = load_resource($resource);

		foreach ($model as &$record) 
		{
			if (in_array($record['id'],$id))
			{
				foreach ($new as $key => $value) 
				{
					if (is_array($value))
					{
						$record[$key] = $value;
					}
					else
					{
						$record[$key] = $value;
					}
				}	
			}
		} 
							
		file_put_contents($resource.'.json', json_encode($model,JSON_PRETTY_PRINT));
	}
?>
