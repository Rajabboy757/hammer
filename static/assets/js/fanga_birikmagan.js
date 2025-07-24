$(document).ready(function () {
    $("#fakultet1").on("change", function () {
        var fakultet = $(this).val();
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_eduyears/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'fakultet': parseInt(fakultet),
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var qabul_yili = $("#qabul_yili1");
                qabul_yili.empty();
                qabul_yili.append('<option hidden="hidden" value="0">O\'quv yili tanlang</option>');
                $.each(data.edu_form_list, function (key, value) {
                    qabul_yili.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});


document.getElementById("fanlarga_b_tlar").addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {


            var fanga_birikmagan_div = document.getElementById("fanga_birikmagan_div");
            var soni = document.getElementById("soni");

            var datalist = data.response_list;


            let length = Object.keys(datalist).length;
            // console.log(length)
            if (length >= 1) {
                fanga_birikmagan_div.style.visibility = 'visible';
                soni.innerHTML = "Namoyish etilayabdi <b>" + length.toString() + "</b>&nbsp;ta";

                var tableHtml = '';

                var tableBody = document.getElementById("fanga_birikmagan_t_body") || "";

                var step = 1;

                for (let fakultet in datalist) {


                    tableHtml += '<tr>';
                    tableHtml += '<td style="text-align: center; word-wrap: break-word;min-width: 3%;max-width: 3%;white-space:normal; vertical-align: middle">' + step + '</td>';
                    tableHtml += '<td style="word-wrap: break-word;min-width: 25%;max-width: 25%;white-space:normal;vertical-align: middle">' + datalist[fakultet][0] + '</td>';
                    tableHtml += '<td style="word-wrap: break-word;min-width: 30%;max-width: 30%;white-space:normal;vertical-align: middle"> <a href="https://hemis.urdu.uz/curriculum/formation?id=' + datalist[fakultet][7] + '" target="_blank">' + datalist[fakultet][1] + '<a/></td>';
                    tableHtml += '<td style="text-align: center; word-wrap: break-word;min-width: 17%;max-width: 17%; vertical-align: middle">' + datalist[fakultet][2] + '</td>';
                    tableHtml += '<td style="text-align: center; word-wrap: break-word;min-width: 11%;max-width: 11%;white-space:normal;vertical-align: middle">' + datalist[fakultet][3] + '</td>';
                    tableHtml += '<td style="text-align: center; word-wrap: break-word;min-width: 4%;max-width: 4%;white-space:normal;vertical-align: middle;">' + datalist[fakultet][4] + '</td>';
                    tableHtml += '<td style="text-align: center; word-wrap: break-word;min-width: 5%;max-width: 5%;white-space:normal;vertical-align: middle;">' + datalist[fakultet][5] + '</td>';
                    tableHtml += '<td style="text-align: center; word-wrap: break-word;min-width: 5%;max-width: 5%;white-space:normal;vertical-align: middle;">';
                    tableHtml += '<a href="'+ datalist[fakultet][7] + '/' + datalist[fakultet][8] + '/">';
                    tableHtml += datalist[fakultet][6];
                    tableHtml += '</a></td>';
                    step++;
                    tableHtml += '</tr>';

                }

                tableBody.innerHTML = tableHtml;
            } else {
                fanga_birikmagan_div.style.visibility = 'hidden';
            }
        })
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
        });
});
