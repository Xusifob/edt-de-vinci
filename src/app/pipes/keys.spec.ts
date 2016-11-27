import {KeysPipe} from  './keys';

describe('KeysPipe', () => {
    let pipe = new KeysPipe();
    it('Returns the keys and value for an object', function() {

        let obj = {
            kiwi : 'banane',
            bonjour : 'unicorn',
        };

        expect(pipe.transform(obj)).toEqual([
            {key : 'kiwi',value : 'banane'},
            {key : 'bonjour', value : 'unicorn'}
        ]);
    });
});