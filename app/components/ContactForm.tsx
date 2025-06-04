"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si"
import { MdEmail } from "react-icons/md"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import emailjs from "emailjs-com"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buttonText, setButtonText] = useState("Send Message")
  const { toast } = useToast()
  
  // CAPTCHA states
  const [captchaNum1, setCaptchaNum1] = useState(0)
  const [captchaNum2, setCaptchaNum2] = useState(0)
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false)
  const [isCaptchaDialogOpen, setIsCaptchaDialogOpen] = useState(false)
  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null)
  
  // Confirmation dialog states
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  
  // Generate new CAPTCHA on component mount and when dialog opens
  useEffect(() => {
    if (isCaptchaDialogOpen) {
      generateCaptcha()
    }
  }, [isCaptchaDialogOpen])
  
  // Function to generate random numbers for CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaNum1(num1)
    setCaptchaNum2(num2)
    setCaptchaAnswer("")
    setIsCaptchaCorrect(false)
  }
  
  // Function to validate CAPTCHA answer
  const validateCaptcha = (value: string) => {
    const userAnswer = parseInt(value, 10)
    const correctAnswer = captchaNum1 + captchaNum2
    const isCorrect = !isNaN(userAnswer) && userAnswer === correctAnswer
    setIsCaptchaCorrect(isCorrect)
    return isCorrect
  }
  
  // Handle CAPTCHA input change
  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCaptchaAnswer(value)
    validateCaptcha(value)
  }
  
  // Handle CAPTCHA submission
  const handleCaptchaSubmit = () => {
    // Close the CAPTCHA dialog first
    setIsCaptchaDialogOpen(false)
    
    if (isCaptchaCorrect && formData) {
      // Then send the email
      sendEmail(formData)
    } else {
      // Show incorrect answer dialog
      setTimeout(() => {
        setShowErrorDialog(true)
      }, 300) // Short delay to ensure the CAPTCHA dialog closes first
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // Function to handle form submission - opens CAPTCHA dialog
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Store form data for later use after CAPTCHA verification
    setFormData(values)
    
    // Open CAPTCHA dialog
    setIsCaptchaDialogOpen(true)
  }
  
  // Function to send email after CAPTCHA verification
  function sendEmail(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    }

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
    )
    .then(() => {
      setIsSubmitting(false)
      
      // Reset form
      form.reset()
      
      // Set button text to "Message sent!" for 3 seconds
      setButtonText("Message sent!")
      setTimeout(() => {
        setButtonText("Send Message")
      }, 3000)

      // Show success confirmation dialog
      setTimeout(() => {
        setShowSuccessDialog(true)
      }, 300) // Short delay to ensure smooth transition
    })
    .catch((error) => {
      setIsSubmitting(false)
      
      // Show error dialog
      setTimeout(() => {
        setShowErrorDialog(true)
      }, 300)
      
      console.error("EmailJS error:", error)
    })
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

      <section className="bg-transparent tpy-20 elegant-section elegant-dots">
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

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex justify-center gap-8 mb-10"
          >
            <Link href="https://github.com/amymeij22/" target="_blank" passHref>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="p-6 bg-card/50 rounded-xl border border-border backdrop-blur-sm shadow-md flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <SiGithub className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"></span>
              </div>
            </Link>
            <Link href="https://id.linkedin.com/in/ahmad-meijlan-yasir-1b950a351" target="_blank" passHref>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="p-6 bg-card/50 rounded-xl border border-border backdrop-blur-sm shadow-md flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <SiLinkedin className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"></span>
              </div>
            </Link>
            <Link href="https://www.instagram.com/amymeij_22/" target="_blank" passHref>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="p-6 bg-card/50 rounded-xl border border-border backdrop-blur-sm shadow-md flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <SiInstagram className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"></span>
              </div>
            </Link>
            <Link href="mailto:yasirahmad220504@gmail.com" passHref>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="p-6 bg-card/50 rounded-xl border border-border backdrop-blur-sm shadow-md flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
                  <MdEmail className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors"></span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl shadow-lg p-8 border border-border bg-transparent backdrop-blur-sm"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ahmad Meijlan Yasir" {...field} className="bg-background/50" />
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
                        <Input placeholder="youremail@gmail.com" {...field} className="bg-background/50" />
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
                          placeholder="I'd like to discuss a potential collaboration..."
                          className="min-h-[120px] bg-background/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : buttonText}
                </Button>
                
                {/* CAPTCHA Dialog */}
                <Dialog open={isCaptchaDialogOpen} onOpenChange={setIsCaptchaDialogOpen}>
                  <DialogContent className="dialog-content overflow-hidden">
                    <DialogHeader className="pb-2 border-b border-border/30">
                      <DialogTitle className="text-center text-xl">Verification Required</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-4">
                      <div className="text-center space-y-2">
                        <p className="font-medium">Please solve this simple math problem to verify you're human:</p>
                        <div className="text-2xl font-bold py-2 bg-primary/10 px-6 rounded-lg">
                          {captchaNum1} + {captchaNum2} = ?
                        </div>
                      </div>
                      <Input
                        placeholder="Enter your answer"
                        value={captchaAnswer}
                        onChange={handleCaptchaChange}
                        className="max-w-[200px] text-center text-lg bg-background/50 border-border"
                        type="text"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCaptchaSubmit();
                          }
                        }}
                      />
                    </div>
                    <DialogFooter className="pt-4 border-t border-border/30 sm:justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setIsCaptchaDialogOpen(false)}
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCaptchaSubmit}
                        className="transition-all hover:scale-105"
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {/* Success Confirmation Dialog */}
                <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                  <DialogContent className="dialog-content overflow-hidden">
                    <DialogHeader className="pb-2 border-b border-border/30">
                      <DialogTitle className="text-center text-xl">Message Sent</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-6">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-center text-base">Thank you for your message. We'll get back to you soon!</p>
                    </div>
                    <DialogFooter className="pt-4 border-t border-border/30 sm:justify-center">
                      <Button
                        type="button"
                        onClick={() => setShowSuccessDialog(false)}
                        className="px-8 transition-all hover:scale-105"
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {/* Error Confirmation Dialog */}
                <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                  <DialogContent className="dialog-content overflow-hidden">
                    <DialogHeader className="pb-2 border-b border-border/30">
                      <DialogTitle className="text-center text-xl">Incorrect Answer</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-6">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-center text-base">Please try submitting your message again.</p>
                    </div>
                    <DialogFooter className="pt-4 border-t border-border/30 sm:justify-center">
                      <Button
                        type="button"
                        onClick={() => setShowErrorDialog(false)}
                        className="px-8 transition-all hover:scale-105"
                      >
                        Close
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
