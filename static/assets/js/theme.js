(function () {
    const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        let c=(25-minutes);
        let h=c*60000;
        const second = 1000,
        minute = second * 60,
        totalCountdownTime = h-(seconds*1000); // 10 daqiqalik taymer

    let countDownTime;

    // Oldin saqlangan tugash vaqtini olish
    if (localStorage.getItem("countDownTime")) {
        countDownTime = localStorage.getItem("countDownTime");
    } else {
        // Agar yo'q bo'lsa, hozirgi vaqtga 10 daqiqa qo'shib yangi vaqtni saqlash
        const startTime = new Date().getTime();
        countDownTime = startTime + totalCountdownTime;
        localStorage.setItem("countDownTime", countDownTime);
    }

    const x = setInterval(function () {
        const now = new Date().getTime(),
            distance = countDownTime - now;
        if (distance < 0) {
            clearInterval(x);
            localStorage.removeItem("countDownTime");
            window.location.reload();
        }
        // Taymerdagi daqiqalar va soniyalarni hisoblash
        document.getElementById("minutes").innerText = Math.floor((distance % (minute * 60)) / (minute));
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);


    }, 1000);  // Har soniya yangilanib turadi
}());
