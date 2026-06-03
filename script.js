let countdown;

// ==========================
// LOAD DATA
// ==========================

document.getElementById("token").value =
localStorage.getItem("blynkToken") || "";

document.getElementById("jamOn").value =
localStorage.getItem("jamOn") || "18:00";

document.getElementById("jamOff").value =
localStorage.getItem("jamOff") || "06:00";

// ==========================
// SIMPAN TOKEN
// ==========================

function simpanToken(){

    let token =
    document.getElementById("token").value;

    if(token==""){
        alert("Masukkan token terlebih dahulu");
        return;
    }

    localStorage.setItem("blynkToken",token);

    alert("Token berhasil disimpan");
}

// ==========================
// AMBIL TOKEN
// ==========================

function getToken(){

    let token =
    localStorage.getItem("blynkToken");

    if(!token){
        alert("Masukkan token terlebih dahulu");
        return null;
    }

    return token;
}

// ==========================
// LAMPU ON
// ==========================

function lampuOn(){

    let token = getToken();

    if(!token) return;

    fetch(
      `https://blynk.cloud/external/api/update?token=${token}&V0=1`
    );

    document.getElementById("status").innerHTML =
    "🟢 Lampu Menyala";

    document.getElementById("status").style.background =
    "rgba(34,197,94,.15)";

    document.getElementById("status").style.color =
    "#4ade80";

  document.getElementById("lamp").style.animation =
"glow 2s infinite";
}

// ==========================
// LAMPU OFF
// ==========================

function lampuOff(){

    let token = getToken();

    if(!token) return;

    fetch(
      `https://blynk.cloud/external/api/update?token=${token}&V0=0`
    );

    clearInterval(countdown);

    document.getElementById("status").innerHTML =
    "🔴 Lampu Mati";

    document.getElementById("status").style.background =
    "rgba(239,68,68,.15)";

    document.getElementById("status").style.color =
    "#f87171";

   document.getElementById("lamp").style.animation =
"none";
}

// ==========================
// TIMER
// ==========================

function mulaiTimer(){

    let menit =
    parseInt(
      document.getElementById("timerMenit").value
    );

    if(!menit || menit <= 0){

        alert("Masukkan waktu yang valid");

        return;
    }

    lampuOn();

    let sisaDetik = menit * 60;

    clearInterval(countdown);

    countdown = setInterval(() => {

        let m =
        Math.floor(sisaDetik / 60);

        let d =
        sisaDetik % 60;

        document.getElementById("status").innerHTML =
        `⏳ ${m}:${d.toString().padStart(2,'0')}`;

        sisaDetik--;

        if(sisaDetik < 0){

            clearInterval(countdown);

            lampuOff();

            document.getElementById("status").innerHTML =
            "✅ Timer Selesai";

        }

    },1000);

}

// ==========================
// SIMPAN JADWAL
// ==========================

function simpanJadwal(){

    localStorage.setItem(
        "jamOn",
        document.getElementById("jamOn").value
    );

    localStorage.setItem(
        "jamOff",
        document.getElementById("jamOff").value
    );

    alert("Jadwal berhasil disimpan");
}

// ==========================
// JADWAL OTOMATIS
// ==========================

let statusOnHariIni = false;
let statusOffHariIni = false;

setInterval(() => {

    let sekarang = new Date();

    let jam =
    sekarang.getHours().toString().padStart(2,'0');

    let menit =
    sekarang.getMinutes().toString().padStart(2,'0');

    let waktuSekarang =
    `${jam}:${menit}`;

    let jamOn =
    localStorage.getItem("jamOn") || "18:00";

    let jamOff =
    localStorage.getItem("jamOff") || "06:00";

    if(waktuSekarang === "00:00"){
        statusOnHariIni = false;
        statusOffHariIni = false;
    }

    if(waktuSekarang === jamOn && !statusOnHariIni){

        lampuOn();

        statusOnHariIni = true;

        console.log("Lampu ON otomatis");
    }

    if(waktuSekarang === jamOff && !statusOffHariIni){

        lampuOff();

        statusOffHariIni = true;

        console.log("Lampu OFF otomatis");
    }

},1000);

setInterval(()=>{

    let now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleTimeString("id-ID");

},1000);

setInterval(function(){

    let now = new Date();

    let waktu =
        now.getHours().toString().padStart(2,'0')
        + ":"
        + now.getMinutes().toString().padStart(2,'0')
        + ":"
        + now.getSeconds().toString().padStart(2,'0');

    let clock = document.getElementById("clock");

    if(clock){
        clock.innerHTML = waktu;
    }

},1000);