  var socket = io();
  var chat = $('#chat').val()
  var obj = JSON.parse(chat)
  $( document ).ready(function() {
      $('#messages').empty();
  });
  //$('.messg').empty();
  for (let i = 0; i < obj.length; i++) {    
      socket.emit('chat message',obj[i]);
  }
  
  $('form').submit(function(){
    if($('#m').val() != ''){
      socket.emit('chat message',{type:'customer',message : $('#m').val()});
      if(($('#m').val()).toUpperCase() == 'GOOD MORNING'){
        var dt = new Date();
        if(dt.getHours() >  12){
          socket.emit('chat message',{type:'bot',message : "Its not a morning. isn't it ?"});
        }else if(dt.getHours() <  12){
          socket.emit('chat message',{type:'bot',message : "Great day it is"});
        }
      }else{
        socket.emit('chat message',{type:'bot',message : "Thank you"});
      }
      $('#m').val('');
      return false;
    }
  });
  socket.on('chat message', function(msg){
    if(msg.type == 'bot'){
      $('#messages').append(
      $('<li>').attr('style',  'background-color:grey;width:50%;display: inline-block;margin: 5px;float:left;').append(
          '<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgSEhUTEggWFRMXGRMYFxcXFxofGhoaGxcaFxgXGBcjHSggGBooHR0VITEhJSkrLjouFx8zODMtNygtLisBCgoKDQwNGhAPGjclHyU3NS0tLTU3NTQtLS0rNzUtLTUtLS0tLTgtLTctLTUtLS0tLSsrKysrLSsrKysrKysrK//AABEIAFAAUAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFBgIDBAcBAP/EAEIQAAECAwUDBQsKBwAAAAAAAAECAwAEEQUGEiExQVHRE2FxkaEUFiJSU5LB0uHi8BUjMkRUgYKDorEkQkNVYmNy/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAECAwUE/8QAIhEAAgIBBAIDAQAAAAAAAAAAAAECEQMSEyExBGFBUZEV/9oADAMBAAIRAxEAPwAmmWSNFKHQpQ9MTQHRpNOj8xfGLRJr8oeuJCRe8t2+yC/Y6Z4l+bGk+6PzFcYtRaNpDS0nNKag+iIdwv8Aj/HVHxkpnxuyCw5LRalqipFpLzpsTs+7oiwW5bA0tDbtQmANtz3cyCtx0ZUAGWIkioAELcrflB+m1ToFeETSb6IuVdnSEXjtofWknXVvgYuF67WA0aP4VetC/Lcq4kLQQpJ0IB4xYWpnyPYYVhbD6L4WkNZNo/iUPQYsTfWc22Wn7nT6kLJD/kP34RArd2s9vshWOznBbXsSYkiYmB/UUB0mLVl7P+HX1HduiohdKckrqiBt6YEhPTP2hfnHjGj5SnR9bc89XGB2FXixanMawIahBg615mYdcAU8pRAoKkmPmrOQQfDOWsai22Fg9IOcaMMuCRQkGJvK0uDKniWtkrAtO0GcSETagkUgyLxWsPrVelKeECEIQk1ByyjWZtvHrlv2dUJyvk7sGCChygj312mB9NJ/CI9Re+0t6PN9sCcTaQBjB1PCM76kUFOeItot2Mb+BkRfVxORsxXnn1ImL+D+2nz/AHIU3VOZeAMtKGKwXSomBzZQsGMdVX6QNbOVnuX7sepv1KnWQX1jhCa4h0kAJqTlDpZV0VJSFKe8PUjduA5+eBNshkhixq2B75WtKvttgSa0LriSVADwSM/R1QuMKfpsoKZmHu0CyoFpcoFUNM6Ag7xtEYRdyXSrEH1hAGIpKakZeNX0QOzlU49kGrUsoJThCsKQATyaDU7ya5eyJ/LVj1+iDntbTnza5RJdmoWApDunUeECZiUeQaqRsyJpSsOzpgsU1wwqi1LG1LIIrn80Pb8GNPytdc59yjzIV1nI4sOzSkfJ5PcNmwQtRbsx+3+jGboN/b/0+9EO89H2/wDT70L/AHo27SmFHUjhFCrh2qdW0fph0jO3JDlIXXaQ6hRmq4SDSlK00276Q6hHg9UcnsC58zLzDbz2BLbasSjlkAD6aR1CVt+x3SENzySo6DMV6IHQOTl2Bbxy7RWDjocKq8+gFR15xnlXJpP8uJuhFM6HLUmnRDK1LNlRWU1PxSNTycqQg1cCg65Lt1UpSUpNNOHVC3eO0A6gJbqEg1J300puEF7+WcpaWzhJShWJWemwGABlXnBgQk4jpx5ohOVNJFkIppsCNOJxALcwpJ13RrmO4k5JmSroSR+8WruTapNSpNf+qxd3rW0lNOUbCRvDf70ideyO87HszQ8fsitU5/s7IFqW+NFfG2Ip5Uk4jGL/AEMjQtHJdbk2eQWMezdzwsWK188jOmYzg5aSMTKstkD7upQp5tKhWppHX4uZ5Vci6KqLo6lIVpXFlFU1aUqggOOhBUSAFZaCteiNMnKlAoEYRAG+FgOTXJKS8QEKIIpkQaVNa5adsaByme3HUFVDmD94IgXKhpGla0pWg0iy8Lyi4QnZGRp0E0pnGPn8rJGbUSxBDuv/ADMYrYSXmijGd+m6KXHVEeCYtQ7XYagZxS/MzDSSP//Z" height="35px" width="30px">' + 
            '<span style="vertical-align:top;padding: 6px;">  ' + msg.message+ '</span>'
        )
      ); 
    }else{
      $('#messages').append(
      $('<li>').attr('style',  'background-color:white;width:50%;display: inline-block;margin: 5px;float:right;').append(
          '<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgSEhUTEggWFRMXGRMYFxcXFxofGhoaGxcaFxgXGBcjHSggGBooHR0VITEhJSkrLjouFx8zODMtNygtLisBCgoKDQwNGhAPGjclHyU3NS0tLTU3NTQtLS0rNzUtLTUtLS0tLTgtLTctLTUtLS0tLSsrKysrLSsrKysrKysrK//AABEIAFAAUAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAFBgIDBAcBAP/EAEIQAAECAwUDBQsKBwAAAAAAAAECAwAEEQUGEiExQVHRE2FxkaEUFiJSU5LB0uHi8BUjMkRUgYKDorEkQkNVYmNy/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAECAwUE/8QAIhEAAgIBBAIDAQAAAAAAAAAAAAECEQMSEyExBGFBUZEV/9oADAMBAAIRAxEAPwAmmWSNFKHQpQ9MTQHRpNOj8xfGLRJr8oeuJCRe8t2+yC/Y6Z4l+bGk+6PzFcYtRaNpDS0nNKag+iIdwv8Aj/HVHxkpnxuyCw5LRalqipFpLzpsTs+7oiwW5bA0tDbtQmANtz3cyCtx0ZUAGWIkioAELcrflB+m1ToFeETSb6IuVdnSEXjtofWknXVvgYuF67WA0aP4VetC/Lcq4kLQQpJ0IB4xYWpnyPYYVhbD6L4WkNZNo/iUPQYsTfWc22Wn7nT6kLJD/kP34RArd2s9vshWOznBbXsSYkiYmB/UUB0mLVl7P+HX1HduiohdKckrqiBt6YEhPTP2hfnHjGj5SnR9bc89XGB2FXixanMawIahBg615mYdcAU8pRAoKkmPmrOQQfDOWsai22Fg9IOcaMMuCRQkGJvK0uDKniWtkrAtO0GcSETagkUgyLxWsPrVelKeECEIQk1ByyjWZtvHrlv2dUJyvk7sGCChygj312mB9NJ/CI9Re+0t6PN9sCcTaQBjB1PCM76kUFOeItot2Mb+BkRfVxORsxXnn1ImL+D+2nz/AHIU3VOZeAMtKGKwXSomBzZQsGMdVX6QNbOVnuX7sepv1KnWQX1jhCa4h0kAJqTlDpZV0VJSFKe8PUjduA5+eBNshkhixq2B75WtKvttgSa0LriSVADwSM/R1QuMKfpsoKZmHu0CyoFpcoFUNM6Ag7xtEYRdyXSrEH1hAGIpKakZeNX0QOzlU49kGrUsoJThCsKQATyaDU7ya5eyJ/LVj1+iDntbTnza5RJdmoWApDunUeECZiUeQaqRsyJpSsOzpgsU1wwqi1LG1LIIrn80Pb8GNPytdc59yjzIV1nI4sOzSkfJ5PcNmwQtRbsx+3+jGboN/b/0+9EO89H2/wDT70L/AHo27SmFHUjhFCrh2qdW0fph0jO3JDlIXXaQ6hRmq4SDSlK00276Q6hHg9UcnsC58zLzDbz2BLbasSjlkAD6aR1CVt+x3SENzySo6DMV6IHQOTl2Bbxy7RWDjocKq8+gFR15xnlXJpP8uJuhFM6HLUmnRDK1LNlRWU1PxSNTycqQg1cCg65Lt1UpSUpNNOHVC3eO0A6gJbqEg1J300puEF7+WcpaWzhJShWJWemwGABlXnBgQk4jpx5ohOVNJFkIppsCNOJxALcwpJ13RrmO4k5JmSroSR+8WruTapNSpNf+qxd3rW0lNOUbCRvDf70ideyO87HszQ8fsitU5/s7IFqW+NFfG2Ip5Uk4jGL/AEMjQtHJdbk2eQWMezdzwsWK188jOmYzg5aSMTKstkD7upQp5tKhWppHX4uZ5Vci6KqLo6lIVpXFlFU1aUqggOOhBUSAFZaCteiNMnKlAoEYRAG+FgOTXJKS8QEKIIpkQaVNa5adsaByme3HUFVDmD94IgXKhpGla0pWg0iy8Lyi4QnZGRp0E0pnGPn8rJGbUSxBDuv/ADMYrYSXmijGd+m6KXHVEeCYtQ7XYagZxS/MzDSSP//Z" height="35px" width="30px">' + 
            '<span style="vertical-align:top;padding: 5px;">  ' +msg.message+ '</span>'
        )
      ); 
    }
  });
