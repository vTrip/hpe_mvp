<div id="host-game-ticket-list" data-role="page">
<?php
    $header_data = ["Manage Tickets (1/8)","#host-game-detail","#host-game-detail",2,2,0,1];
    include '_header.php';
?>
    <div role="main" class="ui-content">
        <div class="ui-grid-a">
            <div class="ui-block-a">
                <div>12345678901234</div>
                <!-- <form>
                        <input type="text" value="12345678901234">
                    <form> -->
            </div>
            <div class="ui-block-b"><a data-rel="popup" href="#popup-ticket-view">VIEW</a></div>
            <div class="ui-block-a">
                <div>12345678901234</div>
                <!-- <form>
                        <input type="text" value="12345678901234">
                    <form> -->
            </div>
            <div class="ui-block-b"><a data-rel="popup" href="#popup-ticket-view">VIEW</a></div>
            <div class="ui-block-a">
                <div>12345678901234</div>
                <!-- <form>
                        <input type="text" value="12345678901234">
                    <form> -->
            </div>
            <div class="ui-block-b"><a data-rel="popup" href="#popup-ticket-view">VIEW</a></div>
        </div>
    </div>
    <div data-role="popup" id="popup-ticket-view" data-overlay-theme="a" data-theme="a" data-dismissible="true" style="max-width:400px;">
        <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-deleteui-alt-icon ui-btn-icon-notext ui-btn-right">Close</a>
        <div role="main" class="ui-content">
            <div>Gary One
                <br>
                <br>
            </div>
            <div>Sea Eagles v Rabbitohs</div>
            <div>31 Mar, Thur
                <br>07:30PM
                <br>
                <br>
            </div>
            <div>||||||||||||||</div>
        </div>
    </div>
    <!-- /content -->
<?php
    $footer_data = ["#"];
    include '_footer.php';
?>
</div>
<!-- /page -->
