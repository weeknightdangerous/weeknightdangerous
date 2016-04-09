angular.module('trailApp.comment', [])

  .controller('commentsCtrl', function(Auth, commentForm, $location) {
    var comments = this;
    comments.user = false;
    comments.data = [];

    comments.isUser = function() {
      comments.user = Auth.checkUser();
      console.log('comments.user:', comments.user);
      
    }

    comments.getComments = function() {
      return commentForm.getComments()
        .then(function (result) {
          return comments.data = result;
        })
        .catch(function (err) {
          console.error('get comments client:', err);
        })
    }

    comments.update = function(comment) {
      return commentForm.postComments(comment)
        .then(function (result) {
          console.log('post comments client result:', result);
          comments.getComments();  
          comments.text = '';
        })
        .catch(function (err) {
          console.error('post comments client Error:', err);
        })
    
    };
    //initialize user status: if user is signed in when this page is rendered
    comments.isUser();
    comments.getComments();

  });