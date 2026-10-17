"use client";

import { useState, FormEvent } from "react";
import { contactFormMessage, whatsappLink } from "@/lib/whatsapp";
import { IconWhatsApp, IconArrow } from "./Icons";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type Props = { dict: Dictionary };

export function ContactForm({ dict }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError(dict.contact.formError);
      return;
    }
    setError("");
    const text = contactFormMessage({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      subject: subject || undefined,
      message: message.trim(),
    });
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--bg)] border border-[var(--line)] p-6 md:p-8 space-y-4" noValidate>
      <h3 className="text-lg font-medium mb-2">{dict.contact.formTitle}</h3>
      <p className="text-sm text-[var(--muted)] mb-4">{dict.contact.formNote}</p>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {dict.contact.name} <span className="text-red-600">{dict.contact.required}</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          {dict.contact.phoneField} <span className="text-red-600">{dict.contact.required}</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" required value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {dict.contact.emailField} <span className="text-[var(--muted)] font-normal">{dict.contact.optional}</span>
        </label>
        <input id="email" name="email" type="email" autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">{dict.contact.subject}</label>
        <select id="subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none">
          <option value="">{dict.contact.subjectPlaceholder}</option>
          {dict.contact.subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="msg" className="block text-sm font-medium mb-1">
          {dict.contact.message} <span className="text-red-600">{dict.contact.required}</span>
        </label>
        <textarea id="msg" name="message" required rows={4} value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none resize-y" />
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" className="btn-wa w-full justify-center mt-2">
        <IconWhatsApp className="w-5 h-5" aria-hidden />
        {dict.contact.sendWa}
        <IconArrow className="w-4 h-4" aria-hidden />
      </button>
    </form>
  );
}
