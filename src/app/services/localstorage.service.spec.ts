import {localStorageService} from "./localstorage.service";

describe('localStorageService', () => {
    let service = new localStorageService();

    it('can set a string as an item', function() {

        localStorageService.setItem('kiwi','banane');

        expect(localStorage.getItem('kiwi')).toBe('"banane"');

    });

    it('can set a number as an item', function() {

        localStorageService.setItem('kiwi',3);

        expect(localStorage.getItem('kiwi')).toBe('3');

    });

    it('can set a boolean as an item', function() {

        localStorageService.setItem('kiwi',true);

        expect(localStorage.getItem('kiwi')).toBe('true');

    });



    it('can set an object as an item', function() {

        localStorageService.setItem('kiwi',{kiwi:"banane"});

        expect(localStorage.getItem('kiwi')).toBe('{"kiwi":"banane"}');

    });

    it('can get a number as an item', function() {

        let number = 4;

        localStorageService.setItem('kiwi',number);

        expect(localStorageService.getItem('kiwi')).toBe(number);

    });


    it('can get a boolean as an item', function() {

        let bool = true;

        localStorageService.setItem('kiwi',bool);

        expect(localStorageService.getItem('kiwi')).toBe(bool);

    });

    it('can get a string as an item', function() {

        let str = 'this is a string';

        localStorageService.setItem('kiwi',str);

        expect(localStorageService.getItem('kiwi')).toBe(str);

    });


    it('can get an object as an item', function() {

        let object = {kiwi:"banane"};

        localStorageService.setItem('kiwi',object);

        expect(localStorageService.getItem('kiwi')).toEqual(object);

    });

    it('can remove an item', function() {

        let object = {kiwi:"banane"};

        localStorageService.setItem('kiwi',object);

        localStorageService.removeItem('kiwi');

        expect(localStorageService.getItem('kiwi')).toEqual(null);

    });

    it('can flush all items', function() {

        let object = {kiwi:"banane"};

        localStorageService.setItem('kiwi',object);
        localStorageService.setItem('banane',object);

        localStorageService.flush();

        expect(localStorageService.getItem('kiwi')).toEqual(null);
        expect(localStorageService.getItem('banane')).toEqual(null);

    });

});