
function bindData( obj, data ){
  var mappedTypes = $.map ( data, function( item ) {
    return new obj( item );
  });
  return mappedTypes;
}


function displayMessage ( msg, error ) {
  $( '#feedbackMessage span' ).html( msg );
  if ( error ) {
    $( '#feedbackMessage' ).addClass( 'error' ).fadeIn( 'slow', function(){
      $(this).fadeOut(2000);
    });
  } else {
    $( '#feedbackMessage' ).removeClass( 'error' ).fadeIn( 'slow', function(){
      $(this).fadeOut(2000);
    });
  }
}

function findObjectInArray( item, item_id, array ) {

  var foundObj = null;
  for ( i in array ) {
    var tmpObj = array[i];
    if( tmpObj[item_id] === item ){
      foundObj = tmpObj;
      return foundObj;
    }
  }
}

function getNotifcationTypes ( self, callback ) {
  $.ajax( {
    type: 'GET',
    url: '/notificationTypes',
    contentType: 'application/json; charset=utf-8',
    success: function ( data ) {
      var mappedTypes = bindData ( notificationType, data );
      self.notificationTypes( mappedTypes );
      callback();
    },
    error: function () {
      _displayMessage( "An error occurred while retrieving the Notification Types.", true );
    }
  } );
}