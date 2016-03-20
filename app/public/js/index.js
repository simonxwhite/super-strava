$(function() {
  // setup connect url
  var params = {
    client_id: '6656',
    response_type: 'code',
    redirect_uri: window.location.origin + '/token_exchange',
    scope: 'public'
  };

  var connectUrl = 'https://www.strava.com/oauth/authorize?' + jQuery.param(params);
  $('a#connect').attr('href', connectUrl);

  // get token from query string
  var urlParams = getUrlParams();
  console.log('token: ' + urlParams.token);
  $('p#token').text(urlParams.token);

  // get athlete details
  if (urlParams.token && urlParams.token !== 'error') {
    var athleteUrl = 'https://www.strava.com/api/v3/athlete';
    var settings = {
      url: athleteUrl,
      data: { access_token: urlParams.token },
      // headers: { Authorizatdion: 'Bearer ' + urlParams.token },
      dataType: 'jsonp',
    };

    $.getJSON(athleteUrl + '?callback=?', settings.data, function(data) {
       console.log(data);
    });

    // $.ajax(settings)
    //   .done(function(data) {
    //     console.log(data);
    //   })
    //   .fail(function(data) {
    //     console.log(data);
    //   });
  }

  function getUrlParams() {
    var params = {};

    location.search.substr(1).split("&").forEach(function(item) {
      params[item.split("=")[0]] = item.split("=")[1];
    });

    return params;
  }
});
