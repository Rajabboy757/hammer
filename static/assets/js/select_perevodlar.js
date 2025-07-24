document.getElementById('fakultet').addEventListener('change', function () {
    document.getElementById('talim_shakli').value = "";  // Talim shaklini tozalash
    document.getElementById('qabul_yili').value = "";    // Qabul yilini tozalash
    document.getElementById('yonalish').value = "";      // Yonalishni tozalash
    document.getElementById('semester').value = "";      // Semestrni tozalash
});


document.getElementById('talim_shakli').addEventListener('change', function () {
    document.getElementById('yonalish').value = "";  // Yonalishni tozalash
    document.getElementById('semester').value = "";  // Semestrni tozalash
});


document.getElementById('qabul_yili').addEventListener('change', function () {
    document.getElementById('yonalish').value = "";  // Yonalishni tozalash
    document.getElementById('semester').value = "";  // Semestrni tozalash

    var fakultet = document.getElementById('fakultet').value;
    var talim_shakli = document.getElementById('talim_shakli').value;
    var qabul_yili = document.getElementById('qabul_yili').value;


});


$(document).ready(function () {
    $("#fakultet").on("change", function () {
        var fakultet = $(this).val();
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_talim_shakl/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'fakultet': parseInt(fakultet),
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var talim_shakli = $("#talim_shakli");
                talim_shakli.empty();
                talim_shakli.append('<option hidden="hidden" value="0">Talim shaklini tanlang</option>');
                $.each(data.edu_form_list, function (key, value) {
                    talim_shakli.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});

$(document).ready(function () {
    $("#talim_shakli").on("change", function () {
        var fakultet = document.getElementById("fakultet").value;
        var talim_shakli = $(this).val();
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_eduyears/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'fakultet': fakultet,
                'talim_shakli': talim_shakli,
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var qabul_yili = $("#qabul_yili");
                qabul_yili.empty();
                qabul_yili.append('<option hidden="hidden" value="0">Qabul yilini tanlang</option>');
                $.each(data.edu_form_list, function (key, value) {
                    qabul_yili.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});


$(document).ready(function () {
    $("#qabul_yili").on("change", function () {
        var fakultet = document.getElementById("fakultet").value;
        var talim_shakli = document.getElementById("talim_shakli").value;
        var qabul_yili = $(this).val();


        // AJAX so'rovni yuborish
        $.ajax({
            url: 'ajax_get_options/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'fakultet': fakultet,
                'talim_shakli': talim_shakli,
                'qabul_yili': qabul_yili,

            },
            dataType: 'json',
            success: function (data) {
                console.log(data.curriculum_list);
                // Keyingi selectni yangilash
                var yonalish = $("#yonalish");
                yonalish.empty();
                $.each(data.curriculum_list, function (key, value) {
                    yonalish.append('<option value="' + key + '">' + value + '</option>');
                });
                var semester = $("#semester");

                let keys = Object.keys(data.semester_list);
                let values = Object.values(data.semester_list);

                keys.reverse();
                values.reverse();

                semester.empty();
                if (data.semester_list !== null) {
                    for (let i = 0; i < keys.length; i++) {
                        semester.append('<option value="' + keys[i] + '">' + values[i] + '</option>');
                    }
                }

            }
        });
    });
});





