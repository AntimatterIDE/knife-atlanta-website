import Section from "@/components/Section";

export default function PrivateDiningPage() {
  return (
    <Section className="max-w-4xl mx-auto py-16 px-4 text-center">
      <h1 className="text-knife-cream font-display text-6xl leading-tight">
        Private Dining & Events
      </h1>
      <p className="text-knife-gold font-body text-lg mt-6 mb-8">
        For an exclusive dining experience, our private dining rooms offer elegance and comfort, perfect for your special occasions or corporate events.
      </p>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-full p-3 border border-knife-gold bg-knife-black text-knife-cream rounded outline-none"
          placeholder="Name"
          type="text"
          required
        />
        <input
          className="w-full p-3 border border-knife-gold bg-knife-black text-knife-cream rounded outline-none"
          placeholder="Email"
          type="email"
          required
        />
        <textarea
          className="w-full p-3 border border-knife-gold bg-knife-black text-knife-cream rounded outline-none"
          placeholder="Your message"
          rows={4}
          required
        />
        <button
          type="submit"
          className="p-3 bg-knife-gold text-knife-black font-display font-bold w-full rounded"
        >
          Submit Inquiry
        </button>
      </form>
    </Section>
  );
}
