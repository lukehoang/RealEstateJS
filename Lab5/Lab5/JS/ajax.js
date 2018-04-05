
$(document).ready(function () {

    //Search Nav click
    $('#a_search').click(function () {
        localStorage.setItem("stage", "search");
        $("#display").html("");
        $('input[type="text"]').val('');
        $('input[type="radio"]').prop('checked', false);

        $('#btn_MLS').addClass('active');
        $('#btn_Price').removeClass('active');
        $('#btn_BedBath').removeClass('active');

        $('#btn_MLS').show();
        $('#btn_Price').show();
        $('#btn_BedBath').show();

        $('#a_search').addClass('active');
        $('#a_add').removeClass('active');
        $('#a_update').removeClass('active');

        $('.txtMLS').show();
        $('.txtAddress').hide();
        $('.txtBedroom').hide();
        $('.txtBathroom').hide();
        $('.txtPrice').hide();
        $('.txtSize').hide();
        $('.txtDescription').hide();
        $('.txtUrl').hide();
        $('.txtStatus').hide();

        $('.storeHouse').hide();
        $('.update').hide();
        $('.searchPrice').hide();
        $('.searchBB').hide();
        $('.searchMLS').show();

    });
    //Add nav click
    $('#a_add').click(function () {
        $("#display").html("");
        $('input[type="text"]').val('');
        $('input[type="radio"]').prop('checked', false);
        $('#a_search').removeClass('active');
        $('#a_add').addClass('active');
        $('#a_update').removeClass('active');

        $('#btn_MLS').hide();
        $('#btn_Price').hide();
        $('#btn_BedBath').hide();

        $('.txtMLS').show();
        $('.txtAddress').show();
        $('.txtBedroom').show();
        $('.txtBathroom').show();
        $('.txtPrice').show();
        $('.txtSize').show();
        $('.txtDescription').show();
        $('.txtUrl').show();
        $('.txtStatus').show();

        $('.storeHouse').show();
        $('.update').hide();
        $('.searchPrice').hide();
        $('.searchBB').hide();
        $('.searchMLS').hide();


    });
    //Update nav click
    $('#a_update').click(function () {
        localStorage.setItem("stage", "update");
        $("#display").html("");
        $('input[type="text"]').val('');
        $('input[type="radio"]').prop('checked', false);
        $('#a_search').removeClass('active');
        $('#a_add').removeClass('active');
        $('#a_update').addClass('active');

        $('#btn_MLS').hide();
        $('#btn_Price').hide();
        $('#btn_BedBath').hide();

        $('.txtMLS').show();
        $('.txtAddress').hide();
        $('.txtBedroom').hide();
        $('.txtBathroom').hide();
        $('.txtPrice').hide();
        $('.txtSize').hide();
        $('.txtDescription').hide();
        $('.txtUrl').hide();
        $('.txtStatus').show();

        $('.storeHouse').hide();
        $('.update').show();
        $('.searchPrice').hide();
        $('.searchBB').hide();
        $('.searchMLS').show();


    });

    //MLS number button click
    $('#btn_MLS').click(function () {
        location.reload();
    });

    //Price button click
    $('#btn_Price').click(function () {
        $("#display").html("");
        $('input[type="text"]').val('');
        $('input[type="radio"]').prop('checked', false);
        $('#btn_MLS').removeClass('active');
        $('#btn_Price').addClass('active');
        $('#btn_BedBath').removeClass('active');

        $('#btn_MLS').show();
        $('#btn_Price').show();
        $('#btn_BedBath').show();

        $('#a_search').addClass('active');
        $('#a_add').removeClass('active');
        $('#a_update').removeClass('active');

        $('.txtMLS').hide();
        $('.txtAddress').hide();
        $('.txtBedroom').hide();
        $('.txtBathroom').hide();
        $('.txtPrice').show();
        $('.txtSize').hide();
        $('.txtDescription').hide();
        $('.txtUrl').hide();
        $('.txtStatus').hide();

        $('.storeHouse').hide();
        $('.update').hide();
        $('.searchPrice').show();
        $('.searchBB').hide();
        $('.searchMLS').hide();

    });

    //Bedroom/bathroom button click
    $('#btn_BedBath').click(function () {
        $("#display").html("");
        $('input[type="text"]').val('');
        $('input[type="radio"]').prop('checked', false);
        $('#btn_MLS').removeClass('active');
        $('#btn_Price').removeClass('active');
        $('#btn_BedBath').addClass('active');

        $('#btn_MLS').show();
        $('#btn_Price').show();
        $('#btn_BedBath').show();

        $('#a_search').addClass('active');
        $('#a_add').removeClass('active');
        $('#a_update').removeClass('active');

        $('.txtMLS').hide();
        $('.txtAddress').hide();
        $('.txtBedroom').show();
        $('.txtBathroom').show();
        $('.txtPrice').hide();
        $('.txtSize').hide();
        $('.txtDescription').hide();
        $('.txtUrl').hide();
        $('.txtStatus').hide();

        $('.storeHouse').hide();
        $('.update').hide();
        $('.searchPrice').hide();
        $('.searchBB').show();
        $('.searchMLS').hide();

    });

    $('#a_search').trigger('click');

    //Get house by MLS number
    $('#btnGetHouseByMLS').click(function () {
        if ($('#txtMLS').val() == "") {
            $('#display').text("Invalid input. Please try again");
            return;
        }
        var strURL = 'HomeWS.asmx/GetHouseByMLS';

        //clear div content
        $('#display').html('');


        //make AJAX request
        $.ajax({
            type: 'POST',
            url: strURL,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: '{MLS:' + parseInt($('#txtMLS').val()) + '}',
            success: function (data) {
                var house = data.d;
                if (house === null) {
                    $('#display').text("There is no house was found. Try again.");
                }
                else {
                    $('#display').html('<br>'
                        + '<div class="container-33"><img src="' + house._url + '"/></div>'
                        + '<div class="container-50"><strong>MLS number: </strong>' + house._MLS + '<br>'
                        + '<strong>Address: </strong>' + house._address + '<br>'
                        + '<strong>Bedroom: </strong>' + house._bedroom + '<br>'
                        + '<strong>Bathroom: </strong>' + house._bathroom + '<br>'
                        + '<strong>Size: </strong>' + house._size + 'sq. ft.<br>'
                        + '<strong>Price: $</strong>' + house._price + '<br>'
                        + '<strong>Description: </strong>' + house._description + '<br>'
                        + '<strong>Status: </strong>' + house._status + '</div>'
                        );
                    if (localStorage.getItem("stage").toString() == "search") {
                        $('input[type="text"]').val('');
                        $('input[type="radio"]').prop('checked', false);
                    }
                   
                }
            },
            error: function (req, status, error) {
                alert('error: ' + req.responseText + '|' + status +
                    '|' + error);
            }

        });

    });

    //get List of Houses by Price (range)
    $("#btnGetHousesByRange").click(function () {
        var strURL = "HomeWS.asmx/GetHousesByRange";    // URL of the Web Service followed by the name of the Web Method.
        if ($('#txtPrice').val() == "") {
            $('#display').text("Invalid input. Please try again");
            return;
        }
        // Clear the divs contents.
        $("#display").html("");

        // Make an AJAX request to get a team and display the response in the appropriate div.
        $.ajax({
            type: "POST",
            url: strURL,
            contentType: "application/json; charset=utf-8", // set the data type sent to the Web Service.
            dataType: "json",                               // set the data type expected from the Web Service.                                 
            data: '{range:' + parseFloat($('#txtPrice').val()) + '}',
            success: function (data) {                      // set callback function used to update the page.                  
                var houses = data.d;
                if (houses == 0) {
                    $('#display').text("There is no house was found. Try again.");
                }
                else {
                    $.each(houses, function (index, house) {
                        $("#display").append('<br>'
                        + '<div class="container-33"><img src="' + house._url + '"/></div>'
                        + '<div class="container-50"><strong>MLS number: </strong>' + house._MLS + '<br>'
                        + '<strong>Address: </strong>' + house._address + '<br>'
                        + '<strong>Bedroom: </strong>' + house._bedroom + '<br>'
                        + '<strong>Bathroom: </strong>' + house._bathroom + '<br>'
                        + '<strong>Size: </strong>' + house._size + 'sq. ft.<br>'
                        + '<strong>Price: $</strong>' + house._price + '<br>'
                        + '<strong>Description: </strong>' + house._description + '<br>'
                        + '<strong>Status: </strong>' + house._status + '<br></div>'
                        + '<div class="clear"><hr></div>');
                    });
                    $('input[type="text"]').val('');
                    $('input[type="radio"]').prop('checked', false);
                }
            },
            error: function (req, status, error) {          // sets the error callback function used when an error occurs.
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }

        }); //end of ajax method
    });

    //get List of Houses by bedroom and bathroom
    $("#btnGetHousesByBedBath").click(function () {
        var strURL = "HomeWS.asmx/GetHousesByBedBath";    // URL of the Web Service followed by the name of the Web Method.
        if ($('#txtBedroom').val() == "" || $('#txtBathroom').val() == "") {
            $('#display').text("Invalid input. Please try again");
            return;
        }
        // Clear the divs contents.
        $("#display").html("");

        // Make an AJAX request to get a team and display the response in the appropriate div.
        $.ajax({
            type: "POST",
            url: strURL,
            contentType: "application/json; charset=utf-8", // set the data type sent to the Web Service.
            dataType: "json",                               // set the data type expected from the Web Service.                                 
            data: '{bed:' + parseInt($('#txtBedroom').val()) + ', bath: ' + parseInt($('#txtBathroom').val()) + '}',
            success: function (data) {                      // set callback function used to update the page.                  
                var houses = data.d;
                if (houses === null) {
                    $('#display').text("There is no house was found. Try again.");
                }
                else {
                    $.each(houses, function (index, house) {
                        $("#display").append('<br>'
                        + '<div class="container-33"><img src="' + house._url + '"/></div>'
                        + '<div class="container-50"><strong>MLS number: </strong>' + house._MLS + '<br>'
                        + '<strong>Address: </strong>' + house._address + '<br>'
                        + '<strong>Bedroom: </strong>' + house._bedroom + '<br>'
                        + '<strong>Bathroom: </strong>' + house._bathroom + '<br>'
                        + '<strong>Size: </strong>' + house._size + 'sq. ft.<br>'
                        + '<strong>Price: $</strong>' + house._price + '<br>'
                        + '<strong>Description: </strong>' + house._description + '<br>'
                        + '<strong>Status: </strong>' + house._status + '<br></div>'
                        + '<div class="clear"><hr></div>');
                    });
                    $('input[type="text"]').val('');
                    $('input[type="radio"]').prop('checked', false);
                }
            },
            error: function (req, status, error) {          // sets the error callback function used when an error occurs.
                alert("Error: " + req.responseText + " | " + status + " | " + error);
            }

        }); //end of ajax method
    });


    //Update house status
    $('#btnChangeHouseStatus').click(function () {
        var strURL = 'HomeWS.asmx/ChangeHouseStatus';
        if ($('input[name=status]:checked').val() == null) {
            $('#display').text("Please select a status to update");
            return;
        }
        //clear div content
        $('#display').html('');


        //make AJAX request
        $.ajax({
            type: 'POST',
            url: strURL,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: '{MLS:' + parseInt($('#txtMLS').val()) + ', Status: "' + $('input[name=status]:checked').val() + '"}',
            success: function (data) {
                var result = data.d;
                if (result === true) {
                    alert("The House was successfully updated");
                    localStorage.setItem("stage", "search");
                    $('#btnGetHouseByMLS').trigger('click');
                }
                else {
                    $('#display').text("The House was not updated. Try again later.");
                }
            },
            error: function (req, status, error) {
                alert('Error: \n' + req.responseText + '|' + status + '|' + error);
            }
        });

    });

    //store new house
    $('#btnStoreHouse').click(function () {
        var strURL = 'HomeWS.asmx/StoreHouse';
        if ($('#txtMLS').val() == "" || $('#txtAddress').val() == "" || $('#txtBedroom').val() == "" || $('#txtBathroom').val() == ""
            || $('#txtPrice').val() == "" || $('#txtSize').val() == "" || $('#txtDescription').val() == "" || $('#txtUrl').val() == "" || $('input[name=status]:checked').val() == null) {
            $('#display').text("Please enter every fields.");
            return;
        }
        //clear div content
        $('#display').html('');

        var house = new Object();
        house._MLS = parseInt($('#txtMLS').val());
        house._address = $('#txtAddress').val();
        house._bedroom = parseInt($('#txtBedroom').val());
        house._bathroom = parseInt($('#txtBathroom').val());
        house._price = parseFloat($('#txtPrice').val());
        house._size = parseFloat($('#txtSize').val());
        house._status = $('input[name=status]:checked').val();
        house._description = $('#txtDescription').val();
        house._url = $('#txtUrl').val();

        var para = new Object();
        para.theHouse = house;

        var strInput = JSON.stringify(para);

        //make an AJAX request
        $.ajax({
            type: "POST",
            url: strURL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: strInput,
            success: function (data) {
                var result = data.d;
                if (result === true) {
                    $('#display').text("The House was successfully added to the database.");
                    $('input[type="text"]').val('');
                    $('input[type="radio"]').prop('checked', false);
                }
                else {
                    $('#display').text("The House was not added to the database. Try again later.");
                }
            },
            error: function (req, status, error) {
                alert('Error: \n' + req.responseText + '|' + status + '|' + error);
            }
        });

    });

});