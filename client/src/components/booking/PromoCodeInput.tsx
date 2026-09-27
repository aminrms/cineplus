"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, Loader2, TicketPercent } from "lucide-react";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { setPromo } from "@/store/bookingSlice";
import { PROMO_CODES } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";

export function PromoCodeInput() {
  const promo = useSelector((s: RootState) => s.booking.promoCode);
  const dispatch = useDispatch();
  const { t } = useI18n();
  const [val, setVal] = useState(promo ?? "");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const apply = () => {
    if (!val.trim()) return;
    setState("loading");
    setTimeout(() => {
      if (PROMO_CODES[val.trim().toUpperCase()]) {
        dispatch(setPromo(val.trim().toUpperCase()));
        setState("success");
        toast.success(`${val.trim().toUpperCase()} ${t("checkout.promoOk")}`);
      } else {
        setState("error");
        toast.error(t("checkout.promoBad"));
      }
    }, 600);
  };
  return (
    <div>
      <label htmlFor="promo" className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><TicketPercent size={16} className="text-luminous" /> {t("checkout.promo")}</label>
      <div className="flex gap-2">
        <Input id="promo" value={val} onChange={(e) => { setVal(e.target.value); setState("idle"); }} placeholder="PROMO10" className="uppercase" aria-invalid={state === "error"} />
        <Button variant="secondary" onClick={apply} disabled={state === "loading"}>
          {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : t("checkout.promoApply")}
        </Button>
      </div>
      {state === "success" && <p className="mt-2 flex items-center gap-1 text-xs text-success"><Check size={12} />{val.toUpperCase()} {t("checkout.promoOk")}</p>}
      {state === "error" && <p className="mt-2 text-xs text-error" role="alert">{t("checkout.promoBad")}</p>}
    </div>
  );
}
