<div id="host-contact-list" data-role="page">
<?php
    $header_data = ["Contacts","#host-menu","",1,1,1];
    include '_header.php';
?>
    <div role="main" class="ui-content">
        <ul data-role="listview" data-filter="true" data-input="#filterBasic-input">
            <li>
                <a data-transition="slide" href="#host-contact-view">
                    <div class="ui-bar">Gary One</div>
                    <div class="ui-body">garyone@guest.com</div>
                </a>
            </li>
            <li>
                <a data-transition="slide" href="#host-contact-view">
                    <div class="ui-bar">Gary Two</div>
                    <div class="ui-body">garytwo@guest.com</div>
                </a>
            </li>
            <li>
                <a data-transition="slide" href="#host-contact-view">
                    <div class="ui-bar">Gary Three</div>
                    <div class="ui-body">garythree@guest.com</div>
                </a>
            </li>
            <li>
                <a data-transition="slide" href="#host-contact-view">
                    <div class="ui-bar">Gary Four</div>
                    <div class="ui-body">garyfour@guest.com</div>
                </a>
            </li>
        </ul>
    </div>
    <!-- /content -->
<?php
    $footer_data = ["#host-contact-add-edit"];
    include '_footer.php';
?>
</div>
<!-- /page -->