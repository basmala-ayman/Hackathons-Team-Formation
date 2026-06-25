import FAQItem from "./FAQItem";
const FAQ_DATA = [
  {
    id: 1,
    question: "How does the AI team matching work?",
    answer:
      "Our AI analyzes your skills, experience, and hackathon goals to pair you with complementary teammates, ensuring a balanced and effective team dynamic.",
  },
  {
    id: 2,
    question: "What if I already have a partial team?",
    answer:
      "You can easily invite your existing teammates to your group. Our AI will then match you with individuals who fill the remaining skill gaps in your partial team.",
  },
  {
    id: 3,
    question: "How do I get matched for in-person vs online hackathons?",
    answer:
      "During registration, you can specify your preference for in-person, online, or hybrid events. The matchmaking algorithm prioritizes local matches for in-person events.",
  },
];
function FAQ() {
  return (
    <div
      className="py-5 text-center"
      style={{ background: "var(--color-primary-light-4)", padding:"1rem" }}
    >
      <section className="mb-5 container">
        <h2
          className="fw-bold mb-3"
          style={{
            fontSize: "var(--fs-h2)",
            color: "var(--color-text)",
          }}
        >
          Questions You May Have
        </h2>
        <p className="text-muted" style={{ fontSize: "var(--fs-regular)" }}>
          Everything you need to know about TeamCatalyst
        </p>

        <div className="mt-5 mx-auto text-start" style={{ maxWidth: "850px" }}>
          {FAQ_DATA.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default FAQ;
