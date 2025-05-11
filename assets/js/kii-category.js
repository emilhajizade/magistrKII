const infrastructureData = [
  {
    sektor: "enerji",
    ad: "Mingəçevir İES",
    rol: "Ölkənin ən böyük elektrik istehsal mənbəyi",
    tehlukeler: [
      "SCADA pozuntusu",
      "DDoS hücumları",
      "Fiziki sabotaj"
    ],
    ehemiyyet: "10/9.5",
    tovsiyye: "ICS üçün air-gap, video nəzarət, anomalya əsaslı DDoS filtrləri"
  },
  {
    sektor: "enerji",
    ad: "Cənub Qaz Dəhlizi",
    rol: "Qlobal qaz ixracı və tranzit şəbəkəsi",
    tehlukeler: [
      "SCADA hücumları",
      "Supply chain riskləri",
      "Məlumat sızması"
    ],
    ehemiyyet: "10/9.5",
    tovsiyye: "Təchizat auditi, real-time log analizi, redundans sistemləri"
  },
  {
    sektor: "sehhiyye",
    ad: "Elektron Səhiyyə Sistemi",
    rol: "Pasiyent və peyvənd məlumatlarının idarəsi",
    tehlukeler: [
      "Ransomware",
      "Məlumat sızması",
      "İcazəsiz giriş"
    ],
    ehemiyyet: "10/8.8",
    tovsiyye: "DLP həlləri, 2FA, məlumatların şifrəli backup-u"
  },
  {
    sektor: "telekom",
    ad: "Delta Telecom Backbone",
    rol: "Ölkənin əsas internet çıxışı və DNS infrastrukturu",
    tehlukeler: [
      "BGP hijacking",
      "DDoS hücumları",
      "Yanğın və fiziki risklər"
    ],
    ehemiyyet: "10/10",
    tovsiyye: "RPKI tətbiqi, redundans ISP bağlantıları"
  },
  {
    sektor: "hokumet",
    ad: "ASAN Xidmət Portalı",
    rol: "Şəxsiyyət, hüquqi və sosial xidmətlərin rəqəmsal idarəsi",
    tehlukeler: [
      "Məlumat sızması",
      "DDoS hücumları",
      "Şəxsiyyət oğurluğu"
    ],
    ehemiyyet: "10/9.4",
    tovsiyye: "HTTPS enforced, HSTS aktiv, iki faktorlu giriş"
  },
  {
    sektor: "malİyye",
    ad: "Mərkəzi Bank – AZIPS/RTGS",
    rol: "Banklararası maliyyə ödənişlərinin koordinasiyası",
    tehlukeler: [
      "SWIFT istismarı",
      "Fiziki nasazlıq",
      "Ransomware"
    ],
    ehemiyyet: "10/10",
    tovsiyye: "FinCERT, manual təsdiq, avtomatik risk indikatorları"
  }
  ,
  {
  sektor: "su",
  ad: "Ceyranbatan Su Təchizatı Sistemi",
  rol: "Bakı və Abşeron bölgəsinə içməli suyun təchizatı və təmizlənməsi",
  tehlukeler: [
    "SCADA sisteminin manipulyasiyası",
    "Su təmizləmə prosesinin pozulması",
    "Zəhərli maddə ilə sabotaj"
  ],
  ehemiyyet: "10/9.3",
  tovsiyye: "Real-time su analizi sistemləri, operator təlimləri, giriş nəzarəti"
}
,
  {
    sektor: "su",
    ad: "Şollar Su Təchizatı Sistemi",
    rol: "Abşeron yarımadasına təmiz içməli suyun verilməsi",
    tehlukeler: [
      "SCADA manipulyasiyası",
      "Su mənbəyi zəhərlənməsi",
      "Sensor pozuntusu"
    ],
    ehemiyyet: "10/9.2",
    tovsiyye: "Su keyfiyyət monitorinqi, redundant sensorlar, fiziki mühafizə"
  },
  {
    sektor: "neqliyyat",
    ad: "Bakı Metropoliteni SCADA Sistemi",
    rol: "Şəhər içi ictimai nəqliyyatın avtomatlaşdırılmış idarəsi",
    tehlukeler: [
      "Xidmətin dayandırılması (DoS)",
      "Məlumatların sızması",
      "Qatarların idarə siqnallarına müdaxilə"
    ],
    ehemiyyet: "10/9.6",
    tovsiyye: "Şəbəkə segmentasiyası, real-time SIEM, operator monitorinqi"
  }


];





function createCard(item) {
  return `
    <div class="card" data-sector="${item.sektor}">
      <h2>${item.ad}</h2>
      <p><strong>Rolu:</strong> ${item.rol}</p>
      <p><strong>Əhəmiyyət:</strong> ${item.ehemiyyet}</p>
      <p><strong>Potensial Təhlükələr:</strong></p>
      <ul>
        ${item.tehlukeler.map(t => `<li>${t}</li>`).join('')}
      </ul>
      <p><strong>Tövsiyə:</strong> ${item.tovsiyye}</p>
    </div>
  `;
}

function renderInfrastructure(sector = 'all') {
  const container = document.getElementById('infrastructure-list');
  container.innerHTML = '';
  const filtered = sector === 'all'
    ? infrastructureData
    : infrastructureData.filter(item => item.sektor === sector);

  if (filtered.length === 0) {
    container.innerHTML = '<p>Bu sektora aid məlumat yoxdur.</p>';
    return;
  }

  filtered.forEach(item => {
    container.innerHTML += createCard(item);
  });
}

function filterSector(sector) {
  renderInfrastructure(sector);
}

// İlk yüklənmədə hamısını göstər
renderInfrastructure()


const category_btns = document.querySelectorAll(".sector-nav button")
category_btns[0].classList.add("active")
category_btns.forEach(x=>x.addEventListener("click",function (e) {
  category_btns.forEach(x=>x.classList.remove("active"))
  e.target.classList.add("active")
}))