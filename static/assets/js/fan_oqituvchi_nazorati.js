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
