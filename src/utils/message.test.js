import { generateMessage, generateLocationMessage } from './message';

describe('generateMessage', () => {
  it('should generate a correct message object', () => {
    const from = 'Jen';
    const text = 'Some message';

    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(typeof message.from).toBe('string');
    expect(typeof message.text).toBe('string');
    expect(message).toMatchObject({ from, text });
  });
});

describe('generateLocationMessage', () => {
  it('should generate a correct location object', () => {
    const from = 'Jen';
    const latitude = 32.32323;
    const longitude = 12.54523;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(typeof message.from).toBe('string');
    expect(message).toMatchObject({ from, url });
  });
});
