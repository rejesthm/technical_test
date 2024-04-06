import { useEffect, useState } from "react";
import ImageDataGetter from "../../data/ImageDataGetter";
import { Pages } from "../../common/constants";
import { Image } from "../../models/Image";
import ListOfImages from "./ListOfImages";
import PaginationNav from "./PaginationNav";
import { ThreeDot } from "react-loading-indicators";

interface Props {
    category: string;
}

// create a new component named ImageLists that will display the images
// based on the category selected
const Gallery = ({ category }: Props) => {
    const [images, setImages] = useState<Image[]>([]);
    const [pageCount, setPageCount] = useState(0);
    // declare isFetching state
    const [isFetching, setIsFetching] = useState(false);
    // declare canPreviousPage state and set it to false
    const [canPreviousPage, setCanPreviousPage] = useState(false);
    // declare canNextPage state and set it to true
    const [canNextPage, setCanNextPage] = useState(true);

    useEffect(() => {
        fetchData();
    }, [pageCount, setImages, category, setCanNextPage, setCanPreviousPage,]); // Fetch data whenever page changes

    const handlePageClick = (index: number) => {
        setPageCount(index);
    }

    const fetchData = async () => {
        setImages([]);
        setIsFetching(true);
        let mergedImages: Image[] = [];
        const pageCountForPagination = pageCount + 1;
        try {
            switch (category) {
                case Pages.nature:
                    mergedImages = [
                        ...(await ImageDataGetter.getNatureImagesFromPage((pageCountForPagination * 3))),
                        ...(await ImageDataGetter.getNatureImagesFromPage((pageCountForPagination * 3) - 1)),
                        ...(await ImageDataGetter.getNatureImagesFromPage((pageCountForPagination * 3) - 2)),
                    ];
                    break;
                case Pages.architecture:
                    mergedImages = [
                        ...(await ImageDataGetter.getArchitectureImagesFromPage((pageCountForPagination * 3) - 2)),
                        ...(await ImageDataGetter.getArchitectureImagesFromPage((pageCountForPagination * 3) - 1)),
                        ...(await ImageDataGetter.getArchitectureImagesFromPage((pageCountForPagination * 3))),
                    ];
                    break;
                case Pages.fashion:
                    mergedImages = [
                        ...(await ImageDataGetter.getFashionImagesFromPage((pageCountForPagination * 3) - 2)),
                        ...(await ImageDataGetter.getFashionImagesFromPage((pageCountForPagination * 3) - 1)),
                        ...(await ImageDataGetter.getFashionImagesFromPage((pageCountForPagination * 3))),
                    ];
                    break;

                default:
                    break;
            }
            // can set previous page to false if page count is 1
            setCanPreviousPage(pageCount > 0);
            // can set next page to false if page count is 3
            setCanNextPage(pageCount === 9);
            setImages(mergedImages);

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
