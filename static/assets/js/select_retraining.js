document.getElementById('fakultet').addEventListener('change', function () {
    document.getElementById('qabul_yili').value = "";      // Qabul_yilini tozalash
    document.getElementById('yonalish').value = "";      // Yonalishni tozalash
    document.getElementById('guruh').value = "";      // guruhni tozalash
});

document.getElementById('qabul_yili').addEventListener('change', function () {
    document.getElementById('yonalish').value = "";      // Yonalishni tozalash
    document.getElementById('guruh').value = "";      // guruhni tozalash
});

document.getElementById('yonalish').addEventListener('change', function () {
    document.getElementById('guruh').value = "";      // guruhni tozalash
});

$(document).ready(function () {
    $("#qabul_yili").on("change", function () {
        var qabul_yili = $(this).val();
        var fakultet = document.getElementById('fakultet').value;
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_curriculum_list/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'fakultet': parseInt(fakultet),
                'qabul_yili': parseInt(qabul_yili),
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var yonalish = $("#yonalish");
                yonalish.empty();
                yonalish.append('<option hidden="hidden" value="">O\'quv rejani tanlang</option>');
                $.each(data.curriculum_list, function (key, value) {
                    yonalish.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});


$(document).ready(function () {
    $("#yonalish").on("change", function () {
        var curr_id = $(this).val();
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_groups_list/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'curr_id': parseInt(curr_id),
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var guruh = $("#guruh");
                guruh.empty();
                guruh.append('<option hidden="hidden" value="">Guruhni tanlang</option>');
                $.each(data.groups_list, function (key, value) {
                    guruh.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});


$(document).ready(function () {
    $("#guruh").on("change", function () {
        var group_id = $(this).val();
        // AJAX so'rovni yuborish
        $.ajax({
            url: 'get_semesters_list/', // AJAX so'rovni qabul qiladigan Django view manzili
            data: {
                'group_id': parseInt(group_id),
            },
            dataType: 'json',
            success: function (data) {
                // Keyingi selectni yangilash
                var semester = $("#semester");
                semester.empty();
                semester.append('<option hidden="hidden" value="">Semestrni tanlang</option>');
                $.each(data.semesters_list, function (key, value) {
                    semester.append('<option value="' + key + '">' + value + '</option>');
                });
            }
        });
    });
});