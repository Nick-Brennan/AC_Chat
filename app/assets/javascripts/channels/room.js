App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    console.log(data['message']);
    $('#messages').append(data['message']);
  },

  speak: function(message) {
    console.log("speak function called on RoomChannel");
    return this.perform('speak', {message: message});
  }
});

$(document).on('keypress', '[data-behaviour~=room_speaker]', function(e){
  if(e.keyCode === 13){
    App.room.speak(event.target.value);
    event.target.value = '';
    e.preventDefault();
  }
});
