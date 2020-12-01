import {StorageService} from '@ts/services/storage.service';
import 'localstorage-polyfill'

describe('Test Storage Service', () => {
    const storageService = new StorageService();

    it('clear()', () => {
        spyOn(localStorage, 'removeItem');
        storageService.clear()
        expect(localStorage.removeItem).toHaveBeenCalledOnceWith(StorageService.APP_PASSWORD);
    });

    it('get()', () => {
        spyOn(localStorage, 'getItem');
        storageService.get('key')
        expect(localStorage.getItem).toHaveBeenCalledOnceWith('key');
    });

    it('save()', () => {
        spyOn(localStorage, 'setItem');
        storageService.save('key', 'value')
        expect(localStorage.setItem).toHaveBeenCalledOnceWith('key', 'value');
    });

    it('remove()', () => {
        spyOn(localStorage, 'removeItem');
        storageService.remove('key')
        expect(localStorage.removeItem).toHaveBeenCalledOnceWith('key');
    });
});
