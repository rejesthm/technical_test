import { Pages } from '../src/refactor-this/common/constants';
import ImageDataGetter from '../src/refactor-this/data/ImageDataGetter';
import { Image } from '../src/refactor-this/models/Image';

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{ url: 'test-url', name: 'test-name' }]),
    })
) as jest.Mock;

describe('ImageDataGetter', () => {
    /// [Happy Path] [Fetch Images with Category and Page Parameter]
    test('it should fetch images with category and page parameter', async () => {
        // Given
        const category = Pages.nature;
        const page = 1;

        // When
        const images: Image[] = await ImageDataGetter.getImagesFromPage(category, page);

        // Then
        expect(images).toEqual([{ url: 'test-url', name: 'test-name' }]);
    });

    /// [Sad Path] [Fetch Images with Category and Page Parameter]
    test('it should return empty array when fetching images with category and page parameter fails', async () => {
        // Given
        const category = '';
        const page = 1;

        // When
        const images: Image[] = await ImageDataGetter.getImagesFromPage(category, page);

        // Then
        expect(images).toEqual([]);
    });
});
