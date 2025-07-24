function getColor(a) {
    let result = Math.floor(a / 10)
    switch (result) {
        case 0:
            return '#D32F2F';
            break;
        case 1:
            return '#f15b5b';
            break;
        case 2:
            return '#FF6347';
            break;
        case 3:
            return '#FF8C00';
            break;
        case 4:
            return '#FFA500';
            break;
        case 5:
            return '#FFFF00';
            break;
        case 6:
            return '#b4bb04';
            break;
        case 7:
            return '#8aea8a';
            break;
        case 8:
            return '#43cc43';
            break;
        case 9:
            return '#10a944';
            break;
        case 10:
            return '#208120';
            break;
    }
}


function sendData(fakultet) {
    var data = {
        fakultet: fakultet
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'oquvreja_detail', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log('Ma\'lumotlar muvaffaqiyatli yuborildi:', response);
                // Boshqa kerakli amallar
            } else {
                console.error('Ma\'lumotlar yuborilishi xatolik bilan tugadi: ' + xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}


document.getElementById("oquvrejamainform").addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {

            var semester = document.getElementById("darsrejasemester");
            var semestervalue = semester.options[semester.selectedIndex].innerText;

            var oquv_reja_div = document.getElementById("oquv_reja_div");
            var datanew = data.datanew;
            var data_full = data.data_full;
            // console.log(datanew)
            // console.log(data_full)
            let length = Object.keys(data_full).length;
            // console.log(length)
            if (length >= 1) {
                oquv_reja_div.style.visibility = 'visible';
                var tableHtml = '';
                var tableBody = document.getElementById("oquvreja_table_body") || "";
                var step = 1;
                for (let fakultet in data_full) {
                    tableHtml += '<tr>';
                    tableHtml += '<td style="text-align: center;">' + step + '</td>';


                    // tableHtml += '<td><a href="/curiculum/' + fakultet + '/">' + fakultet + '</a></td>';
                    tableHtml += '<td onclick="sendData(\'' + datanew + '\')"><a href="/curiculum/' + fakultet + '/' + semestervalue + '/">' + fakultet + '</a></td>';

                    // tableHtml += '<td onclick="(sendData('+datanew+')"><a href="/curiculum/' + fakultet + '/">' + fakultet + '</a></td>';


                    let lengthsub = Object.keys(data_full[fakultet]).length;
                    for (let j in data_full[fakultet]) {
                        const floatString = data_full[fakultet][j][2] + "%";

                        tableHtml += '<td style="text-align: center;">' + data_full[fakultet][j][0] + '</td>';
                        tableHtml += '<td style="text-align: center;">' + data_full[fakultet][j][1] + '</td>';
                        // tableHtml += `<td style="text-align: center; background-color: ${getColor(data_full[fakultet][j][2])};">${data_full[fakultet][j][2].toFixed(2)}%</td>`;

                        tableHtml += '<td style="text-align: center; background-color: ' + getColor(data_full[fakultet][j][2]) + ';">' + floatString.toString() + '</td>';
                    }
                    for (var h = 0; h < 5 - lengthsub; h++) {
                        tableHtml += '<td style="text-align: center;">' + " " + '</td>';
                        tableHtml += '<td style="text-align: center;">' + " " + '</td>';
                        tableHtml += '<td style="text-align: center;">' + " " + '</td>';
                    }
                    step++;
                    tableHtml += '</tr>';

                }

                tableBody.innerHTML = tableHtml;
            } else {
                oquv_reja_div.style.visibility = 'hidden';
            }
        })
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
        });
});

// document.getElementById('download_oquv_reja').addEventListener('click', function () {
//     var table2excel = new Table2Excel();
//     table2excel.export(document.querySelectorAll("#oquvreja_table"));
// });

// document.getElementById('download_oquv_reja_details').addEventListener('click', function () {
//     var table2excel1 = new Table2Excel();
//     table2excel1.export(document.querySelectorAll("#oquvreja_details_table"));
// });


function exportToExcel(tableId, fileName) {
    // var unixVaqt = Date.now();
    var bugun = new Date(); // Bugungi sana obyekti
    var yil = bugun.getFullYear(); // Bugungi yilni olish
    var oy = bugun.getMonth() + 1; // Bugungi oyni olish (+1 qo'shilgan) 0 dan boshlidi
    var kun = bugun.getDate(); // Bugungi kunni olish
    var soat = bugun.getHours();
    var minute = bugun.getMinutes();
    var second = bugun.getSeconds();
    var milsec = bugun.getMilliseconds();

    var file_id = "_" + yil + "_" + oy + "_" + kun + "_" + soat + "" + minute + "" + second + "" + milsec; // Fayl nomini yaratish


    var table = document.getElementById(tableId);
    if (table) {
        var table2excel = new Table2Excel();
        table2excel.export(table, fileName + file_id);
    } else {
        alert("Table not found or invalid table ID");
    }
}

function printDiv(divName) {
            var printContents = document.getElementById(divName).innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;

            window.print();

            document.body.innerHTML = originalContents;
        }


