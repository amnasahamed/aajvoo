// Configure only after the business owner supplies and approves the recipient.
// Public business contact, never a secret. Empty means no external action.
const phone=import.meta.env.VITE_WHATSAPP_NUMBER||'';
export function chooseDesign(t){
 if(/^\d{8,15}$/.test(phone)){
  const message=`Hello Vow & Verse, I am interested in ${t.name} (design: ${t.id}).`;
  location.assign(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);return;
 }
 let dialog=document.querySelector('#contact-not-configured');
 if(!dialog){dialog=document.createElement('dialog');dialog.id='contact-not-configured';dialog.innerHTML='<h2>A conversation starts here.</h2><p>The studio’s WhatsApp contact is not configured yet. No message has been sent and no order has been placed.</p><form method="dialog"><button>Back to the invitation</button></form>';document.body.append(dialog)}
 dialog.showModal();
}
