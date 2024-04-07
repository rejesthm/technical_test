
import { Image } from '../models/Image';


class ImageDataGetter {

    static async getImagesFromPage(category: string, page: number): Promise<Image[]> {
        try {
            /// check if category is valid from [Pages] enum
            if (!category) {
                throw new Error('Category is required');
            }

            const response = await fetch(`http://localhost:8888/images?category=${category.toLowerCase()}&page=${page}`);
            const result = await response.json();
            return result as Image[];
        } catch (error) {
            console.error('Error fetching images from page:', error);
            return [];
        }
    }
}

export default ImageDataGetter;
