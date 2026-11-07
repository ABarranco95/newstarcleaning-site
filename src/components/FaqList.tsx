interface FaqListProps {
  faqs: readonly { question: string; answer: string }[];
}

export default function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="site-disclosures">
      {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
    </div>
  );
}
