import { type ChangeEvent, type ReactNode } from 'react';

interface TextInputProps {
    readonly id: string;
    readonly label: string;
    readonly type?: string;
    readonly autoComplete?: string;
    readonly value?: string;
    readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    readonly error?: string;
    readonly rightElement?: ReactNode;
}

export function TextInput({
                              id,
                              label,
                              type = 'text',
                              autoComplete,
                              value,
                              onChange,
                              error,
                              rightElement,
                          }: Readonly<TextInputProps>) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>

            <div className="relative mt-2">
                <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    className={`
                        block w-full rounded-md bg-white px-3 py-1.5 pr-16 text-base
                        text-gray-900 outline-1 -outline-offset-1
                        outline-gray-300 placeholder:text-gray-400
                        focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
                        sm:text-sm/6
                        dark:bg-white/5 dark:text-white dark:outline-white/10
                        dark:placeholder:text-gray-500 dark:focus:outline-indigo-500
                        ${error ? 'outline-red-500 focus:outline-red-500' : ''}
                    `}
                />

                {rightElement && (
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        {rightElement}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}