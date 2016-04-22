<!-- $header_data = (Title, Left Button, Right Button, Left Target, Right Target) -->
<!-- $header_data = (Title, Left Target, Right Target, Left Type, Right Type, Filter) -->
<div data-role="header" data-position="fixed">
<?php if ($header_data[1]) { ?>
<?php 	switch ($header_data[3]){ ?>
<?php 		case 2: ?>
    <a data-transition="pop" data-direction="reverse" href="<?php echo $header_data[1] ?>" class="ui-btn-left ui-btn ui-mini ui-corner-all ui-alt-icon ui-btn-icon-left ui-icon-delete"></a>
<?php 		break; ?>
<?php 		case 1: ?>
<?php 		default: ?>
	<a data-transition="slide" data-direction="reverse" href="<?php echo $header_data[1] ?>" class="ui-btn-left ui-btn ui-mini ui-corner-all ui-alt-icon ui-btn-icon-left ui-icon-arrow-l"></a>
<?php 		break; ?>
<?php 	} ?>
<?php } ?>
    <h1><?php echo $header_data[0]; ?></h1>
    
<?php if ($header_data[2]) { ?>
<?php 	switch ($header_data[4]){ ?>
<?php 		case 2: ?>
    <a data-transition="pop" data-direction="reverse" href="<?php echo $header_data[2] ?>" class="ui-btn-right ui-btn ui-mini ui-alt-icon">SAVE</a>
<?php 		break; ?>
<?php 		case 1: ?>
<?php 		default: ?>
	<a data-transition="pop" href="<?php echo $header_data[2] ?>" class="ui-btn-right ui-btn ui-mini ui-alt-icon">EDIT</a>
<?php 		break; ?>
<?php 	} ?>
<?php } ?>
    
<?php if ($header_data[5]) { ?>
	<div class="ui-container">
	<form class="ui-filterable">
		<input id="filterBasic-input" data-type="search">
	</form>
	</div>
<?php } ?>

<?php if ($header_data[6]) { ?>
	<div class="ui-body">
    	<div class="ui-bar ui-bar-a" style="height:60px">
       		<div>31 Mar</div>
        	<div>Sea Eagles v Rabbitohs</div>
		</div>
	</div>
<?php } ?>

<?php if ($header_data[7]) { ?>
	<div class="ui-custom-header">
<?php include '_game-detail.php'; ?>
	</div>
<?php } ?>




</div>
<!-- /header -->