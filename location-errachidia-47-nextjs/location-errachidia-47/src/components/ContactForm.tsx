"use client";

import { useState, FormEvent } from "react";
import { contactFormMessage, whatsappLink } from "@/lib/whatsapp";
import { IconWhatsApp, IconArrow } from "./Icons";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError("Merci de renseigner votre nom, téléphone et message.");
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
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--bg)] border border-[var(--line)] p-6 md:p-8 space-y-4"
      noValidate
    >
      <h3 className="text-lg font-medium mb-2">Envoyez-nous un message</h3>
      <p className="text-sm text-[var(--muted)] mb-4">
        Le formulaire ouvre WhatsApp avec votre message pré-rempli. Aucune
        donnée n&apos;est envoyée à un serveur.
      </p>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nom complet <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Téléphone <span className="text-red-600">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email <span className="text-[var(--muted)] font-normal">(optionnel)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none"
        >
          <option value="">Sujet de votre demande</option>
          <option>Réservation d&apos;une voiture</option>
          <option>Location longue durée</option>
          <option>Tarifs et disponibilités</option>
          <option>Autre question</option>
        </select>
      </div>

      <div>
        <label htmlFor="msg" className="block text-sm font-medium mb-1">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="msg"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[var(--line)] rounded px-3 py-2.5 bg-white focus:border-[var(--gold)] outline-none resize-y"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-wa w-full justify-center mt-2"
      >
        <IconWhatsApp className="w-5 h-5" aria-hidden />
        Envoyer sur WhatsApp
        <IconArrow className="w-4 h-4" aria-hidden />
      </button>
    </form>
  );
}
