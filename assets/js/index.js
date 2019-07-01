var packageLists = []
var packageListsHTML = []
var packageAreas = []
var navbarButtons = []

// VR Packages
packageLists[0] = ['com.oculus.tv', 'oculus.png', 'Oculus TV']
packageListsHTML[0] = []
packageAreas[0] = document.getElementById('vrapps')
navbarButtons[0] = document.getElementById('vrbtn')

// Legacy VR Packages (Oculus GO / Gear VR)
packageLists[1] = []
packageListsHTML[1] = []
packageAreas[1] = document.getElementById('legvrapps')
navbarButtons[1] = document.getElementById('legvrbtn')

// 2D Packages
packageLists[2] = ['net.dinglisch.android.taskerm', 'tasker.png', 'Tasker']
packageListsHTML[2] = []
packageAreas[2] = document.getElementById('2dapps')
navbarButtons[2] = document.getElementById('2dbtn')

// System Utilities
packageLists[3] = ['de.eye_interactive.atvl.settings', 'com.android.settings.png', 'Settings',
  'com.android.calendar', 'com.android.calendar.png', 'Calendar',
  'com.android.deskclock', 'com.android.deskclock.png', 'Clock',
  'com.oculus.systemactivities', 'oculus.png', 'System Activities'
]
packageListsHTML[3] = []
packageAreas[3] = document.getElementById('sysutils')
navbarButtons[3] = document.getElementById('sysutilsbtn')

// Unosorted Packages
packageLists[4] = []
packageListsHTML[4] = []
packageAreas[4] = document.getElementById('unsorted')
navbarButtons[4] = document.getElementById('unsortedbtn')

// Settings area placeholder

packageLists[5] = null
packageListsHTML[5] = null
packageAreas[5] = document.getElementById('settings')
navbarButtons[5] = document.getElementById('settingsbtn')

if ('packageLists' in localStorage) {
  packageLists = JSON.parse(localStorage.getItem('packageLists'))
} else {
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}

var activeButtonClass = 'btn btn-secondary btnwidth'
var hiddenAppAreaClass = 'hidden'
var visibleAppAreaClass = 'full-height text-center row flex-row'

var appOpenLinkStart = '<a class="btn btn-link" href="autotoolscommand://openapp=:='

var addPackageName = document.getElementById('pnamelist')
var addPackageTitle = document.getElementById('appname')
var addPackageImage = document.getElementById('appicon')

var fileinput = document.getElementById('textListInput')

function addApplicationToLists() {
  category = document.getElementById('categorylist').value
  packageLists[category].push(addPackageName.value)
  packageLists[category].push(addPackageImage.value)
  packageLists[category].push(addPackageTitle.value)
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  if (packageLists[4].indexOf(addPackageName.value) > parseInt('-1')) {
    packageLists[4].splice(packageLists[4].indexOf(addPackageName.value), 1)
  }
  packageListsToHTML()
  htmlListsCreate()
  checkEmptyTabs()
  addPackageName.value = ''
  addPackageImage.value = ''
  addPackageTitle.value = ''
}

fileinput.addEventListener("change", function() {
  if (this.files && this.files[0]) {
    var myFile = this.files[0]
    var reader = new FileReader()
    reader.addEventListener('load', function(e) {
      var textByLine = e.target.result.split("\n")
      packageLists[4] = []
      for (var i = 0; i < textByLine.length; i++) {
        if (textByLine[i] != '') {
          var pNameSplit = textByLine[i].split('.')
          packageLists[4][i] = textByLine[i]
        }
      }
      localStorage.setItem('packageLists', JSON.stringify(packageLists))
      packageListsToHTML()
      htmlListsCreate()
      checkEmptyTabs()
    })
    reader.readAsBinaryString(myFile)
  }
})

function clearUnsorted() {
  packageLists[4] = []
  packageListsHTML[4] = []
  packageAreas[4].innerHTML = ''
  navbarButtons[4].className = 'hidden'
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  document.getElementById('pnameenterlabel').innerHTML = 'Enter package name:'
}

function checkEmptyTabs() {
  for (var i = 0; i < packageLists.length; i++) {
    if (i == 5) {
      // do nothing
    } else {
      if (packageLists[i] == null || packageLists[i].length < 1 || packageLists[i] == undefined || packageLists[i] == '') {
        navbarButtons[i].className = 'hidden'
      } else {
        navbarButtons[i].className = activeButtonClass
      }
    }
  }
}

function packageListsToHTML() {
  for (var i = 0; i < packageListsHTML.length; i++) {
    packageListsHTML[i] = []
  }
  for (var u = 0; u < packageLists.length; u++) {
    if (u == 4 || u == 5) {
      // do nothing
    } else {
      for (var i = 0; i < packageLists[u].length; i++) {
        if (packageLists[u][i + 1] == '') {
          packageLists[u][i + 1] = 'notfound.png'
        }
        if (packageLists[u][i + 2] == '') {
          var pNameSplit = packageLists[u][i].split('.')
          packageLists[u][i + 2] = pNameSplit[pNameSplit.length - 1]
        }
        packageListsHTML[u].push(appOpenLinkStart + packageLists[u][i] + '"><img style="width:150px" src="assets/app-icons/' + packageLists[u][i + 1] + '" /><p>' + packageLists[u][i + 2] + '</p></a>')
        i++
        i++
      }
    }
  }
  document.getElementById('pnamedatalist').innerHTML = ''
  for (var i = 0; i < packageLists[4].length; i++) {
    var pNameSplit = packageLists[4][i].split('.')
    pNameSplit = pNameSplit[pNameSplit.length - 1]
    if (pNameSplit.length > 20) {
      var cut2start = pNameSplit.length - 8
      var pNameSplitShort = pNameSplit.substr(0, 8) + ' ... ' + pNameSplit.substr(cut2start, pNameSplit.length)
      packageListsHTML[4][i] = '<li class="listwrap">' + appOpenLinkStart + packageLists[4][i] + '"><p>' + pNameSplitShort + '</p></a></li>'
    } else {
      packageListsHTML[4][i] = '<li class="listwrap">' + appOpenLinkStart + packageLists[4][i] + '"><p>' + pNameSplit + '</p></a></li>'
    }
    document.getElementById('pnamedatalist').innerHTML += '<option id="' + packageLists[4][i] + '" value="' + packageLists[4][i] + '">' + packageLists[4][i] + '</option>'
  }
}
packageListsToHTML()

function showArea(area) {
  for (var i = 0; i < packageAreas.length; i++) {
    if (i != area) {
      packageAreas[i].className = 'hidden'
    }
  }
  if (area == 4 || area == 5) {
    packageAreas[area].className = 'full-height'
  } else {
    packageAreas[area].className = visibleAppAreaClass
  }
}

checkEmptyTabs()

function htmlListsCreate() {
  for (var u = 0; u < packageLists.length; u++) {
    packageAreas[u].innerHTML = ''
    for (var i = 0; i < packageListsHTML[u].length; i++) {
      packageAreas[u].innerHTML += packageListsHTML[u][i]
    }
  }
}
htmlListsCreate()

function checkClearAll() {
  document.getElementById('startreset').className = 'hidden'
  document.getElementById('confirmdenyreset').className = 'btn-group flex-row'
}

function confirmClearAll() {
  packageLists[0] = []
  packageLists[1] = []
  packageLists[2] = []
  packageLists[3] = []
  packageLists[4] = []
  localStorage.clear()
  checkEmptyTabs()
  packageListsToHTML()
  htmlListsCreate()
  document.getElementById('startreset').className = 'btn btn-danger btn-block'
  document.getElementById('confirmdenyreset').className = 'hidden'
}

function dontClearAll() {
  document.getElementById('startreset').className = 'btn btn-danger btn-block'
  document.getElementById('confirmdenyreset').className = 'hidden'
}

function exportHTML() {
  var pagehtml = '<!DOCTYPE HTML>' + '\n' + document.documentElement.outerHTML
  var scriptcallstring = '<script src="assets/js/index.js">'
  var customcssstring = '<link href="assets/css/style.css" rel="stylesheet">'
  var minscript = `
  var packageAreas[5] = document.getElementById('settings');
  var navbarButtons[0] = document.getElementById('vrbtn');
  var packageAreas[0] = document.getElementById('vrapps');
  var navbarButtons[1] = document.getElementById('legvrbtn');
  var packageAreas[1] = document.getElementById('legvrapps');
  var navbarButtons[2] = document.getElementById('2dbtn');
  var packageAreas[2] = document.getElementById('2dapps');
  var navbarButtons[3] = document.getElementById('navbarButtons[3]');
  var packageAreas[3] = document.getElementById('packageLists[3]');
  var navbarButtons[4] = document.getElementById('navbarButtons[4]');
  var packageAreas[4] = document.getElementById('packageLists[4]');
  packageAreas[5].className = 'hidden';
  var activeButtonClass = 'btn btn-secondary btnwidth';
  var hiddenAppAreaClass = 'hidden';
  var visibleAppAreaClass = 'full-height text-center row flex-row';
  document.getElementById('navbarButtons[5]').className = 'hidden';
  ${showVr}
  ${show2D}
  ${showLegVR}
  ${showpackageLists[3]}
  ${showpackageLists[4]}
  ${checkEmptyTabs}
  `
  var htmlforexport = pagehtml.replace(scriptcallstring, '<script>' + minscript)
  document.getElementById('htmlexporttextarea').innerHTML = htmlforexport
  document.getElementById('htmlexporttextarea').className = 'full-width-height'
  document.getElementById('clipbtn').className = 'btn btn-success btn-block'
}

function copyHTMLtoClipboard() {
  var copyText = document.getElementById("htmlexporttextarea")
  copyText.select()
  document.execCommand("copy")
}
