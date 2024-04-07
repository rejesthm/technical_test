import { useEffect, useState } from "react";
import ImageDataGetter from "../../data/ImageDataGetter";
import { Image } from "../../models/Image";
import ListOfImages from "./ListOfImages";
import PaginationNav from "./PaginationNav";
import { ThreeDot } from "react-loading-indicators";

interface Props {
    category: string;
    onPageCountChange: (pageCount: number) => void;
    pageCount: number;
}

// create a new component named ImageLists that will display the images
// based on the category selected
const Gallery = ({ category, pageCount, onPageCountChange }: Props) => {
    const [images, setImages] = useState<Image[]>([]);
    // const [pageCount, setPageCount] = useState(pageCount);
    // declare isFetching state
    const [isFetching, setIsFetching] = useState(false);
    // declare canPreviousPage state and set it to false
    const [canPreviousPage, setCanPreviousPage] = useState(false);
    // declare canNextPage state and set it to true
    const [canNextPage, setCanNextPage] = useState(true);

    useEffect(() => {
        fetchData();
    }, [
        pageCount,
        setImages,
        setCanNextPage,
        setCanPreviousPage,
        category,
        onPageCountChange,
    ]); // Fetch data whenever page changes

    const handlePageClick = (index: number) => {
        onPageCountChange(index);
        // setPageCount(index);
    }

    const fetchData = async () => {
        setImages([]);
        setIsFetching(true);
        const pageCountForPagination = pageCount + 1;
        try {
            const mergedImages = [
                ImageDataGetter.getImagesFromPage(category, (pageCountForPagination * 3) - 2),
                ImageDataGetter.getImagesFromPage(category, (pageCountForPagination * 3) - 1),
                ImageDataGetter.getImagesFromPage(category, (pageCountForPagination * 3))
            ];
            const images = await Promise.all(mergedImages);

            setImages(images.flat());


            // can set previous page to false if page count is 1
            setCanPreviousPage(pageCount > 0);
            // set can next page to false if there are no images
            setCanNextPage(pageCount < 2);

            setIsFetching(false);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsFetching(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center mt-4">
                <ThreeDot color="#14b8a6" size="large" text="" textColor="" />
            </div>
        );
    }

    return (
        // div container for the images and pagination
        <div>
            {/* display the images */}
            <div>

                <ListOfImages key={category + pageCount} images={images} />
            </div>
            {/* display the pagination*/}
            <div className="flex justify-center my-4">
                <PaginationNav
                    gotoPage={handlePageClick}
                    canPreviousPage={canPreviousPage}
                    canNextPage={canNextPage}
                    pageCount={3}
                    pageIndex={pageCount}
                />
            </div>
        </div>

    );
};

export default Gallery;
