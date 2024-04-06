import React from 'react';

interface Image {
    url: string;
    name: string;
}

class ImageDataGetter extends React.Component {

    static async getImagesFromPage(category: string, page: number): Promise<Image[]> {
        try {
            const response = await fetch(`http://localhost:8888/images?category=${category.toLowerCase()}&page=${page}`);
            const result = await response.json();
            return result as Image[];
        } catch (error) {
            console.error('Error fetching images from page:', error);
            return [];
        }
    }


    static async getNatureImagesFromPage(page: number): Promise<Image[]> {
        return ImageDataGetter.getImagesFromPage('nature', page);
    }

    static async getArchitectureImagesFromPage(page: number): Promise<Image[]> {
        return ImageDataGetter.getImagesFromPage('architecture', page);
    }

    static async getFashionImagesFromPage(page: number): Promise<Image[]> {
        return ImageDataGetter.getImagesFromPage('fashion', page);
    }
}

export default ImageDataGetter;
