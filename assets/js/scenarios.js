const scenarios = {
  ransomware: [
    "🔍 Zəif şifrə ilə SCADA serverinə giriş cəhdi edilir...",
    "🔑 Admin:admin tapıldı — giriş uğurludur.",
    "📥 Hücumçu 'LockerRAT.exe' adlı zərərli proqramı serverə yükləyir.",
    "🧬 Şəbəkədəki digər sistemlərə avtomatik yayılan script aktivləşir...",
    "🔒 Bütün fayllar və konfiqurasiya faylları şifrələndi. Sistem paneli: 'Fidyə ödəyin!'"
  ],
  ddos: [
    "🌐 Hücumçu enerji şirkətinin web interfeysini hədəf alır...",
    "🤖 Botnet 3000+ cihazdan minlərlə HTTP sorğusu göndərməyə başlayır.",
    "📡 Server yükü 90% keçdi — cavab müddəti uzanır.",
    "🔥 Nəzarət sisteminə giriş qeyri-mümkün olur, istifadəçilər əlaqə qura bilmir.",
    "🚫 SCADA bağlantısı tamamilə kəsildi. Operator ekranda 'Connection Timeout' görür."
  ],
  phishing: [
    "✉️ Operatora e-mail gəlir: 'Yeni təhlükəsizlik sertifikatı yükləyin!'",
    "🔗 E-maildəki link 'secure-update.az' kimi görünsə də əslində fırıldaq saytdır.",
    "👤 Operator klikləyir və 'admin token' formunu doldurur...",
    "📥 Hücumçu login məlumatlarını alır və sistemə arxa qapı yerləşdirir.",
    "🔓 SCADA şəbəkəsinə giriş təmin olunur, klapan konfiqurasiyası dəyişdirilir."
  ],
  insider: [
    "👨‍💼 İT administratoru işdən çıxarılmağa hazırlaşır və məyusdur...",
    "🔓 O, özünə arxa qapı (backdoor) istifadəçi hesabı yaradır.",
    "📤 Sistem fayllarının nüsxəsi şəxsi e-poçtuna göndərilir...",
    "💣 Çıxışdan əvvəl sistemdə vaxtlayıcı ilə silinmə əmri yerləşdirir.",
    "🧨 Hücum işdən sonra aktiv olur, operatorlar sistemə daxil ola bilmir."
  ],
  usbMalware: [
    "💾 Operator USB flash yaddaşı SCADA kompüterinə taxır...",
    "⚠️ Antivirus proqramı deaktiv olduğu üçün zərərli fayl işə düşür.",
    "🐛 Malware lokal PLC-lərlə əlaqə quraraq komut göndərir...",
    "🚨 Təcili dayanma siqnalları cavab vermir, sistem çökür.",
    "📴 SCADA konsolu donur, operatorlar nəzarəti itirir."
  ]
};

const responseOptions = {
  ransomware: [
    { id: "none", label: "Tədbir görmürəm (Ransomware yayılır)" },
    { id: "disconnect", label: "İnterneti dərhal ayırıram" },
    { id: "restore", label: "Backup-dan bərpa edirəm" }
  ],
  ddos: [
    { id: "none", label: "Monitorinqə davam edirəm" },
    { id: "rateLimit", label: "Firewall-da sorğu limitləməsi tətbiq edirəm" },
    { id: "contactISP", label: "İnternet provayderlə əlaqə saxlayıram" }
  ],
  phishing: [
    { id: "none", label: "Operatoru buraxıram" },
    { id: "reset", label: "Şifrəni sıfırlayıram və girişləri bağlayıram" },
    { id: "notifySOC", label: "SOC mərkəzinə məlumat verirəm" }
  ],
  insider: [
    { id: "none", label: "İzləməyə davam edirəm" },
    { id: "disableAccount", label: "İşçinin hesabını deaktiv edirəm" },
    { id: "auditLogs", label: "Logları analiz edirəm" }
  ],
  usbMalware: [
    { id: "none", label: "USB-yə müdaxilə etmirəm" },
    { id: "quarantine", label: "Zərərli kompüteri təcrid edirəm" },
    { id: "scanAll", label: "Şəbəkədə antivirus skanlaması başladırıram" }
  ]
};

const responseResults = {
  none: `<p>❌ Heç bir tədbir görülmədi</p><p><strong>Təsir:</strong><br>🟥 Zərər: <span style="color:red">Çox yüksək</span><br>🕒 Bərpa: 7 gün</p>`,
  disconnect: `<p>🔌 İnternet bağlantısı kəsildi, yayılma dayandı</p><p><strong>Nəticə:</strong><br>🟢 Zərər: <span style="color:#00ffcc">Minimum</span><br>🕒 Bərpa: 1 gün</p>`,
  restore: `<p>🧩 Backup bərpası uğurla tamamlandı</p><p><strong>Nəticə:</strong><br>🟡 Zərər: <span style="color:gold">Aşağı</span><br>🕒 Bərpa: 2 gün</p>`,
  rateLimit: `<p>📊 Firewall sorğu axınını azaldır</p><p><strong>Nəticə:</strong><br>🟢 Sistem stabilləşir, xidmət bərpa olunur</p>`,
  contactISP: `<p>📞 Provayder yönləndirmə dəyişiklikləri edir</p><p><strong>Nəticə:</strong><br>🟡 Gecikmə var, lakin nəzarət bərpa olundu</p>`,
  reset: `<p>🔐 Şifrələr sıfırlandı, girişlər bağlandı</p><p><strong>Nəticə:</strong><br>🟢 Hücum dayandırıldı</p>`,
  notifySOC: `<p>📡 SOC monitorinqə başladı</p><p><strong>Nəticə:</strong><br>🟡 Müəyyənləşdirmə sürətləndirildi</p>`,
  disableAccount: `<p>🚫 İstifadəçi hesabı bloklandı</p><p><strong>Nəticə:</strong><br>🟢 Zərərin qarşısı vaxtında alındı</p>`,
  auditLogs: `<p>📋 Log təhlili aparıldı</p><p><strong>Nəticə:</strong><br>🟡 Aktivlik aşkarlanıb bildirildi</p>`,
  quarantine: `<p>🦠 Zərərli kompüter təcrid olundu</p><p><strong>Nəticə:</strong><br>🟢 Şəbəkə qorundu</p>`,
  scanAll: `<p>🧪 Bütün sistemdə antivirus skanı başladı</p><p><strong>Nəticə:</strong><br>🟡 Gecikməli olsa da, yayılma dayandırıldı</p>`
};

function startSimulation() {
  const log = document.getElementById("simulationLog");
  const responseDiv = document.getElementById("responseChoice");
  const finalResult = document.getElementById("finalResult");
  log.innerHTML = "";
  finalResult.innerHTML = "";
  responseDiv.style.display = "none";
  document.querySelectorAll(".scada-box").forEach(el => el.classList.remove("active", "compromised"));

  const selected = document.getElementById("scenario").value;
  const steps = scenarios[selected];
  let step = 0;

  const interval = setInterval(() => {
    if (step < steps.length) {
      const entry = document.createElement("p");
      entry.textContent = steps[step];
      entry.classList.add("log-line");
      log.appendChild(entry);

      if (step === 1) document.querySelector(".scada-box.server").classList.add("compromised");
      if (step === 2) document.querySelector(".scada-box.operator").classList.add("compromised");

      step++;
    } else {
      clearInterval(interval);
      renderOptions(selected);
    }
  }, 1800);
}

function renderOptions(scenario) {
  const container = document.getElementById("dynamicOptions");
  const responseDiv = document.getElementById("responseChoice");
  container.innerHTML = "";
  responseOptions[scenario].forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.label;
    btn.onclick = () => respond(option.id);
    container.appendChild(btn);
  });
  responseDiv.style.display = "block";
}

function respond(action) {
  const responseDiv = document.getElementById("responseChoice");
  const finalResult = document.getElementById("finalResult");
  responseDiv.style.display = "none";
  const result = document.createElement("div");
  result.classList.add("result");
  result.innerHTML = responseResults[action] || '<p>⚠️ Qeyri-müəyyən nəticə</p>';
  finalResult.appendChild(result);
}
