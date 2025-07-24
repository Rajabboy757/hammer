function divideNumbers(a, b) {
    if (b === 0) {
        return 0;
    }

    // Perform the division
    let result = a / b;

    // Round to two decimal places
    result = Math.round(result * 100);

    return result;
}


document.getElementById("nazoratlaryaratilishiform").addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            yil = document.getElementById('qabul_yili').value;
            eduform = document.getElementById('talim_shakli').value;
            sem = document.getElementById('semester1').value;



            var nazoratlar_yaratilishi_div = document.getElementById("nazoratlar_yaratilishi_div");

            var datalist = data.response_list;

            let length = Object.keys(datalist).length;
            // console.log(length)
            if (length >= 1) {
                nazoratlar_yaratilishi_div.style.visibility = 'visible';

                var tableHtml = '';

                var tableBody = document.getElementById("nazoratlar_yaratilishi_table_body") || "";

                var step = 1;

                for (let data in datalist) {

                    tableHtml += '<tr>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle">' + step + '</td>';

                    tableHtml += '<td style=" vertical-align: middle"><a href="' + datalist[data][0] + '/'+yil+'/'+eduform+'/'+sem+'/">' + datalist[data][1] + ' </a></td>';

                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][2] + '</td>';

                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][3] + '</td>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][4] + '</td>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle; background-color:hsl(' + divideNumbers(datalist[data][4], datalist[data][3]) + ', 100%, 42%); ">' + divideNumbers(datalist[data][4], datalist[data][3]) + '%</td>';

                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][5] + '</td>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][6] + '</td>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle;background-color:hsl(' + divideNumbers(datalist[data][6], datalist[data][5]) + ', 100%, 42%); ">' + divideNumbers(datalist[data][6], datalist[data][5]) + '%</td>';

                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][7] + '</td>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle;">' + datalist[data][8] + '</td>';
                    tableHtml += '<td style="text-align: center; vertical-align: middle;background-color:hsl(' + divideNumbers(datalist[data][8], datalist[data][7]) + ', 100%, 42%); ">' + divideNumbers(datalist[data][8], datalist[data][7]) + '%</td>';

                    step++;
                    tableHtml += '</tr>';

                }

                tableBody.innerHTML = tableHtml;
            } else {
                nazoratlar_yaratilishi_div.style.visibility = 'hidden';
            }
        })
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
        });
});
