import { MedicalArticle } from '../types';
import { PERIODS_ARTICLES } from './periodsEncyclopedia';

export interface CategoryMetadata {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
}

export const ENCYCLOPEDIA_CATEGORIES: CategoryMetadata[] = [
  { id: 'cycle_phases', name: 'Les phases du cycle', description: 'Menstruelle, folliculaire, ovulatoire, lutéale', iconName: 'RefreshCw', color: 'bg-pink-100 text-pink-700' },
  { id: 'menstruation', name: 'Mes règles', description: 'Couleur, durée, retard et petits soucis', iconName: 'Droplet', color: 'bg-rose-100 text-rose-700' },
  { id: 'ovulation', name: 'Tomber enceinte', description: 'Repérer les jours où c’est possible', iconName: 'Sparkles', color: 'bg-purple-100 text-purple-700' },
  { id: 'hormones', name: 'Humeur et énergie', description: 'Pourquoi le corps et les émotions changent', iconName: 'Activity', color: 'bg-fuchsia-100 text-fuchsia-700' },
  { id: 'vaginal_health', name: 'Santé intime', description: 'Pertes, odeurs, démangeaisons et hygiène', iconName: 'Shield', color: 'bg-pink-100 text-pink-700' },
  { id: 'sexuality', name: 'Sexualité', description: 'Plaisir, consentement et confort', iconName: 'Heart', color: 'bg-rose-100 text-rose-800' },
  { id: 'contraception', name: 'Contraception', description: 'Choisir ce qui te convient', iconName: 'CheckCircle', color: 'bg-amber-100 text-amber-800' },
  { id: 'pathologies', name: 'Soucis fréquents', description: 'Douleurs, endométriose, SOPK', iconName: 'AlertCircle', color: 'bg-red-100 text-red-700' },
  { id: 'fertility', name: 'Envie de bébé', description: 'Comprendre la fertilité sans pression', iconName: 'Smile', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'pregnancy', name: 'Grossesse', description: 'Les premiers signes et le suivi', iconName: 'Baby', color: 'bg-sky-100 text-sky-700' },
  { id: 'postpartum', name: 'Après l’accouchement', description: 'Récupérer et demander de l’aide', iconName: 'Feather', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'menopause', name: 'Ménopause', description: 'Bouffées de chaleur et nouveaux repères', iconName: 'Sun', color: 'bg-orange-100 text-orange-700' },
  { id: 'wellness', name: 'Bien-être', description: 'Sommeil, nourriture, mouvement et stress', iconName: 'Coffee', color: 'bg-teal-100 text-teal-700' },
];

export const MEDICAL_ARTICLES: MedicalArticle[] = [
  ...PERIODS_ARTICLES,
  {
    id: 'menstruation-sang-marron',
    categoryId: 'menstruation',
    categoryName: 'Mes règles',
    subCategory: 'Couleur du sang',
    title: 'Pourquoi mes règles sont parfois marron ?',
    readTimeMinutes: 3,
    intro: 'Du sang marron au début ou à la fin des règles est très courant. Ce n’est pas forcément un problème.',
    detailedExplanation: 'Quand le sang s’écoule lentement, il reste un peu plus longtemps au contact de l’air et change de couleur. Il peut devenir marron, brun ou presque noir. C’est souvent le signe que les règles commencent doucement ou se terminent. Si tu n’as pas d’odeur forte, de fièvre ni de douleur inhabituelle, il n’y a généralement pas d’inquiétude.',
    whyItHappens: [
      'Le sang sort plus lentement au début ou à la fin des règles.',
      'Il reste un peu de sang dans le vagin après les règles.',
      'Une nouvelle contraception peut changer la couleur ou le rythme.',
      'Parfois, une petite perte peut arriver au tout début d’une grossesse.',
    ],
    associatedSymptoms: [
      'Quelques gouttes seulement.',
      'Un flux plus léger.',
      'Aucune douleur particulière.',
    ],
    whatIsUsual: 'Avoir du sang marron 1 à 2 jours avant ou après les règles est habituel.',
    whatMeritsConsultation: [
      'Des pertes marron qui durent plus de 7 jours en dehors des règles.',
      'Une odeur forte, des brûlures ou des démangeaisons.',
      'Des pertes marron après la ménopause.',
      'Des saignements après un rapport.',
    ],
    urgentRedFlags: [
      'Une douleur très forte d’un seul côté du ventre avec un retard de règles.',
      'De la fièvre avec des pertes qui sentent mauvais.',
      'Un malaise, des vertiges importants ou une pâleur inhabituelle.',
    ],
    generalAdvice: [
      'Utilise une protection douce et non parfumée.',
      'Note la durée et la couleur dans l’application.',
      'Ne fais pas de lavage à l’intérieur du vagin.',
    ],
    faq: [
      {
        question: 'Est-ce du « vieux sang » ?',
        answer: 'Oui, c’est du sang qui a mis plus de temps à sortir et qui a changé de couleur au contact de l’air.',
      },
      {
        question: 'Est-ce un signe de grossesse ?',
        answer: 'Parfois. Si tu as eu un rapport non protégé, fais un test de grossesse. En cas de doute, demande conseil à un professionnel de santé.',
      },
    ],
    medicalSources: [
      { name: 'INSERM', description: 'Cycle menstruel et reproduction' },
      { name: 'ACOG', description: 'Saignements utérins anormaux' },
      { name: 'Ameli', description: 'Règles irrégulières et saignements' },
    ],
  },
  {
    id: 'menstruation-retard-regles',
    categoryId: 'menstruation',
    categoryName: 'Mes règles',
    subCategory: 'Retard de règles',
    title: 'Mes règles sont en retard : que faire ?',
    readTimeMinutes: 4,
    intro: 'Un retard de quelques jours est fréquent. La première chose à vérifier, si tu as eu des rapports non protégés, c’est une grossesse.',
    detailedExplanation: 'Le stress, la fatigue, un voyage, un changement de poids ou de contraception peuvent aussi décaler les règles. Ce n’est pas toujours grave. Si le retard dure plus de 7 jours ou revient souvent, il vaut mieux en parler à un médecin ou à une sage-femme.',
    whyItHappens: [
      'Une grossesse possible après un rapport non protégé.',
      'Du stress ou une période émotionnelle difficile.',
      'Un changement de poids, de sommeil ou d’activité physique.',
      'Un changement de contraception.',
      'Un souci de santé qui demande un avis médical.',
    ],
    associatedSymptoms: [
      'Seins tendus.',
      'Petits tiraillements dans le bas du ventre.',
      'Fatigue ou changements d’humeur.',
    ],
    whatIsUsual: 'Un décalage de 3 à 5 jours par rapport à la date prévue est courant et souvent sans gravité.',
    whatMeritsConsultation: [
      'Plus de 3 mois sans règles en dehors d’une grossesse.',
      'Des cycles qui dépassent souvent 45 jours.',
      'Des règles qui s’arrêtent après une perte de poids importante.',
    ],
    urgentRedFlags: [
      'Une douleur très vive d’un seul côté du ventre avec un test de grossesse positif ou douteux.',
      'Un évanouissement ou une chute brutale de tension.',
    ],
    generalAdvice: [
      'Fais un test de grossesse avec les premières urines du matin si tu as un doute.',
      'Essaie de garder un rythme de sommeil régulier.',
      'Note tes cycles dans l’application pour voir si le retard se répète.',
    ],
    faq: [
      {
        question: 'À partir de quand parle-t-on de retard ?',
        answer: 'On parle souvent de retard au-delà de 5 à 7 jours après la date prévue. Si cela t’inquiète, demande conseil.',
      },
      {
        question: 'Le stress peut-il vraiment retarder les règles ?',
        answer: 'Oui. Le stress peut perturber les signaux envoyés par le cerveau aux ovaires et décaler le moment des règles.',
      },
    ],
    medicalSources: [
      { name: 'OMS', description: 'Santé sexuelle et reproductive' },
      { name: 'CNGOF', description: 'Absence de règles et suivi gynécologique' },
      { name: 'NHS', description: 'Retard de règles' },
    ],
  },
  {
    id: 'ovulation-signes-glaire',
    categoryId: 'ovulation',
    categoryName: 'Tomber enceinte',
    subCategory: 'Les jours où c’est possible',
    title: 'Comment savoir quand je peux tomber enceinte ?',
    readTimeMinutes: 4,
    intro: 'Chaque mois, il y a quelques jours où une grossesse est possible. On peut apprendre à repérer ces jours, mais aucun signe ne remplace une contraception ni un test.',
    detailedExplanation: 'Le jour le plus propice arrive souvent au milieu du cycle, mais pas toujours au 14e jour. Autour de ce jour, les pertes peuvent devenir plus claires, plus liquides et s’étirer un peu comme du blanc d’œuf. C’est un indice, pas une preuve. Le stress, la fatigue ou un voyage peuvent décaler ce moment.',
    whyItHappens: [
      'Un ovule est libéré par un ovaire : on appelle cela l’ovulation.',
      'Les hormones modifient les pertes pour aider les spermatozoïdes à survivre quelques jours.',
      'La période où une grossesse est possible dure environ 6 jours : les 5 jours avant et le jour de l’ovulation.',
    ],
    associatedSymptoms: [
      'Des pertes plus claires et plus glissantes.',
      'Une petite gêne d’un côté du ventre.',
      'Plus d’envie de faire l’amour.',
      'Parfois quelques gouttes de sang clair.',
    ],
    whatIsUsual: 'Avoir des pertes plus liquides pendant 2 à 4 jours au milieu du cycle est courant.',
    whatMeritsConsultation: [
      'Aucun signe pendant plusieurs cycles alors que tu essaies d’avoir un bébé.',
      'Des pertes épaisses avec de fortes démangeaisons : cela peut être une mycose.',
    ],
    urgentRedFlags: [
      'Une douleur très forte qui t’empêche de marcher.',
    ],
    generalAdvice: [
      'Observe tes pertes aux toilettes, sans toucher à l’intérieur.',
      'Ne les confonds pas avec les pertes liées à l’excitation sexuelle.',
      'Si tu ne veux pas de bébé, utilise une contraception : ces signes ne protègent pas.',
    ],
    faq: [
      {
        question: 'Combien de temps dure la période où je peux tomber enceinte ?',
        answer: 'Environ 6 jours par cycle. Les spermatozoïdes peuvent vivre quelques jours et l’ovule environ 24 heures.',
      },
      {
        question: 'Est-ce fiable à 100 % ?',
        answer: 'Non. C’est une estimation. Pour éviter une grossesse, parle de contraception avec un professionnel de santé.',
      },
    ],
    medicalSources: [
      { name: 'INSERM', description: 'Reproduction humaine' },
      { name: 'ACOG', description: 'Connaître sa période de fertilité' },
    ],
  },
  {
    id: 'hormones-oestrogenes-progesterone',
    categoryId: 'hormones',
    categoryName: 'Humeur et énergie',
    subCategory: 'Les changements du cycle',
    title: 'Pourquoi mon humeur et mon énergie changent pendant le cycle ?',
    readTimeMinutes: 4,
    intro: 'Ce n’est pas dans ta tête : les hormones changent au fil du mois et peuvent jouer sur l’énergie, l’appétit et les émotions.',
    detailedExplanation: 'Deux messagères principales travaillent ensemble : les œstrogènes et la progestérone. Au début du cycle, l’énergie et la bonne humeur reviennent souvent. Juste avant les règles, certaines personnes se sentent plus fatiguées, plus sensibles ou plus irritables. Chaque personne vit cela différemment.',
    whyItHappens: [
      'Le cerveau et les ovaires s’envoient des signaux pour préparer le cycle.',
      'Les hormones influencent le sommeil, l’appétit et l’humeur.',
      'Le stress, le manque de sommeil et la vie quotidienne comptent aussi.',
    ],
    associatedSymptoms: [
      'Plus d’énergie après les règles.',
      'Envie de calme, de sucre ou de repos avant les règles.',
      'Seins sensibles, ballonnements ou petits boutons.',
      'Émotions plus fortes certains jours.',
    ],
    whatIsUsual: 'Se sentir plus fatiguée ou plus émotive les 3 à 5 jours avant les règles est courant.',
    whatMeritsConsultation: [
      'Des symptômes qui t’empêchent d’aller travailler, de dormir ou de vivre normalement.',
      'Une tristesse profonde ou des idées noires avant les règles.',
      'Des règles qui ne viennent plus ou qui deviennent très irrégulières.',
    ],
    urgentRedFlags: [
      'Des idées noires ou une grande détresse : parle à quelqu’un et demande de l’aide tout de suite. En France, le 3114 est ouvert 24 h/24.',
    ],
    generalAdvice: [
      'Note ton humeur et ton sommeil pour repérer les tendances.',
      'Garde des moments de repos et de douceur.',
      'Parle-en à un médecin si cela gâche ta vie.',
    ],
    faq: [
      {
        question: 'Est-ce que je peux faire quelque chose ?',
        answer: 'Oui : dormir régulièrement, bouger un peu, boire de l’eau et éviter de te juger. Si cela est très fort, un médecin peut t’aider.',
      },
      {
        question: 'C’est pareil pour tout le monde ?',
        answer: 'Non. Certaines personnes ne ressentent presque rien, d’autres beaucoup. Les deux sont possibles.',
      },
    ],
    medicalSources: [
      { name: 'Endocrine Society', description: 'Hormones et cycle féminin' },
      { name: 'INSERM', description: 'Hormones et cerveau' },
    ],
  },
  {
    id: 'sante-vaginale-pertes-mycoses',
    categoryId: 'vaginal_health',
    categoryName: 'Santé intime',
    subCategory: 'Pertes et démangeaisons',
    title: 'Pertes blanches, odeurs, démangeaisons : normal ou pas ?',
    readTimeMinutes: 4,
    intro: 'Le vagin se nettoie tout seul. Des pertes blanches sans odeur forte sont normales.',
    detailedExplanation: 'Les pertes aident à évacuer les cellules mortes et à garder la zone propre. Elles changent d’aspect au fil du cycle. Si elles deviennent épaisses comme du yaourt avec de fortes démangeaisons, cela peut être une mycose. Une odeur forte de poisson peut venir d’une infection. Dans ce cas, il faut consulter.',
    whyItHappens: [
      'Le nettoyage naturel du vagin.',
      'Une mycose, c’est-à-dire un champignon microscopique qui se développe trop.',
      'Un déséquilibre des bactéries protectrices.',
      'Une irritation due à un savon, une lessive ou un sous-vêtement synthétique.',
    ],
    associatedSymptoms: [
      'Pertes blanches ou transparentes sans odeur.',
      'Pertes épaisses avec démangeaisons.',
      'Odeur forte ou désagréable.',
      'Brûlures, rougeurs ou picotements.',
    ],
    whatIsUsual: 'Des pertes blanches crémeuses, sans démangeaison ni odeur forte, sont normales.',
    whatMeritsConsultation: [
      'Des démangeaisons fortes qui durent plus de 2 jours.',
      'Des pertes vertes, jaunes ou mousseuses.',
      'Des brûlures pour uriner.',
      'Plus de 3 à 4 épisodes par an.',
    ],
    urgentRedFlags: [
      'De la fièvre, des frissons et de fortes douleurs au ventre en même temps.',
      'Des cloques ou des plaies douloureuses sur la zone intime.',
    ],
    generalAdvice: [
      'Ne lave jamais l’intérieur du vagin.',
      'Lave seulement l’extérieur avec de l’eau tiède ou un produit doux.',
      'Porte des culottes en coton et évite les vêtements trop serrés.',
      'Ne mets pas de parfum sur la zone intime.',
    ],
    faq: [
      {
        question: 'Une mycose s’attrape-t-elle pendant les rapports ?',
        answer: 'Pas forcément. C’est souvent un déséquilibre de la flore. Si elle revient, consulte.',
      },
      {
        question: 'Faut-il utiliser un savon spécial ?',
        answer: 'Un savon doux sans parfum suffit. L’eau claire convient très bien.',
      },
    ],
    medicalSources: [
      { name: 'HAS', description: 'Infections et pertes vaginales' },
      { name: 'CDC', description: 'Mycoses et vaginose' },
    ],
  },
  {
    id: 'sexualite-clitoris-plaisir',
    categoryId: 'sexuality',
    categoryName: 'Sexualité',
    subCategory: 'Plaisir et consentement',
    title: 'Le clitoris, le plaisir et le consentement, simplement',
    readTimeMinutes: 4,
    intro: 'Le plaisir fait partie de la santé sexuelle. Comprendre son corps aide à vivre une sexualité plus confortable et respectueuse.',
    detailedExplanation: 'Le clitoris est un organe très sensible. On en voit seulement une petite partie, mais il continue à l’intérieur du corps. Quand on est excitée, le sang afflue dans la zone, le vagin se lubrifie et le corps se prépare. Chaque personne aime des choses différentes. Le consentement doit être libre, clair et peut changer à tout moment.',
    whyItHappens: [
      'Une stimulation physique et une envie émotionnelle.',
      'Les hormones et le cerveau jouent un rôle dans le désir.',
      'Le stress, la fatigue ou les soucis peuvent diminuer l’envie.',
    ],
    associatedSymptoms: [
      'La zone intime devient plus sensible.',
      'Le vagin devient humide ou glissant.',
      'Le corps se détend ou se contracte au moment du plaisir.',
      'Parfois, l’envie n’est pas là : c’est normal aussi.',
    ],
    whatIsUsual: 'La plupart des personnes ressentent plus de plaisir avec une stimulation du clitoris qu’avec la pénétration seule. La lubrification peut changer selon le cycle et la fatigue.',
    whatMeritsConsultation: [
      'Une douleur à chaque rapport.',
      'Une sécheresse qui irrite ou fait mal.',
      'Une perte de sensation ou un changement qui t’inquiète.',
    ],
    urgentRedFlags: [
      'Un saignement abondant après un rapport avec une forte douleur.',
      'Une agression ou un rapport sans ton accord : demande de l’aide. En France, tu peux appeler le 3919 ou le 112.',
    ],
    generalAdvice: [
      'Un lubrifiant à l’eau peut rendre les rapports plus confortables.',
      'Le consentement peut être retiré à tout moment.',
      'La douleur n’est pas normale : ne force pas.',
    ],
    faq: [
      {
        question: 'Le point G existe-t-il ?',
        answer: 'C’est une zone sensible à l’intérieur du vagin, pas un organe séparé. Son ressenti varie beaucoup d’une personne à l’autre.',
      },
      {
        question: 'Dois-je avoir mal la première fois ?',
        answer: 'Non. Une gêne peut arriver si tu es tendue ou si tu n’es pas assez lubrifiée, mais la douleur n’est pas une étape obligatoire.',
      },
    ],
    medicalSources: [
      { name: 'OMS', description: 'Santé sexuelle et droits' },
      { name: 'INSERM', description: 'Sexualité féminine' },
    ],
  },
  {
    id: 'contraception-panorama-choix',
    categoryId: 'contraception',
    categoryName: 'Contraception',
    subCategory: 'Choisir sa méthode',
    title: 'Pilule, stérilet, préservatif : comment choisir ?',
    readTimeMinutes: 4,
    intro: 'La meilleure contraception est celle qui te convient, que tu choisis librement et que tu supportes bien.',
    detailedExplanation: 'Il existe des contraceptions avec des hormones : la pilule à avaler chaque jour, l’implant sous la peau, le patch à coller, l’anneau dans le vagin ou le stérilet hormonal. Il existe aussi des méthodes sans hormones : le stérilet en cuivre, le préservatif ou le diaphragme. Chacune a des avantages et des inconvénients. Seul le préservatif protège aussi des infections sexuellement transmissibles. Un médecin ou une sage-femme peut t’aider à choisir.',
    whyItHappens: [
      'Éviter une grossesse qui n’est pas souhaitée.',
      'Avoir des règles moins douloureuses ou moins abondantes.',
      'Choisir une méthode qui ne demande pas un geste chaque jour.',
    ],
    associatedSymptoms: [
      'Quelques petites pertes les 3 premiers mois avec une nouvelle méthode.',
      'Des règles plus légères ou absentes avec certains stérilets ou implants.',
      'Des règles parfois plus abondantes avec le stérilet en cuivre.',
    ],
    whatIsUsual: 'Une période d’adaptation de 3 cycles est courante quand on commence une nouvelle contraception.',
    whatMeritsConsultation: [
      'Tu as oublié une pilule : regarde la notice ou appelle ton pharmacien.',
      'Des maux de tête forts ou des troubles de la vue sous pilule.',
      'Des douleurs au ventre qui durent après la pose d’un stérilet.',
      'Tu veux changer de méthode.',
    ],
    urgentRedFlags: [
      'Un mollet gonflé, chaud et douloureux.',
      'Une douleur soudaine dans la poitrine avec un essoufflement.',
    ],
    generalAdvice: [
      'Le préservatif est le seul à protéger des infections sexuellement transmissibles.',
      'En cas de vomissements ou de diarrhée, demande conseil.',
      'Tu peux changer d’avis à tout moment.',
    ],
    faq: [
      {
        question: 'Le stérilet rend-il stérile ?',
        answer: 'Non. La fertilité revient quand on le retire.',
      },
      {
        question: 'La pilule fait-elle grossir ?',
        answer: 'Pas forcément. Chaque personne réagit différemment. Si tu te sens mal, parle-en à un professionnel de santé.',
      },
    ],
    medicalSources: [
      { name: 'HAS', description: 'Choisir sa contraception' },
      { name: 'Santé Publique France', description: 'Contraception et vie sexuelle' },
    ],
  },
  {
    id: 'pathologies-endometriose',
    categoryId: 'pathologies',
    categoryName: 'Soucis fréquents',
    subCategory: 'Douleurs des règles',
    title: 'Endométriose : quand les règles font très mal',
    readTimeMinutes: 5,
    intro: 'L’endométriose touche environ 1 personne sur 10. Ce n’est pas un simple mal de ventre : cela peut faire très mal et gâcher la vie.',
    detailedExplanation: 'Avec l’endométriose, des morceaux de tissu qui ressemblent à l’intérieur de l’utérus se trouvent ailleurs dans le corps. Ils peuvent saigner pendant les règles, mais ce sang ne peut pas sortir. Cela crée des douleurs, une inflammation et parfois des kystes ou des adhérences. Il existe des traitements pour soulager et un suivi spécialisé.',
    whyItHappens: [
      'Le tissu qui ressemble à l’endomètre se développe en dehors de l’utérus.',
      'Ce tissu réagit aux hormones et saigne pendant les règles.',
      'Le sang piégé provoque inflammation et douleurs.',
      'Les antécédents familiaux peuvent augmenter le risque.',
    ],
    associatedSymptoms: [
      'Des règles très douloureuses qui résistent aux antidouleurs.',
      'Des douleurs pendant ou après les rapports.',
      'Des douleurs pour aller aux toilettes pendant les règles.',
      'Une fatigue qui ne passe pas.',
      'Parfois des difficultés à tomber enceinte.',
    ],
    whatIsUsual: 'Avoir mal au point de manquer l’école, le travail ou de rester au lit n’est jamais normal.',
    whatMeritsConsultation: [
      'Des douleurs qui augmentent avec les années.',
      'Des douleurs tous les jours, même sans règles.',
      'Des troubles digestifs qui reviennent avec le cycle.',
    ],
    urgentRedFlags: [
      'Ne plus pouvoir aller aux toilettes, avec des vomissements.',
      'Une douleur soudaine et intense dans le ventre.',
    ],
    generalAdvice: [
      'Note où tu as mal et à quel point, pour en parler au médecin.',
      'Demande un avis spécialisé si les douleurs t’handicapent.',
      'Le repos, la chaleur et une activité douce peuvent aider.',
    ],
    faq: [
      {
        question: 'L’endométriose empêche-t-elle toujours d’avoir un bébé ?',
        answer: 'Non. Beaucoup de personnes tombent enceintes naturellement. Pour d’autres, une aide médicale peut être nécessaire.',
      },
      {
        question: 'Comment en parler ?',
        answer: 'Note tes douleurs et leur intensité. Tu peux demander un avis à un gynécologue ou à une sage-femme.',
      },
    ],
    medicalSources: [
      { name: 'HAS / CNGOF', description: 'Prise en charge de l’endométriose' },
      { name: 'INSERM', description: 'Comprendre l’endométriose' },
    ],
  },
  {
    id: 'pathologies-sopk',
    categoryId: 'pathologies',
    categoryName: 'Soucis fréquents',
    subCategory: 'Règles irrégulières',
    title: 'SOPK : des règles irrégulières et des hormones qui s’emballent',
    readTimeMinutes: 4,
    intro: 'Le SOPK (syndrome des ovaires polykystiques) est un dérèglement hormonal fréquent. Malgré son nom, ce ne sont pas de vrais kystes.',
    detailedExplanation: 'Avec le SOPK, les ovaires produisent trop d’hormones appelées androgènes et les ovules ont du mal à arriver à maturité. Les règles peuvent donc être longues, irrégulières ou absentes. Cela peut aussi donner des boutons, des poils plus nombreux ou des cheveux plus fins. Le SOPK ne se guérit pas, mais il se suit et se traite.',
    whyItHappens: [
      'Une prédisposition génétique, c’est-à-dire un terrain familial.',
      'Le corps répond moins bien à l’insuline, ce qui augmente certaines hormones.',
      'Les ovaires produisent trop d’androgènes.',
    ],
    associatedSymptoms: [
      'Des cycles longs, irréguliers ou absents.',
      'Des boutons persistants, des poils plus nombreux ou une chute de cheveux.',
      'Une prise de poids difficile à réguler ou de la fatigue.',
    ],
    whatIsUsual: 'Le diagnostic se fait avec un médecin, souvent après plusieurs examens. Les critères ne sont pas les mêmes pour tout le monde.',
    whatMeritsConsultation: [
      'Des cycles qui dépassent régulièrement 35 à 45 jours.',
      'De l’acné qui résiste aux soins habituels.',
      'Une envie de bébé qui prend du temps.',
    ],
    urgentRedFlags: [
      'Un saignement très abondant et prolongé après plusieurs mois sans règles.',
    ],
    generalAdvice: [
      'Mange régulièrement et évite les pics de sucre.',
      'Bouge un peu chaque jour, par exemple en marchant.',
      'Un suivi médical aide à trouver ce qui te convient.',
    ],
    faq: [
      {
        question: 'Y a-t-il vraiment des kystes ?',
        answer: 'Non. Le mot est trompeur : ce sont surtout de nombreux petits ovules qui restent bloqués à un stade immature.',
      },
      {
        question: 'Le SOPK empêche-t-il de tomber enceinte ?',
        answer: 'Pas toujours. Certaines personnes ont besoin d’une aide médicale, mais une grossesse reste possible.',
      },
    ],
    medicalSources: [
      { name: 'Monash University / ESHRE', description: 'Recommandations sur le SOPK' },
      { name: 'INSERM', description: 'Comprendre le SOPK' },
    ],
  },
  {
    id: 'fertilite-conception-fenetre',
    categoryId: 'fertility',
    categoryName: 'Envie de bébé',
    subCategory: 'Mettre les chances de son côté',
    title: 'Envie de bébé : comment mettre les chances de son côté ?',
    readTimeMinutes: 4,
    intro: 'La grossesse est une rencontre entre un ovule et un spermatozoïde. Connaître les bons jours peut aider, sans se mettre de pression.',
    detailedExplanation: 'La période où une grossesse est possible dure environ 6 jours par cycle. Elle comprend les 5 jours avant l’ovulation et le jour de l’ovulation. Les spermatozoïdes peuvent vivre quelques jours, alors qu’un ovule ne vit qu’environ 24 heures. Avoir des rapports tous les 2 à 3 jours pendant cette période suffit souvent.',
    whyItHappens: [
      'Un spermatozoïde rencontre un ovule dans une trompe.',
      'L’ovule fécondé s’installe dans l’utérus quelques jours plus tard.',
      'La période la plus propice se situe juste avant l’ovulation.',
    ],
    associatedSymptoms: [
      'Des pertes plus claires et élastiques.',
      'Un peu plus d’envie de faire l’amour.',
      'Une légère hausse de la température corporelle le matin.',
    ],
    whatIsUsual: 'Pour un couple en bonne santé, la chance de grossesse est d’environ 20 à 25 % par cycle. Il est normal que cela prenne 6 à 12 mois.',
    whatMeritsConsultation: [
      'Pas de grossesse après 12 mois de rapports réguliers sans protection, ou 6 mois après 35 ans.',
      'Des antécédents de chirurgie, d’endométriose ou d’infection.',
    ],
    urgentRedFlags: [
      'Une douleur forte d’un seul côté du ventre alors que tu sais que tu es enceinte.',
    ],
    generalAdvice: [
      'Prends de l’acide folique (vitamine B9) 400 µg par jour dès que tu commences à essayer. Cela aide à prévenir certaines malformations du bébé.',
      'Arrête le tabac et l’alcool, et limite la caféine pour vous deux.',
      'Ne te force pas à avoir des rapports tous les jours : le plaisir compte aussi.',
    ],
    faq: [
      {
        question: 'Faut-il avoir des rapports tous les jours ?',
        answer: 'Non. Tous les 2 à 3 jours pendant la période propice suffit souvent et permet de garder du plaisir et de la complicité.',
      },
      {
        question: 'Quand faire un test de grossesse ?',
        answer: 'À partir du premier jour de retard, avec les premières urines du matin. Si le test est négatif et que le retard continue, refais-en un ou demande conseil.',
      },
    ],
    medicalSources: [
      { name: 'ACOG', description: 'Fertilité naturelle' },
      { name: 'Ameli', description: 'Désir d’enfant et consultation' },
    ],
  },
  {
    id: 'grossesse-premiers-signes',
    categoryId: 'pregnancy',
    categoryName: 'Grossesse',
    subCategory: 'Début de grossesse',
    title: 'Début de grossesse : les premiers signes et les étapes',
    readTimeMinutes: 5,
    intro: 'Chaque grossesse est différente. Certaines personnes ressentent des signes très tôt, d’autres presque rien.',
    detailedExplanation: 'Après la fécondation, le futur placenta produit une hormone appelée hCG. C’est elle que les tests de grossesse détectent. Les signes peuvent arriver tôt ou pas du tout. Un retard de règles est souvent le premier indice, mais seul un test peut confirmer.',
    whyItHappens: [
      'Le corps produit de nouvelles hormones pour garder la grossesse.',
      'Le volume de sang augmente, ce qui peut donner chaud ou fatiguer.',
      'L’utérus et les seins changent petit à petit.',
    ],
    associatedSymptoms: [
      'Un retard de règles.',
      'Des nausées ou un dégoût pour certaines odeurs.',
      'Une grande fatigue.',
      'Des seins plus sensibles ou plus gonflés.',
    ],
    whatIsUsual: 'Certaines personnes ont beaucoup de symptômes dès 2 à 3 semaines, d’autres aucun. Les deux sont normaux.',
    whatMeritsConsultation: [
      'Fais confirmer la grossesse par une prise de sang ou une consultation.',
      'Des nausées si fortes que tu ne peux ni manger ni boire.',
      'Une inquiétude ou une douleur qui dure.',
    ],
    urgentRedFlags: [
      'Des saignements rouges abondants avec des crampes fortes.',
      'Une douleur soudaine d’un seul côté du ventre.',
      'De la fièvre au-dessus de 38 °C pendant la grossesse.',
    ],
    generalAdvice: [
      'Arrête totalement l’alcool et le tabac.',
      'Demande à ton médecin quels aliments éviter pendant la grossesse.',
      'Prends rendez-vous pour le suivi et l’échographie du premier trimestre.',
    ],
    faq: [
      {
        question: 'Pourquoi le médecin parle de « semaines d’aménorrhée » ?',
        answer: 'C’est une façon de compter depuis le premier jour de tes dernières règles. C’est environ 2 semaines de plus que l’âge réel de la grossesse.',
      },
      {
        question: 'Quand annoncer la grossesse ?',
        answer: 'C’est toi qui décides. Beaucoup de personnes attendent la première échographie, mais il n’y a pas de règle.',
      },
    ],
    medicalSources: [
      { name: 'CNGOF', description: 'Suivi de la grossesse' },
      { name: 'HAS', description: 'Suivi prénatal' },
    ],
  },
  {
    id: 'postpartum-recuperation-lochies',
    categoryId: 'postpartum',
    categoryName: 'Après l’accouchement',
    subCategory: 'Récupération',
    title: 'Après l’accouchement : ce qui est normal et quand demander de l’aide',
    readTimeMinutes: 5,
    intro: 'Après la naissance, le corps et les émotions ont besoin de temps. Le repos et le soutien ne sont pas des luxes.',
    detailedExplanation: 'L’utérus se contracte pour retrouver sa taille. Cela peut faire mal, surtout pendant l’allaitement. Les saignements, appelés lochies, durent plusieurs semaines. Ils passent du rouge au rosé, puis au brun et au jaune. Les émotions aussi peuvent être fortes : le baby blues est fréquent les premiers jours.',
    whyItHappens: [
      'L’utérus se referme après l’accouchement.',
      'Les hormones de grossesse baissent rapidement.',
      'Le corps récupère et le sommeil est souvent perturbé.',
      'La montée de lait peut être inconfortable.',
    ],
    associatedSymptoms: [
      'Des contractions, parfois fortes pendant l’allaitement.',
      'Une grande fatigue et un sommeil en morceaux.',
      'Des larmes faciles ou une sensibilité émotionnelle.',
      'Des seins gonflés et sensibles.',
    ],
    whatIsUsual: 'Le baby blues dure souvent entre 2 et 10 jours et s’apaise avec du soutien et du repos.',
    whatMeritsConsultation: [
      'Une tristesse profonde ou une anxiété qui dure plus de 2 semaines.',
      'Des pensées qui t’inquiètent ou des idées noires.',
      'Une rééducation du périnée et des abdominaux 6 à 8 semaines après.',
    ],
    urgentRedFlags: [
      'Des saignements très soudains qui remplissent plus de 2 protections par heure.',
      'Des lochies qui sentent très mauvais avec de la fièvre ou des frissons.',
      'Un mollet gonflé et douloureux.',
    ],
    generalAdvice: [
      'Priorité au repos : demande de l’aide pour les tâches.',
      'Porte des sous-vêtements confortables et des serviettes douces.',
      'Parle de tes émotions sans honte : la dépression après l’accouchement se soigne bien quand elle est repérée tôt.',
    ],
    faq: [
      {
        question: 'Quand reviennent les règles ?',
        answer: 'Souvent 6 à 8 semaines après la naissance si tu n’allaites pas. Cela peut être plus tard si tu allaites uniquement.',
      },
      {
        question: 'Puis-je faire du sport ?',
        answer: 'Doucement et après l’accord d’un professionnel. La rééducation du périnée est une bonne première étape.',
      },
    ],
    medicalSources: [
      { name: 'Santé Publique France', description: 'Les 1000 premiers jours' },
      { name: 'OMS', description: 'Soins après la naissance' },
    ],
  },
  {
    id: 'menopause-perimenopause-bouffees',
    categoryId: 'menopause',
    categoryName: 'Ménopause',
    subCategory: 'Le changement',
    title: 'Ménopause : traverser le changement en douceur',
    readTimeMinutes: 4,
    intro: 'La ménopause arrive quand les règles s’arrêtent définitivement. Avant, il y a une période de transition où le corps cherche un nouveau rythme. C’est une étape naturelle, pas une maladie.',
    detailedExplanation: 'La réserve d’ovules diminue avec l’âge. Les règles deviennent irrégulières, puis s’arrêtent. On parle de ménopause quand il n’y a plus de règles depuis 12 mois. Les hormones baissent, ce qui peut donner des bouffées de chaleur, des sueurs, des troubles du sommeil ou une sécheresse intime. Chaque personne vit cette période différemment.',
    whyItHappens: [
      'Les ovaires produisent moins d’hormones avec l’âge.',
      'Les règles deviennent irrégulières avant de s’arrêter.',
      'Le corps s’adapte à ce nouveau rythme.',
    ],
    associatedSymptoms: [
      'Des cycles plus courts ou plus espacés.',
      'Des bouffées de chaleur et des sueurs la nuit.',
      'Un sommeil perturbé et de la fatigue.',
      'Une sécheresse de la peau ou de la zone intime.',
    ],
    whatIsUsual: 'Les bouffées de chaleur, les sautes d’humeur et les cycles irréguliers sont fréquents autour de la cinquantaine.',
    whatMeritsConsultation: [
      'Des bouffées de chaleur qui gâchent ton sommeil et ta vie.',
      'Une sécheresse ou une douleur intime.',
      'Tout saignement après 12 mois sans règles.',
    ],
    urgentRedFlags: [
      'Un saignement vaginal abondant après la ménopause confirmée.',
    ],
    generalAdvice: [
      'Pense au calcium et à la vitamine D pour tes os.',
      'Bouge un peu chaque jour, avec un peu de renforcement musculaire.',
      'Pour la sécheresse intime, un produit hydratant adapté peut aider.',
    ],
    faq: [
      {
        question: 'Peut-on encore tomber enceinte ?',
        answer: 'Oui, tant que les règles ne sont pas arrêtées depuis 12 mois. La contraception reste utile si tu ne veux pas de grossesse.',
      },
      {
        question: 'La ménopause se soigne-t-elle ?',
        answer: 'Ce n’est pas une maladie, mais certains symptômes peuvent être soulagés. Parle-en à un professionnel de santé pour trouver ce qui te convient.',
      },
    ],
    medicalSources: [
      { name: 'HAS', description: 'Ménopause et accompagnement' },
      { name: 'NAMS', description: 'Recommandations sur la ménopause' },
    ],
  },
  {
    id: 'bien-etre-nutrition-sommeil',
    categoryId: 'wellness',
    categoryName: 'Bien-être',
    subCategory: 'S’écouter au quotidien',
    title: 'Manger, dormir, bouger : s’écouter selon son cycle',
    readTimeMinutes: 4,
    intro: 'L’énergie n’est pas la même tous les jours. S’écouter peut aider à mieux vivre les changements du cycle.',
    detailedExplanation: 'Au fil du cycle, beaucoup de personnes se sentent plus dynamiques après les règles, puis plus fatiguées juste avant. Le corps peut demander plus de repos et plus d’aliments réconfortants. Ce n’est pas un manque de volonté : ce sont des changements normaux. L’important est de ne pas se juger et de garder des habitudes douces.',
    whyItHappens: [
      'Les hormones influencent l’énergie et l’appétit.',
      'Le sommeil peut être plus léger avant les règles.',
      'Le stress et la vie quotidienne jouent aussi un rôle.',
    ],
    associatedSymptoms: [
      'Plus d’endurance et d’envie de créer au milieu du cycle.',
      'Plus de fatigue et d’envie de sucré avant les règles.',
      'Des ballonnements ou une sensation de lourdeur.',
    ],
    whatIsUsual: 'Avoir plus faim et besoin de repos les 3 à 5 jours avant les règles est courant.',
    whatMeritsConsultation: [
      'Des insomnies fortes qui reviennent chaque mois.',
      'Des envies alimentaires incontrôlables avec une grande souffrance.',
      'Une fatigue qui t’empêche de te lever.',
    ],
    urgentRedFlags: [
      'Un épuisement total avec une perte d’appétit ou une dénutrition.',
    ],
    generalAdvice: [
      'Bois de l’eau régulièrement, environ 1,5 à 2 litres par jour.',
      'Garde des aliments simples et réconfortants à portée de main.',
      'Bouge à ton rythme : marche, étirements ou yoga doux.',
    ],
    faq: [
      {
        question: 'Le sport est-il déconseillé pendant les règles ?',
        answer: 'Non, au contraire. Une activité douce peut aider à soulager les crampes et à remonter l’humeur.',
      },
      {
        question: 'Faut-il suivre un régime spécial ?',
        answer: 'Non. Manger varié et régulièrement suffit. Si tu as des carences ou des symptômes forts, demande conseil.',
      },
    ],
    medicalSources: [
      { name: 'INSERM', description: 'Sommeil et santé' },
      { name: 'OMS', description: 'Activité physique et bien-être' },
    ],
  },
];

export function getArticleById(id: string): MedicalArticle | undefined {
  return MEDICAL_ARTICLES.find(article => article.id === id);
}

export function searchArticles(query: string, categoryFilter?: string): MedicalArticle[] {
  const normalizedQuery = query.toLowerCase().trim();
  return MEDICAL_ARTICLES.filter(article => {
    if (categoryFilter && categoryFilter !== 'all' && article.categoryId !== categoryFilter) {
      return false;
    }
    if (!normalizedQuery) return true;
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.intro.toLowerCase().includes(normalizedQuery) ||
      article.detailedExplanation.toLowerCase().includes(normalizedQuery) ||
      article.subCategory.toLowerCase().includes(normalizedQuery) ||
      article.associatedSymptoms.some(s => s.toLowerCase().includes(normalizedQuery)) ||
      article.whyItHappens.some(w => w.toLowerCase().includes(normalizedQuery))
    );
  });
}
