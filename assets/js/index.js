var i
var vrPackages = []
var twoDPackages = []
var tools = []
var vrBtn = document.getElementById('vrbtn')
var twoDBtn = document.getElementById('2dbtn')
var toolsBtn = document.getElementById('toolsbtn')
var vrAppArea = document.getElementById('vrapps')
var twoDAppArea = document.getElementById('2dapps')
var toolsArea = document.getElementById('tools')
var activeButtonClass = 'btn btn-secondary active'
var inactiveButtonClass = 'btn btn-secondary'
var hiddenAppAreaClass = 'hidden'
var visibleAppAreaClass = 'full-height text-center'

vrPackages = [
  "com.beatgames.beatsaber", "beat-saber.png", "Beat Saber",
  "com.polygraphene.alvr", "alvr.png", "ALVR",
  "com.iillusions.spacepiratetrainerquest", "space-pirate-trainer.png", "Space Pirate Trainer"
]

twoDPackages = [
  "dp.ws.popcorntime", "popcorn-time.png", "Popcorn Time",
  "com.emulamer.beaton", "beat-on.png", "Beat On",
  "com.discord", "discord.png", "Discord"
]

tools = [
  "com.android.settings", "settings.png", "Settings",
  "net.dinglisch.android.taskerm", "tasker.png", "Tasker"
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
