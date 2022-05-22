var select = document.getElementById("edition_select")

function fill_select(years, selected) {
    years = Array.from(years).sort()
    years.forEach(year => {
        var opt = document.createElement('option');
        opt.value = year;
        opt.innerHTML = year;
        select.appendChild(opt);
    });
    select.value = selected
}