<div id="host-game-guest-add" data-role="page">
    <div data-role="header" data-position="fixed">

        <a data-rel="back" href="#host-menu" class="ui-btn-left ui-btn ui-corner-all ui-alt-icon ui-btn-icon-right ui-icon-arrow-l">Back</a>
        <h1>Add Guest</h1>
        <form class="ui-filterable">
            <input id="filterBasic-input" data-type="search" placeholder="Search Existing Contacts">
        </form>
    </div>
    <!-- /header -->
    <div role="main" class="ui-content">
        <ul data-role="listview" data-filter="true" data-filter-reveal="true" data-input="#filterBasic-input" data-filter-placeholder="Search Existing Contacts">
            <li>
                <a href="" data-rel="back">
                    <div class="ui-bar">Gary One</div>
                    <div class="ui-body">garyone@guest.com</div>
                </a>
            </li>
            <li>
                <a href="" data-rel="back">
                    <div class="ui-bar">Gary Two</div>
                    <div class="ui-body">garytwo@guest.com</div>
                </a>
            </li>
            <li>
                <a href="" data-rel="back">
                    <div class="ui-bar">Gary Three</div>
                    <div class="ui-body">garythree@guest.com</div>
                </a>
            </li>
            <li>
                <a href="" data-rel="back">
                    <div class="ui-bar">Gary Four</div>
                    <div class="ui-body">garyfour@guest.com</div>
                </a>
            </li>
        </ul>
        <ul data-role="listview">
            <li>
                <a href="#host-contact-add-edit">
                    <div class="ui-bar">ADD CONTACT</div>
                </a>
            </li>
        </ul>
    </div>
    <!-- /content -->
    <div data-role="footer"></div>
    <!-- /footer -->
</div>
<!-- /page -->