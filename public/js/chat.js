'use strict';

/* eslint-disable no-alert */

const socket = io();

function scrollToBottom() {
  // selectors
  const messages = $('#messages');
  const newMessage = messages.children('li:last-child');
  // heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    console.log('Should scroll');
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', () => {
  const params = $.deparam(window.location.search);
  socket.emit('join', params, err => {
    if (err) {
      window.alert(err);
      window.location.href = '/';
    }
  });
});

socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime,
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('updateUserList', users => {
  const ol = $('<ol></ol>');
  users.forEach(user => {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

$('#message-form').submit(e => {
  e.preventDefault();
  const messageTextbox = $('[name=message]');
  socket.emit(
    'createMessage',
    {
      text: messageTextbox.val(),
    },
    () => {
      messageTextbox.val('');
    }
  );
});

const locationButton = $('#send-location');
locationButton.on('click', e => {
  e.preventDefault();
  if (!navigator.geolocation) {
    return window.alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  return navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr('disabled').text('Send location');
      return socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      locationButton.removeAttr('disabled').text('Send location');
      return window.alert('Unable to fetch location');
    }
  );
});
