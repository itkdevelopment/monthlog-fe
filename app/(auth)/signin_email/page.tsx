"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import FormButton from "../../../components/auth/form-btn";
import Input from "../../../components/auth/input";
import {
  API_BASE_URL,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MAX_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  SESSION_LAST_LOGIN_KEY,
  SESSION_PREV_PAGE_URL_KEY,
} from "../../../lib/contants";

// import { useUser } from "app/providers/user-provider";
import { User } from "../../../types/types";
import Loading from "./loading";

export default function Register() {
  const [errors, setErrors] = useState<{ [key: string]: string[] | undefined }>(
    {}
  );

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { refetchUser } = useUser();

  const formSchema = z.object({
    email: z.string().email().trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .max(PASSWORD_MAX_LENGTH, PASSWORD_MAX_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
      .trim(),
  });

  async function emailLogin(formData: FormData) {
    try {
      const info = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      if (!info.email || !info.password) {
        throw new Error("이메일과 비밀번호를 모두 입력해주세요.");
      }

      const result = formSchema.safeParse(info);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
        return result.error.flatten();
      }

      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/login`, {
        next: { revalidate: 10 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
        credentials: "include",
      });

      if (!res.ok) {
        setIsLoading(false);
        const errorData = await res.json();
        alert(errorData.message || "로그인에 실패했습니다.");
        return null;
      }

      setErrors({});
      const data = await res.json();
      const dataResult = data.result;
      setIsLoading(false);

      return dataResult;
    } catch (error) {
      setErrors({});
      alert(`로그인에 실패했습니다. 다시 시도해주세요. ${error}`);
      setIsLoading(false);
      return null;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 기본 폼 제출 방지

    const formElement = event.currentTarget; // 폼 엘리먼트를 가져옴
    const formData = new FormData(formElement); // FormData 생성

    const result = await emailLogin(formData); // emailLogin 함수에 폼 데이터 전달

    if (result && result.fieldErrors == null) {
      const dataResultWithResult: User = {
        ...(result as User),
        provider: "email",
      };

      //세션에 유저 관련한 정보가 저장되어있습니다.
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(dataResultWithResult));
      }

      if (dataResultWithResult.userId != null) {
        sessionStorage.setItem(SESSION_LAST_LOGIN_KEY, "EMAIL");

        const hasPrevious = sessionStorage.getItem(SESSION_PREV_PAGE_URL_KEY);
        if (hasPrevious) {
          window.location.href = hasPrevious;
        } else {
          //TODO : 원하는 경로로 보내세요.
          window.location.href = "/monthlog";
        }
      }
    }
  }

  return (
    <div className="pt-12 px-5 pb-36 bg-[#FCFCFC] md:pt-20 md:h-screen min-h-screen">
      <div className="flex flex-col gap-2 ">
        <h2 className="text-sm font-bold text-center pt-6">이메일 로그인</h2>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <form
          // action={action}
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 items-center pt-4"
        >
          <div className="w-full sm:w-96">
            <span className="text-start font-bold text-[12px] min-w-96 ">
              이메일 주소
            </span>
            <div className="relative">
              <Input
                required
                className="w-full bg-white rounded-md h-10 p-3  focus:outline-hidden ring-2 focus:ring-3 transition ring-neutral-200 focus:ring-primary-color border-none placeholder:text-neutral-400 placeholder:text-sm sm:w-96"
                name="email"
                type="email"
                placeholder="nomadc.monthler@gmail.com"
                errors={errors.email}
                autoComplete="email"
                // errors={errors.password || state?.fieldErrors.password}
              />
            </div>
          </div>

          <div className="w-full sm:w-96">
            <span className="text-start font-bold text-[12px] min-w-96 pt-4">
              비밀번호
            </span>
            <div className="relative">
              <Input
                required
                className="w-full bg-white rounded-md h-10 p-3  focus:outline-hidden ring-2 focus:ring-3 transition ring-neutral-200 focus:ring-primary-color border-none placeholder:text-neutral-400 placeholder:text-sm sm:w-96"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="8~21글자, 문자/숫자/기호 조합"
                errors={errors.password}
                autoComplete="current-password"
                // errors={errors.password || state?.fieldErrors.password}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer h-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible color="grey" size={20} />
                ) : (
                  <AiFillEye color="grey" size={20} />
                )}
              </div>
            </div>
          </div>

          <div className="pt-9"></div>
          <FormButton text="이메일 로그인하기" onClick={() => {}} />
        </form>
      )}
      <div className="flex flex-col gap-2 ">
        <button
          className="text-center text-[12px] mt-10 py-3 cursor-pointer hover:underline"
          onClick={() => {
            window.location.href = "/reset_password";
          }}
        >
          비밀번호를 잊으셨나요?
        </button>
      </div>
    </div>
  );
}
