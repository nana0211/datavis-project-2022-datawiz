/*

    functions used to update result tables

*/

function format_seconds(seconds) {
    d = Number(seconds);
    var hv = Math.floor(d / 3600);
    var mv = Math.floor(d % 3600 / 60);
    var sv = Math.floor(d % 3600 % 60);

    var hd = hv > 0 ? (hv > 9 ? hv + "h " : " " + hv + "h ") : "00h ";
    var md = mv > 0 ? (mv > 9 ? mv + "\' " : "0" + mv + "\' "): "00\' ";
    var sd = sv > 0 ? (sv > 9 ? sv + "\' " : "0" + sv + "\'"): "00\"";

    return hd + md + sd;
}

function fill_stage_result_table(year, stage_number) {
    selected_stage_data = stage_data.filter(function (data) {
        return (data.year == year) && (data.stage_number == stage_number)
    })
    var table = $("#stage_result").DataTable();

    table.clear();
    selected_stage_data.forEach(stage_data => {
        table.row.add([stage_data.rank, stage_data.rider, stage_data.team, format_seconds(stage_data.time_sec), "+ " + format_seconds(stage_data.time_gap_to_winner_sec)]).draw(false);
    });
}


function fill_stage_result_information(year, stage) {
  
    selected_stage_information = stages.filter(function (data) {
        return (data.year == year) && (data.stage == stage)
    })
    var starting_date;
    /*
    var distance = document.getElementById("stage_distance") ;
    var type = document.getElementById("stage_type");
    var origin = document.getElementById("start_point") ;
    var finish = document.getElementById("end_point");
    var winner = document.getElementById("winner");
    document.getElementById("stage_date").innerHTML = selected_stage_information.date;
    document.getElementById("stage_date").innerHTML = 0819;
    document.getElementById("stage_distance").innerHTML = 10;
    starting_date.innerHTML  = selected_stage_information.date;
    distance.innerHTML  = selected_stage_information.distance_km;
    type.innerHTML  = selected_stage_information.type
    origin.innerHTML  = selected_stage_information.origin;
    finish.innerHTML  = selected_stage_data.destiation;
    /* get the winner country information*/
    selected_stage_information = stages.filter(function (data) {
        return (data.year == year) && (data.stage == stage)
    })
    starting_date = selected_stage_information.year;
    document.getElementById("stage_date").value = ("Level: " + stage + sstarting_date);
    /*

    document.getElementById("stage_date").innerHTML = ("Level: " + starting_date);
    winner_country = tdf_winners.filter(function (data) {
        return (data.nationality == selected_stage_information.winner_country)
    })
    winner_flag = flags.filter(function (data) {
        return (data.country == winner_country)
    })
    winner.innerHTML = winner_flag + selected_stage_information.winner*/
}
