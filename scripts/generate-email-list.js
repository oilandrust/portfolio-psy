// Simple script to generate email addresses in various formats for bulk emailing

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
  // Note: aurelie.treossi @gmail.com has a space - should be aurelie.treossi@gmail.com
  'aurelie.treossi@gmail.com',
];

console.log('='.repeat(60));
console.log('EMAIL ADDRESSES FOR BCC (copy this):');
console.log('='.repeat(60));
console.log(emails.join(', '));
console.log('\n');

console.log('='.repeat(60));
console.log('EMAIL ADDRESSES (one per line):');
console.log('='.repeat(60));
emails.forEach(email => console.log(email));
console.log('\n');

console.log('='.repeat(60));
console.log(`Total: ${emails.length} email addresses`);
console.log('='.repeat(60));

