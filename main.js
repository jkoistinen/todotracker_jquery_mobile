$(document).ready(function() {
    //adds new item to localstorage with percent complete equals 0
    $('#additem-submit').click(function() {
        newItem = $('#additem').val();
        if (newItem.length <= 0) {
            alert('Input field was empty, im not going to add that!')
            location.reload();
        } else {
            localStorage.setItem(newItem, 0)
                //clear the inputfield after button is pressed or enter is pressed...
            newItem = $('#additem').val('');
            location.reload();
            return false;
        }
    });

    //read items from html5 localstorage and populate the incompleted/completed list with these
    // also read percentage complete value and make sure slider value is set correctly
    // unique id is taken from array index (i)

    //total amount of items in your localstorage
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];

        if (value == 100) {
            //html_to_insert = '<div data-role="collapsible"><a href="index.html" data-role="button" data-icon="delete" data-iconpos="right" class="delete" name="' + i + '">Delete</a><h3>' + key + ' ' + value + '%</h3><form><label for="slider-' + i + '">% complete:</label><input name="slider-' + i + '" id="' + i + '" data-highlight="true" min="0" max="100" value="' + value + '" type="range" class="slider" /></form></div> ';
            html_to_insert = '<div data-role="collapsible"><a href="index.html" data-role="button" data-icon="delete" data-iconpos="right" class="delete" name="' + i + '">Delete</a><h3>' + key + ' ' + value + '%</h3><form><label for="slider-' + i + '">% complete:</label><input name="slider-' + i + '" id="' + i + '" data-highlight="true" min="0" max="100" value="' + value + '" type="range" class="slider" /></form></div> ';
            $("#completeset").append(html_to_insert).trigger('create').collapsibleset('refresh');
        } else {
            //html_to_insert = '<div data-role="collapsible"><h3>' + key + ' ' + value + '%</h3><form><label for="slider-' + i + '">% complete:</label><input name="slider-' + i + '" id="' + i + '" data-highlight="true" min="0" max="100" value="' + value + '" type="range" class="slider" /></form></div> ';
            html_to_insert = '<div data-role="collapsible"><input name="renameitem-' + i + '" id="renameitem-' + i + '" placeholder="Rename item..." value="" type="text" /><input type="submit" name="renameitem-' + i + '" id="submit-renameitem-' + i + '" value="Rename" /><h3>' + key + ' ' + value + '%</h3><form><label for="slider-' + i + '">% complete:</label><input name="slider-' + i + '" id="' + i + '" data-highlight="true" min="0" max="100" value="' + value + '" type="range" class="slider" /></form></div> ';
            $("#incompleteset").append(html_to_insert).trigger('create').collapsibleset('refresh');
        }
    }

    $(".slider").slider({
        stop: function(event, ui) {}
    });

    $(".slider").on("slidestop", function(event, ui) {
        var id = $(this).attr("id");
        var slider_value = $('#' + id).slider().val();
        var key = localStorage.key(id);
        var value = localStorage[key];
        localStorage[key] = slider_value;
        location.reload();
    });
    //delete from completed list with click of delete buttons
    //also remove from localstorage

    $(".delete").on("click", function() {
        var index = ($(this).attr("name"));
        localStorage.removeItem(localStorage.key(index));
        $(this).parent('div').parent('div').remove();
        location.reload();
    });

    //items that are added to the list should be renamable
    //also needs to update localstorage with the new key
    $("input[id^='submit-renameitem-']").on("click", function() {
        console.log('alive!');
        var name_identifier = ($(this).attr("name"));
        //fetch the new name
        var new_name = ($('#' + name_identifier).val());
        var identifier = name_identifier.substr(name_identifier.length - 1);
        var slidervalue = ($('#' + identifier).attr('value'));

        //this causes a change in 'index', do first remove then add
        console.log('IDENTIFIER:' + identifier);
        localStorage.removeItem(localStorage.key(identifier));

        console.log('NEWNAME:' + new_name);
        console.log('SLIDERVALUE:' + slidervalue);
        localStorage.setItem(new_name, slidervalue);
        location.reload();

    });

});
