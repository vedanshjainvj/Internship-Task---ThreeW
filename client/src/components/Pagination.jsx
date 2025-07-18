const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(parseInt(currentPage, 10) + 1);
        }
    };

    // Don't show pagination if there's only 1 or 0 pages
    if (totalPages <= 1) return null;

    return (
        <nav className="flex justify-center items-center space-x-2">
            <button
                onClick={handlePrev}
                disabled={currentPage <= 1}
                className="px-3 py-2 bg-white border cursor-pointer border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &laquo; Prev
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    disabled={currentPage === number}
                    className={`hidden sm:inline-flex px-4 py-2 cursor-pointer border rounded-md text-sm font-medium ${currentPage === number
                        ? 'bg-indigo-600 border-indigo-600 text-white z-10'
                        : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    {number}
                </button>
            ))}

            <span className="sm:hidden px-4 py-2 border border-slate-300 rounded-md text-sm font-medium bg-white text-slate-700">
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                className="px-3 py-2 bg-white border cursor-pointer border-slate-300 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next &raquo;
            </button>
        </nav>
    );
};

export default Pagination;
