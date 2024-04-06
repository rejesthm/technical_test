import { Image } from "../../models/Image";

interface Props {
    images: Image[];
}

// create a new component named ImageLists that will display the images
// based on the category selected
const ListOfImages = ({ images = [] }: Props) => {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {images.map((image) => {
                    return (
                        <div className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img key={image.url} src={image.url} alt={image.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ListOfImages;