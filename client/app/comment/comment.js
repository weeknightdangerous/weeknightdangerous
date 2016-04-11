angular.module('trailApp.comment', [])

  .controller('commentsCtrl', function(Auth, commentForm, $location) {
    var comments = this;
    comments.user = false;
    comments.data = [];
    comments.username;

    comments.isUser = function() {
      comments.user = Auth.checkUser();
      comments.username= Auth.getUser();
  
      console.log('comments.user:', comments.user);
      
    }

    comments.getComments = function() {
      var trailId = $state.params.trailId;
      return commentForm.getComments(trailId)
        .then(function (result) {
          console.log('getComments result client:', result)
          return comments.data = result;
        })
        .catch(function (err) {
          console.error('get comments client:', err);
        })
    }

    comments.update = function(comment, isValid) {
      console.log('isValid', isValid)
      if (isValid) {
        return commentForm.postComments(comment)
          .then(function (result) {
            console.log('post comments client result:', result);
            comments.getComments();  
            comments.text = '';
          })
          .catch(function (err) {
            console.error('post comments client Error:', err);
          })
      }
    };
    //initialize user status: if user is signed in when this page is rendered
    comments.isUser();
    comments.getComments();

  });