const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function compTime(a, b) {
  var arr = a.split("-");
  var nowtime = new Date(arr[0], arr[1], arr[2]);
  var nowtimes = nowtime.getTime();

  var arrs = b.split("-");
  var lktime = new Date(arrs[0], arrs[1], arrs[2]);
  var lktimes = lktime.getTime();

  if (nowtimes > lktimes) {
    return false;
  }
  else {
    return true;
  }
}

//成功提示
function showSuccess(title = "成功啦", duration = 2500) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: (duration <= 0) ? 2500 : duration
  });
}
//loading提示
function showLoading(title = "加载中...", duration = 5000) {
  wx.showToast({
    title: title,
    icon: 'loading',
    duration: (duration <= 0) ? 5000 : duration
  });
}
//隐藏提示框
function hideToast() {
  wx.hideToast();
}

//显示带取消按钮的消息提示框
function alertViewWithCancel(title = "提示", content = "消息提示", confirm, showCancel = "true") {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  });
}
//显示不取消按钮的消息提示框
function alertView(title = "提示", content = "消息提示", confirm) {
  alertViewWithCancel(title, content, confirm, false);
}

//验证手机号码
function validateMobile(mobile) {
  if (mobile.length == 0) {
    return false;
  }
  if (mobile.length != 11) {
    return false;
  }
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!myreg.test(mobile)) {
    return false;
  } else {
    return true;
  }
} 

//预产期计算
function yuchanDate(year, month, day, mweek) {
  if (year == '' || month == '' || day == '') {
    alertView("温馨提示", "请填写正确的末次月经时间!", confirm);
    return false;
  }
  if (parseInt(mweek) < 20 || parseInt(mweek) > 45 || isNaN(parseInt(mweek))) {
    //alert("请填写正确的月经周期" + mweek);
    alertView("温馨提示", "请填写正确的月经周期!", confirm);
    return false;
  }


  var stime = new Date();
  stime.setFullYear(year);
  stime.setMonth(month - 1);
  stime.setDate(day);
  var yue = mweek;
  var true_number = 280;
  if (yue < 28) {
    true_number = 280 - (28 - yue);
  } else if (yue > 28) {
    true_number = 280 + (yue - 28);
  } else if (yue == 28) {
    true_number = 280;
  }

  var temptime = stime.getTime();
  stime.setTime((stime.getTime() + true_number * 24 * 3600 * 1000))
  var yuchan = stime.getFullYear() + "-" + (stime.getMonth() + 1) + "-" + stime.getDate();
  var nowt = new Date();
  var chatime = nowt.getTime() - temptime;
  var chaweek = Math.floor((chatime) / (1000 * 60 * 60 * 24 * 7));
  var chaweek_1 = Math.floor((chatime) / (1000 * 60 * 60 * 24));
  if (chaweek < 0) chaweek = 0;
  if (chaweek_1 > (true_number + 14)) {
    alertView("温馨提示", "你的预产期已过!", confirm);
    return false;
  } else {
    return { "yuchanDate": yuchan, "yunZhou": chaweek };
  }
}

//排卵期
function pailuan(year, month, day, mweek) {
  if (year == '' || month == '' || day == '') {
    alertView("温馨提示", "请填写正确的末次月经时间!", confirm);
    return false;
  }
  if (parseInt(mweek) < 20 || parseInt(mweek) > 45 || isNaN(parseInt(mweek))) {
    alertView("温馨提示", "请填写正确的月经周期!", confirm);
    return false;
  }

  var stime = new Date();
  stime.setFullYear(year);
  stime.setMonth(month - 1);
  stime.setDate(day);
  var tempTime = stime.getTime();
  var startTime = new Date(tempTime + mweek * 24 * 3600 * 1000 - 14 * 24 * 3600 * 1000 - 5 * 24 * 3600 * 1000);
  var endTime = new Date(tempTime + mweek * 24 * 3600 * 1000 - 14 * 24 * 3600 * 1000 + 4 * 24 * 3600 * 1000);

  var pailuanStart = startTime.getFullYear() + "-" + (Number(startTime.getMonth()) + 1) + "-" + startTime.getDate();
  var pailuanEnd = endTime.getFullYear() + "-" + (Number(endTime.getMonth()) + 1) + "-" + endTime.getDate();

  return { "pailuanStart": pailuanStart, "pailuanEnd": pailuanEnd };

}

//计算宝宝身高
function getHei(fHeig, mHeig, bbxb) {
  fHeig = parseFloat(fHeig) || 0;
  mHeig = parseFloat(mHeig) || 0;
  var cHeig = (bbxb == 0) ? (fHeig + mHeig) * 1.08 / 2 : (fHeig * 0.923 + mHeig) / 2;
  return { "bbh": cHeig.toFixed(1) + "cm(厘米)" };
}

//测试血型
function checkBlood(b1, b2) {
  var result = '';
  if (b1 == 'A' && b2 == 'B') result = ' A 型、B 型、AB 型、O 型';
  if (b1 == 'B' && b2 == 'A') result = ' A 型、B 型、AB 型、O 型';
  if (b1 == 'A' && b2 == 'A') result = ' A 型或 O 型，不可能为 B 型 和 AB 型';
  if (b1 == 'A' && b2 == 'O') result = ' A 型或 O 型，不可能为 B 型 和 AB 型';
  if (b1 == 'O' && b2 == 'A') result = ' A 型或 O 型，不可能为 B 型 和 AB 型';
  if (b1 == 'A' && b2 == 'AB') result = ' A 型 、B型 及 AB型之一，不可能为 O 型';
  if (b1 == 'AB' && b2 == 'A') result = ' A 型 、B型 及 AB型之一，不可能为 O 型';
  if (b1 == 'B' && b2 == 'B') result = ' B 型或 O 型，不可能为 A 型 和 AB 型';
  if (b1 == 'B' && b2 == 'O') result = ' B 型或 O 型，不可能为 A 型 和 AB 型';
  if (b1 == 'O' && b2 == 'B') result = ' B 型或 O 型，不可能为 A 型 和 AB 型';
  if (b1 == 'B' && b2 == 'AB') result = ' A 型 、B型 及 AB型之一，不可能为 O 型';
  if (b1 == 'AB' && b2 == 'B') result = ' A 型 、B型 及 AB型之一，不可能为 O 型';
  if (b1 == 'O' && b2 == 'O') result = ' O 型，不可能为 A 型、B 型和 AB 型';
  if (b1 == 'O' && b2 == 'AB') result = ' A 型或 B 型，不可能为 O 型 和 AB 型';
  if (b1 == 'AB' && b2 == 'O') result = ' A 型或 B 型，不可能为 O 型 和 AB 型';
  if (b1 == 'AB' && b2 == 'AB') result = ' A 型 、B型 及 AB型之一，不可能为 O 型';
  if (result.length > 0) return { "result": result };
}

//孕末体重测试
function getWei(val1, val2) {
  if (!val1) {
    alertView("温馨提示", "请填写正确的身高!", confirm);
    return false;
  }
  if (!val2) {
    alertView("温馨提示", "请填写正确的孕前体重!", confirm);
    return false;
  }
  var setR;
  var Hig = parseFloat(val1) / 100;
  var Wei = parseFloat(val2);
  var bmi = Wei / (Hig * Hig)
  bmi = bmi.toFixed(1)
  if (bmi < 19.8) setR = (Wei + 12.5) + " - " + (Wei + 18)
  else if (bmi >= 19.8 && bmi <= 26) setR = (Wei + 11.5) + " - " + (Wei + 16)
  else if (bmi > 26 && bmi <= 30) setR = (Wei + 7) + " - " + (Wei + 11.5)
  else setR = "大于6"
  return { 'yfweight': setR + "公斤" }
}

function ForDight(Dight, How) {
  Dight = Math.round(Dight * Math.pow(10, How)) / Math.pow(10, How);
  return Dight;
}

/**
 *  胎儿B超体重计算
 */
function getWeight(Jsd, Jfw, Jgg) {
  var BDP, AC, FL, wei, jin, res, ke;
  if (!Jsd) {
    alertView("温馨提示", "请输入双顶径值!", confirm);
    return;
  }
  if (!Jfw) {
    alertView("温馨提示", "请输入腹围值!", confirm);
    return;
  }
  if (!Jgg) {
    alertView("温馨提示", "请输入股骨长值!", confirm);
    return;
  }
  BDP = Jsd;
  AC = Jfw;
  FL = Jgg;
  wei = 1.07 * BDP * BDP * BDP + 0.3 * AC * AC * FL;
  jin = ForDight(wei / 500, 2);
  ke = ForDight(wei, 0);

  return { "jin": jin+"斤", "ke": ke+"克"}
}

var getNowYear = function () {
  /* 得到现在的年 */
  var date = new Date();
  return date.getFullYear();
};

var getNowMonth = function () {
  var date = new Date();
  return date.getMonth() + 1;
}

//疫苗接种时间计算
function getYmDays(Jcal) {
  if (Jcal!= '') {
    var a = Jcal.split('-');
    var birthDate = new Date(a[0], a[1], a[2]);
    return {
    "ymDate1" : dateByMonth(birthDate, 0),
    "ymDate2" : dateByMonth(birthDate, 0),
    "ymDate3" : dateByMonth(birthDate, 1),
    "ymDate4" : dateByMonth(birthDate, 2),
    "ymDate5" : dateByMonth(birthDate, 3),
    "ymDate6" : dateByMonth(birthDate, 3),
    "ymDate7" : dateByMonth(birthDate, 3),
    "ymDate8" : dateByMonth(birthDate, 4),
    "ymDate9" : dateByMonth(birthDate, 4),
    "ymDate10" : dateByMonth(birthDate, 5),
    "ymDate11" : dateByMonth(birthDate, 6),
    "ymDate12" : dateByMonth(birthDate, 8),
    "ymDate13" : dateByMonth(birthDate, 12),
    "ymDate14" : dateByMonth(birthDate, 18) + " ～ " + dateByMonth(birthDate, 24),
    "ymDate15" : dateByMonth(birthDate, 18) + " ～ " + dateByMonth(birthDate, 24),
    "ymDate16" : dateByMonth(birthDate, 18) + " ～ " + dateByMonth(birthDate, 24),
    "ymDate17" : dateByMonth(birthDate, 48),
    "ymDate18" : dateByMonth(birthDate, 48),
    "ymDate19" : dateByMonth(birthDate, 84),
    "ymDate20" : dateByMonth(birthDate, 84),
    "ymDate21" : dateByMonth(birthDate, 84),
    "ymDate22" : dateByMonth(birthDate, 144)
    }
  } else {

    alertView("温馨提示", "您什么都不输入，让我们很为难!", confirm);

  }

}

function dateByMonth(myDate, month) {
  var tempDate = new Date(myDate);
  tempDate.setMonth(tempDate.getMonth() + month);
  var dateString = tempDate.getFullYear() + "-" + tempDate.getMonth() + "-" + tempDate.getDate();
  return dateString;
}


module.exports = {
  formatTime: formatTime,
  compTime: compTime,
  showSuccess: showSuccess,
  showLoading: showLoading,
  hideToast: hideToast,
  alertViewWithCancel: alertViewWithCancel,
  alertView: alertView,
  validateMobile: validateMobile,
  yuchanDate: yuchanDate,
  pailuan: pailuan,
  getHei: getHei,
  checkBlood: checkBlood,
  getWei: getWei,
  getWeight: getWeight,
  getYmDays: getYmDays
}



