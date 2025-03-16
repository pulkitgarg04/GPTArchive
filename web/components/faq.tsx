"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  const faqs = [
    {
      question: "How do I install GPTArchive?",
      answer:
        "You can install GPTArchive from the Installation page. Visit our installation page for detailed instructions.",
    },
    {
      question: "Is GPTArchive free to use?",
      answer:
        "Yes, GPTArchive is completely free and open-source to use with all core features included.",
    },
    {
      question: "Does GPTArchive work with ChatGPT Plus?",
      answer: "Yes, GPTArchive works with both free and Plus versions of ChatGPT.",
    },
    {
      question: "Can I export my bookmarked conversations?",
      answer: "Yes, you can export your bookmarked conversations in CSV format.",
    },
    {
      question: "Is my data secure with GPTArchive?",
      answer:
        "GPTArchive stores your bookmarks locally in your browser. We don't collect or store your conversations on our servers.",
    },
  ]

  return (
    <section id="faq" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Find answers to common questions about GPTArchive</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

