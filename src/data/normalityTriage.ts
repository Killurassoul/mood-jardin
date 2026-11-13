export interface CommonSymptomPreset {
  id: string;
  label: string;
  category: string;
  defaultArticleId?: string;
  suggestedQuestions: string[];
}

export const COMMON_SYMPTOM_PRESETS: CommonSymptomPreset[] = [
  {
    id: 'late_period',
    label: 'Mes règles sont en retard',
    category: 'menstruation',
    defaultArticleId: 'menstruation-retard-regles',
    suggestedQuestions: [
      'Depuis combien de jours tes règles sont-elles en retard ?',
      'As-tu eu des rapports sexuels sans protection ce mois-ci ?',
      'As-tu une douleur forte d’un seul côté du ventre ?'
    ]
  },
  {
    id: 'brown_blood',
    label: 'Mon sang est marron ou très foncé',
    category: 'menstruation',
    defaultArticleId: 'menstruation-sang-marron',
    suggestedQuestions: [
      'Est-ce le début ou la fin de tes règles ?',
      'Le saignement est-il très léger ?',
      'Y a-t-il une odeur inhabituelle ?'
    ]
  },
  {
    id: 'painful_periods',
    label: 'J’ai très mal pendant mes règles',
    category: 'pathologies',
    defaultArticleId: 'pathologies-endometriose',
    suggestedQuestions: [
      'Sur 10, à combien estimes-tu la douleur ?',
      'Un médicament contre la douleur te soulage-t-il ?',
      'La douleur t’empêche-t-elle de te lever ou d’aller travailler ?'
    ]
  },
  {
    id: 'white_discharge',
    label: 'J’ai des pertes blanches abondantes',
    category: 'vaginal_health',
    defaultArticleId: 'sante-vaginale-pertes-mycoses',
    suggestedQuestions: [
      'À quoi ressemblent les pertes : liquides, crémeuses, étirables ou épaisses ?',
      'As-tu des démangeaisons ou des brûlures ?',
      'Y a-t-il une odeur forte ?'
    ]
  },
  {
    id: 'itching',
    label: 'J’ai des démangeaisons intimes ou des brûlures',
    category: 'vaginal_health',
    defaultArticleId: 'sante-vaginale-pertes-mycoses',
    suggestedQuestions: [
      'Depuis combien de jours cela dure-t-il ?',
      'As-tu changé de savon, de lessive, ou pris des antibiotiques ?',
      'As-tu des rougeurs ou de petites lésions ?'
    ]
  },
  {
    id: 'pain_during_intercourse',
    label: 'J’ai mal pendant les rapports intimes',
    category: 'sexuality',
    defaultArticleId: 'sexualite-clitoris-plaisir',
    suggestedQuestions: [
      'La douleur est-elle à l’entrée ou plus profond dans le ventre ?',
      'La lubrification était-elle suffisante ?',
      'As-tu des saignements après le rapport ?'
    ]
  }
];

export type TriageUrgencyLevel = 'EMERGENCY' | 'CONSULTATION_RECOMMENDED' | 'PHYSIOLOGICAL_BENIGN';

export interface TriageResult {
  level: TriageUrgencyLevel;
  title: string;
  summary: string;
  detailedAnalysis: string;
  safetyInstructions: string[];
  recommendedActions: string[];
  emergencyContacts?: string[];
  suggestedArticleId?: string;
}

export function evaluateSymptomTriage(answers: {
  symptomKey: string;
  durationDays: number;
  intensity: number; // 1-10
  isRecurrent: boolean;
  cyclePhase: string;
  hasFever: boolean;
  hasSevereSharpPain: boolean;
  hasDizzinessOrFainting: boolean;
  hasHeavyHemorrhage: boolean;
  isPregnancyPossible: boolean;
  hasAbnormalSmell: boolean;
  notes?: string;
}): TriageResult {
  // 1. Possible grossesse hors de l'utérus : douleur forte ou malaise
  if (answers.isPregnancyPossible && (answers.hasSevereSharpPain || answers.hasDizzinessOrFainting)) {
    return {
      level: 'EMERGENCY',
      title: 'Va aux urgences tout de suite',
      summary: 'Une douleur très forte d’un côté du ventre, des vertiges ou un malaise, avec un possible retard de règles, demandent un avis médical immédiat.',
      detailedAnalysis: 'Cela peut être une grossesse qui se développe hors de l’utérus (grossesse extra-utérine). C’est rare, mais grave. Ne reste pas seule et n’attends pas.',
      safetyInstructions: [
        'Si possible, ne reste pas seule.',
        'Ne mange et ne bois pas, au cas où une opération serait nécessaire.',
        'Appelle le 15 (SAMU) ou le 112, ou fais-toi emmener aux urgences.'
      ],
      recommendedActions: [
        'Appelle le 15 ou le 112 sans attendre.',
        'Va aux urgences les plus proches.'
      ],
      emergencyContacts: ['SAMU / Urgences : 15 (France)', 'Numéro d’urgence européen : 112', 'SOS Médecins : 3624']
    };
  }

  // 2. Saignement très abondant ou malaise
  if (answers.hasHeavyHemorrhage || (answers.intensity >= 9 && answers.hasDizzinessOrFainting)) {
    return {
      level: 'EMERGENCY',
      title: 'Va aux urgences rapidement',
      summary: 'Un saignement très abondant ou un malaise demandent des soins rapides. Par « très abondant », on entend plus de 2 protections grand format par heure.',
      detailedAnalysis: 'Une perte de sang importante peut beaucoup fatiguer le corps et doit être vérifiée à l’hôpital.',
      safetyInstructions: [
        'Allonge-toi avec les jambes un peu surélevées.',
        'Demande de l’aide à un proche ou appelle le 15 / 112.',
        'Garde les protections utilisées pour montrer le volume aux soignants.'
      ],
      recommendedActions: [
        'Va immédiatement aux urgences gynécologiques.'
      ],
      emergencyContacts: ['SAMU : 15', 'Numéro européen : 112']
    };
  }

  // 3. Fièvre + douleur ou odeur inhabituelle
  if (answers.hasFever && (answers.intensity >= 5 || answers.hasAbnormalSmell)) {
    return {
      level: 'CONSULTATION_RECOMMENDED',
      title: 'Prends rendez-vous rapidement (dans les 24 h)',
      summary: 'De la fièvre avec un mal au ventre ou des pertes qui sentent fort peuvent venir d’une infection.',
      detailedAnalysis: 'Une infection intime ou de l’utérus se soigne bien quand elle est prise à temps. Un médecin doit vérifier.',
      safetyInstructions: [
        'Prends ta température régulièrement.',
        'Ne prends pas d’anti-inflammatoires (comme l’ibuprofène) sans avis médical.',
        'Appelle ton médecin, une sage-femme ou un gynécologue aujourd’hui.'
      ],
      recommendedActions: [
        'Contacte un cabinet médical ou SOS Médecins.',
        'Fais les examens demandés par le professionnel de santé.'
      ],
      emergencyContacts: ['SOS Médecins : 3624']
    };
  }

  // 4. Douleur forte, longue ou qui revient
  if (answers.intensity >= 7 || answers.durationDays >= 14 || (answers.isRecurrent && answers.intensity >= 6)) {
    return {
      level: 'CONSULTATION_RECOMMENDED',
      title: 'Parles-en à un professionnel de santé',
      summary: 'Une douleur forte, qui dure ou qui revient souvent ne doit pas être ignorée.',
      detailedAnalysis: 'Des règles très douloureuses peuvent avoir des causes comme l’endométriose. Il existe des solutions : tu n’as pas à supporter la douleur.',
      safetyInstructions: [
        'N’aie pas honte de ce que tu ressens : la douleur n’est pas normale quand elle t’empêche de vivre.',
        'Note quand tu as mal dans Mood pour en parler plus facilement.'
      ],
      recommendedActions: [
        'Prends rendez-vous avec un gynécologue ou une sage-femme.',
        'Tu peux imprimer ton résumé depuis « Mon dossier santé ».'
      ],
      suggestedArticleId: answers.symptomKey === 'painful_periods' ? 'pathologies-endometriose' : undefined
    };
  }

  // 5. Situation courante et rassurante
  return {
    level: 'PHYSIOLOGICAL_BENIGN',
    title: 'Rien d’inquiétant à première vue',
    summary: 'D’après tes réponses, cela ressemble à un changement normal du cycle.',
    detailedAnalysis: 'De petites variations de couleur, quelques jours de retard ou de légères crampes sont fréquents. Cela suit souvent le rythme des hormones.',
    safetyInstructions: [
      'Reste à l’écoute de ton corps, sans t’inquiéter.',
      'Si cela dure plus d’une semaine ou s’aggrave, refais le point.'
    ],
    recommendedActions: [
      'Lis l’article conseillé dans le guide.',
      'Repose-toi, bois de l’eau et mets une bouillotte tiède si besoin.'
    ],
    suggestedArticleId:
      answers.symptomKey === 'brown_blood' ? 'menstruation-sang-marron' :
      answers.symptomKey === 'late_period' ? 'menstruation-retard-regles' :
      answers.symptomKey === 'white_discharge' ? 'sante-vaginale-pertes-mycoses' :
      undefined
  };
}
