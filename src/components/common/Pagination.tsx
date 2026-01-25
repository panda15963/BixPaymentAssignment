type Props = {
    page: number;              // 현재 페이지 (0-based)
    totalPages: number;        // 전체 페이지 수
    onChange: (page: number) => void;
    groupSize?: number;        // 페이지 버튼 묶음 수 (기본 5)
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
            {/* 처음 */}
            <button
                disabled={page === 0}
                onClick={() => onChange(0)}
                className={`px-2 py-1 text-sm rounded
                    ${page === 0 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
            >
                «
            </button>

            {/* 이전 그룹 */}
            <button
                disabled={startPage === 0}
                onClick={() => onChange(startPage - 1)}
                className={`px-2 py-1 text-sm rounded
                    ${startPage === 0 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
            >
                ‹
            </button>

            {/* 페이지 번호 */}
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

            {/* 다음 그룹 */}
            <button
                disabled={endPage >= totalPages}
                onClick={() => onChange(endPage)}
                className={`px-2 py-1 text-sm rounded
                    ${endPage >= totalPages ? 'text-gray-300' : 'hover:bg-gray-100'}`}
            >
                ›
            </button>

            {/* 끝 */}
            <button
                disabled={page === totalPages - 1}
                onClick={() => onChange(totalPages - 1)}
                className={`px-2 py-1 text-sm rounded
                    ${page === totalPages - 1 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
            >
                »
            </button>
        </div>
    );
}