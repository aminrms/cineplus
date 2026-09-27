"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import type { RootState } from "@/store";
import { setVerified } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { faDigits } from "@/lib/formatters";

export default function VerifyPage() {
  const phone = useSelector((s: RootState) => s.auth.phone) ?? "9123456789";
  const [code, setCode] = useState(["", "", "", ""]);
  const [secs, setSecs] = useState(45);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, locale } = useI18n();
  const masked = locale === "fa" ? `••••${faDigits(phone.slice(-4))}` : `••••${phone.slice(-4)}`;
  const secsStr = locale === "fa" ? faDigits(`00:${String(secs).padStart(2, "0")}`) : `00:${String(secs).padStart(2, "0")}`;

  useEffect(() => {
    if (secs <= 0) return;
    const timer = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secs]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code]; next[i] = d; setCode(next);
    if (d && i < 3) refs.current[i + 1]?.focus();
  };

  const pasteCode = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4).split("");
    if (!digits.length) return;
    const next = ["", "", "", ""];
    digits.forEach((d, i) => { next[i] = d; });
    setCode(next);
    refs.current[Math.min(digits.length, 3)]?.focus();
  };

  const verify = () => {
    if (code.join("").length < 4) { toast.error(t("verify.needCode")); return; }
    dispatch(setVerified(true));
    toast.success(t("verify.welcome"));
    router.push("/");
  };

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-sm flex-col px-5 pb-10 pt-4">
      <div className="flex items-center">
        <Link
          href="/login"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
          aria-label={t("back")}
        >
          <ArrowLeft size={18} className="rtl:rotate-180" />
        </Link>
      </div>

      <div className="flex flex-col items-center pt-10 text-center sm:pt-14">
        <span className="relative flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-electric to-luminous shadow-glow">
          <ShieldCheck size={34} />
        </span>
        <h1 className="text-h2 mt-6">{t("verify.title")}</h1>
        <p className="mt-2 text-sm text-slate-400">
          {t("verify.sentTo")} <span dir="ltr" className="font-semibold text-slate-200">{masked}</span>
        </p>
        <button
          className="mt-1 min-h-[44px] text-xs font-semibold text-luminous"
          onClick={() => router.push("/login")}
        >
          {t("verify.change")}
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-3" role="group" aria-label={t("verify.title")} dir="ltr">
        {code.map((c, i) => (
          <input
            key={i} ref={(el) => { refs.current[i] = el; }} value={c}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus(); }}
            onPaste={(e) => { e.preventDefault(); pasteCode(e.clipboardData.getData("text")); }}
            inputMode="numeric" maxLength={1} aria-label={`Digit ${i + 1}`}
            className={cn(
              "h-16 w-14 rounded-2xl border text-center text-2xl font-extrabold transition focus:outline-none sm:h-[72px] sm:w-16",
              c
                ? "border-electric bg-electric/10 text-white shadow-glow"
                : "border-white/10 bg-white/[0.04] text-white focus:border-luminous",
            )}
          />
        ))}
      </div>

      <p className="mt-5 text-center text-xs text-slate-500">
        {secs > 0
          ? `${t("verify.resendIn")} ${secsStr}`
          : <button className="min-h-[44px] font-bold text-luminous" onClick={() => setSecs(45)}>{t("verify.resend")}</button>}
      </p>
      <Button className="mt-4 w-full" size="lg" onClick={verify}>{t("verify.verify")}</Button>

      <div className="flex-1" />
    </div>
  );
}
