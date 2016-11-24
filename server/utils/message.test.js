const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate a correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate a correct location object', () => {
        let from = 'Jen';
        let latitude = 32.32323;
        let longitude = 12.54523;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        let message = generateLocationMessage(from, latitude, longitude);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});
