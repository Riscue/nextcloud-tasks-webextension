import {DavService} from '@ts/services/dav.service';
import {StorageService} from '@ts/services/storage.service';
import {ApiService} from '@ts/services/api.service';
import {UserService} from '@ts/services/user.service';

describe('Test Dav Service', () => {
    const mockStorageService = new StorageService();
    const mockApiService = new ApiService(mockStorageService);
    const mockUserService = new UserService(mockStorageService, mockApiService);
    const davService = new DavService(mockApiService, mockUserService);
});
