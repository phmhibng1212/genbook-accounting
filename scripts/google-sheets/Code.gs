/**
 * Genbook — "Schedule a demo" form → Google Sheet.
 *
 * Paste this file into the spreadsheet's Extensions → Apps Script, run `setup()` once, then deploy as a web app
 * (README → "Contact form → Google Sheet").
 *
 * Tabs
 *   Data                       one row per submission (raw data, filterable)
 *   Ngày / Tuần / Tháng / Năm  pick a period in B1 to list its contacts; columns K:L count contacts per period
 *   Hướng dẫn                  short guide for whoever reads the sheet
 */

var TIME_ZONE = 'Asia/Ho_Chi_Minh';
var DATA = 'Data';
var COLS = ['Thời gian', 'Ngày', 'Tuần', 'Tháng', 'Năm', 'Ngôn ngữ', 'Họ tên', 'Số điện thoại', 'Email', 'Lĩnh vực', 'Công ty', 'Lời nhắn', 'Trang gửi'];
var WIDTHS = [150, 90, 80, 75, 60, 80, 170, 120, 210, 160, 170, 340, 240];
var GREEN = '#1EB71B';
var INK = '#121212';
var PALE = '#F5FFF5';

// period tabs: name, column of that period in Data, label, whether the value is a number
var PERIODS = [
  { name: 'Ngày', col: 'B', label: 'ngày', numeric: false, hint: 'vd 2026-10-21' },
  { name: 'Tuần', col: 'C', label: 'tuần', numeric: false, hint: 'vd 2026-W43 (tuần ISO, thứ Hai đầu tuần)' },
  { name: 'Tháng', col: 'D', label: 'tháng', numeric: false, hint: 'vd 2026-10' },
  { name: 'Năm', col: 'E', label: 'năm', numeric: true, hint: 'vd 2026' },
];

var LIMITS = { fullName: 120, phone: 30, email: 254, industry: 120, company: 160, message: 2000, language: 5, page: 300 };

/** Builds every tab. Safe to run again: it only creates what is missing and rewrites the formulas. */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIME_ZONE);
  ss.setSpreadsheetLocale('vi_VN');

  var data = ss.getSheetByName(DATA) || ss.getSheets()[0].setName(DATA);
  buildData_(data);
  PERIODS.forEach(function (p) { buildPeriod_(ss, p); });
  buildGuide_(ss);
  ss.setActiveSheet(data);
}

function header_(range) {
  range.setBackground(GREEN).setFontColor('#FFFFFF').setFontWeight('bold').setVerticalAlignment('middle');
}

function buildData_(sheet) {
  sheet.getRange(1, 1, 1, COLS.length).setValues([COLS]);
  header_(sheet.getRange(1, 1, 1, COLS.length));
  sheet.setRowHeight(1, 28);
  sheet.setFrozenRows(1);
  WIDTHS.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
  // period columns are plain text, so "2026-10-21" / "2026-W43" are never turned into dates
  ['B:D', 'F:M'].forEach(function (a) { sheet.getRange(a).setNumberFormat('@'); });
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('E:E').setNumberFormat('0');
  if (!sheet.getFilter()) sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), COLS.length).createFilter();
  sheet.setTabColor(GREEN);
}

function buildPeriod_(ss, p) {
  var sheet = ss.getSheetByName(p.name) || ss.insertSheet(p.name);
  sheet.clear();
  sheet.setTabColor(GREEN);

  sheet.getRange('A1').setValue('Lọc theo ' + p.label + ':').setFontWeight('bold');
  sheet.getRange('B1').setBackground(PALE).setFontWeight('bold').setFontSize(12).setNumberFormat(p.numeric ? '0' : '@')
    .setBorder(true, true, true, true, false, false, '#D9D9D9', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange('C1').setValue('← chọn ' + p.label + ' (' + p.hint + '). Để trống = hiện tất cả.')
    .setFontStyle('italic').setFontColor('#737373');

  sheet.getRange('A2').setValue('Số liên hệ:').setFontWeight('bold');
  sheet.getRange('B2')
    .setFormula('=IF($B$1="",COUNTA(Data!$A$2:$A),COUNTIF(Data!$' + p.col + '$2:$' + p.col + ',$B$1))')
    .setFontWeight('bold').setFontSize(14).setFontColor(GREEN).setHorizontalAlignment('left');

  var listCols = ['Thời gian', 'Ngôn ngữ', 'Họ tên', 'Số điện thoại', 'Email', 'Lĩnh vực', 'Công ty', 'Lời nhắn', 'Trang gửi'];
  sheet.getRange(4, 1, 1, listCols.length).setValues([listCols]);
  header_(sheet.getRange(4, 1, 1, listCols.length));
  [150, 80, 170, 120, 210, 160, 170, 340, 240].forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

  var cond = p.numeric ? '"' + p.col + ' = "&$B$1' : '"' + p.col + ' = \'"&$B$1&"\'"';
  sheet.getRange('A5').setFormula(
    '=IFERROR(QUERY(Data!$A$2:$M,"select A,F,G,H,I,J,K,L,M where "&IF($B$1="","A is not null",' + cond + ')&" order by A desc",0),"Chưa có dữ liệu")');
  sheet.getRange('A5:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange('D5:E').setNumberFormat('@');

  // summary: one row per period (newest first); it also feeds the dropdown in B1
  sheet.getRange('K3').setValue('Tổng hợp theo ' + p.label).setFontWeight('bold');
  sheet.getRange('K4:L4').setValues([[p.name, 'Số liên hệ']]);
  header_(sheet.getRange('K4:L4'));
  sheet.getRange('K5').setFormula(
    '=IFERROR(QUERY(Data!$A$2:$M,"select ' + p.col + ', count(A) where A is not null group by ' + p.col + ' order by ' + p.col + ' desc",0),"")');
  sheet.getRange('K5:K').setNumberFormat(p.numeric ? '0' : '@');
  sheet.setColumnWidth(10, 30); sheet.setColumnWidth(11, 110); sheet.setColumnWidth(12, 90);

  sheet.getRange('B1').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(sheet.getRange('K5:K1000'), true).setAllowInvalid(true).build());
  sheet.setFrozenRows(4);
}

function buildGuide_(ss) {
  var sheet = ss.getSheetByName('Hướng dẫn') || ss.insertSheet('Hướng dẫn');
  sheet.clear();
  var lines = [
    'Bảng này nhận yêu cầu "Schedule a demo" từ website Genbook.',
    '',
    'Tab Data: mỗi lần khách gửi form là một dòng mới. Đừng xoá dòng tiêu đề; có thể lọc/sắp xếp ngay trên tab này.',
    '   Thời gian: giờ gửi (múi giờ Asia/Ho_Chi_Minh). Ngày / Tuần / Tháng / Năm: được điền sẵn để lọc và thống kê.',
    '   Tuần theo chuẩn ISO (thứ Hai là ngày đầu tuần), ví dụ 2026-W43.',
    '',
    'Tab Ngày / Tuần / Tháng / Năm: chọn một kỳ ở ô B1 để xem các liên hệ trong kỳ đó (để trống = tất cả).',
    '   Bảng bên phải (cột K:L) tự đếm số liên hệ theo từng kỳ, mới nhất ở trên. Không cần nhập tay.',
    '',
    'Không nhập tay vào các ô công thức (vùng bắt đầu từ ô A5 và K5 của các tab thống kê).',
  ];
  sheet.getRange(1, 1, lines.length, 1).setValues(lines.map(function (l) { return [l]; }));
  sheet.getRange('A1').setFontWeight('bold').setFontSize(12);
  sheet.setColumnWidth(1, 820);
}

/* ---------------- web app ---------------- */

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var v = clean_(body);
    if (!v.fullName || !v.phone || !v.email) return json_({ ok: false, error: 'missing required fields' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return json_({ ok: false, error: 'invalid email' });

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA);
      var now = new Date();
      var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone() || TIME_ZONE;
      var row = [
        now,
        Utilities.formatDate(now, tz, 'yyyy-MM-dd'),
        isoWeek_(now, tz),
        Utilities.formatDate(now, tz, 'yyyy-MM'),
        Number(Utilities.formatDate(now, tz, 'yyyy')),
        v.language,
        v.fullName, v.phone, v.email, v.industry, v.company, v.message, v.page,
      ];
      // text columns are formatted as plain text first, so a value such as "=SUM(1)" or "+84…" is stored as typed
      var target = sheet.getLastRow() + 1;
      sheet.getRange(target, 2, 1, 3).setNumberFormat('@');
      sheet.getRange(target, 6, 1, 8).setNumberFormat('@');
      sheet.getRange(target, 1, 1, row.length).setValues([row]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'server error' });
  }
}

/** Lets you open the /exec URL in a browser to check the deployment. */
function doGet() {
  return json_({ ok: true, service: 'genbook-contact' });
}

function clean_(body) {
  var out = {};
  Object.keys(LIMITS).forEach(function (k) {
    out[k] = String(body[k] == null ? '' : body[k]).trim().slice(0, LIMITS[k]);
  });
  out.language = out.language === 'vi' ? 'vi' : 'en';
  return out;
}

/** ISO 8601 week ("2026-W43"): weeks start on Monday, week 1 holds the year's first Thursday. */
function isoWeek_(date, tz) {
  var y = Number(Utilities.formatDate(date, tz, 'yyyy'));
  var m = Number(Utilities.formatDate(date, tz, 'M'));
  var d = Number(Utilities.formatDate(date, tz, 'd'));
  var t = new Date(Date.UTC(y, m - 1, d));
  var day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  var yearStart = Date.UTC(t.getUTCFullYear(), 0, 1);
  var week = Math.ceil(((t.getTime() - yearStart) / 86400000 + 1) / 7);
  return t.getUTCFullYear() + '-W' + (week < 10 ? '0' + week : week);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
