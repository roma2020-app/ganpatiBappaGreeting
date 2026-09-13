import { Language, GreetingType, CardTheme, GreetingCardData, ArtworkType, OrganizationType } from '../types';

export interface GreetingOption {
  shloka: string;
  title: string;
  salutation: (recipient: string, language: Language) => string;
  message: (recipient: string, sender: string) => string;
  tagline: string;
  signature: (sender: string, language: Language) => string;
}

export const GREETINGS_DB: Record<Language, Record<GreetingType, GreetingOption[]>> = {
  marathi: {
    family: [
      {
        shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        title: '🙏 गणपती बाप्पा मोरया!',
        salutation: (recipient) => recipient ? `सस्नेह ${recipient},` : 'सस्नेह सप्रेम नमस्कार,',
        message: () =>
          'गणेशोत्सवाच्या या मंगलमय पावन पर्वावर, लाडक्या विघ्नहर्त्या बाप्पाच्या कृपेने आपल्या संपूर्ण परिवाराला सुख, शांती, समाधान, उत्तम आरोग्य आणि दीर्घायुष्य लाभो हीच सदिच्छा!',
        tagline: '🌺 गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— ${sender ? (sender.toLowerCase().includes('परिवार') || sender.toLowerCase().includes('family') ? sender : `${sender} व परिवार`) : 'आपला नम्र'}`,
      },
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🙏 मंगलमूर्ती मोरया!',
        salutation: (recipient) => recipient ? `स्नेही ${recipient},` : 'स्नेही परिवारास,',
        message: () =>
          'मोदकांचा गोडवा, दुर्वांचा सुवास आणि बाप्पाचे शुभाशीर्वाद तुमच्या घरात सदैव सुख, शांती, ऐश्वर्य आणि भरभराट घेऊन येवोत!',
        tagline: '🌺 गणपती बाप्पा मोरया! 🌺',
        signature: (sender) => `— सस्नेह, ${sender || 'आपला स्नेही'}`,
      },
      {
        shloka: '॥ सुखकर्ता दुःखहर्ता वार्ता विघ्नाची ॥',
        title: '🙏 गणेशोत्सवाच्या मंगलमयी शुभेच्छा!',
        salutation: (recipient) => recipient ? `आदरणीय ${recipient},` : 'सप्रेम जय गणेश,',
        message: () =>
          'बाप्पाच्या चरणी नतमस्तक होऊन प्रार्थना करतो की आपल्या घरातील प्रत्येक व्यक्तीला निरोगी दीर्घायुष्य, असीम समाधान व यशाची शिखरे गाठण्याचे बळ लाभो.',
        tagline: '🌺 मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— ${sender ? `${sender} आणि कुटुंबीय` : 'आपले नम्र'}`,
      },
      {
        shloka: '॥ श्री गणेशाय नमः ॥',
        title: '🙏 बाप्पा मोरया!',
        salutation: (recipient) => recipient ? `प्रिय ${recipient} व सर्व कुटुंबीय,` : 'प्रिय कुटुंबीय व आप्तेष्ट,',
        message: () =>
          'विघ्नांचा नाश करणारा, संकटमोचक विघ्नहर्ता बाप्पा तुमच्या सर्व संकटांचे निवारण करो आणि सदैव तुमच्या पाठीशी खंबीरपणे उभा राहो.',
        tagline: '🌺 मोरया मोरया, मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— सस्नेह, ${sender || 'आपला/आपली'}`,
      },
    ],
    friends: [
      {
        shloka: '॥ विघ्नहर्ता सुखकर्ता दुःखहर्ता ॥',
        title: '🙏 बाप्पा मोरया!',
        salutation: (recipient) => recipient ? `प्रिय ${recipient},` : 'प्रिय मित्रा,',
        message: () =>
          'उत्साह, जल्लोष आणि आनंदाचा सण! बाप्पाच्या आशीर्वादाने तुझ्या आयुष्यात यश, प्रगती, भरभराट आणि आनंदाचे क्षण नेहमी असेच बहरत राहोत!',
        tagline: '🌺 गणपती बाप्पा मोरया! 🌺',
        signature: (sender) => `— तुझा/तुझी मित्र/मैत्रीण, ${sender || ''}`,
      },
      {
        shloka: '॥ ॐ श्री गणेशाय नमः ॥',
        title: '🙏 गणेशोत्सवाच्या हार्दिक शुभेच्छा!',
        salutation: (recipient) => recipient ? `डिअर ${recipient},` : 'प्रिय मित्रा,',
        message: () =>
          'बाप्पाच्या आगमनाने तुझ्या सर्व अडचणी दूर होवोत आणि प्रत्येक स्वप्न सत्यात उतरो! गणेश चतुर्थीच्या तुला मनापासून खूप खूप शुभेच्छा!',
        tagline: '🌺 मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— ${sender || 'तुझा मित्र'}`,
      },
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🙏 जल्लोष बाप्पाच्या आगमनाचा!',
        salutation: (recipient) => recipient ? `अरे ${recipient},` : 'जिगरी मित्रा,',
        message: () =>
          'ढोल-ताशांचा गजर आणि गुलालाची उधळण! बाप्पाच्या कृपेने तुझ्या करियर व आयुष्यात तुफानी यश आणि अखंड आनंद मिळो. बाप्पा मोरया!',
        tagline: '🌺 गणपती बाप्पा मोरया! पुढच्या वर्षी लवकर या! 🌺',
        signature: (sender) => `— तुझा खास मित्र, ${sender || ''}`,
      },
      {
        shloka: '॥ रिद्धि-सिद्धि बुद्धी प्रदाता श्री गणेश ॥',
        title: '🙏 हॅप्पी गणेशोत्सव!',
        salutation: (recipient) => recipient ? `प्रिय दोस्ता ${recipient},` : 'माझ्या प्रिय दोस्ता,',
        message: () =>
          'आपली मैत्री अशीच चिरंतन आणि गोड राहो जसा मोदकाचा स्वाद! बाप्पा तुझ्या सर्व इच्छा-आकांक्षा पूर्ण करो.',
        tagline: '🌺 मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— ${sender || 'तुझा स्नेही'}`,
      },
    ],
    formal: [
      {
        shloka: '॥ श्री गणेशाय नमः ॥',
        title: 'गणेशोत्सवाच्या हार्दिक शुभेच्छा',
        salutation: (recipient) => recipient ? `आदरणीय ${recipient},` : 'आदरणीय महोदय / महोदया,',
        message: () =>
          'आपणास व आपल्या परिवारास गणेशोत्सवाच्या मंगलमयी हार्दिक शुभेच्छा! विघ्नहर्ता भगवान श्री गणेशाच्या आशीर्वादाने आपल्या कार्यक्षेत्रात उत्तरोत्तर प्रगती, यश आणि समृद्धी लाभो हीच सदिच्छा.',
        tagline: '🌺 गणपती बाप्पा मोरया! 🌺',
        signature: (sender) => `— सस्नेह जय गणेश, ${sender || ''}`,
      },
      {
        shloka: '॥ ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि ॥',
        title: 'गणेश चतुर्थीच्या मनःपूर्वक शुभेच्छा',
        salutation: (recipient) => recipient ? `सस्नेह नमस्कार ${recipient},` : 'सस्नेह नमस्कार,',
        message: () =>
          'गणेशोत्सवाच्या या शुभदिनी श्री गणेशाच्या कृपेने आपल्या आयुष्यात नवीन संधी, सुयश आणि प्रगतीची नवी शिखरे प्राप्त होवोत हीच मनःपूर्वक सदिच्छा.',
        tagline: '🌺 विघ्नहर्त्याचे शुभाशीर्वाद सदैव सोबत राहोत! 🌺',
        signature: (sender) => `— सस्नेह, ${sender || 'शुभेच्छुक'}`,
      },
      {
        shloka: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
        title: 'मंगलमयी गणेशोत्सवाच्या शुभेच्छा',
        salutation: (recipient) => recipient ? `आदरणीय ${recipient} जी,` : 'आदरणीय स्नेहीजन,',
        message: () =>
          'भगवान श्री गणेशाची कृपा आपल्या कार्यसंस्थेवर व कुटुंबीयांवर अविरत राहो. उत्तम आरोग्य, शांती आणि आर्थिक स्थैर्य लाभो.',
        tagline: '🌺 श्री गणेशाय नमः 🌺',
        signature: (sender) => `— सादर प्रणाम, ${sender || ''}`,
      },
    ],
    blessings: [
      {
        shloka: '॥ ॐ एकदंताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्तिः प्रचोदयात् ॥',
        title: '🙏 बाप्पाचे शुभाशीर्वाद',
        salutation: (recipient) => recipient ? `बाप्पाचे कृपाशीर्वाद ${recipient} साठी ❤️` : 'बाप्पाचे शुभाशीर्वाद ❤️',
        message: (recipient) =>
          `विघ्नहर्त्या बाप्पाची कृपादृष्टी ${recipient ? `${recipient} वर` : 'तुमच्यावर'} सदैव राहो. बाप्पा तुम्हाला उदंड आयुष्य, उत्तम निरोगी स्वास्थ्य, निरामय आनंद आणि चिरंतन शांती देवो!`,
        tagline: '🌺 गणपती बाप्पा मोरया! 🌺',
        signature: (sender) => `— चरणी लीन, ${sender || 'आपला/आपली'}`,
      },
      {
        shloka: '॥ वक्रतुण्ड महाकाय कोटिसूर्यसमप्रभ ॥',
        title: '🙏 विघ्नहर्त्याचे पावन आशीर्वाद',
        salutation: (recipient) => recipient ? `प्रिय ${recipient}स बाप्पाचे आशीर्वाद,` : 'बाप्पाचे दिव्य शुभाशीर्वाद,',
        message: (recipient) =>
          `श्री गणरायाची दिव्य कृपा ${recipient ? `तुझ्यावर` : 'आपणावर'} सतत राहो. प्रत्येक पावलावर संरक्षण, आत्मिक बळ आणि आनंदाची अखंड बरसात होवो हीच बाप्पाच्या चरणी प्रार्थना!`,
        tagline: '🌺 मोरया मोरया, मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— बाप्पा चरणी प्रार्थना सह, ${sender || ''}`,
      },
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🙏 श्री गणेश कृपाशीर्वाद',
        salutation: (recipient) => recipient ? `सप्रेम आशीर्वाद ${recipient} साठी,` : 'दिव्य शुभाशीर्वाद,',
        message: (recipient) =>
          `बाप्पाच्या आगमनाने तुमच्या जीवनातील सर्व चिंता दूर होवोत. रिद्धी-सिद्धीच्या आशीर्वादाने तुमचे घर आनंद व समाधानाने सदैव भरलेले राहो.`,
        tagline: '🌺 गणपती बाप्पा मोरया! 🌺',
        signature: (sender) => `— अंतःकरणातून प्रेम, ${sender || ''}`,
      },
    ],
    society_business: [
      {
        shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        title: '🌺 गणेशोत्सवाच्या मंगलमयी हार्दिक शुभेच्छा 🌺',
        salutation: () => 'सर्व सन्माननीय सभासद, रहिवासी व स्नेही परिवारास,',
        message: () =>
          'गणेशोत्सवाच्या या पावन पर्वावर आमच्या सोसायटीतील सर्व सन्माननीय सभासद, रहिवासी व त्यांच्या कुटुंबीयांना सुख, शांती, समृद्धी, भरभराट आणि उत्तम आरोग्य लाभो हीच विघ्नहर्ता बाप्पाच्या चरणी नम्र प्रार्थना!',
        tagline: '🌺 गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— ${sender ? `${sender} कार्यकारिणी व सर्व सभासद` : 'अध्यक्ष, सचिव व सर्व कार्यकारिणी सदस्य'}`,
      },
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🌺 श्री गणेश चतुर्थीच्या मनःपूर्वक शुभेच्छा 🌺',
        salutation: () => 'आमच्या सर्व आदरणीय रहिवासी, ग्राहक व हितचिंतकांस,',
        message: () =>
          'बाप्पाच्या आगमनाने आपल्या परिसरात व कार्यक्षेत्रात अखंड एकता, सौहार्द, सुरक्षितता आणि प्रगती नांदो. सर्व संकटे दूर होऊन प्रत्येक घरात समृद्धी व समाधान बहरू दे!',
        tagline: '🌺 एकदन्ताय वक्रतुण्डाय गौरीतनयाय धीमहि 🌺',
        signature: (sender) => `— ${sender ? `${sender} व्यवस्थापन समिती` : 'व्यवस्थापकीय समिती व सर्व रहिवासी'}`,
      },
      {
        shloka: '॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥',
        title: '🌺 गणेशोत्सव पावन पर्व शुभेच्छा 🌺',
        salutation: () => 'सस्नेह जय गणेश,',
        message: () =>
          'विघ्नहर्ता बाप्पा आपल्या सर्वांच्या जीवनातील विघ्ने दूर करून भरभराटीचे व आनंदाचे नवे मार्ग खुले करो. गणेश चतुर्थीच्या मनःपूर्वक शुभेच्छा!',
        tagline: '🌺 मोरया मोरया, मंगलमूर्ती मोरया! 🌺',
        signature: (sender) => `— ${sender || 'समस्त कार्यकारिणी'}`,
      },
    ],
  },

  hindi: {
    family: [
      {
        shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        title: '🌺 गणेश चतुर्थी की हार्दिक शुभकामनाएं 🌺',
        salutation: (recipient) => recipient ? `प्रिय ${recipient},` : 'सादर प्रणाम,',
        message: () =>
          'गणेश चतुर्थी के इस पावन पर्व पर, भगवान श्री गणेश आपके और आपके पूरे परिवार के जीवन में सुख, शांति, समृद्धि, उत्तम स्वास्थ्य और सफलता का वरदान दें।',
        tagline: '🌺 ॐ गं गणपतये नमः । जय श्री गणेश 🌺',
        signature: (sender) => `— ${sender ? (sender.toLowerCase().includes('परिवार') || sender.toLowerCase().includes('family') ? sender : `${sender} एवं परिवार`) : 'सस्नेह, आपका शुभचिंतक'}`,
      },
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🙏 पावन गणेशोत्सव की हार्दिक बधाई 🙏',
        salutation: (recipient) => recipient ? `आत्मीय ${recipient},` : 'सप्रेम नमस्कार,',
        message: () =>
          'मोदक की मिठास और भगवान गजानन की असीम कृपा, आपके घर-आंगन में खुशियां और संपन्नता लाए अपार! गणेशोत्सव की हार्दिक शुभकामनाएं।',
        tagline: '🌺 विघ्नहर्ता भगवान श्री गणेश की जय 🌺',
        signature: (sender) => `— ${sender ? `${sender} व परिवार` : 'सप्रेम शुभकामनाओं सहित'}`,
      },
      {
        shloka: '॥ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्तिः प्रचोदयात् ॥',
        title: '🙏 शुभ गणेश चतुर्थी 🙏',
        salutation: (recipient) => recipient ? `स्नेही ${recipient},` : 'सपरिवार को सादर प्रणाम,',
        message: () =>
          'भगवान गजानन आपके परिवार पर अपनी असीम कृपा बरसाएं, जीवन के हर संकट को हरें और घर को खुशहाली व सौभाग्य से भर दें।',
        tagline: '🌺 रिद्धि-सिद्धि के दाता श्री गणेश जी की जय 🌺',
        signature: (sender) => `— सस्नेह, ${sender ? `${sender} व परिवार` : 'आपकी ओर से'}`,
      },
      {
        shloka: '॥ श्री गणेशाय नमः ॥',
        title: '🙏 जय श्री गणेश 🙏',
        salutation: (recipient) => recipient ? `प्रिय ${recipient} जी,` : 'प्रिय स्वजन,',
        message: () =>
          'रिद्धि-सिद्धि के दाता भगवान गणेश आपके जीवन में सुख-शांति, समृद्धि और ऐश्वर्य का स्थायी वास स्थापित करें। आपको सपरिवार गणेशोत्सव की बधाई!',
        tagline: '🌺 भगवान श्री गणेश के शुभाशीर्वाद सदैव साथ रहें 🌺',
        signature: (sender) => `— शुभकामनाओं सहित, ${sender || 'सपरिवार'}`,
      },
    ],
    friends: [
      {
        shloka: '॥ रिद्धि-सिद्धि दाता श्री गणेश ॥',
        title: '🎉 गणेश चतुर्थी की बहुत-बहुत बधाई! 🎉',
        salutation: (recipient) => recipient ? `डियर ${recipient},` : 'मेरे प्यारे दोस्त,',
        message: () =>
          'भगवान श्री गणेश तुम्हारे जीवन के सभी कष्टों और विघ्नों को हर लें, और तुम्हारी हर मनोकामना को पूरा करें। गणेश चतुर्थी की ढेर सारी शुभकामनाएं!',
        tagline: '🌺 जय श्री गणेश! खुश रहो और तरक्की करो 🌺',
        signature: (sender) => `— तुम्हारा दोस्त, ${sender || ''}`,
      },
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🙏 गणेशोत्सव की हार्दिक शुभकामनाएं! 🙏',
        salutation: (recipient) => recipient ? `मेरे प्यारे दोस्त ${recipient},` : 'मेरे प्यारे दोस्त,',
        message: () =>
          'गणेश जी का आगमन तुम्हारे जीवन में नई ऊर्जा, नई उमंग और कामयाबी के नए अवसर लेकर आए। गणेश उत्सव की बहुत-बहुत बधाई!',
        tagline: '🌺 ॐ गं गणपतये नमः 🌺',
        signature: (sender) => `— दिल से तुम्हारा दोस्त, ${sender || ''}`,
      },
      {
        shloka: '॥ विघ्नविनाशक मंगलकर्ता श्री गणेश ॥',
        title: '🙏 पावन गणेश चतुर्थी की बधाई! 🙏',
        salutation: (recipient) => recipient ? `हे ${recipient},` : 'दोस्त,',
        message: () =>
          'ढोल-नगाड़ों की थाप और गणपति जी के जयकारे! भगवान गणेश तुम्हारी हर राह आसान करें और तुम्हें वो हर खुशी दें जिसके तुम हकदार हो।',
        tagline: '🌺 विघ्नहर्ता भगवान गणेश की कृपा तुम पर बनी रहे 🌺',
        signature: (sender) => `— ${sender || 'तुम्हारा दोस्त'}`,
      },
      {
        shloka: '॥ श्री सिद्धिविनायक नमो नमः ॥',
        title: '🙏 जय गणपति देवा! 🙏',
        salutation: (recipient) => recipient ? `अरे ${recipient},` : 'मेरे प्यारे यार,',
        message: () =>
          'मोदक खाओ, खुशियां मनाओ और बप्पा के जयकारे लगाओ! गणेश उत्सव का यह पावन पर्व तुम्हारे लिए ढेर सारी खुशियां और सफलता लाए।',
        tagline: '🌺 सिद्धिविनायक भगवान की जय 🌺',
        signature: (sender) => `— हमेशा तुम्हारा, ${sender || ''}`,
      },
    ],
    formal: [
      {
        shloka: '॥ श्री गणेशाय नमः ॥',
        title: 'गणेश चतुर्थी की हार्दिक शुभकामनाएं',
        salutation: (recipient) => recipient ? `आदरणीय ${recipient},` : 'आदरणीय महोदय / महोदया,',
        message: () =>
          'आपको एवं आपके परिवार को पावन गणेशोत्सव की हार्दिक शुभकामनाएं। विघ्नहर्ता भगवान श्री गणेश की असीम अनुकंपा से आपके जीवन व कार्यक्षेत्र में निरंतर प्रगति, सौभाग्य और समृद्धि आए।',
        tagline: '🌺 ॐ श्री गणेशाय नमः 🌺',
        signature: (sender) => `— सादर, ${sender || ''}`,
      },
      {
        shloka: '॥ ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि ॥',
        title: 'गणेशोत्सव के पावन पर्व पर हार्दिक बधाई',
        salutation: (recipient) => recipient ? `आदरणीय ${recipient} जी,` : 'आदरणीय सहयोगीजन,',
        message: () =>
          'भगवान श्री गणेश आपके सभी उपक्रमों को सफल बनाएं और आपके जीवन में सुख, शांति, समृद्धि व उत्तम स्वास्थ्य का वरदान दें।',
        tagline: '🌺 विघ्नहर्ता भगवान श्री गणेश की जय 🌺',
        signature: (sender) => `— ससम्मान, ${sender || ''}`,
      },
      {
        shloka: '॥ सिद्धिबुद्धिप्रदे देवि सर्वकामप्रदायिनि ॥',
        title: 'शुभ गणेश चतुर्थी',
        salutation: (recipient) => recipient ? `प्रिय ${recipient},` : 'सस्नेह नमस्कार,',
        message: () =>
          'इस पावन अवसर पर कामना है कि विघ्नहर्ता श्री गणेश आपके समस्त अवरोधों को दूर कर आपके कार्यों में सफलता और दीर्घकालिक प्रतिष्ठा प्रदान करें।',
        tagline: '🌺 रिद्धि-सिद्धि प्रदाता श्री गणेशाय नमः 🌺',
        signature: (sender) => `— सादर प्रणाम, ${sender || ''}`,
      },
    ],
    blessings: [
      {
        shloka: '॥ ॐ गं गणपतये नमः ॥',
        title: '🙏 भगवान श्री गणेश का शुभाशीर्वाद 🙏',
        salutation: (recipient) => recipient ? `भगवान गणेश का शुभाशीर्वाद ${recipient} के लिए ❤️` : 'श्री गणेश जी का मंगलमय आशीर्वाद ❤️',
        message: (recipient) =>
          `भगवान श्री गणेश जी की कृपा ${recipient ? `${recipient} पर` : 'आप पर'} सदैव बनी रहे। आपको दीर्घायु, उत्तम स्वास्थ्य, असीम सुख, शांति और समृद्धि प्राप्त हो। शुभ गणेश चतुर्थी!`,
        tagline: '🌺 ॐ गं गणपतये नमः 🌺',
        signature: (sender) => `— स्नेह एवं आदर सहित, ${sender || ''}`,
      },
      {
        shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ ॥',
        title: '🙏 श्री गणेश कृपाशीर्वाद 🙏',
        salutation: (recipient) => recipient ? `स्नेहमयी ${recipient} के लिए आशीर्वाद,` : 'शुभ आशीर्वाद,',
        message: (recipient) =>
          `विघ्नविनाशक भगवान गणेश की असीम कृपा ${recipient ? `तुम पर` : 'आप पर'} हमेशा बनी रहे। आपका जीवन सकारात्मक ऊर्जा, सफलता और शांति से परिपूर्ण रहे।`,
        tagline: '🌺 विघ्नहर्ता भगवान गणेश की कृपा सदैव साथ रहे 🌺',
        signature: (sender) => `— गणेश जी के चरणों में प्रार्थना सहित, ${sender || ''}`,
      },
      {
        shloka: '॥ रिद्धि सिद्धि दाता भगवान गणेश ॥',
        title: '🙏 श्री गणेश जी का दिव्य आशीर्वाद 🙏',
        salutation: (recipient) => recipient ? `प्रिय ${recipient},` : 'सप्रेम आशीष,',
        message: (recipient) =>
          `भगवान गजानन आपके हर दुख-दर्द को हरें और आपके जीवन में खुशियों, संतोष और उत्तम स्वास्थ्य का वरदान दें। शुभ गणेशोत्सव!`,
        tagline: '🌺 रिद्धि-सिद्धि दाता भगवान गणेश की जय 🌺',
        signature: (sender) => `— हार्दिक स्नेह के साथ, ${sender || ''}`,
      },
    ],
    society_business: [
      {
        shloka: '॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
        title: '🌺 गणेश चतुर्थी की हार्दिक शुभकामनाएं 🌺',
        salutation: () => 'समस्त सम्मानित सदस्यों, परिवारों एवं निवासियों को सादर,',
        message: () =>
          'गणेश उत्सव के इस पावन पर्व पर हमारी संस्था/सोसायटी के सभी सदस्यों, निवासियों एवं सहयोगियों को सुख, शांति, समृद्धि और अच्छे स्वास्थ्य की हार्दिक बधाई। विघ्नहर्ता भगवान श्री गणेश सभी के कष्ट दूर करें!',
        tagline: '🌺 ॐ गं गणपतये नमः । जय श्री गणेश 🌺',
        signature: (sender) => `— ${sender ? `${sender} प्रबंध समिति` : 'अध्यक्ष, सचिव एवं समस्त प्रबंध समिति'}`,
      },
      {
        shloka: '॥ ॐ श्री गणेशाय नमः ॥',
        title: '🌺 पावन गणेशोत्सव की मंगलकामनाएं 🌺',
        salutation: () => 'आदरणीय सदस्यगण एवं स्नेहीजन,',
        message: () =>
          'भगवान श्री गणेश के पावन चरणों में प्रार्थना है कि हमारा समाज और परिसर सदैव आपसी सद्भाव, एकता, सुरक्षा और खुशहाली से महकता रहे।',
        tagline: '🌺 विघ्नहर्ता के शुभाशीर्वाद सदैव साथ रहें 🌺',
        signature: (sender) => `— ${sender ? `${sender} कार्यकारिणी` : 'कार्यकारिणी समिति एवं समस्त सदस्य'}`,
      },
    ],
  },

  english: {
    family: [
      {
        shloka: '॥ Vakratunda Mahakaya Suryakoti Samaprabha ॥',
        title: '🙏 Ganpati Bappa Morya!',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'Dear Loved Ones,',
        message: () =>
          'May Lord Ganesha bless you and your family with boundless happiness, peace, prosperity, good health, and glorious success on this auspicious Ganesh Utsav.',
        tagline: '🌺 Ganpati Bappa Morya! Mangal Murti Morya! 🌺',
        signature: (sender) => `— ${sender ? (sender.toLowerCase().includes('family') ? sender : `From ${sender} & Family`) : 'With Warm Wishes'}`,
      },
      {
        shloka: '॥ Om Gan Ganapataye Namaha ॥',
        title: '🙏 Blessed Ganesh Chaturthi!',
        salutation: (recipient) => recipient ? `Dearest ${recipient},` : 'Warm Greetings,',
        message: () =>
          'May the sweet aroma of modaks and the divine blessings of Vighnaharta fill your home with laughter, abundance, and endless joy.',
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— Best regards, ${sender || 'Warm Wishes'}`,
      },
      {
        shloka: '॥ Sukhakarta Dukhaharta Varta Vighnachi ॥',
        title: '🙏 Divine Ganesh Utsav Greetings!',
        salutation: (recipient) => recipient ? `Beloved ${recipient} & Family,` : 'To Our Beloved Family,',
        message: () =>
          'May Lord Ganesha remove all obstacles from your path and illuminate your journey with good fortune, good health, and boundless joy.',
        tagline: '🌺 Mangal Murti Morya! 🌺',
        signature: (sender) => `— With love and respect, ${sender || ''}`,
      },
      {
        shloka: '॥ Shree Ganeshaya Namah ॥',
        title: '🙏 Joyous Ganesh Chaturthi!',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'Dear Family,',
        message: () =>
          'As we welcome Lord Ganesha into our homes and hearts, may His divine presence bestow peace, unity, and radiant happiness upon your household.',
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— Warmest wishes, ${sender || ''}`,
      },
    ],
    friends: [
      {
        shloka: '॥ Mangal Murti Morya ॥',
        title: '🙏 Happy Ganesh Chaturthi!',
        salutation: (recipient) => recipient ? `Hey ${recipient},` : 'Hey Friend,',
        message: () =>
          'May the divine presence of Lord Ganesha illuminate your path, remove all hurdles, and lead you to your biggest dreams and grandest victories!',
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— Your friend, ${sender || ''}`,
      },
      {
        shloka: '॥ Om Gan Ganapataye Namaha ॥',
        title: '🙏 Wishing You a Rocking Ganesh Utsav!',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'My dear friend,',
        message: () =>
          'Here is wishing you days filled with the beats of dhol-tasha, delicious sweets, and the unconditional blessings of Lord Ganesha in all your adventures!',
        tagline: '🌺 Bappa Morya! 🌺',
        signature: (sender) => `— Cheers, ${sender || 'Your buddy'}`,
      },
      {
        shloka: '॥ Vighnaharta Shree Ganesha ॥',
        title: '🙏 Happy Ganesh Utsav!',
        salutation: (recipient) => recipient ? `Hey ${recipient}! 👋` : 'Hey buddy! 👋',
        message: () =>
          'May Bappa clear away every doubt, smash every barrier, and unlock amazing new opportunities for you this festive season. Have a fantastic celebration!',
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— Always with you, ${sender || ''}`,
      },
      {
        shloka: '॥ Shree Siddhivinayak Namo Namah ॥',
        title: '🙏 Warm Festive Greetings!',
        salutation: (recipient) => recipient ? `Dearest ${recipient},` : 'Dear friend,',
        message: () =>
          'Sending you tons of love, warm modaks, and festive cheer! May our bond of friendship grow stronger with every passing year under Bappa’s grace.',
        tagline: '🌺 Mangal Murti Morya! 🌺',
        signature: (sender) => `— Your friend, ${sender || ''}`,
      },
    ],
    formal: [
      {
        shloka: '॥ Shree Ganeshaya Namah ॥',
        title: 'Warm Ganesh Chaturthi Greetings',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'Dear Valued Associate,',
        message: () =>
          'Wishing you and your family a joyous and blessed Ganesh Chaturthi. May Lord Vighnaharta remove all obstacles from your journey and bestow continued success, goodwill, and prosperity.',
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— Sincerely, ${sender || ''}`,
      },
      {
        shloka: '॥ Om Ekadantaya Vidmahe Vakratundaya Dhimahi ॥',
        title: 'Auspicious Ganesh Utsav Wishes',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'Respected Colleague / Partner,',
        message: () =>
          'May the divine blessings of Lord Ganesha bring wisdom, innovation, and enduring prosperity to all your professional endeavors and personal aspirations.',
        tagline: '🌺 Wishing you peace and success 🌺',
        signature: (sender) => `— Warm regards, ${sender || ''}`,
      },
      {
        shloka: '॥ Sarva Mangala Mangalye ॥',
        title: 'Cordial Greetings on Ganesh Chaturthi',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'Dear Sir / Madam,',
        message: () =>
          'On this sacred occasion of Ganesh Chaturthi, we wish you sustained triumph, good health, and immense fulfilment in the year ahead.',
        tagline: '🌺 Shree Ganeshaya Namah 🌺',
        signature: (sender) => `— With highest regards, ${sender || ''}`,
      },
    ],
    blessings: [
      {
        shloka: '॥ Om Gan Ganapataye Namaha ॥',
        title: '🙏 Divine Blessings of Bappa',
        salutation: (recipient) => recipient ? `Bappa’s Blessings for ${recipient} ❤️` : 'Bappa’s Divine Blessings ❤️',
        message: (recipient) =>
          `May Lord Ganesha shower His divine grace, supreme health, long life, and abundant joy upon ${recipient || 'you'} today and forever.`,
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— With love and reverence, ${sender || ''}`,
      },
      {
        shloka: '॥ Vakratunda Mahakaya Suryakoti Samaprabha ॥',
        title: '🙏 Sacred Blessings of Lord Ganesha',
        salutation: (recipient) => recipient ? `Dear ${recipient},` : 'Beloved child of God,',
        message: (recipient) =>
          `May the benevolence of Vighnaharta keep ${recipient || 'you'} safe from all harm and pave your life with peace, serenity, and unconditional joy.`,
        tagline: '🌺 Mangal Murti Morya! 🌺',
        signature: (sender) => `— Prayers at Bappa’s holy feet, ${sender || ''}`,
      },
      {
        shloka: '॥ Riddhi Siddhi Buddhi Pradata ॥',
        title: '🙏 Grace and Blessings of Bappa',
        salutation: (recipient) => recipient ? `Heartfelt Blessings for ${recipient},` : 'Heartfelt Blessings,',
        message: (recipient) =>
          `May Lord Ganesha grant ${recipient || 'you'} the strength of wisdom, peace of heart, and a life filled with loving relationships and divine guidance.`,
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— Always with love, ${sender || ''}`,
      },
    ],
    society_business: [
      {
        shloka: '॥ Vakratunda Mahakaya Suryakoti Samaprabha ॥',
        title: '🌺 Happy Ganesh Chaturthi 🌺',
        salutation: () => 'To all esteemed members, residents & well-wishers,',
        message: () =>
          'On this auspicious occasion of Ganesh Chaturthi, the Managing Committee extends warmest greetings to all members, residents, and their families. May Lord Ganesha bestow good health, peace, unity, and endless prosperity upon every home!',
        tagline: '🌺 Ganpati Bappa Morya! Mangal Murti Morya! 🌺',
        signature: (sender) => `— ${sender ? `${sender} Managing Committee` : 'Chairman, Secretary & Managing Committee'}`,
      },
      {
        shloka: '॥ Om Gam Ganapataye Namaha ॥',
        title: '🌺 Auspicious Ganesh Utsav Wishes 🌺',
        salutation: () => 'Dear Residents, Members & Associates,',
        message: () =>
          'May the divine blessings of Lord Ganesha bring harmony, continuous progress, health, and happiness to our entire community. Wishing everyone a blessed and safe festive season!',
        tagline: '🌺 Ganpati Bappa Morya! 🌺',
        signature: (sender) => `— ${sender ? `Board & Management, ${sender}` : 'Board of Directors & Management'}`,
      },
    ],
  },
};

export interface GenerateGreetingParams {
  senderName: string;
  recipientName?: string;
  language: Language;
  greetingType: GreetingType;
  theme?: CardTheme;
  artworkType?: ArtworkType;
  customArtworkUrl?: string;
  variationIndex?: number;

  // Society / Business parameters
  organizationType?: OrganizationType;
  societyName?: string;
  societyLogoUrl?: string;
  societyLogoPreset?: string;
  chairmanMessage?: string;
  committeeRole?: string;
  contactDetails?: string;
  addressOrLocation?: string;
  customTitle?: string;
}

export function generateGreetingCard(params: GenerateGreetingParams): GreetingCardData {
  const {
    senderName,
    recipientName = '',
    language,
    greetingType,
    theme = 'saffron-gold',
    artworkType = 'gold',
    customArtworkUrl,
    variationIndex = 0,
    organizationType = 'society',
    societyName = '',
    societyLogoUrl,
    societyLogoPreset = 'society_crest',
    chairmanMessage = '',
    committeeRole = '',
    contactDetails = '',
    addressOrLocation = '',
    customTitle: paramCustomTitle,
  } = params;

  const options =
    (GREETINGS_DB[language] && GREETINGS_DB[language][greetingType]) ||
    (GREETINGS_DB[language] && GREETINGS_DB[language].family) ||
    GREETINGS_DB.hindi.family;
  const selectedOption = options[variationIndex % options.length];

  const trimmedSender = senderName.trim();
  const trimmedRecipient = recipientName.trim();
  const trimmedSociety = societyName.trim();

  let finalTitle = paramCustomTitle?.trim() || selectedOption.title;
  let customSalutation = selectedOption.salutation(trimmedRecipient, language);
  let finalMessage = selectedOption.message(trimmedRecipient, trimmedSender);
  let finalSignature = selectedOption.signature(trimmedSender, language);

  if (greetingType === 'blessings') {
    if (language === 'marathi') {
      finalTitle = trimmedRecipient ? `बाप्पाचे शुभाशीर्वाद ${trimmedRecipient} साठी ❤️` : '🙏 बाप्पाचे शुभाशीर्वाद ❤️';
      customSalutation = trimmedRecipient ? `प्रिय ${trimmedRecipient},` : '';
    } else if (language === 'hindi') {
      finalTitle = trimmedRecipient ? `भगवान श्री गणेश का शुभाशीर्वाद ${trimmedRecipient} के लिए ❤️` : '🙏 श्री गणेश कृपाशीर्वाद ❤️';
      customSalutation = trimmedRecipient ? `प्रिय ${trimmedRecipient},` : '';
    } else {
      finalTitle = trimmedRecipient ? `Bappa’s Blessings for ${trimmedRecipient} ❤️` : '🙏 Bappa’s Divine Blessings ❤️';
      customSalutation = trimmedRecipient ? `Dearest ${trimmedRecipient},` : '';
    }
  } else if (greetingType === 'society_business') {
    if (trimmedSociety) {
      if (!paramCustomTitle) {
        if (language === 'marathi') {
          finalTitle = `🌺 ${trimmedSociety} तर्फे गणेशोत्सवाच्या हार्दिक शुभेच्छा 🌺`;
        } else if (language === 'hindi') {
          finalTitle = `🌺 ${trimmedSociety} की ओर से गणेश चतुर्थी की हार्दिक शुभकामनाएं 🌺`;
        } else {
          finalTitle = `🌺 ${trimmedSociety} wishes you a Happy Ganesh Chaturthi 🌺`;
        }
      }
    }

    if (chairmanMessage.trim()) {
      finalMessage = chairmanMessage.trim();
    }

    if (committeeRole.trim()) {
      finalSignature = `— ${committeeRole.trim()}${trimmedSociety ? `, ${trimmedSociety}` : ''}`;
    } else if (trimmedSociety) {
      finalSignature = `— ${language === 'marathi' ? 'व्यवस्थापकीय समिती व सर्व रहिवासी' : language === 'hindi' ? 'प्रबंध समिति एवं समस्त सदस्य' : 'Managing Committee & Residents'}, ${trimmedSociety}`;
    }
  }

  const isSociety = greetingType === 'society_business';

  return {
    id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    senderName: isSociety ? (trimmedSender || trimmedSociety || 'Society') : (trimmedSender || 'Morya Devotee'),
    recipientName: isSociety ? '' : trimmedRecipient,
    language,
    greetingType,
    title: finalTitle,
    shloka: selectedOption.shloka,
    recipientSalutation: isSociety ? undefined : customSalutation,
    message: finalMessage,
    tagline: selectedOption.tagline,
    signature: finalSignature,
    artworkType,
    customArtworkUrl,
    theme,
    variationIndex,
    createdAt: Date.now(),
    organizationType: isSociety ? organizationType : undefined,
    societyName: isSociety ? trimmedSociety : undefined,
    societyLogoUrl: isSociety ? societyLogoUrl : undefined,
    societyLogoPreset: isSociety ? societyLogoPreset : undefined,
    chairmanMessage: isSociety && chairmanMessage.trim() ? chairmanMessage.trim() : undefined,
    committeeRole: isSociety && committeeRole.trim() ? committeeRole.trim() : undefined,
    contactDetails: isSociety && contactDetails.trim() ? contactDetails.trim() : undefined,
    addressOrLocation: isSociety && addressOrLocation.trim() ? addressOrLocation.trim() : undefined,
  };
}

export function getVariationCount(language: Language, greetingType: GreetingType): number {
  const options = GREETINGS_DB[language]?.[greetingType];
  return options ? options.length : 1;
}

export const BLESSINGS_PRESETS_BY_LANG: Record<Language, { label: string; name: string }[]> = {
  hindi: [
    { label: 'दादी जी (Dadi)', name: 'दादी जी' },
    { label: 'दादा जी (Dada)', name: 'दादा जी' },
    { label: 'माँ (Maa)', name: 'माँ' },
    { label: 'पिताजी (Papa)', name: 'पिताजी' },
    { label: 'दीदी (Didi)', name: 'दीदी' },
    { label: 'भैया (Bhaiya)', name: 'भैया' },
    { label: 'चाचा जी (Chacha)', name: 'चाचा जी' },
    { label: 'प्रिय मित्र (Friend)', name: 'प्रिय मित्र' },
  ],
  marathi: [
    { label: 'आजी (Aaji)', name: 'आजी' },
    { label: 'आजोबा (आजोबा)', name: 'आजोबा' },
    { label: 'आई (Aai)', name: 'आई' },
    { label: 'बाबा (Baba)', name: 'बाबा' },
    { label: 'ताई (Tai)', name: 'ताई' },
    { label: 'दादा (Dada)', name: 'दादा' },
    { label: 'काका (Kaka)', name: 'काका' },
    { label: 'प्रिय मित्र (Friend)', name: 'मित्र' },
  ],
  english: [
    { label: 'Grandmother', name: 'Grandmother' },
    { label: 'Grandfather', name: 'Grandfather' },
    { label: 'Mother', name: 'Mother' },
    { label: 'Father', name: 'Father' },
    { label: 'Sister', name: 'Sister' },
    { label: 'Brother', name: 'Brother' },
    { label: 'Uncle / Aunt', name: 'Uncle' },
    { label: 'Best Friend', name: 'Best Friend' },
  ],
};

export const BLESSINGS_PRESETS = BLESSINGS_PRESETS_BY_LANG.marathi;

export const SOCIETY_EXAMPLES = [
  {
    label: 'Shree Raj Ratandeep Society (Example)',
    societyName: 'Shree Raj Ratandeep Society',
    organizationType: 'society' as const,
    language: 'english' as const,
    theme: 'saffron-gold' as const,
    artworkType: 'gold' as const,
    societyLogoPreset: 'society_crest',
    customTitle: '🌺 Shree Raj Ratandeep Society wishes you a Happy Ganesh Chaturthi 🌺',
    committeeRole: 'Chairman & Managing Committee',
    chairmanMessage:
      'On this sacred occasion of Ganesh Chaturthi, the Managing Committee extends warmest greetings to all esteemed members, residents, and families. May Lord Ganesha bestow good health, peace, safety, and boundless prosperity upon every home. Ganpati Bappa Morya!',
    contactDetails: 'Reg. No: BOM/HSG/4521/2012 | Office: +91 98200 12345 | rajratandeep.chs@gmail.com',
    addressOrLocation: 'M.G. Road, Kandivali (W), Mumbai - 400067',
  },
  {
    label: 'Gokuldham Co-op. Housing Society (मराठी)',
    societyName: 'गोकुळधाम को-ऑप. हौसिंग सोसायटी लि.',
    organizationType: 'society' as const,
    language: 'marathi' as const,
    theme: 'royal-ruby' as const,
    artworkType: 'pandal' as const,
    societyLogoPreset: 'society_crest',
    customTitle: '🌺 गोकुळधाम सोसायटी तर्फे गणेशोत्सवाच्या मंगलमयी शुभेच्छा 🌺',
    committeeRole: 'अध्यक्ष, सचिव व सर्व कार्यकारिणी सदस्य',
    chairmanMessage:
      'गणेशोत्सवाच्या या पावन पर्वावर आमच्या सोसायटीतील सर्व सन्माननीय सभासद, रहिवासी व त्यांच्या कुटुंबीयांना सुख, समृद्धी, उत्तम आरोग्य आणि भरभराट लाभो हीच विघ्नहर्ता बाप्पाच्या चरणी प्रार्थना!',
    contactDetails: 'फोन: ०२२-२८८७१२३४ | मो: ९८२११ २३४५६',
    addressOrLocation: 'गोकुळधाम संकुल, गोरेगाव (पूर्व), मुंबई - ४०००६३',
  },
  {
    label: 'Apex Technologies & Business Firm (हिंदी/English)',
    societyName: 'Apex Innovations & Technologies Pvt. Ltd.',
    organizationType: 'business' as const,
    language: 'english' as const,
    theme: 'regal-emerald' as const,
    artworkType: 'blessing' as const,
    societyLogoPreset: 'business_shield',
    customTitle: '🌺 Apex Technologies wishes you a Happy Ganesh Chaturthi 🌺',
    committeeRole: 'Board of Directors & Leadership Team',
    chairmanMessage:
      'Wishing all our esteemed clients, partners, associates, and team members a very auspicious and joyous Ganesh Chaturthi. May Vighnaharta illuminate your endeavors with great wisdom, stability, and enduring prosperity!',
    contactDetails: 'contact@apexinnovations.in | +91 22 4567 8900 | www.apexinnovations.in',
    addressOrLocation: 'BKC Business Center, Bandra East, Mumbai - 400051',
  },
];
