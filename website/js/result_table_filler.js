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


function fill_stage_result_information(year,stage) {
    var starting_date = document.getElementById("stage_date");
    var distance = document.getElementById("stage_distance");
    var type = document.getElementById("stage_type");
    var origin = document.getElementById("start_point");
    var finish = document.getElementById("end_point");
    var winner_ = document.getElementById("winner");
    var winner_country_ = document.getElementById("winner_country");
    selected_stage_information = stages.filter(function (data) {
        return (data.year == year) && (data.stage == stage)
    })
    starting_date.innerHTML = ("Start Date: " +  selected_stage_information[0].date);
    distance.innerHTML = ("Distance: " +  selected_stage_information[0].distance_km + ' km');
    type.innerHTML  = ("Stage Type: " +  selected_stage_information[0].type);
    origin.innerHTML  =  ("Starting point: " + selected_stage_information[0].origin);
    finish.innerHTML  = ("End point: " + selected_stage_information[0].destination);
    winner_.innerHTML = ("Winner: " + selected_stage_information[0].winner);
    
    winner_country = winners.filter(function (data) {
        return (data.winner_name == selected_stage_information[0].winner)
    })
    winner_country_.innerHTML= ("WinnerCountry: " + winner_country[0].nationality);
}

function calculator (someArray){
    return someArray.reduce((howMuchSoFar,currentElementOfTheArray) => {
      howMuchSoFar = howMuchSoFar + currentElementOfTheArray;
      return howMuchSoFar;
    });
}
  
function fill_edition_result_information(year) {

    var edition_date = document.getElementById("edition_date");
    var num_of_stages = document.getElementById("num_of_stages");
    var edition_distance = document.getElementById("edition_distance");
    var total_length = document.getElementById("total_length");
    var num_of_starters = document.getElementById("num_of_starters");
    var num_of_teams = document.getElementById("num_of_teams");
    var number_of_stages = new Set()
    edition_stats = history.filter(function (data) {
        return (data.year == year)
    })
    edition_stats.forEach(edition_stat => {
        number_of_stages.add(edition_stat.number_of_stages)
    })
  
    edition_date.innerHTML = ("Edition date: " +  edition_stats[0].size);
    num_of_stages.innerHTML = ("Numbers of stages: " +  calculator(num_of_stages));
    /*
    edition_distance.innerHTML  = ("Edition Distance: " +  selected_stage_information[0].type);
    total_length.innerHTML  =  ("Total Length: " + selected_stage_information[0].origin);
    num_of_starters.innerHTML  = ("Number of starters " + selected_stage_information[0].destination);*/
}

