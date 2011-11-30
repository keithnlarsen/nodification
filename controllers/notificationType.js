module.exports.NotificationTypeController = function(notificationType){

  return {
    get : function(id, callBack) {
      notificationType.findById(id, function(err, instance) {
        callBack(err, instance);
      });
    },

    getByName : function(name, callBack) {
      notificationType.findOne({name:name}, function(err, instance) {
        callBack(err, instance);
      });
    },

    list : function(callBack) {
      notificationType.find({}, function (err, list) {
        callBack(err, list);
      });
    },

    insert : function(json, callBack){
      notificationType.create(json, function(err, instance) {
        callBack(err, instance);
      });
    },

    update : function(id, json, callBack){
      try {
        notificationType.update({_id:id}, json, function(err) {
          if (err) {
            // TODO: Swallowing this error is bad, but this seems to be thrown when mongo can't find the document we are looking for.
            if (err == 'Error: Element extends past end of object')
              callBack(null, null);
            else
              callBack(err, null);
          }
          else {
            notificationType.findById(id, function(err, instance) {
              callBack(err, instance);
            });
          }
        });
      }
      catch(err) {
        callBack(err, null);
      }
    },

    remove : function(id, callBack){
      notificationType.findById(id, function(err, instance) {
        if (instance) {
          instance.remove(function(err){
            callBack(err, instance)
          });
        }
        else {
          callBack(err, instance);
        }
      });
    }
  }
};