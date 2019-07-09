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
    "class": 'text-center'
  }).appendTo('#body')
  $('<div/>', {
    id: 'buttondiv',
    "class": 'btn-group sort'
  }).appendTo('#buttondivcontainer')
  $('<div/>', {
    id: 'categoriesdiv'
  }).appendTo('#body')
  $('.sort').sortable({
    handle: 'input',
    cancel: '',
    items: '.sortable',
  })
}
createPageBase()

function generateCategoriesHTML() {
  for (var i = 0; i < categories.length; i++) {
    $('#categorylist').append('<option value="' + i + '">' + categories[i][1] + '</option>')
    $('<div/>', {
      id: categories[i][0] + 'buttondiv',
      'class': 'btn-group sortable',
      'catname': categories[i][1]
    }).prependTo('#buttondiv')
    if (i != 0) {
      $('<input/>', {
        id: categories[i][0] + 'delbtn',
        'class': 'btn btn-dark',
        value: 'X',
        type: 'button'
      }).prependTo('#' + categories[i][0] + 'buttondiv')
    }
    $('<input/>', {
      id: categories[i][0] + 'btn',
      'class': 'btn btn-secondary',
      'onclick': '$(".areadivs").hide();$("#" + $(this).attr("id").replace("btn", "")).show()',
      value: categories[i][1],
      type: 'button'
    }).prependTo('#' + categories[i][0] + 'buttondiv')
    $('<div/>', {
      id: categories[i][0],
      'class': 'full-height text-center row flex-row areadivs'
    }).appendTo('#categoriesdiv')
    var currentdiv = '#' + categories[i][0]
    var currentbtn = '#' + categories[i][0] + 'btn'
    var currentdelbtn = '#' + categories[i][0] + 'delbtn'
    $(currentdelbtn).click(function() {
      var thisdiv = $(this).attr('id').replace('delbtn', '')
      var thisbtndiv = $(this).attr('id').replace('delbtn', 'buttondiv')

      function getThisCat() {
        for (var i = 0; i < categories.length; i++) {
          if (categories[i][0] === thisdiv) {
            return i;
          }
        }
      }
      var thiscatnum = getThisCat()
      $('#' + thisdiv).remove()
      $('#' + thisbtndiv).remove()
      categories.splice(thiscatnum, 1)
      packageLists.splice(thiscatnum, 1)
      localStorage.setItem('packageLists', JSON.stringify(packageLists))
      localStorage.setItem('categories', JSON.stringify(categories))
      location.reload()
    })
  }
}

function createCategory(catname, addtoarray) {
  catid = catname.replace(/\s/g, '').replace(/\W/g, '')
  categories.push([catid, catname])
  packageLists.push([])
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  localStorage.setItem('categories', JSON.stringify(categories))
  location.reload()
}

function generatePackagesHTML() {
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      var catarraynum = '#' + categories[i][0]
      if (i == 0 && u < 8) {
        $(catarraynum).append('<div id="' + packageLists[i][u][0].replace(/\./g, '') + '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:=' + packageLists[i][u][0] + '"><img style="width:150px;height:150px" src="assets/app-icons/' + packageLists[i][u][1] + '" onerror="javascript:this.src=\'assets/app-icons/notfound.png\'" /><p>' + packageLists[i][u][2] + '</p></a></div>\n')
      } else {
        $(catarraynum).append('<div id="' + packageLists[i][u][0].replace(/\./g, '') + '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:=' + packageLists[i][u][0] + '"><img style="width:150px;height:150px" src="assets/app-icons/' + packageLists[i][u][1] + '" onerror="javascript:this.src=\'assets/app-icons/notfound.png\'" /><p>' + packageLists[i][u][2] + '</p></a><input class="btn btn-link" onclick="$(\'#' + packageLists[i][u][0].replace(/\./g, '') + '\').remove();packageLists[' + i + '].splice(' + u + ', 1);localStorage.setItem(\'packageLists\', JSON.stringify(packageLists));" type="button" style="position:absolute;right:0;botton:0;color:red;" class="btn btn-sm btn-link" value="&#10005;"></div>\n')
      }
    }
  }
}

function addPackage(packagename, imagefilename, appname, category) {
  packageLists[category].push([packagename, imagefilename, appname])
  if (unsortedList.length > 0) {
    if (unsortedList.indexOf(packagename) != parseInt('-1')) {
      unsortedList.splice(unsortedList.indexOf(packagename), 1)
      localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
    }
  }
  var catarraynum = '#' + categories[category][0]
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  $('#pnamelist').val('')
  $('#appname').val('')
  $('#appicon').val('')
  location.reload()
}

function generateUnsortedList() {
  $('#unsortedlist').empty()
  $('#pnamedatalist').empty()
  for (var i = 0; i < unsortedList.length; i++) {
    var unsorteditemname = unsortedList[i]
    $('#unsortedlist').append('<li id="' + unsortedList[i] + '"><a href="' + unsortedList[i] + '">' + unsorteditemname + '</a></li>')
    $('#pnamedatalist').append('<option value="' + unsortedList[i] + '">' + unsortedList[i] + '</option>')
  }
  $('#unsortedbtn').show()
}

function clearUnsorted() {
  unsortedList = []
  localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
  $('#unsortedbtn').hide()
}

function copyHTMLtoClipboard() {
  var copyText = document.getElementById("htmlexporttextarea")
  copyText.select()
  document.execCommand("copy")
}

function exportHTML() {
  var minjs = `
  // empty
  `
  $('#settingsdiv').hide()
  $('#settingsbtn').hide()
  $('.btn-dark').hide()
  $('#scriptimport').removeAttr('src')
  $('#scriptimport').html(minjs)
  $('#htmlexporttextarea').val($('html')[0].outerHTML)
  $('#scriptimport').html('')
  $('#scriptimport').attr('src', '/assets/js/index-rewrite.js')
  $('#settingsdiv').show()
  $('#settingsbtn').show()
  $('.btn-dark').show()
  $('#htmlexporttextarea').show()
  $('#clipbtn').show()
}

$(document).ready(function() {
  $('.areadivs').hide()
  $('#settingsdiv').show()
  $('<input/>', {
    id: 'unsortedbtn',
    'class': 'btn btn-secondary',
    value: 'Unsorted',
    type: 'button'
  }).appendTo('#buttondiv')
  $('<input/>', {
    id: 'settingsbtn',
    'class': 'btn btn-secondary',
    value: 'Settings',
    type: 'button'
  }).appendTo('#buttondiv')
  $('#settingsbtn').click(function() {
    $('.areadivs').hide()
    $('#settingsdiv').show()
  })
  $('#unsortedbtn').click(function() {
    $('.areadivs').hide()
    $('#unsorteddiv').show()
  })
  if (unsortedList.length == 0) {
    $('#unsortedbtn').hide()
  } else {
    generateUnsortedList()
  }
  $('#confirmcancelreset').hide()
  $('#startreset').click(function() {
    $(this).hide()
    $('#confirmcancelreset').show()
  })
  $('#confirmreset').click(function() {
    localStorage.clear('all')
    location.reload()
  })
  $('#cancelreset').click(function() {
    $('#confirmcancelreset').hide()
    $('#startreset').show()
  })
  $('#htmlexporttextarea').hide()
  $('#clipbtn').hide()
  document.getElementById('textListInput').addEventListener("change", function() {
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
        generateUnsortedList()
        localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
      })
      reader.readAsBinaryString(myFile)
    }
  })
})
if (categories.length == 0) {
  createCategory('System Utilities')
} else {
  generateCategoriesHTML()
  generatePackagesHTML()
}
if (categories.length == 1 && packageLists[0].length == 0) {
  addPackage('de.eye_interactive.atvl.settings', 'com.android.settings.png', 'Settings', '0')
  addPackage('com.android.calendar', 'com.android.calendar.png', 'Calendar', '0')
  addPackage('com.android.deskclock', 'com.android.deskclock.png', 'Clock', '0')
  addPackage('com.oculus.systemactivities', 'oculus.png', 'System Activities', '0')
  addPackage('net.dinglisch.android.taskerm', 'tasker.png', 'Tasker', '0')
  addPackage('com.joaomgcd.autoappshub', 'autoappshub.png', 'Auto Apps Hub', '0')
  addPackage('com.joaomgcd.autoapps', 'autoapps.png', 'Auto Apps', '0')
  addPackage('com.joaomgcd.autotools', 'autotools.png', 'Auto Tools', '0')
}
