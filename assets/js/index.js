var packageLists = []
var unsortedList = []
var categories = []
var addedPackages = []

if ('category' in localStorage) {
  category = JSON.parse(localStorage.getItem('category'))
}
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
if ('addedPackages' in localStorage) {
  addedPackages = JSON.parse(localStorage.getItem('addedPackages'))
} else {
  localStorage.setItem('addedPackages', JSON.stringify(addedPackages))
}

function checkDuplicateAndMissing() {
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      if (unsortedList.indexOf(packageLists[i][u][0]) == parseInt('-1')) {
        packageLists[i].splice(u, 1)
      }
    }
  }
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      for (var o = 0; o < unsortedList.length; o++) {
        if (packageLists[i][u][0] == unsortedList[o]) {
          unsortedList.splice(o, 1)
        }
      }
    }
  }
  localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
}

function createPageBase() {
  $('#body').append('<h2 align="center" style="margin-left:125px" id="title">Recon-Quest</h2>')
  $('<div/>', {
    id: 'buttondivcontainer',
    "class": 'text-center'
  }).appendTo('#body')
  $('<div/>', {
    id: 'buttondiv',
    "class": 'btn-group sort'
  }).appendTo('#buttondivcontainer')
  $('<div/>', {
    id: 'unsortedbuttondiv',
    'class': 'btn-group sortable'
  }).appendTo('#buttondiv')
  $('<input/>', {
    id: 'unsortedbtn',
    'class': 'btn btn-secondary',
    value: 'Unsorted',
    type: 'button',
    onclick: '$(".areadivs").hide();$("#unsorteddiv").show()'
  }).appendTo('#unsortedbuttondiv')
  $('<div/>', {
    id: 'categoriesdiv'
  }).appendTo('#body')
  $('.sort').sortable({
    handle: 'input',
    cancel: '',
    items: '.sortable'
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
        'class': 'btn btn-dark delbtn',
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
  $(function() {
    var $sortable = $('.sort');
    var positions = JSON.parse(localStorage.getItem('positions'));
    if (positions) {
      $.each(positions, function(i, position) {
        var $target = $sortable.find('#' + position)
        $target.appendTo($sortable) // or prependTo for reverse
      })
    }

    $sortable.sortable({
      update: saveNewOrder
    })

    function saveNewOrder() {
      var positions = JSON.stringify($sortable.sortable("toArray"))
      localStorage.setItem('positions', positions)
    }
  })
}

function createCategory(catname) {
  catid = catname.replace(/\s/g, '').replace(/\W/g, '')
  categories.push([catid, catname])
  packageLists.push([])
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  localStorage.setItem('categories', JSON.stringify(categories))
  localStorage.setItem('category', JSON.stringify(catname))
  location.reload()
}

function deletePackage(cat, arraypos) {
  if (addedPackages.indexOf(packageLists[cat][arraypos][0]) != parseInt('-1')) {
    if (unsortedList.indexOf(packageLists[cat][arraypos][0]) == parseInt('-1')) {
      unsortedList.push(addedPackages[addedPackages.indexOf(packageLists[cat][arraypos][0])])
    }
    addedPackages.splice(addedPackages.indexOf(packageLists[cat][arraypos][0]), 1)
    localStorage.setItem('addedPackages', JSON.stringify(addedPackages))
    localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
  }
  generateUnsortedList()
}

function generatePackagesHTML() {
  for (var i = 0; i < packageLists.length; i++) {
    for (var u = 0; u < packageLists[i].length; u++) {
      var catarraynum = '#' + categories[i][0]
      var applink = '" style="position:relative;"><a class="btn btn-link" href="autotoolscommand://openapp=:='
      var imagelink = '"><img style="width:150px;height:84px" src="assets/app-icons/'
      var noimagelink = '" onerror="javascript:this.src=\'assets/app-icons/notfound.png\'" /><p>'
      var deletebutton = '<input class="btn btn-sm btn-link delbtn" onclick="$(\'#' + packageLists[i][u][0].replace(/\./g, '') + '\').remove();deletePackage(' + i + ', ' + u + ');packageLists[' + i + '].splice(' + u + ', 1);localStorage.setItem(\'packageLists\', JSON.stringify(packageLists));location.reload()" type="button" style="position:absolute;right:0;botton:0;color:red;" value="&#10005;"></div>\n'
      var backupbutton
      var restorebutton
      if (packageLists[i][u][3] != '1') {
        $(catarraynum).append('<div id="' + packageLists[i][u][0].replace(/\./g, '') + applink + packageLists[i][u][0] + imagelink + packageLists[i][u][1] + noimagelink + packageLists[i][u][2] + '</p></a></div>\n')
      } else {
        $(catarraynum).append('<div id="' + packageLists[i][u][0].replace(/\./g, '') + applink + packageLists[i][u][0] + imagelink + packageLists[i][u][1] + noimagelink + packageLists[i][u][2] + '</p></a>' + deletebutton + '</div>\n')
      }
    }
  }
}

function addPackage(packagename, imagefilename, appname, category, deletable) {
  packageLists[category].push([packagename, imagefilename, appname, deletable])
  if (unsortedList.indexOf(packagename) != parseInt('-1')) {
    addedPackages.push(packagename)
    localStorage.setItem('addedPackages', JSON.stringify(addedPackages))
  }
  if (unsortedList.length > 0) {
    if (unsortedList.indexOf(packagename) != parseInt('-1')) {
      unsortedList.splice(unsortedList.indexOf(packagename), 1)
      localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
    }
  }
  packageLists[category].sort((function(index) {
    return function(a, b) {
      return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1))
    }
  })(2))
  var catarraynum = '#' + categories[category][0]
  localStorage.setItem('packageLists', JSON.stringify(packageLists))
  $('#pnamelist').val('')
  $('#appname').val('')
  $('#appicon').val('')
  localStorage.setItem('category', JSON.stringify(category))
  location.reload()
}

function generateUnsortedList() {
  $('#unsortedlist').empty()
  $('#pnamelist').empty()
  unsortedList.sort()
  for (var i = 0; i < unsortedList.length; i++) {
    var unsorteditemname = unsortedList[i]
    $('#unsortedlist').append('<li id="' + unsortedList[i] + '"><a href="' + unsortedList[i] + '">' + unsorteditemname + '</a></li>')
    $('#pnamelist').append('<option value="' + unsortedList[i] + '">' + unsortedList[i] + '</option>')
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
  window.close()
}

function exportHTML() {
  var minjs = `
  // empty
  `
  $('#changetotv').attr('href', 'autotoolscommand://openapp=:=' + $('#otapplistinput').val())
  $('#changetohome').attr('href', 'autotoolscommand://openapp=:=' + $('#ohapplistinput').val())
  if ($('#showswitcherinput').val() == 'No') {
    $('#changemodebtndiv').hide()
    $('#title').attr('style', '')
  } else {
    $('#changemodebtndiv').show()
    $('#title').attr('style', 'margin-left:125px')
  }
  $('.delbtn').hide()
  $('#settingsdiv').hide()
  $('#settingsbtn').hide()
  $('#scriptimport').removeAttr('src')
  $('#scriptimport').html(minjs)
  $('#htmlexporttextarea').val($('html')[0].outerHTML)
  $('#scriptimport').html('')
  $('#scriptimport').attr('src', '/assets/js/index-rewrite.js')
  $('#settingsdiv').show()
  $('#settingsbtn').show()
  $('.delbtn').show()
  $('#htmlexporttextarea').show()
  $('#clipbtn').show()
}

$(document).ready(function() {
  if ('showswitcherinput' in localStorage) {
    $('#showswitcherinput').val(localStorage.getItem('showswitcherinput'))
  } else {
    $('#showswitcherinput').val('No')
  }
  $('#showswitcherinput').change(function() {
    localStorage.setItem('showswitcherinput', $('#showswitcherinput').val())
  })
  if ('ohapplistinput' in localStorage) {
    $('#ohapplistinput').val(localStorage.getItem('ohapplistinput'))
  } else {
    $('#ohapplistinput').val('com.survios.CreedDemo')
  }
  $('#ohapplistinput').change(function() {
    localStorage.setItem('ohapplistinput', $('#ohapplistinput').val())
  })
  if ('otapplistinput' in localStorage) {
    $('#otapplistinput').val(localStorage.getItem('otapplistinput'))
  } else {
    $('#otapplistinput').val('com.nousguide.android.rbtv')
  }
  $('#otapplistinput').change(function() {
    localStorage.setItem('otapplistinput', $('#otapplistinput').val())
  })
  $('.areadivs').hide()
  if ('category' in localStorage) {
    $('#categorylist').val(category)
  }
  $('#settingsdiv').show()
  $('<input/>', {
    id: 'settingsbtn',
    'class': 'btn btn-secondary stayleft',
    value: 'Settings',
    type: 'button'
  }).prependTo('body')
  $('<div/>', {
    id: 'changemodebtndiv',
    'class': 'btn-group stayright',
  }).prependTo('body')
  $('<a/>', {
    id: 'changetotv',
    'class': 'btn btn-secondary',
    html: 'TV'
  }).appendTo('#changemodebtndiv')
  $('<a/>', {
    id: 'changetohome',
    'class': 'btn btn-secondary',
    html: 'Home'
  }).appendTo('#changemodebtndiv')
  $('#settingsbtn').click(function() {
    $('.areadivs').hide()
    $('#settingsdiv').show()
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
  $('#textListInput').change(function() {
    var ext = this.value.split('\\')[this.value.split('\\').length - 1]
    switch (ext) {
      case 'MyInstalledPackages.txt':
        if (this.files && this.files[0]) {
          var myFile = this.files[0]
          var reader = new FileReader()
          reader.addEventListener('load', function(e) {
            var lineEnding = '\n'
            if (e.target.result.indexOf('\r\n') != parseInt('-1')) {
              lineEnding = '\r\n'
            }
            var textByLine = e.target.result.split(lineEnding)
            unsortedList = []
            for (var i = 0; i < textByLine.length; i++) {
              if (textByLine[i] != '') {
                unsortedList[i] = textByLine[i]
              }
            }
            generateUnsortedList()
            checkDuplicateAndMissing()
            localStorage.setItem('unsortedList', JSON.stringify(unsortedList))
            location.reload()
          })
          reader.readAsBinaryString(myFile)
        }
        break;
      default:
        alert('Not allowed, needs to be MyInstalledPackages.txt not ' + ext);
        this.value = '';
    }
  })
  $('#imageInput').change(function() {
    var ext = this.value.match(/.([^.]+)$/)[1];
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        $('#appicon').val(this.files && this.files.length ? this.files[0].name : '')
        break;
      default:
        alert('Not allowed, needs to be .png, .jpg or .jpeg.');
        this.value = '';
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
  addPackage('de.eye_interactive.atvl.settings', 'com.android.settings.png', 'Settings', '0', '0')
  addPackage('com.android.calendar', 'com.android.calendar.png', 'Calendar', '0', '0')
  addPackage('com.android.deskclock', 'com.android.deskclock.png', 'Clock', '0', '0')
  addPackage('com.oculus.systemactivities', 'oculus.png', 'System Activities', '0', '0')
  addPackage('net.dinglisch.android.taskerm', 'tasker.png', 'Tasker', '0', '0')
  addPackage('com.joaomgcd.autoappshub', 'autoappshub.png', 'Auto Apps Hub', '0', '0')
  addPackage('com.joaomgcd.autoapps', 'autoapps.png', 'Auto Apps', '0', '0')
  addPackage('com.joaomgcd.autotools', 'autotools.png', 'Auto Tools', '0', '0')
}
