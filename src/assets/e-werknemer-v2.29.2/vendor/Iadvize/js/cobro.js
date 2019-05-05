//v37
function cobroInit() {

  hasSession = jQuery.cookie('cobroSession');
  if (hasSession) {
    var cobroLoaded = loadCobroFiles();

    cobroLoaded.done(function () {
    });
  }
}

function loadCobroFiles() {
  var deferred = jQuery.Deferred();

  //load stylesheet
  jQuery('head').append('<link rel="stylesheet" rel="nofollow" href="' + window.uwvcobropath + 'css/cobro.css" type="text/css" />');

  //load html
  jQuery('body').append(jQuery("<div>").load(window.uwvcobropath + "html/cobro.html", function () {
      //after the html is loaded
      //load actual cobro script from iadvize
      jQuery.getScript('https://onlinecontact.uwv.nl/iadvize.js?sid=' + window.uwvcobrosid + '&lang=nl', function () {
        //after iadvize is loaded
        deferred.resolve();

        //configure iAdvize callbacks
        iAdvizeCallbacks = {
          onChatDisplayed: function (obj) {
            setTimeout(function () {
              if (jQuery('.idz_visname').length == 0) {
                jQuery('#idz_postmsg').click();
                jQuery(".idz_msg_visitor").css("display", "none");
              }
            }, 1000);
          }
        };
      });
    })
  );

  return deferred.promise();
}

function showCobroTerms() {
  jQuery.cookie('cobroSession', true, {path: '/'});

  var cobroLoaded = loadCobroFiles();
  cobroLoaded.done(function () {
    jQuery('#cobrowseTerms').show();
    jQuery('#cobrowseId').hide();
    maximizeCobro();
  });
}

function showCobroId() {
  jQuery('#cobrowseTerms').hide();
  jQuery('#cobrowseId').show();
  maximizeCobro();
}

function startCobroSession() {
  jQuery.cookie('cobroSession', true, {path: '/'});

  var url = '' + window.location;
  var idz_merp = document.getElementById('idz_merp').value;

  if (/[a-zA-Z0-9]{5}/.test(idz_merp)) {
    if (url.indexOf('idz=true') > 0) {
      url = url.replace(/idz-[0-9A-Za-z]{5}/g, 'idz-' + idz_merp);
    } else {
      url += '?idz=true?' + 'idz-' + idz_merp;
    }
    window.location.replace(url);
  } else {
    //do nothing
  }
}


function closeCobro() {
  jQuery('.cb_dialog').hide();

  var url = '' + window.location;
  url = url.replace(/\?idz=true\?idz-[0-9A-Za-z]{5}/g, '');
  window.location.replace(url);

  jQuery.removeCookie('cobroSession', {path: '/'});
}

function minimizeCobro() {
  jQuery('.minimized').show();
  jQuery('.maximized').hide();
  jQuery('.cb_dialogcontent').hide();
}

function maximizeCobro() {
  jQuery('.minimized').hide();
  jQuery('.maximized').show();
  jQuery('.cb_dialogcontent').show();
}
