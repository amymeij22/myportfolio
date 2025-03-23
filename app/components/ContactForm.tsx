"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
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
      form.reset()

      // Set button text to "Message sent!" for 3 seconds
      setButtonText("Message sent!")
      setTimeout(() => {
        setButtonText("Send Message")
      }, 3000)

      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon!",
      })
    })
    .catch((error) => {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      })
      console.error("EmailJS error:", error)
    })
  }

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-x-0 top-60 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-primary/40 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : buttonText}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
