// Script to send bulk emails using nodemailer
// Requires: npm install nodemailer
// Usage: node scripts/send-bulk-email.js

import nodemailer from 'nodemailer';
import 'dotenv/config';

const emails = [
  'a.scholive@mdrsacrecoeur.fr',
  'adela.cobzaru@chru-strasbourg.fr',
  'adj.marlenheim@orange.fr',
  'annewassong@hotmail.com',
  'barthelcecilia@hotmail.fr',
  'bstrausslienhart@arahm.fr',
  'caroline.stiassnie@chru-strasbourg.fr',
  'cesar.schinner@aphp.com',
  'charlotte.kauffmann@diaconat-mulhouse.fr',
  'christina.pinelli@ugecam.assurance-maladie.fr',
  'cl.weber@enfance.fvdp.org',
  'clachat@abrapa.asso.fr',
  'claude.badet@ugecam.assurance-maladie.fr',
  'cmichel@abrapa.ano.fr',
  'cmpp@pepalsace.fr',
  'contact@ehpadbau.fr',
  'e.kieffer@mdr.fvdp.org',
  'e.moguen@ch-guillaumeregnier.fr',
  'elsa.daumark@fondationpartageetvie.org',
  'foug@ohs.asso.fr',
  'gaelle.bringolf@rcpo.org',
  'henriette.scheu@gmail.com',
  'herrgott.jeremie@wanadoo.fr',
  'julie.breton@ch-colmar.fr',
  'k.rummel@drs-colmar.fr',
  'les4vents@diaconesses.fr',
  'lhoulle@abrapa.asso.fr',
  'linda.begue@chepsan.fr',
  'm.bobillier@fondation-sonnenhof.org',
  'marie.javourez@lestournesols3.fr',
  'marie.vergez@cegetel.net',
  'marie.wohlfahrt@chlagrafenbourg.fr',
  'mariefrance.marchal@bartischgut.com',
  'marienbronn.psychologues@orange.fr',
  'marionborgne@gmail.com',
  'marjolaine.hecker@ta-psy.fr',
  'mathilde.petitdemange@residence-argenson.fr',
  'mcburckel@diaconesses.fr',
  'melanie.lecoeuvre@ch-gisors.fr',
  'montdesoiseaux@aede.fr',
  'nathalie.martin@psyadom.fr',
  'obojaruniec@capio.fr',
  'ottchatelot@haut-rhin.fr',
  'patrice.kiefer@ch-epsan.fr',
  'psy.caritas@orange.fr',
  'psychologue@etablissement-oberlin.fr',
  'psychologue@lesmolènes.fr',
  'psychologue@parc-des-salines.fr',
  'psychologuebury@gmail.com',
  'psychologuelescollines@orange.fr',
  'rebecca.benhamou@gmail.com',
  'recor.psychologue@cliniqueorangerie.com',
  'secretariatI01@chepsan.fr',
  'service.psychologie@cmpp-strasbourg.org',
  'slefebvre@arahm.fr',
  'stagiairepsycho@ch-epsan.fr',
  'stephanie.klein@ghrmsa.fr',
  'valentin.insardi@me.com',
  'veronique.ferrand@hlwasselonne.fr',
  'vicky.matz.psychologue@gmail.com',
  'vincent.feireisen@ch-epsan.fr',
  'aurelie.treossi@gmail.com',
];

// Email configuration - set these in your .env file or pass as arguments
const emailConfig = {
  subject: process.env.EMAIL_SUBJECT || 'Your Subject Here',
  text: process.env.EMAIL_TEXT || 'Your email message here',
  html: process.env.EMAIL_HTML || null, // Optional HTML version
  from: process.env.EMAIL_FROM || process.env.SMTP_USER,
};

// SMTP configuration - set these in your .env file
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD || process.env.SMTP_APP_PASSWORD, // Use app password for Gmail
  },
};

// Check if required config is present
if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
  console.error('❌ Missing SMTP configuration.');
  console.error('Please set the following environment variables in your .env file:');
  console.error('  SMTP_HOST (default: smtp.gmail.com)');
  console.error('  SMTP_PORT (default: 587)');
  console.error('  SMTP_USER (your email address)');
  console.error('  SMTP_PASSWORD or SMTP_APP_PASSWORD (your email password or app password)');
  console.error('  EMAIL_FROM (sender email, defaults to SMTP_USER)');
  console.error('  EMAIL_SUBJECT (email subject)');
  console.error('  EMAIL_TEXT (email body text)');
  console.error('  EMAIL_HTML (optional HTML version)');
  process.exit(1);
}

// Parse command line arguments for subject and message
const args = process.argv.slice(2);
if (args.length > 0) {
  emailConfig.subject = args[0] || emailConfig.subject;
}
if (args.length > 1) {
  emailConfig.text = args.slice(1).join(' ') || emailConfig.text;
}

const dryRun = process.argv.includes('--dry-run');
const sendIndividually = process.argv.includes('--individual');

async function sendBulkEmail() {
  console.log(`\n📧 Preparing to send email to ${emails.length} addresses...`);
  console.log(`Subject: ${emailConfig.subject}`);
  console.log(`From: ${emailConfig.from || smtpConfig.auth.user}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no emails will be sent)' : sendIndividually ? 'Individual emails' : 'BCC (single email)'}\n`);

  if (dryRun) {
    console.log('📋 Email addresses:');
    emails.forEach((email, index) => {
      console.log(`  ${index + 1}. ${email}`);
    });
    console.log('\n✅ Dry run complete. Run without --dry-run to send emails.');
    return;
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport(smtpConfig);

    // Verify connection
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified\n');

    if (sendIndividually) {
      // Send individual emails (more personal but slower)
      console.log('📤 Sending individual emails...\n');
      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        try {
          await transporter.sendMail({
            from: emailConfig.from || smtpConfig.auth.user,
            to: email,
            subject: emailConfig.subject,
            text: emailConfig.text,
            html: emailConfig.html || emailConfig.text.replace(/\n/g, '<br>'),
          });
          successCount++;
          console.log(`  ✅ [${i + 1}/${emails.length}] Sent to ${email}`);
          
          // Small delay to avoid rate limiting
          if (i < emails.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          failCount++;
          console.error(`  ❌ [${i + 1}/${emails.length}] Failed to send to ${email}:`, error.message);
        }
      }

      console.log(`\n✅ Sent: ${successCount}, Failed: ${failCount}`);
    } else {
      // Send single email with BCC (faster, all recipients see each other)
      console.log('📤 Sending single email with BCC...\n');
      const result = await transporter.sendMail({
        from: emailConfig.from || smtpConfig.auth.user,
        bcc: emails, // Use BCC so recipients don't see each other's emails
        subject: emailConfig.subject,
        text: emailConfig.text,
        html: emailConfig.html || emailConfig.text.replace(/\n/g, '<br>'),
      });

      console.log('✅ Email sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`   Recipients: ${emails.length}`);
    }
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    if (error.response) {
      console.error('   Response:', error.response);
    }
    process.exit(1);
  }
}

sendBulkEmail();

