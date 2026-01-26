type Props = {
    readonly page: number;
    readonly totalPages: number;
    readonly onChange: (page: number) => void;
    readonly groupSize?: number;
};

export default function Pagination({
                                       page,
                                       totalPages,
                                       onChange,
                                       groupSize = 5,
                                   }: Props) {
    if (totalPages <= 1) return null;

    const currentGroup = Math.floor(page / groupSize);
    const startPage = currentGroup * groupSize;
    const endPage = Math.min(startPage + groupSize, totalPages);

    return (
        <div className="flex justify-center gap-1 pt-4">
            <button
                disabled={page === 0}
                onClick={() => onChange(0)}
                className={`px-2 py-1 text-sm rounded
                    ${page === 0 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
            >
                «
            </button>

            <button
                disabled={page === 0}
                onClick={() => onChange(page - 1)}
                className={`px-2 py-1 text-sm rounded
                    ${page === 0 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
            >
                ‹
            </button>

            {Array.from({ length: endPage - startPage }).map((_, i) => {
                const pageNumber = startPage + i;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => onChange(pageNumber)}
                        className={`px-3 py-1 text-sm rounded
                            ${
                            page === pageNumber
                                ? 'bg-indigo-600 text-white'
                                : 'hover:bg-gray-100'
                        }`}
                    >
                        {pageNumber + 1}
                    </button>
                );
            })}

            <button
                disabled={page >= totalPages - 1}
                onClick={() => onChange(page + 1)}
                className={`px-2 py-1 text-sm rounded
                    ${
                    page >= totalPages - 1
                        ? 'text-gray-300'
                        : 'hover:bg-gray-100'
                }`}
            >
                ›
            </button>

            <button
                disabled={page === totalPages - 1}
                onClick={() => onChange(totalPages - 1)}
                className={`px-2 py-1 text-sm rounded
                    ${
                    page === totalPages - 1
                        ? 'text-gray-300'
                        : 'hover:bg-gray-100'
                }`}
            >
                »
            </button>
        </div>
    );
}