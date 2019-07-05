var packageLists = []
var unsortedList = []
var categories = []

/*if ('packageLists' in localStorage) {
  packageLists = JSON.parse(localStorage.getItem('packageLists'))
} else {
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}

if ('categories' in localStorage) {
  packageLists = JSON.parse(localStorage.getItem('packageLists'))
} else {
  localStorage.setItem('packageLists', JSON.stringify(categories))
}

if ('unsortedList' in localStorage) {
  unsortedList = JSON.parse(localStorage.getItem('unsortedList'))
} else {
  localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
}*/

function createPageBase() {
  $('#body').append('<h2 align="center">Recon-Quest</h2>')
  $('<div/>', {
    id: 'buttondivcontainer',
    "class": 'text-center',
  }).appendTo('#body');
  $('<div/>', {
    id: 'buttondiv',
    "class": 'btn-group',
  }).appendTo('#buttondivcontainer');
  $('<div/>', {
    id: 'categoriesdiv'
  }).appendTo('#body');
}

function generateCategoriesHTML() {
  for (var i = 0; i < categories.length; ++i) {
    $('<input/>', {
      id: categories[i] + 'btn',
      'class': 'btn btn-secondary',
      value: categories[i],
      type: 'button'
    }).appendTo('#buttondiv');
    $('<div/>', {
      id: categories[i],
      'class': 'full-height text-center row flex-row catdivs'
    }).appendTo('#categoriesdiv');
    $('#' + categories[i] + 'btn').click(function() {
      $('#' + categories[i]).toggle();
    })
  }
}

function createCategory(catname) {
  if (categories.indexOf(catname) == parseInt('-1')) {
    categories.push(catname)
    packageLists.push([])
    generateCategoriesHTML()
  }
}

function packageListsHTML() {
  if (packageLists.length != 0) {
    for (var i = 0; i < packageLists.length; ++i) {
      $('#' + categories[i]).html('')
      if (packageLists[i] != null && packageLists[i] != undefined) {
        for (var u = 0; u < packageLists[i].length; ++u) {
          var pname = packageLists[i][u][0]
          var pimg = packageLists[i][u][1]
          var aname = packageLists[i][u][2]
          var divid = pname.split('.')[1]
          $('#' + categories[i]).append('<div id="' + divid + '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:=' + pname + '"><img style="width:150px" src="assets/app-icons/' + pimg + '" /><p>' + aname + '</p></a><input onclick="deletePackage(' + i + ', ' + u + ')" type="button" style="position:absolute;right:0;botton:0;color:red;" class="btn btn-sm btn-link" value="&#10005;"></div>\n')
        }
      }
    }
  }
}

function addPackage(packagename, imagefilename, appname, category) {
  packageLists[category].push([packagename, imagefilename, appname])
  //localStorage.setItem('packageLists', JSON.stringify(packageLists))
  packageListsHTML()
}

function deletePackage(catnum, pnum) {
  var divid = '#' + packageLists[catnum][pnum][0].split('.')[1]
  packageLists[catnum].splice(pnum, 1)
  //localStorage.setItem('packageLists', JSON.stringify(packageLists))
  $(divid).remove()
}
createPageBase()

if (categories.length == 0) {
  createCategory('System Utilities')
}

if (packageLists.length == 1 && packageLists[0].length == 0) {
  addPackage('de.eye_interactive.atvl.settings', 'com.android.settings.png', 'Settings', '0')
  addPackage('com.android.calendar', 'com.android.calendar.png', 'Calendar', '0')
  addPackage('com.android.deskclock', 'com.android.deskclock.png', 'Clock', '0')
  addPackage('com.oculus.systemactivities', 'oculus.png', 'System Activities', '0')
  addPackage('net.dinglisch.android.taskerm', 'tasker.png', 'Tasker', '0')
}
