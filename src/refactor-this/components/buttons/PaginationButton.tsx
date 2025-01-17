import { ReactNode } from "react";

interface Props {
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    /// [content] dynamic [FaChevronRight] icon or a [number]
    content: ReactNode | number;
}

const PaginationButton = ({ onClick, isActive, isDisabled, content }: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
                ${isActive ? "bg-teal-500 text-white" : "text-teal-500"}
                ${!isDisabled
                    ? "bg-white hover:bg-teal-500 hover:text-white"
                    : "text-teal-200 cursor-not-allowed"
                }
            `}
        >
            {content}
        </button>
    );
};

export default PaginationButton;

