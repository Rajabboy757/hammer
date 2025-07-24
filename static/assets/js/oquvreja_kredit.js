document.getElementById("oquv_reja_kredit").addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {

            var cur_credit_div = document.getElementById("cur_credit_div");
            var tableBody = document.getElementById("cur_credit_div_body");

            var statusDiv = document.getElementById('statusdiv');
            var status = document.getElementById("status");

            var semestr_count = data.semestr_count;
            var talim_shakli = data.talim_shakli;

            let value = 0;
            var status1 = data.statuscode;
            if (status1 === "success") {
                statusDiv.classList.remove('alert-success');
                statusDiv.classList.remove('alert-warning');
                statusDiv.classList.add('alert-success');
                status.textContent = data.statustxt;
            } else {
                statusDiv.classList.remove('alert-success');
                statusDiv.classList.remove('alert-warning');
                statusDiv.classList.add('alert-warning');
                status.textContent = data.statustxt;
            }


            if (["11", "16", "17"].includes(talim_shakli)) {
                value = 30;
            } else {
                if (["13", "15"].includes(talim_shakli)) {
                    value = 24;
                }
            }

            console.log(semestr_count);

            if (semestr_count >= 1) {
                cur_credit_div.style.visibility = 'visible';

                var tableHtml = '';

                var credits = data.credits;


                if (typeof credits !== 'undefined') {
                    for (var i = 0; i < semestr_count; i++) {
                        tableHtml += '<tr>';
                        tableHtml += '<td class="text-start">' + (i + 1) + '</td>';
                        tableHtml += '<td><input type="hidden" name="semester_list[]" value="' + (i + 1) + '">' + (i + 1) + '-semestr' + '</td>';
                        tableHtml += '<td><input type="number" class="form-control" value="' + credits[i] + '" name="semester_credit[]" min="0" max="40"></td>';
                        tableHtml += '</tr>';
                    }

                } else {
                    for (var i = 0; i < semestr_count; i++) {
                        tableHtml += '<tr>';
                        tableHtml += '<td class="text-start">' + (i + 1) + '</td>';
                        tableHtml += '<td><input type="hidden" name="semester_list[]" value="' + (i + 1) + '">' + (i + 1) + '-semestr' + '</td>';
                        tableHtml += '<td><input type="number" class="form-control" value="' + value + '" name="semester_credit[]" min="0" max="40"></td>';
                        tableHtml += '</tr>';
                    }
                }


                tableBody.innerHTML = tableHtml;
            } else {
                cur_credit_div.style.visibility = 'hidden';
            }
        })
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
        });
});


document.getElementById("sem_kredit_form").addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);

    var yonalish = document.getElementById("yonalish").value;
    var talimshakli = document.getElementById("talim_shakli").value;
    var faculty = document.getElementById("fakultet").value;
    var statusDiv = document.getElementById('statusdiv');
    var status = document.getElementById("status");
    // var yonalishvalue = yonalish.options[yonalish.selectedIndex];
    formData.append("yonalish", yonalish)
    formData.append("talimshakli", talimshakli)
    formData.append("faculty", faculty)

    fetch(this.action, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            statusDiv.classList.remove('alert-success');
            statusDiv.classList.remove('alert-warning');
            statusDiv.classList.remove('alert-danger');
            var status1 = data.statuscode;
            if (status1 === "success") {
                statusDiv.classList.add('alert-success');
                status.textContent = data.statustxt;
            } else {
                if (status1 === "warning") {
                    statusDiv.classList.add('alert-warning');
                    status.textContent = data.statustxt;
                } else {
                    if (status1 === "danger") {
                        statusDiv.classList.add('alert-danger');
                        status.textContent = data.statustxt;
                    }
                }

            }
        })
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
        });
});