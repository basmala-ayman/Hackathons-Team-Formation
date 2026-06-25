import FAQItem from "./FAQItem";
const FAQ_DATA = [
  {
    id: 1,
    question: "How does Team Catalyst help me build a hackathon team?",
    answer:
      "It helps you form hackathon teams in different ways, whether you want to create a team request, submit a project idea and let the platform build a team around it, or join a hackathon and get matched with suitable teammates.",
  },
  {
    id: 2,
    question: "Do I need to complete my profile before using Team Catalyst?",
    answer:
      "Yes. Your profile is one of the most important parts of the matching process. The more accurate your skills, interests, Bio, and preferences are, the better the AI can recommend suitable teammates and team options for you.",
  },
   {
    id: 3,
    question: "What if I already have a partial team?",
    answer:
      "You can easily invite your existing teammates to your group. Our AI will then match you with individuals who fill the remaining skill gaps in your partial team.",
  },
   {
    id: 4,
    question: "Can I create a team without having a project idea?",
    answer:
      "Yes. You can create a team request even if you don’t have a project idea yet. Just choose the hackathon, define the kind of team you want, and the platform will help you find suitable teammates.",
  },
  {
    id: 5,
    question: "What if I already have a project idea?",
    answer:
      "When creating your team, you can also add a project idea for the selected hackathon. Your idea can then be shown to users who are interested in that hackathon, and AI will use interested participants to help build a suitable team around it.",
  },
];
function FAQ() {
  return (
    <div
      className=" text-center"
      style={{ background: "var(--color-primary-light-4)", padding:"6rem" }}
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
