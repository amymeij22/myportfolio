"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { SiGithub, SiInstagram } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter." }).max(100),
  email: z.string().email({ message: "Format email tidak valid." }).max(255),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }).max(3000),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonText, setButtonText] = useState("Send Message")
  const { toast } = useToast()

  // Honeypot state (Anti-spambot)
  const [honeypot, setHoneypot] = useState("")

  // Server-Signed CAPTCHA Challenge states
  const [captchaNum1, setCaptchaNum1] = useState<number | null>(null)
  const [captchaNum2, setCaptchaNum2] = useState<number | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false)
  const [isCaptchaDialogOpen, setIsCaptchaDialogOpen] = useState(false)
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null)

  // Confirmation dialog states
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  // Fetch cryptographic challenge from secure server endpoint
  const fetchNewChallenge = useCallback(async () => {
    try {
      setIsLoadingChallenge(true)
      const res = await fetch("/api/contact/challenge", { cache: "no-store" })
      if (!res.ok) throw new Error("Gagal mengambil tantangan keamanan")
      const data = await res.json()
      setCaptchaNum1(data.num1)
      setCaptchaNum2(data.num2)
      setCaptchaToken(data.token)
      setCaptchaAnswer("")
    } catch (err) {
      console.error("Gagal memuat tantangan CAPTCHA:", err)
      toast({
        title: "Perhatian",
        description: "Gagal memuat verifikasi keamanan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingChallenge(false)
    }
  }, [toast])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // When form is submitted by user, open CAPTCHA verification dialog and load challenge
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values)
    setIsCaptchaDialogOpen(true)
    void fetchNewChallenge()
  }

  // Handle final submission to secure /api/contact endpoint
  async function handleCaptchaSubmit() {
    if (!captchaAnswer.trim()) {
      setErrorMessage("Silakan isi jawaban perhitungan matematika terlebih dahulu.")
      setShowErrorDialog(true)
      return
    }

    if (!captchaToken) {
      setErrorMessage("Token keamanan tidak ditemukan. Mohon refresh halaman.")
      setShowErrorDialog(true)
      return
    }

    if (!formData) return

    setIsCaptchaDialogOpen(false)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          captchaAnswer: captchaAnswer.trim(),
          captchaToken: captchaToken,
          _hp: honeypot, // Honeypot trap
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim pesan.")
      }

      // Success
      form.reset()
      setHoneypot("")
      setButtonText("Message sent!")
      setTimeout(() => setButtonText("Send Message"), 3000)
      setShowSuccessDialog(true)
    } catch (err: unknown) {
      console.error("Contact submission error:", err)
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
      )
      setShowErrorDialog(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-20 relative isolate overflow-hidden bg-background min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-x-0 top-60 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/5 to-primary/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(60% 40%, 100% 60%, 90% 20%, 80% 0%, 70% 10%, 60% 30%, 50% 60%, 40% 70%, 35% 55%, 30% 35%, 20% 75%, 0% 65%, 15% 100%, 25% 75%, 70% 100%, 60% 40%)",
          }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/30 to-primary/50 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(60% 40%, 100% 60%, 90% 20%, 80% 0%, 70% 10%, 60% 30%, 50% 60%, 40% 70%, 35% 55%, 30% 35%, 20% 75%, 0% 65%, 15% 100%, 25% 75%, 70% 100%, 60% 40%)",
          }}
        />
      </div>

      <section className="bg-transparent py-20 elegant-section elegant-dots w-full">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card shadow-lg rounded-3xl p-8 border border-primary/20 backdrop-blur-sm"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden from real users, traps bots) */}
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

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="bg-background/50 border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          className="bg-background/50 border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          rows={5}
                          {...field}
                          className="bg-background/50 border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full transition-all duration-300 hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : buttonText}
                </Button>

                {/* Social Links */}
                <div className="pt-6 border-t border-border flex justify-center space-x-6">
                  <Link
                    href="https://github.com/amymeij22/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <SiGithub className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/amymeij_22/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <SiInstagram className="h-6 w-6" />
                  </Link>
                  <Link
                    href="mailto:yasirahmad220504@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">Email</span>
                    <MdEmail className="h-6 w-6" />
                  </Link>
                </div>

                {/* Cryptographic Server-Signed CAPTCHA Dialog */}
                <Dialog open={isCaptchaDialogOpen} onOpenChange={setIsCaptchaDialogOpen}>
                  <DialogContent className="dialog-content sm:max-w-md">
                    <DialogHeader className="pb-2 border-b border-border/30">
                      <DialogTitle className="text-center text-xl">Verifikasi Keamanan</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                      <div className="text-center space-y-2">
                        <p className="font-medium text-sm text-muted-foreground">
                          Selesaikan perhitungan matematika berikut untuk memverifikasi Anda manusia:
                        </p>
                        <div className="text-2xl font-bold py-3 bg-primary/10 px-8 rounded-xl tracking-wider text-foreground">
                          {isLoadingChallenge ? (
                            <span className="text-sm font-normal animate-pulse">Membuat verifikasi...</span>
                          ) : (
                            `${captchaNum1} + ${captchaNum2} = ?`
                          )}
                        </div>
                      </div>
                      <Input
                        placeholder="Jawaban angka"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        className="max-w-[200px] text-center text-lg bg-background/50 border-border"
                        type="number"
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
                    <DialogFooter className="pt-4 border-t border-border/30 sm:justify-center gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsCaptchaDialogOpen(false)}
                      >
                        Batal
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCaptchaSubmit}
                        disabled={isLoadingChallenge || !captchaAnswer}
                      >
                        Verifikasi & Kirim
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Success Confirmation Dialog */}
                <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                  <DialogContent className="dialog-content sm:max-w-md">
                    <DialogHeader className="pb-2 border-b border-border/30">
                      <DialogTitle className="text-center text-xl text-green-600 dark:text-green-400">
                        Pesan Berhasil Terkirim
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-6">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-green-600 dark:text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-center text-base text-muted-foreground">
                        Terima kasih atas pesan Anda. Kami akan segera merespons secepat mungkin!
                      </p>
                    </div>
                    <DialogFooter className="pt-4 border-t border-border/30 sm:justify-center">
                      <Button
                        type="button"
                        onClick={() => setShowSuccessDialog(false)}
                        className="px-8"
                      >
                        Tutup
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Error Dialog */}
                <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                  <DialogContent className="dialog-content sm:max-w-md">
                    <DialogHeader className="pb-2 border-b border-border/30">
                      <DialogTitle className="text-center text-xl text-destructive">
                        Pemberitahuan
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-6">
                      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-destructive"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-center text-sm text-muted-foreground">{errorMessage}</p>
                    </div>
                    <DialogFooter className="pt-4 border-t border-border/30 sm:justify-center">
                      <Button
                        type="button"
                        onClick={() => setShowErrorDialog(false)}
                        className="px-8"
                      >
                        Tutup
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
