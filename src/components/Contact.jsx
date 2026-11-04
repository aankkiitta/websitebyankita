import { useState } from "react";
import { Star } from "./HeroShapes";
import "./Contact.css";

// ---- Edit these ----
const PHONE = "9920770974";
const EMAIL = "hello@yourdomain.com"; // used when FORM_ENDPOINT is empty (opens the visitor's mail app)
const FORM_ENDPOINT = ""; // e.g. a Formspree URL "https://formspree.io/f/xxxx" to send without a mail app
// --------------------

const FIELDS = [
  { name: "name", label: "Who are you?", placeholder: "Type your name here...", type: "text", autoComplete: "name" },
  { name: "email", label: "What's your email address?", placeholder: "Type your email address here...", type: "email", autoComplete: "email" },
  { name: "phone", label: "What's your phone number?", placeholder: "Type your telephone number here...", type: "tel", autoComplete: "tel", optional: true },
];

function PhoneIcon() {
  return (
    <svg className="ct-phone-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
      />
    </svg>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`New message from ${data.name}`);
      const body = encodeURIComponent(
        `${data.message}\n\n— ${data.name}\n${data.email}${data.phone ? `\n${data.phone}` : ""}`
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="ct-section" id="contact" aria-labelledby="ct-title">
        
      <div className="ct-card">


        {/* Clay star from the hero, sits on the bottom-right corner of the card */}
        <span className="ct-shape ct-s-star" aria-hidden="true"><Star /></span>

        <header className="ct-head">
          <h2 className="ct-title" id="ct-title">
            Let’s <em>Talk</em>!
          </h2>
          <a className="ct-phone" href={`tel:${PHONE.replace(/\s/g, "")}`}>
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
        </header>

        <div className="ct-body">
          <div className="ct-box">
            <p className="ct-big">
              Get in <em>Touch</em>
            </p>
          </div>

          <form className="ct-form" onSubmit={handleSubmit}>
            {FIELDS.map((f) => (
              <div className="ct-field" key={f.name}>
                <label htmlFor={`ct-${f.name}`}>{f.label}</label>
                <input
                  id={`ct-${f.name}`}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  required={!f.optional}
                />
              </div>
            ))}

            <div className="ct-field">
              <label htmlFor="ct-message">What’s your Message</label>
              <textarea
                id="ct-message"
                name="message"
                rows="3"
                placeholder="Type your Message here..."
                required
              />
            </div>

            <button className="ct-send" type="submit" disabled={status === "sending"}>
              <span>{status === "sending" ? "Sending..." : "Send"}</span>
              <span className="ct-send-arrow" aria-hidden="true">→</span>
            </button>

            <p className="ct-status" role="status" aria-live="polite">
              {status === "sent" && "Thanks! Your message is on its way."}
              {status === "error" && "Something went wrong. Please try again."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}