"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ArrowLeft, Clapperboard } from "lucide-react";
import { setPhone } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/provider";

function AppleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginPage() {
  const [phone, setPhoneLocal] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useI18n();
  const submit = () => {
    const digits = phone.replace(/\D/g, "");
    const normalized = digits.startsWith("98") ? digits.slice(2) : digits.startsWith("0") ? digits.slice(1) : digits;
    if (normalized.length !== 10 || !normalized.startsWith("9")) { setError(t("auth.badPhone")); return; }
    dispatch(setPhone(normalized));
    router.push("/verify");
  };
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-sm flex-col px-5 pb-10 pt-4">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
          aria-label={t("back")}
        >
          <ArrowLeft size={18} className="rtl:rotate-180" />
        </Link>
      </div>

      <div className="flex flex-col items-center pt-10 text-center sm:pt-14">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-electric to-luminous shadow-glow">
          <Clapperboard size={34} />
        </span>
        <h1 className="text-h2 mt-6 sm:text-h1">{t("auth.welcome")}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">{t("auth.phoneSub")}</p>
      </div>

      <div className="mt-8">
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold">{t("auth.phone")}</label>
        <div className="flex gap-2" dir="ltr">
          <span className="flex h-14 shrink-0 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold" dir="ltr">+98</span>
          <Input
            id="phone" inputMode="tel" placeholder="912 345 6789" value={phone}
            onChange={(e) => { setPhoneLocal(e.target.value); setError(""); }}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            aria-invalid={!!error} dir="ltr"
            className="h-14 rounded-2xl text-left text-base placeholder:text-slate-600"
          />
        </div>
        {error && <p className="mt-2 text-xs text-error" role="alert">{error}</p>}
        <Button className="mt-4 w-full" size="lg" onClick={submit}>{t("auth.continue")}</Button>

        <div className="my-6 flex items-center gap-3 text-[11px] text-slate-500">
          <span className="h-px flex-1 bg-white/10" />{t("auth.or")}<span className="h-px flex-1 bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="lg" className="gap-2"><AppleIcon /> Apple</Button>
          <Button variant="secondary" size="lg" className="gap-2"><GoogleIcon /> Google</Button>
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}
