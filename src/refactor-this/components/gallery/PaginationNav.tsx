import React, { useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PaginationButton from '../buttons/PaginationButton';

interface PaginationNavProps {
    gotoPage: (index: number) => void;
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageCount: number;
    pageIndex: number;
}

const PaginationNav: React.FC<PaginationNavProps> = ({
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
}) => {
    const renderPageLinks = useCallback(() => {
        if (pageCount === 0) return null;
        const visiblePageButtonCount = 3;
        let numberOfButtons =
            pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
        const pageIndices = [pageIndex];
        numberOfButtons--;
        [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
            const pageNumberBefore = pageIndices[0] - 1;
            const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
            if (
                pageNumberBefore >= 0 &&
                (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
            ) {
                pageIndices.unshift(pageNumberBefore);
            } else {
                pageIndices.push(pageNumberAfter);
            }
        });
        return pageIndices.map((pageIndexToMap) => (
            <li key={pageIndexToMap}>
                <PaginationButton

                    content={pageIndexToMap + 1}
                    onClick={() => gotoPage(pageIndexToMap)}
                    isActive={pageIndex === pageIndexToMap}
                    isDisabled={pageIndex === pageIndexToMap}
                />
            </li>
        ));
    }, [pageCount, pageIndex]);

    return (
        <ul className="flex gap-2">
            <li>
                <PaginationButton
                    content={
                        <div className="flex ml-1">
                            <FaChevronLeft size="0.6rem" />
                            <FaChevronLeft size="0.6rem" className="-translate-x-1/2" />
                        </div>
                    }
                    onClick={() => gotoPage(0)}
                    isDisabled={!canPreviousPage}
                />
            </li>
            {renderPageLinks()}
            <li>
                <PaginationButton
                    content={
                        <div className="flex ml-1">
                            <FaChevronRight size="0.6rem" />
                            <FaChevronRight size="0.6rem" className="-translate-x-1/2" />
                        </div>
                    }
                    onClick={() => gotoPage(pageCount - 1)}
                    isDisabled={!canNextPage}
                />
            </li>
        </ul>
    );
};

export default PaginationNav;
