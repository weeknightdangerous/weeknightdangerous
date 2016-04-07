angular.module('trailApp.comment', [])

  .controller('commentsCtrl', function(Auth, commentForm, $location) {
    var comments = this;
    comments.user = false;

    comments.isUser = function() {
      comments.user = Auth.checkUser();
      console.log('comments.user:', comments.user);
      
    }

    comments.update = function(comment) {
      console.log('comments:', comment)
      var idStr = $location.$$path;
      var trailId = idStr.substr(idStr.indexOf('/') + 7)
      console.log('trailId', trailId)

      commentForm.postComments(comment, trailId)
      .then(function (result) {
        console.log('comments result:', result);
      })
      .catch(function (err) {
        console.error('comments Error:', err);
      })
    
    };
    //initialize user status: if user is signed in when this page is rendered
    comments.isUser();
  });