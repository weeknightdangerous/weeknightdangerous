angular.module('trailApp.comment', [])

  .controller('commentsCtrl', function(Auth, commentForm, $state) {
    var comments = this;
    //set default user status to false - to hide the commentForm view
    comments.user = false;
    comments.data = [];
    //storage for username
    comments.username;
    //get trailId from $state.params and store it in the trailId variable 
    var trailId = $state.params.trailId;

    comments.isUser = function() {
      //set the comments.user status to the returned result of Auth.checkUser(), which will be either a true or false value
      comments.user = Auth.checkUser();
      //save the username in comments.username so we can use it in the comments html
      comments.username= Auth.getUser();
      //console.log('comments.user:', comments.user);
      
    }

    //get existing comments 
    comments.getComments = function() {
      return commentForm.getComments(trailId)
        .then(function (result) {
          //console.log('getComments result client:', result)
          return comments.data = result;
        })
        .catch(function (err) {
          console.error('get comments client:', err);
        })
    }

    //post a new comment
    comments.update = function(comment, isValid) {
      if (isValid) {
        return commentForm.postComments(comment,trailId)
          .then(function (result) {
            //console.log('post comments client result:', result);
            comments.getComments();  
            comments.text = '';
          })
          .catch(function (err) {
            console.error('post comments client Error:', err);
          })
      }
    };
    //initialize user status: if user is signed in on page render
    comments.isUser();
    //initialize the existing comments on page render
    comments.getComments();
  });