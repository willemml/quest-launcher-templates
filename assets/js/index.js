var packageLists = []
var packageListsHTML = []
var packageAreas = []
var packageAreasNames = []
var navbarButtons = []
var unsortedList = []

var addPackageName
var addPackageTitle
var addPackageImage
var fileinput

// System Utilities
packageLists[0] = ['de.eye_interactive.atvl.settings', 'com.android.settings.png', 'Settings',
  'com.android.calendar', 'com.android.calendar.png', 'Calendar',
  'com.android.deskclock', 'com.android.deskclock.png', 'Clock',
  'com.oculus.systemactivities', 'oculus.png', 'System Activities',
  'net.dinglisch.android.taskerm', 'tasker.png', 'Tasker'
]
packageListsHTML[0] = []
packageAreasNames[0] = ['sysutils', 'System Tools']

// Settings area placeholder
packageLists[1] = null
packageListsHTML[1] = null
packageAreasNames[1] = ['settings', 'Settings']

if ('packageLists' in localStorage) {
  packageLists = JSON.parse(localStorage.getItem('packageLists'))
} else {
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}

if ('packageListsHTML' in localStorage) {
  packageLists = JSON.parse(localStorage.getItem('packageLists'))
} else {
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}

if ('packageAreasNames' in localStorage) {
  packageAreasNames = JSON.parse(localStorage.getItem('packageAreasNames'))
} else {
  localStorage.setItem('packageAreasNames', JSON.stringify(packageAreasNames))
}

if ('unsortedList' in localStorage) {
  unsortedList = JSON.parse(localStorage.getItem('unsortedList'))
}

var body = document.getElementById('body')
var buttons = document.getElementById('menubuttons')
var appOpenLinkStart = '<a class="btn btn-link" href="autotoolscommand://openapp=:='

var settingsHTML = `<div id="settings" class="hidden">
  <h6 class="text-center">Load packages from text file:</h6><br>
  <label class="btn btn-success btn-block btn-file">
    Select text file <input type="file" id="textListInput" style="display: none;">
  </label>
  <input type="button" class="btn btn-danger btn-block" value="Clear unsorted packages" onclick="clearUnsorted()">
  <hr>
  <h6 class="text-center">Add a new category:</h6>
  <div class="custom-control">
    <p>Enter category name:</p>
    <input type="text" class="form-control" id="newcatname" placeholder="Example Category">
  </div>
  <br>
  <input type="button" class="btn btn-primary btn-block" value="Create Category" onclick="createCategory()">
  <hr>
  <h6 class="text-center">Add an application to a list:</h6>
  <div class="custom-control">
    <label for="categorylist">Select app category:</label>
    <select class="custom-select" id="categorylist" name="categorylist">
    </select>
  </div>
  <br>
  <div class="custom-control">
    <p id="pnameenterlabel">Enter package name:</p>
    <input class="custom-select" id="pnamelist" list="pnamedatalist">
    <datalist name="pnamedatalist" id="pnamedatalist">
    </datalist>
  </div>
  <br>
  <div class="custom-control">
    <p>Enter app name:</p>
    <input type="text" class="form-control" id="appname" placeholder="Example App">
  </div>
  <br>
  <div class="custom-control">
    <p>Enter image filename: <br>(image must be placed in <code>assets/app-icon/image.png</code>)</p>
    <input type="text" class="form-control" id="appicon" placeholder="exampleapp.png">
  </div>
  <br>
  <input type="button" class="btn btn-primary btn-block" value="Add Application" onclick="addApplicationToLists()">
  <hr>
  <h6 class="text-center">Export for copy to oculus quest:</h6>
  <br>
  <input type="button" class="btn btn-primary btn-block" value="Export as static HTML page" onclick="exportHTML()">
  <br>
  <input id="clipbtn" type="button" class="btn btn-success btn-block hidden" value="Copy to clipboard" onclick="copyHTMLtoClipboard()">
  <textarea id="htmlexporttextarea" class="hidden"></textarea>
  <hr>
  <h5 class="text-center">RESET GENERATOR:</h5><br>
  <input type="button" class="btn btn-danger btn-block" id="startreset" value="RESET" onclick="checkClearAll()">
  <div class="hidden" id="confirmdenyreset">
    <input type="button" class="btn btn-danger" value="Confirm" onclick="confirmClearAll()">
    <input type="button" class="btn btn-success" value="Cancel" onclick="dontClearAll()">
  </div>
</div>`

function generateCategoriesHTML() {
  body.innerHTML = ''
  buttons.innerHTML = ''
  for (var i = 0; i < packageAreasNames.length; i++) {
    if (i == packageAreasNames.length - 1) {
      body.innerHTML += settingsHTML
      buttons.innerHTML += '<input type="button" id="settingsbtn" class="btn btn-secondary btnwidth" value="Settings" onclick="showArea(' + i + ')">'
    } else {
      body.innerHTML += '<div id="' + packageAreasNames[i][0] + '" class="hidden"></div>'
      buttons.innerHTML += '<input type="button" id="' + packageAreasNames[i][0] + 'btn" class="btn btn-secondary btnwidth" value="' + packageAreasNames[i][1] + '" onclick="showArea(' + i + ')">'
    }
  }
  for (var i = 0; i < packageAreasNames.length; i++) {
    packageAreas[i] = document.getElementById(packageAreasNames[i][0])
    navbarButtons[i] = document.getElementById(packageAreasNames[i][0] + 'btn')
  }
  for (var i = 0; i < packageAreasNames.length - 1; i++) {
    document.getElementById('categorylist').innerHTML += '<option value="' + i + '">' + packageAreasNames[i][1] + '</option>'
  }
  addPackageName = document.getElementById('pnamelist')
  addPackageTitle = document.getElementById('appname')
  addPackageImage = document.getElementById('appicon')
  fileinput = document.getElementById('textListInput')
  addFileInputEvent()
}
generateCategoriesHTML()

function addApplicationToLists() {
  category = document.getElementById('categorylist').value
  packageLists[category].push(addPackageName.value)
  packageLists[category].push(addPackageImage.value)
  packageLists[category].push(addPackageTitle.value)
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  if (unsortedList.indexOf(addPackageName.value) > parseInt('-1')) {
    unsortedList.splice(unsortedList.indexOf(addPackageName.value), 1)
    localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
  }
  packageListsToHTML()
  htmlListsCreate()
  addPackageName.value = ''
  addPackageImage.value = ''
  addPackageTitle.value = ''
}

function addFileInputEvent() {
  fileinput.addEventListener("change", function() {
    if (this.files && this.files[0]) {
      var myFile = this.files[0]
      var reader = new FileReader()
      reader.addEventListener('load', function(e) {
        var textByLine = e.target.result.split("\n")
        unsortedList = []
        for (var i = 0; i < textByLine.length; i++) {
          if (textByLine[i] != '') {
            var pNameSplit = textByLine[i].split('.')
            unsortedList[i] = textByLine[i]
          }
        }
        localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
        packageListsToHTML()
        htmlListsCreate()
      })
      reader.readAsBinaryString(myFile)
    }
  })
}

function clearUnsorted() {
  unsortedList = []
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  document.getElementById('pnameenterlabel').innerHTML = 'Enter package name:'
  location.reload()
}

function createCategory() {
  catname = document.getElementById('newcatname').value
  if (catname != '') {
    packageAreasNames.splice(packageAreasNames.length - 3, 0, [catname, catname])
    packageLists.splice(packageLists.length - 3, 0, [])
    packageListsHTML.splice(packageLists.length - 3, 0, [])
    localStorage.setItem('packageAreasNames', JSON.stringify(packageAreasNames))
    localStorage.setItem('packageListsHTML', JSON.stringify(packageListsHTML))
    localStorage.setItem('packageLists', JSON.stringify(packageLists))
    generateCategoriesHTML()
    packageListsToHTML()
    htmlListsCreate()

  }
}

function deletePackage(pnum, catnum) {
  packageLists[catnum].splice(pnum, 3)
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  packageListsToHTML()
  htmlListsCreate()

}

function packageListsToHTML() {
  for (var i = 0; i < packageListsHTML.length; i++) {
    packageListsHTML[i] = []
  }
  for (var u = 0; u < packageLists.length; u++) {
    if (u == packageAreasNames.length - 1) {
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
        packageListsHTML[u].push('<div style="position:relative;">' + appOpenLinkStart + packageLists[u][i] + '"><img style="width:150px" src="assets/app-icons/' + packageLists[u][i + 1] + '" /><p>' + packageLists[u][i + 2] + '</p></a><input type="button" style="position:absolute;right:0;botton:0;color:red;" class="btn btn-sm btn-link" onclick="deletePackage(' + i + ', ' + u + ')" value="&#10005;"></div>\n')
        i++
        i++
      }
    }
  }
  document.getElementById('pnamedatalist').innerHTML = ''
  for (var i = 0; i < unsortedList.length; i++) {
    document.getElementById('pnamedatalist').innerHTML += '<option id="' + unsortedList[i] + '" value="' + unsortedList[i] + '">' + unsortedList[i] + '</option>\n'
  }
}
packageListsToHTML()

function showArea(area) {
  for (var i = 0; i < packageAreas.length; i++) {
    if (i != area) {
      packageAreas[i].className = 'hidden'
    }
  }
  if (area == packageAreasNames.length - 1) {
    packageAreas[area].className = 'full-height'
  } else {
    packageAreas[area].className = 'full-height text-center row flex-row'
  }
}

if (packageAreasNames.length > 2) {
  showArea(1)
} else {
  showArea(0)
}



function htmlListsCreate() {
  for (var u = 0; u < packageLists.length; u++) {
    if (u == packageAreasNames.length - 1) {
      // do nothing
    } else {
      packageAreas[u].innerHTML = ''
      for (var i = 0; i < packageListsHTML[u].length; i++) {
        packageAreas[u].innerHTML += packageListsHTML[u][i]
      }
    }
  }
}
htmlListsCreate()

function checkClearAll() {
  document.getElementById('startreset').className = 'hidden'
  document.getElementById('confirmdenyreset').className = 'btn-group flex-row'
}

function confirmClearAll() {
  localStorage.clear('packageLists')
  localStorage.clear('packageAreasNames')
  localStorage.clear('packageListsHTML')

  packageListsToHTML()
  htmlListsCreate()
  document.getElementById('startreset').className = 'btn btn-danger btn-block'
  document.getElementById('confirmdenyreset').className = 'hidden'
  location.reload()
}

function dontClearAll() {
  document.getElementById('startreset').className = 'btn btn-danger btn-block'
  document.getElementById('confirmdenyreset').className = 'hidden'
}

function exportHTML() {
  var packageAreasNamesSimple
  for (var i = 0; i < packageAreasNames.length; i++) {
    packageAreasNamesSimple += packageAreasNames[i][0]
  }
  var pagehtml = '<!DOCTYPE HTML>' + '\n' + document.documentElement.outerHTML
  var scriptcallstring = '<script src="assets/js/index.js">'
  var customcssstring = '<link href="assets/css/style.css" rel="stylesheet">'
  var minscript = `
  var packageAreasNames = '${packageAreasNamesSimple}'
  packageAreasNames = packageAreasNames.split(',')
  var packageAreas = []
  for (var i = 0; i < packageAreasNames.length; i++) {
    packageAreas[i] = document.getElementById(packageAreasNames[i])
  }
  document.getElementById('menubuttons').removeChild(document.getElementById('settingsbtn'))
  document.getElementById('body').removeChild(document.getElementById('settings'))
  ${showArea}
  showArea(0)
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
