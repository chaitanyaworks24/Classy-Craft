import ContactForm from '@/components/ContactForm';
import { companyConfig } from '@/data/company';
import { getEffectiveContactImage } from '@/lib/studio-overrides';

const livingRoomImgTemplate = '/assets/rooms/living room/imgi_11_lr-2-1785987661-X3R94.png';

export default function Contact() {
  const livingRoomImg = getEffectiveContactImage(livingRoomImgTemplate);
  return (
    <main className="page">
      <section className="contact-layout">
        <div className="image-frame tall">
          <img src={livingRoomImg} alt="Interior living room design" />
        </div>
        <div className="contact-content-side">
          <div className="eyebrow">START A CONVERSATION</div>
          <h1>Let's talk about your home.</h1>
          <p className="lead">
            Tell us what you're planning. We'll come back with the right next step rather than a generic sales pitch.
          </p>
          
          <ContactForm />

          <div className="contact-note">
            <strong>Prefer WhatsApp?</strong>
            <p>Message us directly for a quicker conversation.</p>
            <a href={`https://wa.me/${companyConfig.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20discuss%20my%20interior%20project.`} target="_blank" rel="noreferrer">{companyConfig.phone}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
