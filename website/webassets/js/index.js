var packageLists = [];
var unsortedList = [];
var categories = [];
var addedPackages = [];
var showunsorted = true;
var category = 0;

if ("category" in localStorage) {
  category = JSON.parse(localStorage.getItem("category"));
} else {
  localStorage.setItem("category", JSON.stringify(category));
}
if ("packageLists" in localStorage) {
  packageLists = JSON.parse(localStorage.getItem("packageLists"));
} else {
  localStorage.setItem("packageLists", JSON.stringify(packageLists));
}
if ("categories" in localStorage) {
  categories = JSON.parse(localStorage.getItem("categories"));
} else {
  localStorage.setItem("categories", JSON.stringify(categories));
}
if ("unsortedList" in localStorage) {
  unsortedList = JSON.parse(localStorage.getItem("unsortedList"));
} else {
  localStorage.setItem("unsortedList", JSON.stringify(unsortedList));
}
if ("addedPackages" in localStorage) {
  addedPackages = JSON.parse(localStorage.getItem("addedPackages"));
} else {
  localStorage.setItem("addedPackages", JSON.stringify(addedPackages));
}
if ("showunsorted" in localStorage) {
  showunsorted = JSON.parse(localStorage.getItem("showunsorted"));
} else {
  localStorage.setItem("showunsorted", JSON.stringify(showunsorted));
}

var systemPackages = [
  "com.android.deskclock",
  "de.eye_interactive.atvl.settings",
  "com.oculus.systemactivities",
  "net.dinglisch.android.taskerm",
  "com.joaomgcd.autoapps",
  "com.joaomgcd.autotools"
];

function checkDuplicateAndMissing() {
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      if (unsortedList.indexOf(packageLists[i][u][0]) == parseInt("-1")) {
        packageLists[i].splice(u, 1);
      }
    }
  }
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      for (var o = 0; o < unsortedList.length; o++) {
        if (packageLists[i][u][0] == unsortedList[o]) {
          unsortedList.splice(o, 1);
        }
      }
    }
  }
  localStorage.setItem("unsortedList", JSON.stringify(unsortedList));
  localStorage.setItem("packageLists", JSON.stringify(packageLists));
}

function createPageBase() {
  $("<div/>", {
    id: "buttondivcontainer",
    style: "padding-bottom:20px",
    class: "text-center navbar navbar-fixed-top"
  }).prependTo("#body");
  $("<div/>", {
    id: "categoriesdiv"
  }).appendTo("#body");
  $(".sort").sortable({
    handle: "input",
    cancel: "",
    items: ".sortable"
  });
}
createPageBase();

function generateCategoriesHTML() {
  for (var i = 0; i < categories.length; i++) {
    $("#categorylist").append(
      '<option value="' + i + '">' + categories[i][1] + "</option>"
    );
    $("<div/>", {
      id: categories[i][0] + "buttondiv",
      style: "padding-bottom: 5px;",
      class: "btn-group sortable",
      catname: categories[i][1]
    }).prependTo("#buttondiv");
    if (i != 0) {
      $("<input/>", {
        id: categories[i][0] + "delbtn",
        class: "btn btn-dark delbtn",
        value: "X",
        type: "button"
      }).prependTo("#" + categories[i][0] + "buttondiv");
    }
    $("<input/>", {
      id: categories[i][0] + "btn",
      class: "btn btn-secondary",
      onclick:
        '$(".areadivs").hide();$("#" + $(this).attr("id").replace("btn", "")).show()',
      value: categories[i][1],
      type: "button"
    }).prependTo("#" + categories[i][0] + "buttondiv");
    $("<div/>", {
      id: categories[i][0],
      class: "full-height text-center row flex-row areadivs"
    }).appendTo("#categoriesdiv");
    var currentnav = categories[i][0];
    var currentdiv = "#" + categories[i][0];
    var currentbtn = "#" + categories[i][0] + "btn";
    var currentdelbtn = "#" + categories[i][0] + "delbtn";
    $(currentdelbtn).click(function() {
      var delysno = confirm(
        "Are you sure you want to delete the nav bar item " + currentnav + "?"
      );
      if (delysno == true) {
        var thisdiv = $(this)
          .attr("id")
          .replace("delbtn", "");
        var thisbtndiv = $(this)
          .attr("id")
          .replace("delbtn", "buttondiv");

        function getThisCat() {
          for (var i = 0; i < categories.length; i++) {
            if (categories[i][0] === thisdiv) {
              return i;
            }
          }
        }
        var thiscatnum = getThisCat();
        $("#" + thisdiv).remove();
        $("#" + thisbtndiv).remove();
        for (var i = 0; i < packageLists[thiscatnum].length; i++) {
          unsortedList.push(packageLists[thiscatnum][i][0]);
        }
        categories.splice(thiscatnum, 1);
        packageLists.splice(thiscatnum, 1);
        localStorage.setItem("packageLists", JSON.stringify(packageLists));
        localStorage.setItem("unsortedList", JSON.stringify(unsortedList));
        localStorage.setItem("categories", JSON.stringify(categories));
        location.reload();
      }
    });
  }
  $(function() {
    var $sortable = $(".sort");
    var positions = JSON.parse(localStorage.getItem("positions"));
    if (positions) {
      $.each(positions, function(i, position) {
        var $target = $sortable.find("#" + position);
        $target.appendTo($sortable); // or prependTo for reverse
      });
    }

    $sortable.sortable({
      update: saveNewOrder
    });

    function saveNewOrder() {
      var positions = JSON.stringify($sortable.sortable("toArray"));
      localStorage.setItem("positions", positions);
    }
  });
}

function createCategory(catname) {
  if (catname == "") {
    alert(
      "If you want to create a new Navigation Bar Item you need to add a name for it!"
    );
  } else {
    var arenoduplicates = true;
    for (var i = 0; i < categories.length; i++) {
      if (JSON.stringify(categories[i]).includes(catname) == true) {
        arenoduplicates = false;
      }
    }
    if (arenoduplicates == true) {
      catid = catname.replace(/\s/g, "").replace(/\W/g, "");
      categories.push([catid, catname]);
      packageLists.push([]);
      localStorage.setItem("packageLists", JSON.stringify(packageLists));
      localStorage.setItem("categories", JSON.stringify(categories));
      localStorage.setItem("category", JSON.stringify(catname));
      category = 0;
      localStorage.setItem("category", JSON.stringify(category));
      location.reload();
    } else {
      alert(
        "Please use a name that has not already been used for another Navigation Bar Item."
      );
      $("#newcatname").val("");
    }
  }
}

function deletePackage(cat, arraypos) {
  if (addedPackages.indexOf(packageLists[cat][arraypos][0]) != parseInt("-1")) {
    if (
      unsortedList.indexOf(packageLists[cat][arraypos][0]) == parseInt("-1")
    ) {
      unsortedList.push(
        addedPackages[addedPackages.indexOf(packageLists[cat][arraypos][0])]
      );
    }
    addedPackages.splice(
      addedPackages.indexOf(packageLists[cat][arraypos][0]),
      1
    );
    localStorage.setItem("addedPackages", JSON.stringify(addedPackages));
    localStorage.setItem("unsortedList", JSON.stringify(unsortedList));
  }
  generateUnsortedList();
}

function generatePackagesHTML() {
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      var catarraynum = "#" + categories[i][0];
      var applink =
        '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:=';
      var imagelink =
        '"><img style="width:150px;height:84px" src="resources/png/';
      var noimagelink =
        '" onerror="javascript:this.src=\'website/webassets/notfound.png\'" /><p>';
      var deletebutton =
        '<input class="btn btn-sm btn-link delbtn" onclick="$(\'#' +
        packageLists[i][u][0].replace(/\./g, "") +
        "').remove();deletePackage(" +
        i +
        ", " +
        u +
        ");packageLists[" +
        i +
        "].splice(" +
        u +
        ', 1);localStorage.setItem(\'packageLists\', JSON.stringify(packageLists));location.reload()" type="button" style="position:absolute;right:12px;bottom:38px;color:red;" value="&#10005;">';
      var bbtn =
        '<a class="btn btn-sm btn-link brsbtn" href="autotoolscommand://backupappdata=:=' +
        packageLists[i][u][0] +
        '" style="position:absolute;left:10px;top:-20px;color:green"><i class="fas fa-sign-in-alt"></i></a>';
      var rbtn =
        '<a class="btn btn-sm btn-link brsbtn" href="autotoolscommand://restoreappdata=:=' +
        packageLists[i][u][0] +
        '" style="position:absolute;left:79px;top:-20px;color:blue"><i class="fas fa-sign-out-alt"></i></a>';
      var sbtn =
        '<a class="btn btn-sm btn-link brsbtn" href="autotoolscommand://openappsettings=:=' +
        packageLists[i][u][0] +
        '" style="position:absolute;left:148px;top:-20px;color:gray"><i class="fas fa-sliders-h"></i></a>';
      if (packageLists[i][u][3] != "1") {
        $(catarraynum).append(
          '<div style="width:190px;position:relative" id="' +
            packageLists[i][u][0].replace(/\./g, "") +
            applink +
            packageLists[i][u][0] +
            imagelink +
            packageLists[i][u][1] +
            noimagelink +
            packageLists[i][u][2] +
            "</p></a></div>\n"
        );
      } else {
        $(catarraynum).append(
          '<div style="width:190px;position:relative" id="' +
            packageLists[i][u][0].replace(/\./g, "") +
            applink +
            packageLists[i][u][0] +
            imagelink +
            packageLists[i][u][1] +
            noimagelink +
            packageLists[i][u][2] +
            "</p></a>" +
            deletebutton +
            bbtn +
            rbtn +
            sbtn +
            "</div>\n"
        );
      }
    }
  }
}

function sortPackages() {
  for (var i = 0; i < packageLists.length; i++) {
    packageLists[i].sort(
      (function() {
        return function(a, b) {
          return a[2] === b[2] ? 0 : a[2] < b[2] ? -1 : 1;
        };
      })()
    );
  }
}

function addPackage(packagename, imagefilename, appname, categoryn, deletable) {
  if (
    imagefilename != "" &&
    appname != "" &&
    packagename != "" &&
    categoryn != "" &&
    unsortedList.indexOf(packagename) != parseInt("-1")
  ) {
    packageLists[categoryn].push([
      packagename,
      imagefilename,
      appname,
      deletable
    ]);
    sortPackages();
    addedPackages.push(packagename);
    localStorage.setItem("addedPackages", JSON.stringify(addedPackages));
    unsortedList.splice(unsortedList.indexOf(packagename), 1);
    localStorage.setItem("unsortedList", JSON.stringify(unsortedList));
    var catarraynum = "#" + categories[categoryn][0];
    localStorage.setItem("packageLists", JSON.stringify(packageLists));
    category = categoryn;
    $("#pnamelist").val("");
    $("#appname").val("");
    $("#appicon").val("");
    $("#appiconfilename").html("no image selected");
    localStorage.setItem("category", JSON.stringify(categoryn));
    location.reload();
  } else {
    if (unsortedList.indexOf(packagename) == parseInt("-1")) {
      alert("Please make sure that you have selected a correct package name.");
    } else {
      alert(
        "Looks like your new link is missing one of the required elements!! Make sure you have an app package, a title, an image and an appropriate Navigation Bar Item selected, then try again"
      );
    }
  }
}

function generateUnsortedList() {
  $("#unsortedbuttondiv").remove();
  $("#unsortedlist").empty();
  $("#pnamedatalist").empty();
  unsortedList.sort();
  for (var i = 0; i < unsortedList.length; i++) {
    $("#unsortedlist").append(
      '<li id="' +
        unsortedList[i] +
        '"><a href="autotoolscommand://openapp=:=' +
        unsortedList[i] +
        '">' +
        unsortedList[i] +
        "</a></li>"
    );
    $("#pnamedatalist").append(
      '<option value="' + unsortedList[i] + '">' + unsortedList[i] + "</option>"
    );
  }
  $("#buttondiv").append(
    '<div id="unsortedbuttondiv" class="btn-group sortable" style="padding-bottom: 5px;"><input type="button" class="btn btn-secondary" value="Unsorted" id="unsortedbtn" onclick="$(\'.areadivs\').hide();$(\'#unsorteddiv\').show()"></div>'
  );
}

function clearUnsorted() {
  $("#unsortedbuttondiv").remove();
  showunsorted = false;
  localStorage.setItem("showunsorted", JSON.stringify(showunsorted));
}

function copyHTMLtoClipboard() {
  $("#htmlexporttextarea").show();
  var copyText = document.getElementById("htmlexporttextarea");
  copyText.select();
  document.execCommand("copy");
  $("#htmlexporttextarea").hide();
}

function exportHTML() {
  var minjs = `
  function checkToggle() {
    if ($('#togglebtns').prop('checked') == true) {
      $('.brsbtn').show()
    } else {
      $('.brsbtn').hide()
    }
  }
  function checkFTPToggle() {
    if ($('#togglebtns').prop('checked') == true) {
      window.location.href="tasker://StartFTPServer"
    } else {
      window.location.href="tasker://StopFTPServer"
    }
  }
  $('#togglebtnsdiv').append('<div style="position:absolute;left:10px;top:10px"><input id="togglebtns" type="checkbox" checked></div>')
  $('#togglebtns').bootstrapToggle({
      on: 'Edit ON',
      off: 'Edit OFF',
      onstyle: 'success',
      offstyle: 'danger'
    })
    if ('togglebtn' in localStorage) {
      $('#togglebtns').prop('checked', JSON.parse(localStorage.getItem('togglebtn'))).change()
    }
    checkToggle()
    $('#togglebtns').change(function() {
      localStorage.setItem('togglebtn', JSON.stringify($('#togglebtns').prop('checked')))
      checkToggle()
  })
  $('#toggleftpdiv').append('<div style="position:absolute;left:118px;top:10px"><input id="toggleftp" type="checkbox" checked></div>')
  $('#toggleftp').bootstrapToggle({
      on: 'FTP ON',
      off: 'FTP OFF',
      onstyle: 'success',
      offstyle: 'danger'
    })
    if ('toggleftp' in localStorage) {
      $('#toggleftp').prop('checked', JSON.parse(localStorage.getItem('toggleftp'))).change()
    }
    checkToggle()
    $('#toggleftp').change(function() {
      localStorage.setItem('toggleftp', JSON.stringify($('#toggleftp').prop('checked')))
      checkFTPToggle()
  })
  $('.areadivs').hide()
  var firstCat = $('#buttondiv :first-child').attr('id').replace('buttondiv', '')
  $('#' + firstCat).show()
  `;
  $("#changetotv").attr(
    "href",
    "autotoolscommand://openapp=:=com.reconquest.tv"
  );
  $("#changetohome").attr(
    "href",
    "autotoolscommand://openapp=:=com.reconquest.home"
  );
  $("#changemodebtndiv").show();
  $(".delbtn").hide();
  $("#settingsdiv").hide();
  $("#settingsbtn").hide();
  $("#scriptimport").removeAttr("src");
  $("#scriptimport").html(minjs);
  $("#htmlexporttextarea").val($("html")[0].outerHTML);
  $("#scriptimport").html("");
  $("#scriptimport").attr("src", "website/webassets/js/index.js");
  $("#settingsdiv").show();
  $("#settingsbtn").show();
  $(".delbtn").show();
  $("#clipbtn").show();
}

$(document).ready(function() {
  $(".areadivs").hide();
  $("#settingsdiv").show();
  $("#categorylist").val(category);
  if (unsortedList.length > 0 && showunsorted == true) {
    generateUnsortedList();
  }
  $("#settingsbtn").click(function() {
    $(".areadivs").hide();
    $("#settingsdiv").show();
  });
  $("#confirmcancelreset").hide();
  $("#startreset").click(function() {
    $(this).hide();
    $("#confirmcancelreset").show();
  });
  $("#confirmreset").click(function() {
    localStorage.clear("all");
    location.reload();
  });
  $("#cancelreset").click(function() {
    $("#confirmcancelreset").hide();
    $("#startreset").show();
  });
  $("#confirmcancelexport").hide();
  $("#startexport").click(function() {
    exportHTML();
    copyHTMLtoClipboard();
    $(this).hide();
    $("#confirmcancelexport").show();
  });
  $("#confirmexport").click(function() {
    copyHTMLtoClipboard();
    window.close();
  });
  $("#cancelexport").click(function() {
    $("#confirmcancelexport").hide();
    $("#startexport").show();
  });
  $("#htmlexporttextarea").hide();
  $("#clipbtn").hide();
  $("#textListInput").change(function() {
    var ext = this.value.split("\\")[this.value.split("\\").length - 1];
    switch (ext) {
      case "MyInstalledPackages.txt":
        if (this.files && this.files[0]) {
          var myFile = this.files[0];
          var reader = new FileReader();
          reader.addEventListener("load", function(e) {
            var lineEnding = "\n";
            if (e.target.result.indexOf("\r\n") != parseInt("-1")) {
              lineEnding = "\r\n";
            }
            var textByLine = e.target.result.split(lineEnding);
            unsortedList = systemPackages;
            for (var i = 0; i < textByLine.length; i++) {
              if (
                textByLine[i] != "" &&
                unsortedList.indexOf(textByLine[i]) == parseInt("-1")
              ) {
                unsortedList.push(textByLine[i]);
              }
            }
            generateUnsortedList();
            checkDuplicateAndMissing();
            showunsorted = true;
            localStorage.setItem("showunsorted", JSON.stringify(showunsorted));
            localStorage.setItem("unsortedList", JSON.stringify(unsortedList));
            location.reload();
          });
          reader.readAsBinaryString(myFile);
        }
        break;
      default:
        alert(
          "You can only load the file named MyInstalledPackages.txt, not " + ext
        );
        this.value = "";
    }
  });
  $("#imageInput").change(function() {
    var ext = this.value.match(/.([^.]+)$/)[1];
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
        $("#appicon").val(
          this.files && this.files.length ? this.files[0].name : ""
        );
        $("#appiconfilename").html(
          this.files && this.files.length ? this.files[0].name : ""
        );
        break;
      default:
        alert("Only JPG/JPEG/PNG formats are supported");
        this.value = "";
    }
  });
});
if (categories.length == 0) {
  createCategory("System Utilities");
} else {
  generateCategoriesHTML();
  generatePackagesHTML();
}
if (categories.length == 1 && packageLists[0].length == 0) {
  unsortedList = systemPackages;
  addPackage("com.android.deskclock", "alarm.png", "Alarm", "0", "0");
  addPackage(
    "de.eye_interactive.atvl.settings",
    "android-settings.png",
    "Device Settings",
    "0",
    "0"
  );
  addPackage(
    "com.oculus.systemactivities",
    "oculus-system.png",
    "Oculus Settings",
    "0",
    "0"
  );
  addPackage("net.dinglisch.android.taskerm", "tasker.png", "Tasker", "0", "0");
  addPackage("com.joaomgcd.autoapps", "autoapps.png", "Auto Apps", "0", "0");
  addPackage("com.joaomgcd.autotools", "autotools.png", "Auto Tools", "0", "0");
}
