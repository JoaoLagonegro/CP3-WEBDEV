import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function sendEmail({ name, email, message }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { name, email, message },
    { publicKey: PUBLIC_KEY },
  );
}
