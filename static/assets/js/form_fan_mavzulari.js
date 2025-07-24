document.getElementById('download_fan_mavzulari').addEventListener('click', function () {
    var fan_mavzulari_table2excel = new Table2Excel();
    fan_mavzulari_table2excel.export(document.querySelectorAll("#fan_mavzulari_table"));
});

