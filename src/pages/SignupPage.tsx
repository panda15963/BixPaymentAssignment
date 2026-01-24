import { Link } from 'react-router-dom';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import { TextInput } from '../components/ui/TextInput';
import {signup, type SignupErrorResponse} from '../api/auth';

export default function SignupPage() {
    const [form, setForm] = useState({
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // 비밀번호 조건 체크
    const passwordChecks = {
        length: form.password.length >= 8,
        letter: /[A-Za-z]/.test(form.password),
        number: /\d/.test(form.password),
        special: /[!%*#?&]/.test(form.password),
    };

    const isPasswordValid =
        passwordChecks.length &&
        passwordChecks.letter &&
        passwordChecks.number &&
        passwordChecks.special;

    // 필드별 검증 (문장 에러 최소화)
    const validateField = (id: string, value: string) => {
        switch (id) {
            case 'username':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ''
                    : '이메일 형식이 올바르지 않습니다.';

            case 'name':
                return value.trim() ? '' : '이름을 입력해주세요.';

            case 'password':
                return value ? '' : '비밀번호를 입력해주세요.';

            case 'confirmPassword':
                return value === form.password
                    ? ''
                    : '비밀번호가 일치하지 않습니다.';

            default:
                return '';
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setForm(prev => ({
            ...prev,
            [id]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [id]: validateField(id, value),
        }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        Object.entries(form).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });

        if (!isPasswordValid) {
            newErrors.password = '비밀번호 조건을 모두 만족해야 합니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await signup({
                username: form.username,
                name: form.name,
                password: form.password,
                confirmPassword: form.confirmPassword,
            });

            alert('회원가입 성공!');
        } catch (error) {
            const fieldErrors = error as SignupErrorResponse;

            if (fieldErrors.username) {
                alert(fieldErrors.username[0]);
            }
        }
    };

    return (
        <div className="flex">
            <div className="w-full max-w-lg">
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

                        {/* 비밀번호 */}
                        <div>
                            <TextInput
                                id="password"
                                label="비밀번호"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                error={errors.password}
                            />

                            {/* 🔐 비밀번호 조건 리스트 */}
                            <ul className="mt-2 space-y-1 text-sm">
                                <li className={passwordChecks.length ? 'text-green-600' : 'text-red-400'}>
                                    {passwordChecks.length ? '✔' : '✖'} 8자 이상
                                </li>
                                <li className={passwordChecks.letter ? 'text-green-600' : 'text-red-400'}>
                                    {passwordChecks.letter ? '✔' : '✖'} 영문 포함
                                </li>
                                <li className={passwordChecks.number ? 'text-green-600' : 'text-red-400'}>
                                    {passwordChecks.number ? '✔' : '✖'} 숫자 포함
                                </li>
                                <li className={passwordChecks.special ? 'text-green-600' : 'text-red-400'}>
                                    {passwordChecks.special ? '✔' : '✖'} 특수문자(!%*#?&) 포함
                                </li>
                            </ul>
                        </div>

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