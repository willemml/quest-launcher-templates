var packageLists = []
var unsortedList = []
var categories = []

if ('packageLists' in localStorage) {
  packageLists = JSON.parse(localStorage.getItem('packageLists'))
} else {
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}
if ('categories' in localStorage) {
  categories = JSON.parse(localStorage.getItem('categories'))
} else {
  localStorage.setItem('categories', JSON.stringify(categories))
}
if ('unsortedList' in localStorage) {
  unsortedList = JSON.parse(localStorage.getItem('unsortedList'))
} else {
  localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
}

function createPageBase() {
  $('#body').append('<h2 align="center">Recon-Quest</h2>')
  $('<div/>', {
    id: 'buttondivcontainer',
    "class": 'text-center',
  }).appendTo('#body')
  $('<div/>', {
    id: 'buttondiv',
    "class": 'btn-group',
  }).appendTo('#buttondivcontainer')
  $('<div/>', {
    id: 'categoriesdiv'
  }).appendTo('#body')
}
createPageBase()

function generateCategoriesHTML() {
  for (var i = 0; i < categories.length; i++) {
    $('<input/>', {
      id: categories[i][0] + 'btn',
      'class': 'btn btn-secondary',
      value: categories[i][1],
      type: 'button'
    }).appendTo('#buttondiv')
    $('<div/>', {
      id: categories[i][0],
      'class': 'full-height text-center row flex-row catdivs'
    }).appendTo('#categoriesdiv')
    var currentdiv = '#' + categories[i][0]
    var currentbtn = '#' + categories[i][0] + 'btn'
    $(currentbtn).click(function() {
      var thisdiv = $(this).val().replace(/\s/g, '')
      for (var u = 0; u < categories.length; u++) {
        var otherdiv = '#' + categories[u][0]
        $(otherdiv).hide()
      }
      $('#' + thisdiv).show()
    })
  }
}

function createCategory(catname, addtoarray) {
  catid = catname.replace(/\s/g, '')
  categories.push([catid, catname])
  packageLists.push([])
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  localStorage.setItem('categories', JSON.stringify(categories))
  generateCategoriesHTML()
}
var done = 0
if (categories.length == 0) {
  createCategory('System Utilities')
} else {
  generateCategoriesHTML()
}

function generatePackagesHTML() {
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      var catarraynum = '#' + categories[i][0]
      $(catarraynum).append('<div id="' + packageLists[i][u][0].replace(/\./g, '') + '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:=' + packageLists[i][u][0] + '"><img style="width:150px" src="assets/app-icons/' + packageLists[i][u][1] + '" /><p>' + packageLists[i][u][2] + '</p></a><input onclick="$(\'#' + packageLists[i][u][0].replace(/\./g, '') + '\').remove()" type="button" style="position:absolute;right:0;botton:0;color:red;" class="btn btn-sm btn-link" value="&#10005;"></div>\n')
    }
  }
}
generatePackagesHTML()

function addPackage(packagename, imagefilename, appname, category) {
  packageLists[category].push([packagename, imagefilename, appname])
  var catarraynum = '#' + categories[category][0]
  $(catarraynum).append('<div id="' + packagename.replace(/\./g, '') + '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:=' + packagename + '"><img style="width:150px" src="assets/app-icons/' + imagefilename + '" /><p>' + appname + '</p></a><input onclick="$(\'#' + packagename.replace(/\./g, '') + '\').remove()" type="button" style="position:absolute;right:0;botton:0;color:red;" class="btn btn-sm btn-link" value="&#10005;"></div>\n')
  localStorage.clear('packageLists')
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}

if (packageLists.length == 1 && packageLists[0].length == 0) {
  addPackage('de.eye_interactive.atvl.settings', 'com.android.settings.png', 'Settings', '0')
  addPackage('com.android.calendar', 'com.android.calendar.png', 'Calendar', '0')
  addPackage('com.android.deskclock', 'com.android.deskclock.png', 'Clock', '0')
  addPackage('com.oculus.systemactivities', 'oculus.png', 'System Activities', '0')
  addPackage('net.dinglisch.android.taskerm', 'tasker.png', 'Tasker', '0')
}
