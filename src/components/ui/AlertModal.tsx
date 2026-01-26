interface AlertModalProps {
    readonly open: boolean;
    readonly message: string;
    readonly onClose: () => void;
    readonly onConfirm?: () => void;
}

export function AlertModal({
                               open,
                               message,
                               onClose,
                               onConfirm,
                           }: AlertModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-sm rounded-lg bg-white p-6">
                <p className="text-sm text-gray-800">{message}</p>

                <div className="mt-4 flex justify-end gap-2">
                    {onConfirm ? (
                        <>
                            <button
                                onClick={onClose}
                                className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                취소
                            </button>
                            <button
                                onClick={onConfirm}
                                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                            >
                                확인
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full rounded-md bg-indigo-600 py-2 text-sm text-white hover:bg-indigo-700"
                        >
                            확인
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}