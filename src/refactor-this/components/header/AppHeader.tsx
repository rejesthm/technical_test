interface PageSettings {
    activePage: string;
    pageLists: string[];
    onChangedPage: (activePage: string) => void;
}

const AppHeader = ({ activePage, pageLists, onChangedPage }: PageSettings) => {
    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">Photo Sharing App</span>
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        {
                            pageLists.map((pageList, index) => {
                                return (
                                    <button
                                        className={`block mt-4 lg:inline-block lg:mt-0 mr-4 hover:text-white
                                        ${activePage === pageList ? 'text-white' : 'text-teal-200'}`}
                                        key={index}
                                        onClick={() => {
                                            onChangedPage(pageList);
                                        }}
                                    >
                                        {pageList}
                                    </button>
                                )
                            })

                        }
                    </div>
                </div>
            </nav>


        </div>
    );
};

export default AppHeader;
