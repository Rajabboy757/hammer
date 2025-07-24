$(document).ready(function () {
    $("#eduform").on("change", function () {
        var eduformv = $(this).val();

        const csrftoken = getCookie('csrftoken');
        var formData = new FormData(document.getElementById('eduformform'))

        // AJAX so'rovni yuborish
        $.ajax({
            url: 'getstudent_count/', // AJAX so'rovni qabul qiladigan Django view manzili
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrftoken,
            },
            data: {
                'talim_shakli': parseInt(eduformv),
            },
            dataType: 'json',
            success: function (data) {
                var erkak = data[0][1]
                var ayol = data[1][1]

                var canvas = document.getElementById('studentgender_piechart1');

                var existingChart = Chart.getChart(canvas);
                if (existingChart) {
                    existingChart.destroy();
                }
                creatpiechart('studentgender_piechart1', ["Erkak", "Ayol"], [erkak, ayol])
            }
        });
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}