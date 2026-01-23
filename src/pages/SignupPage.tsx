import { Link } from 'react-router-dom';
import {type ChangeEvent, type FormEvent, useState} from 'react';
import { TextInput } from '../components/ui/TextInput';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;

export default function SignupPage() {
    const [form, setForm] = useState({
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.username)) {
            newErrors.username = '이메일 형식이 올바르지 않습니다.';
        }

        if (!form.name.trim()) {
            newErrors.name = '이름을 입력해주세요.';
        }

        if (!PASSWORD_REGEX.test(form.password)) {
            newErrors.password =
                '비밀번호는 8자 이상이며 영문, 숫자, 특수문자(!%*#?&)를 각각 1개 이상 포함해야 합니다.';
        }

        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        console.log('회원가입 데이터:', form);
        // TODO: API 연동
    };

    return (
        <div className="flex">
            <div className="w-full max-w-md">
                <div className="bg-white px-6 py-10 shadow-sm sm:rounded-lg sm:px-12 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">

                    <h2 className="mb-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
                        회원가입
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextInput
                            id="username"
                            label="이메일 주소"
                            type="email"
                            value={form.username}
                            onChange={handleChange}
                            error={errors.username}
                        />

                        <TextInput
                            id="name"
                            label="사용자 이름"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            error={errors.name}
                        />

                        <TextInput
                            id="password"
                            label="비밀번호"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <TextInput
                            id="confirmPassword"
                            label="비밀번호 확인"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                        />

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                        >
                            회원가입
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                        이미 계정이 있으신가요?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            로그인
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
