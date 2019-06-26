var vrPackages = []
var twoDPackages = []
var legacyVrApps = []
var sysutils = []
var unsorted = []
var vrPackagesHTML = []
var twoDPackagesHTML = []
var legacyVrAppsHTML = []
var sysutilsHTML = []
var unsortedHTML = []
var vrBtn = document.getElementById('vrbtn')
var legacyBtn = document.getElementById('legvrbtn')
var twoDBtn = document.getElementById('2dbtn')
var sysutilsBtn = document.getElementById('sysutilsbtn')
var unsortedBtn = document.getElementById('unsortedbtn')
var vrAppArea = document.getElementById('vrapps')
var legacyVrAppArea = document.getElementById('legvrapps')
var twoDAppArea = document.getElementById('2dapps')
var sysutilsArea = document.getElementById('sysutils')
var unsortedArea = document.getElementById('unsorted')
var activeButtonClass = 'btn btn-secondary active'
var inactiveButtonClass = 'btn btn-secondary'
var hiddenAppAreaClass = 'hidden'
var visibleAppAreaClass = 'full-height text-center flex-row row'
var appOpenLinkStart = '<a class="btn btn-link" href="autosysutilscommand://openapp=:='
var fileinput = document.getElementById('textListInput')

vrPackages = [
  'com.beatgames.beatsaber', 'beat-saber.png', 'Beat Saber',
  'com.polygraphene.alvr', 'alvr.png', 'ALVR',
  'com.iillusions.spacepiratetrainerquest', 'space-pirate-trainer.png', 'Space Pirate Trainer'
]

twoDPackages = [
  'dp.ws.popcorntime', 'popcorn-time.png', 'Popcorn Time',
  'com.emulamer.beaton', 'beat-on.png', 'Beat On',
  'com.discord', 'discord.png', 'Discord'
]

sysutils = [
  'com.android.settings', 'settings.png', 'Settings',
  'net.dinglisch.android.taskerm', 'tasker.png', 'Tasker'
]

fileinput.addEventListener("change", function() {
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function(e) {
      var textByLine = e.target.result.split("\n")
      for (var i = 0; i < textByLine.length; i++) {
        var pNameSplit = textByLine[i].split('.')
        var unsortedName = pNameSplit[pNameSplit.length - 1]
        document.getElementById('unsortedlist').innerHTML += appOpenLinkStart + textByLine[i] + '"><p>' + unsortedName + '</p></a>'
      }
    });
    reader.readAsBinaryString(myFile);
  }
})

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
}
packageListsToHTML()

function deactivateButton(btns) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].classname = inactiveButtonClass
  }
}

function showVr() {
  vrBtn.className = activeButtonClass
  vrAppArea.className = visibleAppAreaClass
  var deactbtn = [sysutilsBtn, legacyBtn, twoDBtn, unsortedBtn]
  var deactareas = [sysutilsArea, legacyVrAppArea, twoDAppArea, unsortedArea]
  deactivateButton(deactbtn)
  hideDiv(deactareas)
}
showVr()

function show2D() {
  twoDBtn.className = activeButtonClass
  twoDAppArea.className = visibleAppAreaClass
  var deactbtn = [sysutilsBtn, legacyBtn, vrBtn, unsortedBtn]
  var deactareas = [sysutilsArea, legacyVrAppArea, vrAppArea, unsortedArea]
  deactivateButton(deactbtn)
  hideDiv(deactareas)
}

function showLegVR() {
  legacyBtn.className = activeButtonClass
  legacyVrAppArea.className = visibleAppAreaClass
  var deactbtn = [sysutilsBtn, vrBtn, twoDBtn, unsortedBtn]
  var deactareas = [sysutilsArea, vrAppArea, twoDAppArea, unsortedArea]
  deactivateButton(deactbtn)
  hideDiv(deactareas)
}

function showsysutils() {
  sysutilsBtn.className = activeButtonClass
  sysutilsArea.className = visibleAppAreaClass
  var deactbtn = [vrBtn, legacyBtn, twoDBtn, unsortedBtn]
  var deactareas = [vrAppArea, legacyVrAppArea, twoDAppArea, unsortedArea]
  deactivateButton(deactbtn)
  hideDiv(deactareas)
}

function showUnsorted() {
  unsortedBtn.className = activeButtonClass
  unsortedArea.className = visibleAppAreaClass
  var deactbtn = [sysutilsBtn, legacyBtn, twoDBtn, vrBtn]
  var deactareas = [sysutilsArea, legacyVrAppArea, twoDAppArea, vrAppArea]
  deactivateButton(deactbtn)
  hideDiv(deactareas)
}

function htmlListsCreate() {
  vrAppArea.innerHTML = ''
  twoDAppArea.innerHTML = ''
  sysutilsArea.innerHTML = ''
  legacyVrAppArea.innerHTML = ''
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
}
htmlListsCreate()
