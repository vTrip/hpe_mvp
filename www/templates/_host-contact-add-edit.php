<div id="host-contact-add-edit" data-role="page">
<?php
    $header_data = ["Add/Edit Contact","#host-contact-view","#host-contact-view",1,2];
    include '_header.php';
?>
    <!-- /header -->
    <div role="main" class="ui-content">
        <div>
            <div class="ui-bar">Name</div>
            <div class="ui-body">
                <input type="text" value="David One">
            </div>
        </div>
        <div>
            <div class="ui-bar">Mobile</div>
            <div class="ui-body">
                <input type="text" value="0400 000 001">
            </div>
        </div>
        <div>
            <div class="ui-bar">Email</div>
            <div class="ui-body">
                <input type="text" value="davidone@guest.com">
            </div>
        </div>
    </div>
    <div data-role="popup" id="popupDialog" data-overlay-theme="a" data-theme="a" data-dismissible="false" style="max-width:400px;">
        <div role="main" class="ui-content">
            <h1>Contact not saved</h1>
            <h3 class="ui-title">Continue without saving?</h3>
            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">Cancel</a>
            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back" data-transition="flow">Yes</a>
        </div>
    </div>
    <!-- /content -->
</div>
<!-- /page -->