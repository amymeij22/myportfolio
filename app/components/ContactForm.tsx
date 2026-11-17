"use client"

import { useState, useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import Link from "next/link"
import {
  User,
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from "lucide-react"
import { SiGithub, SiInstagram } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa6"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

type FormValues = {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const { locale, t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  // Dynamic Zod schema based on active language
  const formSchema = useMemo(() => {
    return z.object({
      name: z.string().min(2, {
        message: locale === "en" ? "Name must be at least 2 characters." : "Nama minimal 2 karakter."
      }).max(100),
      email: z.string().email({
        message: locale === "en" ? "Invalid email address format." : "Format email tidak valid."
      }).max(255),
      message: z.string().min(10, {
        message: locale === "en" ? "Message must be at least 10 characters." : "Pesan minimal 10 karakter."
      }).max(3000),
    })
  }, [locale])

  // Server-Signed CAPTCHA Challenge states
  const [captchaNum1, setCaptchaNum1] = useState<number | null>(null)
  const [captchaNum2, setCaptchaNum2] = useState<number | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false)
  const [isCaptchaDialogOpen, setIsCaptchaDialogOpen] = useState(false)
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null)

  // Status Dialogs
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  })

  // Fetch cryptographic challenge from /api/contact/challenge
  const fetchNewChallenge = useCallback(async () => {
    try {
      setIsLoadingChallenge(true)
      const res = await fetch("/api/contact/challenge", { cache: "no-store" })
      if (!res.ok) throw new Error(locale === "en" ? "Failed to load security challenge" : "Gagal memuat tantangan keamanan")
      const data = await res.json()
      setCaptchaNum1(data.num1)
      setCaptchaNum2(data.num2)
      setCaptchaToken(data.token)
      setCaptchaAnswer("")
    } catch (err) {
      console.error("Gagal memuat tantangan CAPTCHA:", err)
      setErrorMessage(locale === "en" ? "Failed to load security verification. Please try again." : "Gagal memuat verifikasi keamanan. Silakan coba lagi.")
      setShowErrorDialog(true)
    } finally {
      setIsLoadingChallenge(false)
    }
  }, [locale])

  // Trigger challenge when user submits valid form
  const onValidSubmit = (values: FormValues) => {
    setPendingValues(values)
    setIsCaptchaDialogOpen(true)
    void fetchNewChallenge()
  }

  // Handle final submission to /api/contact
  const handleCaptchaSubmit = async () => {
    if (!captchaAnswer.trim()) {
      setErrorMessage(locale === "en" ? "Please enter the math answer first." : "Silakan isi jawaban perhitungan matematika terlebih dahulu.")
      setShowErrorDialog(true)
      return
    }

    if (!captchaToken) {
      setErrorMessage(locale === "en" ? "Security token not found. Please refresh the page." : "Token keamanan tidak ditemukan. Mohon refresh halaman.")
      setShowErrorDialog(true)
      return
    }

    if (!pendingValues) return

    setIsCaptchaDialogOpen(false)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pendingValues.name,
          email: pendingValues.email,
          message: pendingValues.message,
          captchaAnswer: captchaAnswer.trim(),
          captchaToken: captchaToken,
          _hp: honeypot, // Honeypot trap
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || (locale === "en" ? "Failed to send message." : "Gagal mengirim pesan."))
      }

      // Success
      reset()
      setHoneypot("")
      setPendingValues(null)
      setShowSuccessDialog(true)
    } catch (err: unknown) {
      console.error("Contact submission error:", err)
      setErrorMessage(
        err instanceof Error
          ? err.message
          : (locale === "en" ? "An error occurred while sending your message. Please try again." : "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.")
      )
      setShowErrorDialog(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="kontak"
      className="relative isolate py-14 sm:py-18 lg:py-22 scroll-mt-18 sm:scroll-mt-20 bg-[#F7F7F2] overflow-hidden"
    >
      {/* Hidden anchor targets for navigation */}
      <div id="contact" className="sr-only" aria-hidden="true" />

      {/* Atmospheric Decorative Graphics: Compact Signal & Telemetry Accents with Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Depth Gradients */}
        <div className="absolute -top-16 -left-16 w-72 sm:w-96 h-72 sm:h-96 bg-[#E2ECD8]/35 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#C7E76A]/[0.06] rounded-full blur-3xl" />

        {/* Atmospheric Top-Right Beacon Signal Arcs (Compact Corner Accent) */}
        <svg
          className="absolute top-4 right-4 sm:top-6 sm:right-8 w-32 sm:w-40 h-24 sm:h-28 text-[#214A40]/12 select-none"
          viewBox="0 0 160 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M160 15 A120 120 0 0 0 40 110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M160 45 A90 90 0 0 0 70 110" stroke="currentColor" strokeWidth="1.2" />
          <path d="M160 75 A60 60 0 0 0 100 110" stroke="currentColor" strokeWidth="1" />
          <circle cx="140" cy="95" r="2.5" fill="currentColor" fillOpacity="0.4" />
        </svg>

        {/* Atmospheric Bottom-Left Contour Lines (Compact Corner Accent) */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-32 sm:w-36 h-20 select-none hidden lg:block">
          <svg
            viewBox="0 0 150 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#214A40]/10"
          >
            <path
              d="M0 30 C40 15, 80 55, 150 25"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M0 55 C40 40, 80 80, 150 50"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Decorative Crosshair (+) */}
        <div className="absolute bottom-10 left-12 hidden lg:block text-[#214A40]/15 font-mono text-base select-none">
          +
        </div>
      </div>

      {/* Hidden SVG for smooth organic clip-path definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="contactPhotoClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.06 C 0.08,0.03 0.14,0 0.22,0 L 0.88,0 C 0.94,0 1,0.05 1,0.11 L 1,0.52 C 1,0.58 0.96,0.63 0.91,0.67 L 0.72,0.95 C 0.68,0.99 0.63,1 0.56,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12 items-center">

          {/* ============================================================ */}
          {/* LEFT COLUMN: Invitation, Paragraph & Details                 */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-1 rounded-full bg-[#C7E76A]" />
              <span className="font-mono text-xs font-semibold tracking-[0.16em] uppercase text-[#1D2925]">
                {t("contact.eyebrow")}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-extrabold text-[#1D2925] tracking-tight leading-tight sm:leading-[1.22] xl:leading-[1.24] mb-6">
              {t("contact.headingPart1")} <br />
              {t("contact.headingPart2")} <br />
              {t("contact.headingPart3")} <br />
              <span className="inline-block bg-[#DFEBBB] text-[#1D2925] px-2.5 py-0.5 rounded-lg align-baseline">
                {t("contact.headingHighlight")}
              </span>
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base lg:text-[17px] text-[#68736D] leading-relaxed max-w-lg">
              {t("contact.subtitle")}
            </p>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Atmospheric Backdrop + Floating Form Card      */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">

            {/* COMPOSITE BACKDROP CONTAINER */}
            <div
              className="relative w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[620px] flex items-center justify-center lg:justify-start"
            >
              {/* Layer 1: Base Organic Sage Backdrop Plate */}
              <div
                className="absolute -top-4 -bottom-4 -left-4 sm:-left-8 -right-2 sm:-right-4 rounded-[44px] sm:rounded-[52px] bg-[#D8E2D7] pointer-events-none hidden sm:block shadow-sm"
                aria-hidden="true"
              />

              {/* Layer 2: Photographic Indonesian Mountain Asset */}
              <div
                className="absolute top-0 right-0 sm:right-[-4px] w-[66%] sm:w-[70%] lg:w-[74%] h-[94%] overflow-hidden pointer-events-none hidden sm:block shadow-md"
                style={{
                  clipPath: "url(#contactPhotoClip)"
                }}
              >
                <Image
                  src="/images/contact-atmosphere.webp"
                  alt="Lanskap Pegunungan Indonesia"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
                  className="object-cover object-[70%_25%]"
                  priority
                />

                {/* Sky Topographic Contour Lines Overlay */}
                <svg
                  className="absolute top-0 right-0 w-[70%] h-[50%] pointer-events-none opacity-70"
                  viewBox="0 0 280 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M40 0C100 35 180 20 280 65" stroke="white" strokeWidth="1.5" strokeOpacity="0.75" />
                  <path d="M10 0C80 45 160 35 280 95" stroke="white" strokeWidth="1.5" strokeOpacity="0.65" />
                  <path d="M-20 0C60 55 140 45 280 125" stroke="white" strokeWidth="1.5" strokeOpacity="0.55" />
                </svg>
              </div>

              {/* Layer 3: Lime Accent Angle Bracket at Bottom-Right */}
              <div
                className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 border-r-4 border-b-4 rounded-br-xl pointer-events-none z-10 hidden sm:block"
                style={{ borderColor: "var(--brand-accent, #C7E76A)" }}
                aria-hidden="true"
              />

              {/* ======================================================== */}
              {/* Layer 4: FLOATING CONTACT FORM CARD (Top Layer)          */}
              {/* ======================================================== */}
              <div
                className="relative z-20 w-full max-w-[430px] sm:max-w-[440px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 border border-[#DEE4DC] shadow-xl shadow-[#1D2925]/6"
              >
                <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4 sm:space-y-5">

                  {/* Honeypot field (hidden from real users, traps spam bots) */}
                  <input
                    type="text"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden sr-only"
                    aria-hidden="true"
                  />

                  {/* Field 1: Nama */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#1D2925] mb-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#1D2925]" />
                      <span>{t("contact.nameLabel")}</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder={t("contact.namePlaceholder")}
                      {...register("name")}
                      className={`w-full h-11 sm:h-12 px-4 rounded-xl bg-[#F4F6F2]/70 border ${errors.name ? "border-red-400 focus:border-red-500" : "border-[#DEE4DC] focus:border-[#214A40]"
                        } text-sm text-[#1D2925] placeholder:text-[#9BA5A0] focus:outline-none focus:ring-1 focus:ring-[#214A40] transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#1D2925] mb-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#1D2925]" />
                      <span>{t("contact.emailLabel")}</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t("contact.emailPlaceholder")}
                      {...register("email")}
                      className={`w-full h-11 sm:h-12 px-4 rounded-xl bg-[#F4F6F2]/70 border ${errors.email ? "border-red-400 focus:border-red-500" : "border-[#DEE4DC] focus:border-[#214A40]"
                        } text-sm text-[#1D2925] placeholder:text-[#9BA5A0] focus:outline-none focus:ring-1 focus:ring-[#214A40] transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Field 3: Pesan */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#1D2925] mb-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#1D2925]" />
                      <span>{t("contact.messageLabel")}</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder={t("contact.messagePlaceholder")}
                      {...register("message")}
                      className={`w-full p-4 rounded-xl bg-[#F4F6F2]/70 border ${errors.message ? "border-red-400 focus:border-red-500" : "border-[#DEE4DC] focus:border-[#214A40]"
                        } text-sm text-[#1D2925] placeholder:text-[#9BA5A0] focus:outline-none focus:ring-1 focus:ring-[#214A40] transition-colors resize-y leading-relaxed`}
                    />
                    {errors.message && (
                      <p className="text-[11px] font-mono text-red-500 mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-[#214A40] hover:bg-[#1a3b33] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#214A40] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#C7E76A]" />
                    <span>{isSubmitting ? t("contact.sendingButton") : t("contact.sendButton")}</span>
                  </button>

                  {/* Social Connections Section */}
                  <div className="pt-4 border-t border-[#DEE4DC]/80">
                    <div className="relative flex justify-center mb-3">
                      <span className="bg-white px-3 text-xs font-sans text-[#68736D]">
                        {t("contact.connectLabel")}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      {/* GitHub */}
                      <Link
                        href="https://github.com/amymeij22"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-[#E9EFE7] hover:bg-[#DFEBBB] text-[#214A40] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="GitHub Ahmad Meijlan Yasir"
                      >
                        <SiGithub className="w-4 h-4" />
                      </Link>

                      {/* LinkedIn */}
                      <Link
                        href="https://www.linkedin.com/in/ahmad-meijlan-yasir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-[#E9EFE7] hover:bg-[#DFEBBB] text-[#214A40] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="LinkedIn Ahmad Meijlan Yasir"
                      >
                        <FaLinkedin className="w-4 h-4" />
                      </Link>

                      {/* Instagram */}
                      <Link
                        href="https://www.instagram.com/amymeij_22/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-[#E9EFE7] hover:bg-[#DFEBBB] text-[#214A40] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Instagram Ahmad Meijlan Yasir"
                      >
                        <SiInstagram className="w-4 h-4" />
                      </Link>

                      {/* Email Direct */}
                      <Link
                        href="mailto:yasirahmad220504@gmail.com"
                        className="w-10 h-10 rounded-xl bg-[#E9EFE7] hover:bg-[#DFEBBB] text-[#214A40] flex items-center justify-center transition-colors shadow-xs"
                        aria-label="Email Ahmad Meijlan Yasir"
                      >
                        <Mail className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </form>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================================================================ */}
      {/* CAPTCHA CHALLENGE DIALOG (Cryptographic Server Verification)     */}
      {/* ================================================================ */}
      <Dialog open={isCaptchaDialogOpen} onOpenChange={setIsCaptchaDialogOpen}>
        <DialogContent className="dialog-content max-w-lg w-[calc(100%-2rem)] max-h-[90svh] overflow-y-auto scrollbar-none bg-white border border-[#DEE4DC] p-6 sm:p-8 rounded-[24px] shadow-2xl">
          <DialogHeader className="border-b border-[#DEE4DC]/80 pb-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EBF5D5] text-[#214A40] text-xs font-mono font-semibold border border-[#DEEABF]">
                {t("contact.challenge.badge1")}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E9EEE8] text-[#1D2925] text-xs font-mono border border-[#DEE4DC]">
                {t("contact.challenge.badge2")}
              </span>
            </div>
            <DialogTitle className="text-lg sm:text-xl font-bold text-[#1D2925] font-sans leading-snug">
              {t("contact.challenge.title")}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#68736D] pt-1 font-sans">
              {t("contact.challenge.desc")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2 text-sm">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-mono font-semibold uppercase text-[#1D2925] tracking-wider">
                  {t("contact.challenge.challengeLabel")}
                </h4>
                <button
                  type="button"
                  onClick={fetchNewChallenge}
                  disabled={isLoadingChallenge}
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#68736D] hover:text-[#214A40] hover:underline cursor-pointer disabled:opacity-50"
                  title={t("contact.challenge.refresh")}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingChallenge ? "animate-spin" : ""}`} />
                  <span>{t("contact.challenge.refresh")}</span>
                </button>
              </div>

              {isLoadingChallenge ? (
                <p className="text-xs sm:text-sm text-[#68736D] animate-pulse py-1">
                  {t("contact.challenge.generating")}
                </p>
              ) : (
                <p className="text-xl sm:text-2xl font-bold font-sans text-[#1D2925] flex items-center gap-2.5 py-0.5">
                  <span className="text-[#214A40]">{captchaNum1 ?? 0}</span>
                  <span className="text-[#68736D] font-normal">+</span>
                  <span className="text-[#214A40]">{captchaNum2 ?? 0}</span>
                  <span className="text-[#68736D] font-normal">=</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#EBF5D5] text-[#214A40] text-lg font-mono border border-[#DEEABF]">
                    ?
                  </span>
                </p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-mono font-semibold uppercase text-[#1D2925] mb-1.5 tracking-wider">
                {t("contact.challenge.answerLabel")}
              </h4>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={t("contact.challenge.answerPlaceholder")}
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                className="w-full h-10 px-3.5 text-sm sm:text-base font-sans rounded-lg bg-white border border-[#DEE4DC] text-[#1D2925] placeholder:text-[#68736D]/60 focus:outline-none focus:border-[#214A40] focus:ring-1 focus:ring-[#214A40] transition-colors"
                autoFocus
                disabled={isLoadingChallenge}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleCaptchaSubmit()
                  }
                }}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#DEE4DC]/80 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setIsCaptchaDialogOpen(false)}
              className="text-xs font-medium rounded-lg border-[#DEE4DC] text-[#1D2925] hover:bg-[#E9EEE8]/60"
            >
              {t("contact.challenge.cancel")}
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={handleCaptchaSubmit}
              disabled={isLoadingChallenge || !captchaAnswer.trim()}
              className="text-xs font-medium bg-[#214A40] text-white hover:bg-[#214A40]/90 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{t("contact.challenge.submit")}</span>
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================================================================ */}
      {/* SUCCESS CONFIRMATION DIALOG                                      */}
      {/* ================================================================ */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="dialog-content max-w-md w-[calc(100%-2rem)] max-h-[90svh] overflow-y-auto scrollbar-none bg-white border border-[#DEE4DC] p-6 sm:p-7 rounded-[26px] shadow-2xl">
          <DialogHeader className="border-b border-[#DEE4DC]/80 pb-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5D5] text-[#214A40] text-xs font-mono font-semibold border border-[#DEEABF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#214A40]" aria-hidden="true" />
                <span>{t("contact.success.badge")}</span>
              </span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-[#1D2925] font-sans tracking-tight">
              {t("contact.success.title")}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#68736D] pt-1.5 font-sans leading-relaxed">
              {t("contact.success.desc")}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 flex flex-col items-center text-center space-y-3.5">
            <div className="w-16 h-16 rounded-full bg-[#EBF5D5] border border-[#DEEABF] flex items-center justify-center text-[#214A40] shadow-xs">
              <Send className="w-7 h-7 text-[#214A40]" aria-hidden="true" />
            </div>
            <div className="space-y-1 max-w-xs">
              <p className="text-sm font-semibold text-[#1D2925] font-sans">
                {t("contact.success.heading")}
              </p>
              <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed font-sans">
                {t("contact.success.body")}
              </p>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-[#DEE4DC]/80 sm:justify-end">
            <Button
              type="button"
              onClick={() => setShowSuccessDialog(false)}
              className="w-full sm:w-auto h-11 px-8 rounded-xl bg-[#214A40] text-white hover:bg-[#1A3B33] text-xs sm:text-sm font-sans font-semibold shadow-xs transition-all active:scale-[0.98]"
            >
              {t("contact.success.button")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================ */}
      {/* ERROR / NOTICE DIALOG                                            */}
      {/* ================================================================ */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="dialog-content max-w-md w-[calc(100%-2rem)] max-h-[90svh] overflow-y-auto scrollbar-none bg-white border border-[#DEE4DC] p-6 sm:p-7 rounded-[26px] shadow-2xl">
          <DialogHeader className="border-b border-[#DEE4DC]/80 pb-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-mono font-semibold border border-red-200">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" aria-hidden="true" />
                <span>{t("contact.error.badge")}</span>
              </span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-[#1D2925] font-sans tracking-tight">
              {t("contact.error.title")}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#68736D] pt-1.5 font-sans leading-relaxed">
              {t("contact.error.desc")}
            </DialogDescription>
          </DialogHeader>

          <div className="py-5 text-left">
            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200/80 text-xs sm:text-sm text-red-800 font-sans leading-relaxed">
              {errorMessage}
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-[#DEE4DC]/80 sm:justify-end">
            <Button
              type="button"
              onClick={() => setShowErrorDialog(false)}
              className="w-full sm:w-auto h-11 px-7 rounded-xl bg-[#214A40] text-white hover:bg-[#1A3B33] text-xs sm:text-sm font-sans font-semibold shadow-xs transition-all active:scale-[0.98]"
            >
              {t("contact.error.button")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
