import moment from 'moment';

const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: moment().valueOf(),
});

const generateLocationMessage = (from, latitude, longitude) => ({
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: moment().valueOf(),
});

export { generateMessage, generateLocationMessage };
