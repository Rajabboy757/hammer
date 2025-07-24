$(document).ready(function () {              // Ko'plab joylarda chaqirilgan o'zgartirishdan oldin yaxshilab o'ylab ko'ring
    $("#kafedra").on("change", function () {
        var kafedra = $(this).val();
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_kafedra_teachers/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'kafedra': parseInt(kafedra),
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var maruzachi = $("#maruzachi");
                maruzachi.empty();
                maruzachi.append('<option hidden="hidden" value="0">Maruza o\'qituvchi</option>');
                $.each(data.teachers_list, function (key, value) {
                    maruzachi.append('<option value="' + key + '">' + value + '</option>');
                });

                // Keyingi selectni yangilash
                var amaliyot = $("#amaliyot");
                amaliyot.empty();
                amaliyot.append('<option hidden="hidden" value="0">Amaliyot o\'qituvchi</option>');
                $.each(data.teachers_list, function (key, value) {
                    amaliyot.append('<option value="' + key + '">' + value + '</option>');
                });

                // Keyingi selectni yangilash
                var lab = $("#lab");
                lab.empty();
                lab.append('<option hidden="hidden" value="0">Laboratoriya o\'qituvchi</option>');
                $.each(data.teachers_list, function (key, value) {
                    lab.append('<option value="' + key + '">' + value + '</option>');
                });

                // Keyingi selectni yangilash
                var seminar = $("#seminar");
                seminar.empty();
                seminar.append('<option hidden="hidden" value="0">Seminar o\'qituvchi</option>');
                $.each(data.teachers_list, function (key, value) {
                    seminar.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});
