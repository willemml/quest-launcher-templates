var vrPackages = []
var vrPackagesHTML = []
if ('vrPackages' in localStorage) {
  vrPackages = localStorage.getItem('vrPackages').split(',')
}

var legacyVrApps = []
var legacyVrAppsHTML = []
if ('legacyVrApps' in localStorage) {
  legacyVrApps = localStorage.getItem('legacyVrApps').split(',')
}

var twoDPackages = []
var twoDPackagesHTML = []
if ('twoDPackages' in localStorage) {
  twoDPackages = localStorage.getItem('twoDPackages').split(',')
}

var sysutils = []
var sysutilsHTML = []
if ('sysutils' in localStorage) {
  sysutils = localStorage.getItem('sysutils').split(',')
}

var unsorted = []
var unsortedHTML = []
if ('unsorted' in localStorage) {
  unsorted = localStorage.getItem('unsorted').split(',')
}

var vrBtn = document.getElementById('vrbtn')
var vrAppArea = document.getElementById('vrapps')

var legacyBtn = document.getElementById('legvrbtn')
var legacyVrAppArea = document.getElementById('legvrapps')

var twoDBtn = document.getElementById('2dbtn')
var twoDAppArea = document.getElementById('2dapps')

var sysutilsBtn = document.getElementById('sysutilsbtn')
var sysutilsArea = document.getElementById('sysutils')

var unsortedBtn = document.getElementById('unsortedbtn')
var unsortedArea = document.getElementById('unsorted')

var settingsBtn = document.getElementById('settingsbtn')
var settingsArea = document.getElementById('settings')

var activeButtonClass = 'btn btn-secondary btnwidth'
var hiddenAppAreaClass = 'hidden'
var visibleAppAreaClass = 'full-height text-center row flex-row'

var appOpenLinkStart = '<a class="btn btn-link" href="autotoolscommand://openapp=:='

var addPackageName = document.getElementById('pnamelist')
var addPackageTitle = document.getElementById('appname')
var addPackageImage = document.getElementById('appicon')

var fileinput = document.getElementById('textListInput')

// quest home window height 564
// quest home window width = 751

function addApplicationToLists() {
  if (document.getElementById('categorielist').value == 'vrPackages') {
    vrPackages.push(addPackageName.value)
    vrPackages.push(addPackageImage.value)
    vrPackages.push(addPackageTitle.value)
    localStorage.setItem('vrPackages', vrPackages)
  }
  if (document.getElementById('categorielist').value == 'twoDPackages') {
    twoDPackages.push(addPackageName.value)
    twoDPackages.push(addPackageImage.value)
    twoDPackages.push(addPackageTitle.value)
    localStorage.setItem('twoDPackages', twoDPackages)
  }
  if (document.getElementById('categorielist').value == 'legacyVrApps') {
    legacyVrApps.push(addPackageName.value)
    legacyVrApps.push(addPackageImage.value)
    legacyVrApps.push(addPackageTitle.value)
    localStorage.setItem('legacyVrApps', legacyVrApps)
  }
  if (document.getElementById('categorielist').value == 'sysutils') {
    sysutils.push(addPackageName.value)
    sysutils.push(addPackageImage.value)
    sysutils.push(addPackageTitle.value)
    localStorage.setItem('sysutils', sysutils)
  }
  packageListsToHTML()
  htmlListsCreate()
  checkEmptyTabs()
}

fileinput.addEventListener("change", function() {
  if (this.files && this.files[0]) {
    var myFile = this.files[0]
    var reader = new FileReader()
    reader.addEventListener('load', function(e) {
      var textByLine = e.target.result.split("\n")
      unsorted = []
      for (var i = 0; i < textByLine.length; i++) {
        if (textByLine[i] != '') {
          var pNameSplit = textByLine[i].split('.')
          unsorted[i] = textByLine[i]
        }
      }
      localStorage.setItem('unsorted', unsorted)
      packageListsToHTML()
      htmlListsCreate()
      checkEmptyTabs()
    })
    reader.readAsBinaryString(myFile)
  }
})

function clearUnsorted() {
  localStorage.setItem('unsorted', [])
  unsorted = []
  unsortedHTML = []
  unsortedArea.innerHTML = ''
  unsortedBtn.className = 'hidden'
  document.getElementById('pnameenterlabel').innerHTML = 'Enter package name:'
}

function checkEmptyTabs() {
  if (vrPackages.length < 1 || vrPackages == undefined) {
    vrBtn.className = 'hidden'
  } else {
    vrBtn.className = activeButtonClass
  }
  if (twoDPackages.length < 1 || twoDPackages == undefined) {
    twoDBtn.className = 'hidden'
  } else {
    twoDBtn.className = activeButtonClass
  }
  if (sysutils.length < 1 || sysutils == undefined) {
    sysutilsBtn.className = 'hidden'
  } else {
    sysutilsBtn.className = activeButtonClass
  }
  if (legacyVrApps.length < 1 || legacyVrApps == undefined) {
    legacyBtn.className = 'hidden'
  } else {
    legacyBtn.className = activeButtonClass
  }
  if (unsorted == null || unsorted.length < 1 || unsorted == undefined) {
    unsortedBtn.className = 'hidden'
  } else {
    unsortedBtn.className = activeButtonClass
  }
}

function hideDiv(divs) {
  for (var i = 0; i < divs.length; i++) {
    divs[i].className = hiddenAppAreaClass
  }
}

function packageListsToHTML() {
  for (var i = 0; i < vrPackages.length; i++) {
    if (vrPackages[i + 1] == '') {
      vrPackages[i + 1] = 'notfound.png'
    }
    if (vrPackages[i + 2] == '') {
      var pNameSplit = vrPackages[i].split('.')
      vrPackages[i + 2] = pNameSplit[pNameSplit.length - 1]
    }
    vrPackagesHTML.push(appOpenLinkStart + vrPackages[i] + '"><img style="width:150px" src="assets/app-icons/vr/' + vrPackages[i + 1] + '" /><p>' + vrPackages[i + 2] + '</p></a>')
    i++
    i++
  }
  for (var i = 0; i < twoDPackages.length; i++) {
    if (twoDPackages[i + 1] == '') {
      twoDPackages[i + 1] = 'notfound.png'
    }
    if (twoDPackages[i + 2] == '') {
      var pNameSplit = twoDPackages[i].split('.')
      twoDPackages[i + 2] = pNameSplit[pNameSplit.length - 1]
    }
    twoDPackagesHTML.push(appOpenLinkStart + twoDPackages[i] + '"><img style="width:150px" src="assets/app-icons/2d/' + twoDPackages[i + 1] + '" /><p>' + twoDPackages[i + 2] + '</p></a>')
    i++
    i++
  }
  for (var i = 0; i < sysutils.length; i++) {
    if (sysutils[i + 1] == '') {
      sysutils[i + 1] = 'notfound.png'
    }
    if (vrPackages[i + 2] == '') {
      var pNameSplit = sysutils[i].split('.')
      sysutils[i + 2] = pNameSplit[pNameSplit.length - 1]
    }
    sysutilsHTML.push(appOpenLinkStart + sysutils[i] + '"><img style="width:150px" src="assets/app-icons/sysutils/' + sysutils[i + 1] + '" /><p>' + sysutils[i + 2] + '</p></a>')
    i++
    i++
  }
  for (var i = 0; i < unsorted.length; i++) {
    var pNameSplit = unsorted[i].split('.')
    pNameSplit = pNameSplit[pNameSplit.length - 1]
    if (pNameSplit.length > 20) {
      var cut2start = pNameSplit.length - 8
      var pNameSplitShort = pNameSplit.substr(0, 8) + ' ... ' + pNameSplit.substr(cut2start, pNameSplit.length)
      unsortedHTML[i] = '<li class="listwrap">' + appOpenLinkStart + unsorted[i] + '"><p>' + pNameSplitShort + '</p></a></li>'
    } else {
      unsortedHTML[i] = '<li class="listwrap">' + appOpenLinkStart + unsorted[i] + '"><p>' + pNameSplit + '</p></a></li>'
    }
  }
}
packageListsToHTML()

function showVr() {
  vrAppArea.className = visibleAppAreaClass
  var deactareas = [sysutilsArea, settingsArea, legacyVrAppArea, twoDAppArea, unsortedArea]
  hideDiv(deactareas)
  checkEmptyTabs()
}

function showSettings() {
  settingsArea.className = 'full-height'
  var deactareas = [sysutilsArea, vrAppArea, legacyVrAppArea, twoDAppArea, unsortedArea]
  hideDiv(deactareas)
  checkEmptyTabs()
}

function show2D() {
  twoDBtn.className = activeButtonClass
  twoDAppArea.className = visibleAppAreaClass
  var deactbtn = [sysutilsBtn, settingsBtn, legacyBtn, vrBtn, unsortedBtn]
  var deactareas = [sysutilsArea, settingsArea, legacyVrAppArea, vrAppArea, unsortedArea]
  hideDiv(deactareas)
  checkEmptyTabs()
}

function showLegVR() {
  legacyVrAppArea.className = visibleAppAreaClass
  var deactareas = [sysutilsArea, settingsArea, vrAppArea, twoDAppArea, unsortedArea]
  hideDiv(deactareas)
  checkEmptyTabs()
}

function showsysutils() {
  sysutilsArea.className = visibleAppAreaClass
  var deactareas = [vrAppArea, settingsArea, legacyVrAppArea, twoDAppArea, unsortedArea]
  hideDiv(deactareas)
  checkEmptyTabs()
}

function showUnsorted() {
  unsortedArea.className = 'full-height'
  var deactareas = [sysutilsArea, settingsArea, legacyVrAppArea, twoDAppArea, vrAppArea]
  hideDiv(deactareas)
  checkEmptyTabs()
}

showVr()

function htmlListsCreate() {
  vrAppArea.innerHTML = ''
  twoDAppArea.innerHTML = ''
  sysutilsArea.innerHTML = ''
  legacyVrAppArea.innerHTML = ''
  unsortedArea.innerHTML = ''
  for (var i = 0; i < vrPackagesHTML.length; i++) {
    vrAppArea.innerHTML += vrPackagesHTML[i]
  }
  for (var i = 0; i < twoDPackagesHTML.length; i++) {
    twoDAppArea.innerHTML += twoDPackagesHTML[i]
  }
  for (var i = 0; i < legacyVrAppsHTML.length; i++) {
    legacyVrAppArea.innerHTML += legacyVrAppsHTML[i]
  }
  for (var i = 0; i < sysutilsHTML.length; i++) {
    sysutilsArea.innerHTML += sysutilsHTML[i]
  }
  for (var i = 0; i < unsortedHTML.length; i++) {
    unsortedArea.innerHTML += unsortedHTML[i]
  }
}
htmlListsCreate()
