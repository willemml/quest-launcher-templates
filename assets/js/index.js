var vrPackages = []
var twoDPackages = []
var tools = []
var vrPackagesHTML = []
var twoDPackagesHTML = []
var toolsHTML = []
var vrBtn = document.getElementById('vrbtn')
var twoDBtn = document.getElementById('2dbtn')
var toolsBtn = document.getElementById('toolsbtn')
var vrAppArea = document.getElementById('vrapps')
var twoDAppArea = document.getElementById('2dapps')
var toolsArea = document.getElementById('tools')
var activeButtonClass = 'btn btn-secondary active'
var inactiveButtonClass = 'btn btn-secondary'
var hiddenAppAreaClass = 'hidden'
var visibleAppAreaClass = 'full-height text-center flex-row row'
var appOpenLinkStart = '<a href="autotoolscommand://openapp=:='

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

tools = [
  'com.android.settings', 'settings.png', 'Settings',
  'net.dinglisch.android.taskerm', 'tasker.png', 'Tasker'
]

function showVr() {
  vrBtn.className = activeButtonClass
  twoDBtn.className = inactiveButtonClass
  toolsBtn.className = inactiveButtonClass
  vrAppArea.className = visibleAppAreaClass
  twoDAppArea.className = hiddenAppAreaClass
  toolsArea.className = hiddenAppAreaClass
}

showVr()

function show2D() {
  twoDBtn.className = activeButtonClass
  vrBtn.className = inactiveButtonClass
  toolsBtn.className = inactiveButtonClass
  twoDAppArea.className = visibleAppAreaClass
  vrAppArea.className = hiddenAppAreaClass
  toolsArea.className = hiddenAppAreaClass
}

function showTools() {
  toolsBtn.className = activeButtonClass
  twoDBtn.className = inactiveButtonClass
  vrBtn.className = inactiveButtonClass
  toolsArea.className = visibleAppAreaClass
  twoDAppArea.className = hiddenAppAreaClass
  vrArea.className = hiddenAppAreaClass
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
  for (var i = 0; i < tools.length; i++) {
    if (tools[i + 1] == '') {
      tools[i + 1] = 'notfound.png'
    }
    if (vrPackages[i + 2] == '') {
      var pNameSplit = tools[i].split('.')
      tools[i + 2] = pNameSplit[pNameSplit.length - 1]
    }
    toolsHTML.push(appOpenLinkStart + tools[i] + '"><img style="width:150px" src="assets/app-icons/tools/' + tools[i + 1] + '" /><p>' + tools[i + 2] + '</p></a>')
    i++
    i++
  }
}
packageListsToHTML()

function htmlListsCreate() {
  vrAppArea.innerHTML = ''
  twoDAppArea.innerHTML = ''
  toolsArea.innerHTML = ''
  for (var i = 0; i < vrPackagesHTML.length; i++) {
    vrAppArea.innerHTML += vrPackagesHTML[i]
  }
  for (var i = 0; i < twoDPackagesHTML.length; i++) {
    twoDAppArea.innerHTML += twoDPackagesHTML[i]
  }
  for (var i = 0; i < toolsHTML.length; i++) {
    toolsArea.innerHTML += toolsHTML[i]
  }
}
htmlListsCreate()
