/**
 * ============================================================
 *  SINKRONISASI JADWAL PRAKTIKUM  —  FSTI  <->  Sheet Lab
 *  Kelompok Gasal 2026/2027
 * ============================================================
 *
 *  Cara pakai:
 *    1. Buka file di Google Sheets.
 *    2. Extensions > Apps Script. Tempel file ini (Code.gs)
 *       dan buat file HTML bernama "Dashboard".
 *    3. Simpan, refresh spreadsheet.
 *    4. Muncul menu "Jadwal Lab" di sebelah menu Help.
 *
 *  Sifat script (dibuat untuk jangka panjang):
 *    - IDEMPOTEN: boleh diklik berkali-kali, hasilnya sama, tidak dobel.
 *    - AUTO-GROW : MK / prodi baru yang muncul di sheet Lab tapi belum
 *                  ada di sheet FSTI akan otomatis ditambahkan sebagai
 *                  baris baru (hanya untuk prodi milik FSTI).
 *    - AUTO-DETECT kolom & sesi: header sheet Lab dibaca dinamis, jadi
 *                  kalau jumlah sesi berubah script tetap jalan.
 *    - Tidak menimpa kolom isian manusia (C..L). Hanya menulis kolom
 *      hasil sinkron yang dibuat sendiri oleh script.
 * ============================================================
 */

// ============================================================
//  KONFIGURASI  — bagian ini yang perlu diubah kalau ada perubahan
// ============================================================
var CFG = {
  SHEET_TARGET   : 'FSTI',

  // Baris pertama data di sheet FSTI (baris 2-3 adalah contoh bawaan file)
  ROW_START      : 4,

  COL_PRODI      : 1,   // A - NAMA PRODI
  COL_MK         : 2,   // B - NAMA PRAKTIKUM
  COL_MODUL      : 3,   // C - MODUL
  COL_JENIS      : 4,   // D - MK WAJIB / PJBL / PBL

  // Sheet lab dikenali dari awalan nama ini
  LAB_PREFIX     : 'Lab ',

  // Judul kolom hasil sinkron. Script mencari kolom dengan judul ini di
  // baris 1; kalau belum ada, kolom dibuat di ujung kanan tabel.
  // Aman kalau nanti ada penambahan kolom manual di tengah.
  H_JADWAL       : 'JADWAL FIX (SINKRON SHEET LAB)',
  H_MINGGU       : 'MINGGU PELAKSANAAN (FIX)',
  H_TOTAL        : 'TOTAL PERTEMUAN',
  H_STATUS       : 'STATUS SINKRON',

  WARNA_HEADER   : '#fff2cc',
  WARNA_KOSONG   : '#f4cccc',   // MK di FSTI tapi belum ada di sheet lab
  WARNA_BARU     : '#d9ead3'    // baris hasil auto-tambah
};

/**
 * Daftar prodi milik FSTI. HANYA prodi di daftar ini yang boleh
 * ditambahkan otomatis sebagai baris baru di sheet FSTI.
 * Tambahkan prodi baru di sini kalau FSTI bertambah prodi.
 *
 * key = bentuk normal (huruf kecil), value = nama tampil yang dipakai
 * saat menulis baris baru.
 */
var PRODI_FSTI = {
  'sistem informasi' : 'Sistem Informasi',
  'statistika'       : 'Statistika',
  'ilmu aktuaria'    : 'Ilmu Aktuaria',
  'teknik elektro'   : 'Teknik Elektro',
  'bisnis digital'   : 'Bisnis Digital',
  'informatika'      : 'Informatika',
  'matematika'       : 'Matematika'
};

/**
 * Prodi di luar FSTI yang tetap perlu dikenali supaya script bisa
 * membedakan pola "Prodi - MK" dan "MK - Prodi". Entri prodi ini
 * TIDAK ditambahkan ke sheet FSTI, hanya dilaporkan di dashboard.
 */
var PRODI_LUAR = {
  'tpb'                : 'TPB',
  'pwk'                : 'PWK',
  'teknik industri'    : 'Teknik Industri',
  'teknik kimia'       : 'Teknik Kimia',
  'teknik mesin'       : 'Teknik Mesin',
  'teknik sipil'       : 'Teknik Sipil',
  'teknik lingkungan'  : 'Teknik Lingkungan',
  'teknik perkapalan'  : 'Teknik Perkapalan'
};

/**
 * Alias / singkatan / typo yang ditemukan di file. Kiri = apa adanya di
 * sheet, kanan = bentuk baku. Tambahkan di sini kalau ketemu typo baru,
 * tidak perlu mengubah logika.
 */
var ALIAS_PRODI = {
  'ia'               : 'ilmu aktuaria',
  'sistem infromasi' : 'sistem informasi',
  'sistem informsi'  : 'sistem informasi',
  'inflormatika'     : 'informatika',
  'informatka'       : 'informatika',
  'bisnis digtal'    : 'bisnis digital',
  'statistik'        : 'statistika',
  'si'               : 'sistem informasi',
  'bd'               : 'bisnis digital',
  'if'               : 'informatika'
};

/** Typo pada NAMA MK. Kiri = kata di sheet, kanan = kata baku. */
var ALIAS_KATA_MK = {
  'statisitik' : 'statistik',
  'metote'     : 'metode',
  'infromasi'  : 'informasi',
  'prakikum'   : 'praktikum'
};

var HARI_ORD = { senin: 1, selasa: 2, rabu: 3, kamis: 4, jumat: 5, sabtu: 6, minggu: 7 };

// ============================================================
//  MENU
// ============================================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Jadwal Lab')
    .addItem('Sinkronkan Jadwal Fix', 'syncJadwalFix')
    .addItem('Buka Dashboard', 'showDashboard')
    .addSeparator()
    .addItem('Cek Bentrok Jadwal', 'cekBentrok')
    .addItem('Hapus Kolom Hasil Sinkron', 'hapusKolomFix')
    .addSeparator()
    .addItem('Kunci Sekarang', 'kunciSekarang')
    .addToUi();
}

// ============================================================
//  PROTEKSI PASSWORD
// ============================================================
/**
 * Password HANYA bisa diganti dari sini, lewat editor Apps Script. Sengaja
 * tidak disediakan menu ganti password di spreadsheet, supaya orang lain yang
 * kebetulan tahu password tidak bisa menggantinya dan mengunci pemiliknya.
 *
 * Yang disimpan bukan teks passwordnya, hanya sidik jari SHA-256-nya.
 * Cara mengganti password:
 *   1. Di editor Apps Script, buka fungsi buatHashPassword() di bawah.
 *   2. Ganti isi variabel passwordBaru, pilih fungsi itu di dropdown, klik Run.
 *   3. Salin hash yang muncul di Execution log, tempel ke PW_HASH.
 *   4. Simpan. Password lama langsung tidak berlaku.
 *
 * CATATAN soal batas kemampuan proteksi ini: kunci ini menghalangi orang
 * menjalankan menu, bukan menyembunyikan data. Siapa pun yang punya akses EDIT
 * ke spreadsheet tetap bisa membuka Extensions > Apps Script, membaca atau
 * mengubah script ini, atau membaca isi sheet secara langsung. Untuk
 * benar-benar membatasi, atur juga hak berbagi filenya: beri orang lain akses
 * "Viewer" saja, atau lindungi sheet lewat Data > Protect sheets and ranges.
 */
var PW_HASH  = 'ak7kep+Q/Eyt1JDobVe421ztTQT1JezuQNkmRJJ4B2I=';
var PW_MENIT = 60;   // berapa lama tetap terbuka setelah sekali isi password

function hashPw_(teks) {
  var b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
                                  String(teks), Utilities.Charset.UTF_8);
  return Utilities.base64Encode(b);
}

/**
 * Alat bantu ganti password. Jalankan HANYA dari editor Apps Script
 * (pilih fungsi ini di dropdown, klik Run), lalu lihat Execution log.
 * Fungsi ini tidak muncul di menu spreadsheet.
 */
function buatHashPassword() {
  var passwordBaru = 'ganti-dengan-password-baru';
  Logger.log('Password : ' + passwordBaru);
  Logger.log('PW_HASH  : ' + hashPw_(passwordBaru));
  Logger.log('Salin baris PW_HASH di atas ke variabel PW_HASH, lalu simpan.');
}

function cacheKunci_() { return 'jadwal_lab_buka_' + Session.getActiveUser().getEmail(); }

/**
 * Minta password kalau sesi belum terbuka. Return true kalau boleh lanjut.
 * Sekali benar, tidak ditanya lagi selama PW_MENIT menit.
 */
function mintaAkses_() {
  var cache = CacheService.getUserCache();
  if (cache.get(cacheKunci_()) === '1') return true;

  var ui = SpreadsheetApp.getUi();
  var res = ui.prompt('Menu terkunci',
    'Masukkan password untuk membuka menu Jadwal Lab:', ui.ButtonSet.OK_CANCEL);

  if (res.getSelectedButton() !== ui.Button.OK) return false;

  if (hashPw_(res.getResponseText().trim()) !== PW_HASH) {
    ui.alert('Password salah', 'Menu tidak dapat dibuka.', ui.ButtonSet.OK);
    return false;
  }
  cache.put(cacheKunci_(), '1', PW_MENIT * 60);
  return true;
}

function kunciSekarang() {
  CacheService.getUserCache().remove(cacheKunci_());
  SpreadsheetApp.getUi().alert('Menu dikunci',
    'Password akan diminta lagi saat menu berikutnya dibuka.', SpreadsheetApp.getUi().ButtonSet.OK);
}

// ============================================================
//  UTIL
// ============================================================
function norm_(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/[ ​]/g, ' ')   // nbsp & zero-width
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** Normalisasi nama prodi + terapkan alias. */
function normProdi_(s) {
  var t = norm_(s);
  return ALIAS_PRODI[t] || t;
}

/** Normalisasi nama MK: rapikan spasi, betulkan typo per kata. */
function normMk_(s) {
  var t = norm_(s);
  for (var a in ALIAS_KATA_MK) {
    t = t.replace(new RegExp('\\b' + a + '\\b', 'g'), ALIAS_KATA_MK[a]);
  }
  return t.replace(/\s+/g, ' ').trim();
}

/** Nama tampil prodi (Title Case) untuk baris baru. */
function labelProdi_(pNorm) {
  if (PRODI_FSTI[pNorm]) return PRODI_FSTI[pNorm];
  if (PRODI_LUAR[pNorm]) return PRODI_LUAR[pNorm];
  return pNorm.replace(/\b\w/g, function (c) { return c.toUpperCase(); });
}

/** Rapikan nama MK untuk ditampilkan: Title Case, kecuali sudah ALL CAPS. */
function labelMk_(raw) {
  var t = String(raw).replace(/\s+/g, ' ').trim();
  for (var a in ALIAS_KATA_MK) {
    t = t.replace(new RegExp(a, 'gi'), ALIAS_KATA_MK[a]);
  }
  return t;
}

/** [1,2,3,5,7,8] -> "1-3, 5, 7-8" */
function ranges_(arr) {
  var a = arr.slice().sort(function (x, y) { return x - y; });
  var out = [], i = 0;
  while (i < a.length) {
    var j = i;
    while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
    out.push(i === j ? String(a[i]) : a[i] + '-' + a[j]);
    i = j + 1;
  }
  return out.join(', ');
}

/**
 * Cari kolom berdasarkan judul di baris 1. Kalau belum ada, buat di
 * ujung kanan. Ini yang bikin script tahan terhadap penambahan kolom
 * manual di sheet FSTI.
 */
function kolomHeader_(sheet, judul) {
  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var head = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  for (var i = 0; i < head.length; i++) {
    if (norm_(head[i]) === norm_(judul)) return i + 1;
  }
  var c = lastCol + 1;
  sheet.getRange(1, c).setValue(judul);
  return c;
}

// ============================================================
//  PARSING ISI SEL LAB
// ============================================================
/**
 * Isi sel sheet lab punya dua pola yang campur aduk:
 *    "Analisis Big Data A - Bisnis Digital"    -> MK - Prodi
 *    "Teknik Industri - Riset Operasi 1 C"     -> Prodi - MK
 * Prodi dikenali dari daftar prodi yang dikumpulkan dari sheet FSTI +
 * PRODI_FSTI + PRODI_LUAR. Kalau dua-duanya tidak dikenali, segmen
 * terakhir dianggap prodi (pola paling umum di file ini).
 */
function splitEntry_(txt, prodiSet) {
  var bersih = String(txt).replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();
  var parts = bersih.split(/\s+[-–—]\s+/).map(function (x) { return x.trim(); })
                    .filter(function (x) { return x.length; });

  if (parts.length < 2) {
    return { prodi: '', prodiRaw: '', mk: normMk_(bersih), mkRaw: bersih, pola: 'tanpa-prodi' };
  }

  var depan    = parts[0];
  var belakang = parts.slice(1).join(' - ');

  if (prodiSet[normProdi_(depan)]) {
    return { prodi: normProdi_(depan), prodiRaw: depan,
             mk: normMk_(belakang), mkRaw: belakang, pola: 'prodi-mk' };
  }
  if (prodiSet[normProdi_(belakang)]) {
    return { prodi: normProdi_(belakang), prodiRaw: belakang,
             mk: normMk_(depan), mkRaw: depan, pola: 'mk-prodi' };
  }
  // fallback: segmen terakhir = prodi
  var last = parts[parts.length - 1];
  return { prodi: normProdi_(last), prodiRaw: last,
           mk: normMk_(parts.slice(0, -1).join(' - ')),
           mkRaw: parts.slice(0, -1).join(' - '), pola: 'tebakan' };
}

/**
 * Baca header sheet lab untuk menentukan kolom sesi secara dinamis.
 * Header ada di baris 2: "Minggu ke -", "Tanggal", "Hari / Sesi",
 * lalu kolom-kolom sesi "1\n(07.30-10.00)" dst.
 * Return: { rowStart, colMinggu, colHari, sesi: [{col,label}] }
 */
function strukturLab_(ws) {
  var lastCol = Math.max(ws.getLastColumn(), 3);
  var cari = Math.min(ws.getLastRow(), 6);
  if (cari < 1) return null;
  var head = ws.getRange(1, 1, cari, lastCol).getValues();

  for (var r = 0; r < head.length; r++) {
    var baris = head[r].map(norm_);
    var cM = -1, cH = -1;
    for (var c = 0; c < baris.length; c++) {
      if (cM < 0 && baris[c].indexOf('minggu') === 0) cM = c + 1;
      if (cH < 0 && baris[c].indexOf('hari') === 0)   cH = c + 1;
    }
    if (cM < 0 || cH < 0) continue;

    var sesi = [];
    for (var c2 = cH; c2 < baris.length; c2++) {
      var v = baris[c2];
      if (!v) continue;
      var m = v.match(/^(\d+)\s*(.*)$/);   // "1 (07.30-10.00)"
      if (m) sesi.push({ col: c2 + 1, label: (m[1] + ' ' + m[2]).trim() });
    }
    if (!sesi.length) continue;
    return { rowStart: r + 2, colMinggu: cM, colHari: cH, sesi: sesi, lastCol: lastCol };
  }
  return null;
}

// ============================================================
//  INTI
// ============================================================
/** Kumpulkan semua jadwal dari seluruh sheet Lab. */
function scanLab_(prodiSet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var slots = {};      // "prodi||mk" -> { slotKey -> {lab,hari,sesi,minggu[],raw,prodiRaw,mkRaw} }
  var totalSel = 0, labDipakai = [], sheetLewat = [];

  ss.getSheets().forEach(function (ws) {
    var nama = ws.getName();
    if (nama.indexOf(CFG.LAB_PREFIX) !== 0) return;

    var st = strukturLab_(ws);
    if (!st) { sheetLewat.push(nama); return; }
    labDipakai.push(nama);

    var last = ws.getLastRow();
    if (last < st.rowStart) return;
    var data = ws.getRange(st.rowStart, 1, last - st.rowStart + 1, st.lastCol).getValues();

    data.forEach(function (r) {
      var minggu = parseInt(String(r[st.colMinggu - 1]).trim(), 10);
      if (isNaN(minggu)) return;
      var hari = String(r[st.colHari - 1] || '').replace(/\s+/g, ' ').trim();

      st.sesi.forEach(function (s) {
        var v = r[s.col - 1];
        if (!v || !String(v).trim()) return;
        totalSel++;

        var e  = splitEntry_(String(v).trim(), prodiSet);
        var key = e.prodi + '||' + e.mk;
        var sk  = nama + '||' + hari + '||' + s.label;

        if (!slots[key]) slots[key] = {};
        if (!slots[key][sk]) {
          slots[key][sk] = { lab: nama, hari: hari, sesi: s.label, minggu: [],
                             raw: String(v).trim(), prodiRaw: e.prodiRaw,
                             mkRaw: e.mkRaw, pola: e.pola };
        }
        if (slots[key][sk].minggu.indexOf(minggu) < 0) slots[key][sk].minggu.push(minggu);
      });
    });
  });

  return { slots: slots, totalSel: totalSel, labDipakai: labDipakai, sheetLewat: sheetLewat };
}

/** Baca daftar MK di sheet FSTI + bangun himpunan nama prodi. */
function bacaTarget_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CFG.SHEET_TARGET);
  if (!sh) throw new Error('Sheet "' + CFG.SHEET_TARGET + '" tidak ditemukan.');

  var lastRow = sh.getLastRow();
  var courses = [], prodiSet = {};

  if (lastRow >= CFG.ROW_START) {
    var vals = sh.getRange(CFG.ROW_START, CFG.COL_PRODI,
                           lastRow - CFG.ROW_START + 1, 2).getValues();
    for (var i = 0; i < vals.length; i++) {
      var p = vals[i][0], mk = vals[i][1];
      if (!p || !mk) continue;
      var pn = normProdi_(p);
      courses.push({ row: CFG.ROW_START + i, prodi: pn, mk: normMk_(mk),
                     prodiRaw: String(p).trim(), mkRaw: String(mk).replace(/\s+/g, ' ').trim() });
      prodiSet[pn] = true;
    }
  }
  for (var k in PRODI_FSTI) prodiSet[k] = true;
  for (var k2 in PRODI_LUAR) prodiSet[k2] = true;

  return { sheet: sh, courses: courses, prodiSet: prodiSet };
}

/** Gabungkan: hasil per baris FSTI + daftar entri lab yang belum terdaftar. */
function hitungHasil_() {
  var t   = bacaTarget_();
  var lab = scanLab_(t.prodiSet);

  var hasil = [], terpakai = {};

  t.courses.forEach(function (c) {
    var key   = c.prodi + '||' + c.mk;
    var entry = lab.slots[key];

    if (!entry) {
      hasil.push({ row: c.row, prodi: c.prodiRaw, mk: c.mkRaw, ada: false, baru: false,
                   slot: [], teks: '', minggu: '', total: 0 });
      return;
    }
    terpakai[key] = true;
    hasil.push(bangunBaris_(c.row, c.prodiRaw, c.mkRaw, entry, false));
  });

  // Entri sheet lab yang belum punya baris di FSTI
  var baru = [], luar = [];
  for (var key in lab.slots) {
    if (terpakai[key]) continue;
    var pNorm  = key.split('||')[0];
    var contoh = null, n = 0;
    for (var sk in lab.slots[key]) { contoh = lab.slots[key][sk]; n += contoh.minggu.length; }

    var item = { key: key, prodiNorm: pNorm, prodi: labelProdi_(pNorm),
                 mk: labelMk_(contoh ? contoh.mkRaw : key.split('||')[1]),
                 raw: contoh ? contoh.raw : '', jml: n, entry: lab.slots[key] };

    if (PRODI_FSTI[pNorm]) baru.push(item); else luar.push(item);
  }
  baru.sort(function (a, b) { return a.prodi.localeCompare(b.prodi) || a.mk.localeCompare(b.mk); });
  luar.sort(function (a, b) { return b.jml - a.jml; });

  return { sheet: t.sheet, hasil: hasil, baru: baru, luar: luar,
           totalSel: lab.totalSel, labDipakai: lab.labDipakai, sheetLewat: lab.sheetLewat,
           slots: lab.slots };
}

/** Susun teks jadwal fix untuk satu MK. */
function bangunBaris_(row, prodiRaw, mkRaw, entry, isBaru) {
  var slotArr = [], allW = {};
  for (var sk in entry) slotArr.push(entry[sk]);

  slotArr.sort(function (a, b) {
    var ha = HARI_ORD[norm_(a.hari)] || 9, hb = HARI_ORD[norm_(b.hari)] || 9;
    return ha - hb || String(a.sesi).localeCompare(String(b.sesi)) || a.lab.localeCompare(b.lab);
  });

  var lines = slotArr.map(function (s) {
    s.minggu.forEach(function (m) { allW[m] = true; });
    return s.lab + ' | ' + s.hari + ' | Sesi ' + s.sesi + ' | Minggu: ' + ranges_(s.minggu);
  });

  var wk = Object.keys(allW).map(Number);
  var totalPertemuan = slotArr.reduce(function (a, s) { return a + s.minggu.length; }, 0);

  return { row: row, prodi: prodiRaw, mk: mkRaw, ada: true, baru: !!isBaru,
           slot: slotArr, teks: lines.join('\n'), minggu: ranges_(wk), total: totalPertemuan };
}

// ============================================================
//  AKSI: SINKRONISASI
// ============================================================
function syncJadwalFix() {
  var ui = SpreadsheetApp.getUi();
  if (!mintaAkses_()) return;
  var r  = hitungHasil_();
  var sh = r.sheet;

  // --- siapkan kolom hasil (dibuat sekali, dipakai selamanya) ---
  var cJad = kolomHeader_(sh, CFG.H_JADWAL);
  var cMgg = kolomHeader_(sh, CFG.H_MINGGU);
  var cTot = kolomHeader_(sh, CFG.H_TOTAL);
  var cSts = kolomHeader_(sh, CFG.H_STATUS);

  formatHeader_(sh, [cJad, cMgg, cTot, cSts]);
  sh.setColumnWidth(cJad, 400);
  sh.setColumnWidth(cMgg, 150);
  sh.setColumnWidth(cTot, 90);
  sh.setColumnWidth(cSts, 120);

  // --- 1. tulis hasil untuk baris yang sudah ada ---
  var cocok = 0, kosong = 0;
  r.hasil.forEach(function (h) {
    tulisBaris_(sh, h.row, cJad, cMgg, cTot, cSts, h);
    if (h.ada) cocok++; else kosong++;
  });

  // --- 2. auto-tambah baris untuk MK baru (khusus prodi FSTI) ---
  var barisBaru = [];
  if (r.baru.length) {
    var mulai = sh.getLastRow() + 1;
    r.baru.forEach(function (item, i) {
      var row = mulai + i;
      var h   = bangunBaris_(row, item.prodi, item.mk, item.entry, true);

      sh.getRange(row, CFG.COL_PRODI).setValue(item.prodi);
      sh.getRange(row, CFG.COL_MK).setValue(item.mk);
      sh.getRange(row, CFG.COL_PRODI, 1, 2).setBackground(CFG.WARNA_BARU);

      tulisBaris_(sh, row, cJad, cMgg, cTot, cSts, h);
      barisBaru.push(item.prodi + ' — ' + item.mk);
    });
  }

  // --- 3. laporan ---
  var pesan =
    'SHEET LAB DIBACA : ' + r.labDipakai.length + ' sheet, ' + r.totalSel + ' sel jadwal\n\n' +
    'MK di FSTI sudah punya jadwal : ' + cocok + '\n' +
    'MK di FSTI belum ada di lab    : ' + kosong + '\n' +
    'Baris BARU ditambahkan          : ' + barisBaru.length + '\n' +
    'Entri prodi non-FSTI (dilewati) : ' + r.luar.length + '\n';

  if (barisBaru.length) {
    pesan += '\nBaris baru (ditandai hijau, mohon lengkapi kolom Modul & MK Wajib):\n  • ' +
             barisBaru.slice(0, 15).join('\n  • ');
    if (barisBaru.length > 15) pesan += '\n  • ... dan ' + (barisBaru.length - 15) + ' lainnya';
  }
  if (r.sheetLewat.length) {
    pesan += '\n\nSheet lab dilewati (header tidak terbaca):\n  • ' + r.sheetLewat.join('\n  • ');
  }

  ui.alert('Sinkronisasi selesai', pesan, ui.ButtonSet.OK);
}

/**
 * Format header kolom hasil. Warna font diset eksplisit ke hitam karena baris
 * header sheet FSTI mewarisi font putih, yang membuat judul tidak terbaca di
 * atas latar krem.
 */
function formatHeader_(sh, kolom) {
  kolom.forEach(function (c) {
    sh.getRange(1, c)
      .setFontWeight('bold')
      .setFontColor('#000000')
      .setFontSize(10)
      .setBackground(CFG.WARNA_HEADER)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);
  });
}

function tulisBaris_(sh, row, cJad, cMgg, cTot, cSts, h) {
  var rJad = sh.getRange(row, cJad), rMgg = sh.getRange(row, cMgg);
  var rTot = sh.getRange(row, cTot), rSts = sh.getRange(row, cSts);

  if (h.ada) {
    rJad.setValue(h.teks).setWrap(true).setVerticalAlignment('top');
    rMgg.setValue(h.minggu).setWrap(true).setHorizontalAlignment('center').setVerticalAlignment('top');
    rTot.setValue(h.total).setHorizontalAlignment('center').setVerticalAlignment('top');
    rSts.setValue(h.baru ? 'BARU (auto)' : 'OK').setHorizontalAlignment('center');
    var bg = h.baru ? CFG.WARNA_BARU : null;
    rJad.setBackground(bg); rMgg.setBackground(bg); rTot.setBackground(bg); rSts.setBackground(bg);
  } else {
    rJad.setValue('BELUM ADA DI SHEET LAB').setWrap(true);
    rMgg.setValue(''); rTot.setValue('');
    rSts.setValue('BELUM TERJADWAL').setHorizontalAlignment('center');
    [rJad, rMgg, rTot, rSts].forEach(function (c) { c.setBackground(CFG.WARNA_KOSONG); });
  }
}

// ============================================================
//  AKSI: CEK BENTROK
// ============================================================
/**
 * Bentrok = satu sel (lab, minggu, hari, sesi) dipakai lebih dari satu MK,
 * atau satu MK dijadwalkan di dua lab berbeda pada waktu yang sama.
 */
function cekBentrok_() {
  var t   = bacaTarget_();
  var lab = scanLab_(t.prodiSet);
  var waktu = {};   // "hari||sesi||minggu" -> [{lab, label}]

  for (var key in lab.slots) {
    var e = lab.slots[key];
    for (var sk in e) {
      var s = e[sk];
      s.minggu.forEach(function (m) {
        var wk = s.hari + '||' + s.sesi + '||' + m;
        if (!waktu[wk]) waktu[wk] = [];
        waktu[wk].push({ lab: s.lab, label: s.raw, key: key });
      });
    }
  }

  var bentrok = [];
  for (var wk in waktu) {
    var byLab = {};
    waktu[wk].forEach(function (x) {
      if (!byLab[x.lab]) byLab[x.lab] = [];
      if (byLab[x.lab].indexOf(x.label) < 0) byLab[x.lab].push(x.label);
    });
    for (var L in byLab) {
      if (byLab[L].length > 1) {
        var p = wk.split('||');
        bentrok.push({ hari: p[0], sesi: p[1], minggu: Number(p[2]), lab: L, mk: byLab[L] });
      }
    }
  }
  bentrok.sort(function (a, b) { return a.minggu - b.minggu ||
    (HARI_ORD[norm_(a.hari)] || 9) - (HARI_ORD[norm_(b.hari)] || 9); });
  return bentrok;
}

function cekBentrok() {
  var ui = SpreadsheetApp.getUi();
  if (!mintaAkses_()) return;
  var b  = cekBentrok_();
  if (!b.length) { ui.alert('Cek Bentrok', 'Tidak ada bentrok. Semua slot aman.', ui.ButtonSet.OK); return; }
  var teks = b.slice(0, 25).map(function (x) {
    return '• Minggu ' + x.minggu + ' ' + x.hari + ' sesi ' + x.sesi + ' @ ' + x.lab +
           '\n    ' + x.mk.join('  ><  ');
  }).join('\n');
  if (b.length > 25) teks += '\n\n... dan ' + (b.length - 25) + ' bentrok lainnya (lihat Dashboard).';
  ui.alert('Ditemukan ' + b.length + ' bentrok', teks, ui.ButtonSet.OK);
}

// ============================================================
//  AKSI: BERSIHKAN
// ============================================================
function hapusKolomFix() {
  var ui = SpreadsheetApp.getUi();
  if (!mintaAkses_()) return;
  var res = ui.alert('Hapus kolom hasil sinkron?',
    'Kolom "' + CFG.H_JADWAL + '", "' + CFG.H_MINGGU + '", "' + CFG.H_TOTAL + '", "' +
    CFG.H_STATUS + '" akan dikosongkan.\n\nBaris yang pernah ditambahkan otomatis TIDAK ikut ' +
    'terhapus (dianggap sudah jadi data resmi). Lanjutkan?', ui.ButtonSet.YES_NO);
  if (res !== ui.Button.YES) return;

  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG.SHEET_TARGET);
  var last = sh.getLastRow();
  [CFG.H_JADWAL, CFG.H_MINGGU, CFG.H_TOTAL, CFG.H_STATUS].forEach(function (j) {
    var c = kolomHeader_(sh, j);
    sh.getRange(1, c, last, 1).clear();
  });
  ui.alert('Kolom hasil sinkron sudah dikosongkan.');
}

// ============================================================
//  DASHBOARD
// ============================================================
function showDashboard() {
  if (!mintaAkses_()) return;
  var html = HtmlService.createHtmlOutputFromFile('Dashboard')
    .setTitle('Dashboard Jadwal Praktikum')
    .setWidth(1400).setHeight(860);
  SpreadsheetApp.getUi().showModalDialog(html, 'Dashboard Jadwal Praktikum FSTI');
}

/** Pastikan pemanggilan dari dashboard juga tetap lewat sesi yang terbuka. */
function sesiTerbuka_() {
  if (CacheService.getUserCache().get(cacheKunci_()) !== '1') {
    throw new Error('Sesi terkunci. Tutup dashboard, lalu buka lagi dari menu Jadwal Lab.');
  }
}

/** Dipanggil dari Dashboard.html lewat google.script.run */
function getDashboardData() {
  sesiTerbuka_();
  var r = hitungHasil_();

  var perProdi = {}, perLab = {}, perHari = {}, perSesi = {}, perMinggu = {};

  r.hasil.forEach(function (h) {
    var pk = h.prodi || '(kosong)';
    if (!perProdi[pk]) perProdi[pk] = { total: 0, cocok: 0, pertemuan: 0 };
    perProdi[pk].total++;
    if (h.ada) { perProdi[pk].cocok++; perProdi[pk].pertemuan += h.total; }

    h.slot.forEach(function (s) {
      perLab[s.lab]   = (perLab[s.lab]   || 0) + s.minggu.length;
      perHari[s.hari] = (perHari[s.hari] || 0) + s.minggu.length;
      perSesi[s.sesi] = (perSesi[s.sesi] || 0) + s.minggu.length;
      s.minggu.forEach(function (m) { perMinggu[m] = (perMinggu[m] || 0) + 1; });
    });
  });

  return {
    ringkas: {
      totalMk    : r.hasil.length,
      cocok      : r.hasil.filter(function (h) { return h.ada; }).length,
      kosong     : r.hasil.filter(function (h) { return !h.ada; }).length,
      baru       : r.baru.length,
      luar       : r.luar.length,
      totalSel   : r.totalSel,
      jumlahLab  : r.labDipakai.length
    },
    hasil: r.hasil.map(function (h) {
      return { row: h.row, prodi: h.prodi, mk: h.mk, ada: h.ada,
               minggu: h.minggu, total: h.total,
               slot: h.slot.map(function (s) {
                 return { lab: s.lab, hari: s.hari, sesi: s.sesi,
                          minggu: ranges_(s.minggu), n: s.minggu.length };
               }) };
    }),
    baru : r.baru.map(function (x) { return { prodi: x.prodi, mk: x.mk, jml: x.jml, raw: x.raw }; }),
    luar : r.luar.map(function (x) { return { prodi: x.prodi, mk: x.mk, jml: x.jml, raw: x.raw }; }),
    bentrok  : cekBentrok_(),
    perProdi : perProdi,
    perLab   : perLab,
    perHari  : perHari,
    perSesi  : perSesi,
    perMinggu: perMinggu,
    labList  : r.labDipakai
  };
}

/** Tombol "Sinkronkan" di dashboard. */
function syncDariDashboard() {
  sesiTerbuka_();
  var r  = hitungHasil_();
  var sh = r.sheet;
  var cJad = kolomHeader_(sh, CFG.H_JADWAL), cMgg = kolomHeader_(sh, CFG.H_MINGGU);
  var cTot = kolomHeader_(sh, CFG.H_TOTAL),  cSts = kolomHeader_(sh, CFG.H_STATUS);

  formatHeader_(sh, [cJad, cMgg, cTot, cSts]);

  r.hasil.forEach(function (h) { tulisBaris_(sh, h.row, cJad, cMgg, cTot, cSts, h); });

  var mulai = sh.getLastRow() + 1, n = 0;
  r.baru.forEach(function (item, i) {
    var row = mulai + i;
    sh.getRange(row, CFG.COL_PRODI).setValue(item.prodi);
    sh.getRange(row, CFG.COL_MK).setValue(item.mk);
    sh.getRange(row, CFG.COL_PRODI, 1, 2).setBackground(CFG.WARNA_BARU);
    tulisBaris_(sh, row, cJad, cMgg, cTot, cSts,
                bangunBaris_(row, item.prodi, item.mk, item.entry, true));
    n++;
  });
  return { cocok: r.hasil.filter(function (h) { return h.ada; }).length, baru: n };
}
