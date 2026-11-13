import React, { useState } from 'react';
import { MEDICAL_ARTICLES, getArticleById } from '../data/encyclopedia';
import { MedicalArticle } from '../types';
import {
  Bot,
  Send,
  BookOpen,
  Sparkles,
  Shield,
  HelpCircle,
  ExternalLink,
  User,
  Heart
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  articles?: MedicalArticle[];
  followUpSuggestions?: string[];
  medicalSources?: string[];
  timestamp: string;
}

interface AssistantViewProps {
  onOpenArticle: (id: string) => void;
}

const PRESET_QUESTIONS = [
  'Pourquoi mes règles sont marron ?',
  'Comment savoir quand je peux tomber enceinte ?',
  'Est-ce normal d’avoir très mal pendant mes règles ?',
  'Pertes blanches ou mycose : comment savoir ?',
  'C’est quoi le SOPK ?',
  'J’ai oublié ma pilule, que faire ?'
];

export const AssistantView: React.FC<AssistantViewProps> = ({ onOpenArticle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Bonjour ! Je suis là pour répondre à tes questions sur le cycle, le corps et la santé intime. Je te réponds avec des informations vérifiées, sans connexion internet. Tu peux écrire librement.',
      followUpSuggestions: [
        'Pourquoi mes règles sont marron ?',
        'Comment savoir quand je peux tomber enceinte ?',
        'Règles très douloureuses : que faire ?'
      ],
      timestamp: 'À l’instant'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const findDocumentedAnswer = (query: string): {
    answer: string;
    articles: MedicalArticle[];
    followUps: string[];
    sources: string[];
  } => {
    const q = query.toLowerCase().trim();

    // 1. Brown blood / old blood
    if (q.includes('marron') || q.includes('brun') || q.includes('noir') || q.includes('vieux sang')) {
      const art = getArticleById('menstruation-sang-marron')!;
      return {
        answer: 'Du sang marron en début ou en fin de règles est très courant. C’est du sang qui est sorti plus lentement et qui a eu le temps de changer de couleur au contact de l’air. S’il n’y a pas d’odeur forte, de fièvre ni de brûlures, ce n’est généralement pas inquiétant. Si cela dure ou t’inquiète, parles-en à un professionnel de santé.',
        articles: [art],
        followUps: [
          'Le sang marron peut-il être un signe de grossesse ?',
          'Combien de temps durent des règles normales ?',
          'Quand consulter pour un saignement inhabituel ?'
        ],
        sources: ['INSERM', 'ACOG', 'Ameli']
      };
    }

    // 2. Late period
    if (q.includes('retard') || q.includes('pas de règles') || q.includes('aménorrhée')) {
      const art = getArticleById('menstruation-retard-regles')!;
      return {
        answer: 'Un retard de quelques jours est fréquent. Si tu as eu des rapports non protégés, fais d’abord un test de grossesse. Sinon, le stress, la fatigue, un voyage ou une perte de poids rapide peuvent décaler les règles. Si le retard dépasse 7 jours ou revient souvent, parles-en à un médecin ou à une sage-femme.',
        articles: [art],
        followUps: [
          'Le stress peut-il retarder les règles ?',
          'À partir de quand un retard est-il inquiétant ?'
        ],
        sources: ['OMS', 'CNGOF', 'NHS']
      };
    }

    // 3. Ovulation & Cervical mucus
    if (q.includes('ovulation') || q.includes('glaire') || q.includes('blanc d’oeuf') || q.includes('fertile')) {
      const art = getArticleById('ovulation-signes-glaire')!;
      return {
        answer: 'Autour du jour le plus propice, les pertes deviennent plus claires, plus liquides et s’étirent un peu comme du blanc d’œuf. Tu peux aussi avoir plus d’énergie ou une petite gêne d’un côté du ventre. Ces signes sont des indices, pas une preuve : ils ne remplacent ni un test, ni un moyen de contraception.',
        articles: [art],
        followUps: [
          'Combien de temps dure la période où je peux tomber enceinte ?',
          'Comment suivre ma température le matin ?'
        ],
        sources: ['INSERM', 'ACOG']
      };
    }

    // 4. Endometriosis / Severe pain
    if (q.includes('endométriose') || q.includes('mal pendant mes règles') || q.includes('crampes') || q.includes('dysménorrhée')) {
      const art = getArticleById('pathologies-endometriose')!;
      return {
        answer: 'Avoir mal au point de ne pas aller travailler, d’être obligée de rester allongée ou de ne pas être soulagée par un médicament contre la douleur n’est pas normal. Cela peut venir de l’endométriose, qui touche environ 1 femme sur 10. Il existe des solutions : parles-en à un gynécologue ou à une sage-femme.',
        articles: [art],
        followUps: [
          'Quels examens permettent de dépister l’endométriose ?',
          'L’endométriose empêche-t-elle d’avoir des enfants ?'
        ],
        sources: ['HAS / CNGOF', 'INSERM']
      };
    }

    // 5. Vaginal discharge / Yeast infection
    if (q.includes('perte') || q.includes('mycose') || q.includes('démangeaison') || q.includes('odeur') || q.includes('vaginose')) {
      const art = getArticleById('sante-vaginale-pertes-mycoses')!;
      return {
        answer: 'Des pertes blanches sans odeur sont normales : elles nettoient le vagin. Des pertes épaisses comme du yaourt, avec de fortes démangeaisons, peuvent indiquer une mycose. Une odeur forte ou désagréable peut venir d’une infection. Ne lave jamais l’intérieur du vagin et consulte si ça dure, si ça brûle ou si ça sent fort.',
        articles: [art],
        followUps: [
          'La mycose peut-elle se transmettre pendant les rapports ?',
          'Comment laver la zone intime sans l’abîmer ?'
        ],
        sources: ['Haute Autorité de Santé (HAS)', 'CDC']
      };
    }

    // 6. PCOS
    if (q.includes('sopk') || q.includes('polykystique') || q.includes('acné') || q.includes('androgène')) {
      const art = getArticleById('pathologies-sopk')!;
      return {
        answer: 'Le SOPK est un dérèglement des hormones fréquent. Il peut donner des cycles longs ou absents, des boutons, plus de poils et parfois des difficultés à tomber enceinte. Ce n’est pas dangereux en soi, mais ça se suit avec un médecin. Une alimentation équilibrée et un suivi adapté peuvent beaucoup aider.',
        articles: [art],
        followUps: [
          'Le SOPK est-il dangereux ?',
          'Le SOPK empêche-t-il de tomber enceinte ?'
        ],
        sources: ['Monash University Guidelines', 'INSERM']
      };
    }

    // Fallback: search all articles with broader keywords
    const matches = MEDICAL_ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.intro.toLowerCase().includes(q) ||
      a.whyItHappens.some(w => w.toLowerCase().includes(q))
    );

    if (matches.length > 0) {
      return {
        answer: `J’ai trouvé ${matches.length} article(s) qui parlent de ta question. Voici les plus proches :`,
        articles: matches.slice(0, 2),
        followUps: ['Poser une question plus précise', 'Voir tout le guide'],
        sources: ['Guide Mood']
      };
    }

    // Neutral safety fallback
    return {
      answer: 'Je n’ai pas de réponse prévue pour cette question. Je préfère ne rien inventer. Tu peux regarder dans le guide ou demander à ta sage-femme ou à ton médecin.',
      articles: [],
      followUps: [
        'Pourquoi mes règles sont marron ?',
        'Comment savoir si c’est l’endométriose ?',
        'Voir le guide'
      ],
      sources: ['Guide Mood']
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'À l’instant'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const result = findDocumentedAnswer(query);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: result.answer,
        articles: result.articles,
        followUpSuggestions: result.followUps,
        medicalSources: result.sources,
        timestamp: 'À l’instant'
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-rose-500" />
            Poser une question
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            Des réponses simples et vérifiées, sans internet
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Fonctionne sans internet
        </div>
      </div>

      {/* Suggested chips if conversation is young */}
      {messages.length <= 2 && (
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Questions fréquentes :
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUESTIONS.map(q => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-100 text-zinc-700 hover:text-rose-700 text-xs font-medium shadow-2xs transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages stream */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-rose-100 shadow-xs min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-3xl p-4 sm:p-5 space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-rose-500 text-white shadow-xs rounded-tr-xs'
                  : 'bg-zinc-50 border border-rose-100 text-zinc-800 rounded-tl-xs'
              }`}
            >
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>

              {/* Linked articles card */}
              {msg.articles && msg.articles.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-rose-100/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
                    Pour aller plus loin :
                  </span>
                  {msg.articles.map(art => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenArticle(art.id)}
                      className="w-full p-3 rounded-2xl bg-white hover:bg-rose-50 border border-rose-200 text-left transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <div>
                        <span className="text-xs font-bold text-zinc-900 group-hover:text-rose-700">
                          {art.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 block mt-0.5">
                          {art.categoryName} • {art.readTimeMinutes} min de lecture
                        </span>
                      </div>
                      <BookOpen className="w-4 h-4 text-rose-400 group-hover:text-rose-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Sources */}
              {msg.medicalSources && msg.medicalSources.length > 0 && (
                <div className="text-[10px] text-zinc-400 pt-1">
                  Sources : <strong className="text-zinc-600">{msg.medicalSources.join(', ')}</strong>
                </div>
              )}

              {/* Follow-up suggestions */}
              {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {msg.followUpSuggestions.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(sug)}
                      className="px-2.5 py-1 rounded-lg bg-rose-100/60 hover:bg-rose-200 text-rose-900 text-[11px] font-medium transition-colors"
                    >
                      {sug} →
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-xs text-zinc-400 pl-11">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce delay-100" />
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce delay-200" />
            <span className="ml-1">Je cherche la réponse...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Écris ta question simplement (ex : pourquoi mes règles sont foncées ?)..."
          className="flex-1 p-3.5 rounded-2xl bg-white border border-rose-200 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-rose-400"
        />
        <button
          type="submit"
          className="px-5 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Envoyer</span>
        </button>
      </form>
    </div>
  );
};
