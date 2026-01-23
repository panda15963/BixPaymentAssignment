import { Link } from 'react-router-dom';
import { TextInput } from '../components/ui/TextInput';

export default function LoginPage() {
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-6 py-10 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

                    <h2 className="mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                        계정에 로그인하세요
                    </h2>

                    <form action="#" method="POST" className="space-y-6">
                        <TextInput
                            id="email"
                            label="이메일 주소"
                            type="email"
                            autoComplete="email"
                        />
                        <TextInput
                            id="password"
                            label="비밀번호"
                            type="password"
                            autoComplete="current-password"
                        />

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                            로그인
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                        아직 회원이 아니신가요?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            회원가입 하세요!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}