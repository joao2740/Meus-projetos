/**
 * FisioAtleta – AI Chat Engine
 * Assistente virtual inteligente com base de conhecimento de fisioterapia esportiva
 */

const FISIO_AI = (() => {

  // ── Base de conhecimento ──────────────────────────────────────
  const KB = {
    saudacoes: {
      patterns: [/\b(oi|olá|ola|hey|bom dia|boa tarde|boa noite|e aí|eai|tudo bem|tudo bom|ola)\b/i],
      responses: [
        "Olá! 👋 Sou a **FisioIA**, assistente virtual da FisioAtleta! Estou aqui para ajudar atletas amadores como você com dúvidas sobre **fisioterapia, lesões, agendamentos** e muito mais. Como posso te ajudar hoje?",
        "Oi, atleta! 🏃 Seja bem-vindo à FisioAtleta! Sou sua assistente de fisioterapia esportiva. Pode me perguntar sobre lesões, serviços, agendamentos ou qualquer dúvida sobre sua saúde esportiva!",
      ]
    },
    agendamento: {
      patterns: [/\b(agenda|agendar|marcar|consulta|avaliação|avaliacao|horário|horario|disponibilidade|atendimento|appointment|consultar)\b/i],
      responses: [
        "📅 **Agendar sua avaliação é super fácil!**\n\nVocê tem 3 opções:\n\n1️⃣ **Formulário online** – Role a página até a seção \"Agendar\" e preencha seus dados\n2️⃣ **WhatsApp** – Fale diretamente com nossa equipe: (11) 99999-0000\n3️⃣ **Aqui pelo chat** – Me diga seu nome e telefone que entro em contato!\n\n🎁 **A primeira avaliação é gratuita!** Você quer que eu abra o formulário?",
      ]
    },
    preco: {
      patterns: [/\b(preço|preco|custo|valor|quanto|custa|caro|barato|plano|convênio|convenio|pagamento|pagar|gratuito|gratis|grátis)\b/i],
      responses: [
        "💰 **Sobre nossos preços e planos:**\n\n✅ **Avaliação inicial: GRATUITA** (60 minutos)\n📋 Sessão individual de fisioterapia: a partir de R$ 120\n📦 Pacote 10 sessões com desconto especial\n💳 Aceitamos: Cartão, PIX, dinheiro\n🏥 Trabalhamos com alguns convênios\n\nPara um orçamento personalizado conforme sua necessidade, entre em contato pelo **(11) 99999-0000** ou **contato@fisioatleta.com.br**. Posso ajudar com mais alguma coisa?",
      ]
    },
    joelho: {
      patterns: [/\b(joelho|joelhos|patela|patelar|ligamento|menisco|menisco)\b/i],
      responses: [
        "🦵 **Dor no joelho é uma das queixas mais comuns em atletas amadores!**\n\nAs causas mais frequentes são:\n\n• **Tendinite Patelar** – dor abaixo da rótula, comum em corredores\n• **Síndrome da Banda Iliotibial** – dor lateral, frequente em ciclistas\n• **Condromalácia** – desgaste da cartilagem, causa dor ao agachar\n• **Lesão de Menisco** – dor com bloqueio ou travamento\n\n⚠️ **Importante**: O diagnóstico correto é essencial! Não treine com dor.\n\n👨‍⚕️ **Recomendo uma avaliação presencial** para identificarmos a causa e criarmos seu protocolo de tratamento. Quer agendar? A primeira consulta é **gratuita**!",
      ]
    },
    ombro: {
      patterns: [/\b(ombro|ombros|manguito|rotador|bursit|impactação)\b/i],
      responses: [
        "💪 **Dor no ombro em atletas** pode ter várias origens:\n\n• **Síndrome do Impacto** – dor ao elevar o braço\n• **Tendinite do Manguito Rotador** – dor ao fazer força\n• **Bursite** – inflamação na bolsa sinovial\n• **Instabilidade** – sensação de ombro \"solto\"\n\nPara atletas de natação, CrossFit e vôlei é especialmente importante investigar!\n\n🩺 Nossa avaliação inclui testes específicos para identificar a estrutura comprometida. **Agende sua avaliação gratuita** e volte ao treino com segurança!",
      ]
    },
    costas: {
      patterns: [/\b(costas|lombar|coluna|cervical|lombalgia|hérnia|hernia|disco|vertebra)\b/i],
      responses: [
        "🔙 **Dor nas costas é muito comum em atletas** e pode impactar muito sua performance.\n\nCausas frequentes:\n• **Lombalgia** – dor na região lombar por sobrecarga\n• **Hérnia de Disco** – compressão de nervos\n• **Síndrome Femoropatelar** – relação de postura com dor lombar\n• **Tensão Muscular** – por overload de treino\n\n💡 **Dica**: A maioria das dores lombares tem excelente resposta à fisioterapia!\n\nNossa avaliação postural consegue identificar os desequilíbrios que causam sua dor. Quer agendar?",
      ]
    },
    tornozelo: {
      patterns: [/\b(tornozelo|entorse|torção|pé|calcáneo|calcaneo|plantar|fasciite)\b/i],
      responses: [
        "🦶 **Lesões de tornozelo** são muito comuns em esportes como futebol, corrida e basquete.\n\n**Entorse de Tornozelo:**\n• Grau 1: estiramento leve (7-10 dias)\n• Grau 2: lesão parcial (3-6 semanas)\n• Grau 3: ruptura completa (6-12 semanas)\n\n**Protocolo PRICE** para o momento inicial:\n🧊 **P**roteger • **R**epousar • **I**ce (gelo) • **C**ompressão • **E**levação\n\n⚠️ Não subestime entorses! Sem reabilitação adequada, **40% têm instabilidade crônica**.\n\nAgende uma avaliação para começarmos o tratamento correto! 💪",
      ]
    },
    corrida: {
      patterns: [/\b(corrida|correr|corredor|maratona|running|5k|10k|meia maratona)\b/i],
      responses: [
        "🏃 **Fisioterapia para corredores** – nossa especialidade!\n\nLesões mais comuns em corredores amadores:\n1. **Tendinite Patelar** – joelho do saltador\n2. **Fasciite Plantar** – dor no calcanhar\n3. **Síndrome do Compartimento**\n4. **Canelite (periostite tibial)**\n5. **Lesão de Isquiotibiais**\n\n🎯 Nosso programa para corredores inclui:\n• Análise da pisada e biomecânica da corrida\n• Fortalecimento específico\n• Treino de retorno gradual\n\nVai participar de alguma prova? Me conta! Pode te ajudar a montar um plano preventivo.",
      ]
    },
    ciclismo: {
      patterns: [/\b(ciclis|bike|bicicleta|pedalando|pedal|triathlon|triatleta)\b/i],
      responses: [
        "🚴 **Fisioterapia para ciclistas e triatletas** – adoramos essa área!\n\nLesões frequentes em ciclistas:\n• **Síndrome da Banda IT** – dor lateral no joelho\n• **Dor no Pescoço e Lombar** – postura no guidão\n• **Tendinite de Quadríceps**\n• **Síndrome do Piriforme** – dor no glúteo\n\n🔧 **Bike Fit + Fisioterapia** = combinação perfeita!\n\nUm ajuste de posição na bike pode eliminar dores crônicas e melhorar muito sua performance. Nossa equipe pode ajudar com análise postural no ciclismo. Quer saber mais?",
      ]
    },
    futebol: {
      patterns: [/\b(futebol|soccer|football|goleiro|zagueiro|atacante|campo)\b/i],
      responses: [
        "⚽ **Fisioterapia para jogadores de futebol amador!**\n\nO futebol tem alta incidência de lesões por contato e mudanças bruscas de direção:\n\n• **Entorse de Tornozelo** – lesão #1 no futebol\n• **Lesão de Ligamento do Joelho (LCA)**\n• **Contusões Musculares**\n• **Lesão de Isquiotibiais**\n\n🛡️ **Programa de Prevenção FIFA 11+** – trabalhamos com esse protocolo validado cientificamente que reduz lesões em até 50%!\n\nSeu time amador quer fazer um trabalho de prevenção coletivo? Temos condições especiais para grupos!",
      ]
    },
    servicos: {
      patterns: [/\b(serviço|servico|serviços|servicos|oferecem|disponível|disponivel|tem|o que faz|o que vocês|atendem)\b/i],
      responses: [
        "📋 **Nossos serviços para atletas amadores:**\n\n🔴 **Reabilitação de Lesões** – tratamento completo\n🟢 **Fisioterapia Esportiva** – modalidade específica\n🔵 **Avaliação Postural** – análise biomecânica\n🟡 **Programa Preventivo** – sem lesões na temporada\n🟣 **Otimização de Performance** – vai além da cura\n🖥️ **Teleatendimento** – online e prático\n\n✨ Todos os atendimentos começam com uma **avaliação gratuita** de 60 minutos.\n\nQuer saber mais sobre algum serviço específico?",
      ]
    },
    prevencao: {
      patterns: [/\b(prevenir|prevenção|prevençao|prevencao|lesão|evitar|seguro)\b/i],
      responses: [
        "🛡️ **Prevenção de lesões é nossa paixão!**\n\nNosso **Programa Preventivo** inclui:\n\n1. **Screening Funcional** – identificamos vulnerabilidades antes da lesão\n2. **Fortalecimento Específico** – musculatura estabilizadora\n3. **Gestão de Carga de Treino** – carga progressiva segura\n4. **Flexibilidade e Mobilidade** – amplitude de movimento ideal\n5. **Propriocepção** – equilíbrio e controle neuromuscular\n\n📊 Atletas no programa preventivo têm **73% menos lesões** ao longo da temporada!\n\nQuer participar? Agende uma avaliação preventiva – **primeira consulta gratuita!**",
      ]
    },
    horarios: {
      patterns: [/\b(horário|horario|funciona|abre|fecha|horas|dias|semana|sábado|domingo|quando)\b/i],
      responses: [
        "🕐 **Nossos horários de atendimento:**\n\n📅 **Segunda a Sexta** – 7h às 20h\n📅 **Sábado** – 8h às 14h\n🔴 **Domingo** – Fechado\n\n📍 Rua das Acácias, 234 – Sala 12\n\n💡 **Dica**: Os horários mais procurados são cedo (7h-9h) e fim de tarde (17h-20h). Se possuir flexibilidade, o meio do dia tem maior disponibilidade!\n\nQuer agendar para algum dia específico? Posso verificar disponibilidade!",
      ]
    },
    localizacao: {
      patterns: [/\b(onde|endereço|endereco|localização|localizacao|fica|bairro|estacionamento|como chegar|rua)\b/i],
      responses: [
        "📍 **Como nos encontrar:**\n\n🏢 Rua das Acácias, 234 – Sala 12\n🏘️ Jardim Esportivo\n\n🚗 **Estacionamento gratuito** para clientes!\n🚌 A 200m da Estação Metro Esportivo\n🚶 Acessibilidade para cadeirantes e PCD\n\nNosso espaço é moderno, climatizado e totalmente equipado para seu conforto e recuperação. \n\nPosso te ajudar a agendar uma visita?",
      ]
    },
    obrigado: {
      patterns: [/\b(obrigado|obrigada|obg|vlw|valeu|grato|grata|thanks|agradeço)\b/i],
      responses: [
        "De nada! 😊 Foi um prazer ajudar! Lembre-se: cuidar do seu corpo é o melhor investimento que um atleta pode fazer. Se tiver mais dúvidas, estou sempre aqui! 💪\n\nNão esqueça: **primeira avaliação é gratuita!** Agende através do formulário ou pelo (11) 99999-0000.",
        "Disponha! 🏃 Qualquer dúvida, pode chamar. Torço pelo seu sucesso esportivo! E quando precisar, nossa equipe está preparada para te ajudar a treinar com saúde e segurança. 💚",
      ]
    },
    tchau: {
      patterns: [/\b(tchau|xau|até|ate logo|goodbye|bye|encerrar|fechar)\b/i],
      responses: [
        "Até logo! 👋 Bons treinos e fique longe das lesões! Se precisar de nós, a **FisioAtleta** estará sempre aqui. Cuide-se! 💪🏃",
      ]
    },
  };

  // Mapeamento de intenções com padrão único para performance
  const intents = Object.values(KB).map(v => ({
    patterns: v.patterns,
    responses: v.responses,
  }));

  // ── Escolher resposta aleatória ──
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Fallback ──
  const fallbacks = [
    "Hmm, não tenho certeza sobre isso. 🤔 Mas nossa equipe pode responder tudo! Entre em contato pelo **(11) 99999-0000** ou **contato@fisioatleta.com.br**.\n\nOu quer que eu te ajude com: **agendamento**, **serviços**, **preços**, ou **dúvidas sobre lesões?**",
    "Essa é uma boa pergunta! Para um esclarecimento completo, recomendo falar com nossos especialistas pelo **WhatsApp (11) 99999-0000**. 📱\n\nPosso te ajudar com agendamentos, serviços disponíveis, dúvidas sobre lesões comuns em atletas... O que você precisa?",
    "Entendi! Para essa questão específica, é melhor falar diretamente com nossa equipe. 💬\n\nAcesse **contato@fisioatleta.com.br** ou chame no **(11) 99999-0000**.\n\nPosso ajudar em algo mais?",
  ];

  // ── Motor de resposta ──
  function getResponse(input) {
    const text = input.trim().toLowerCase();
    if (!text) return null;

    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        if (pattern.test(text)) {
          return pickRandom(intent.responses);
        }
      }
    }
    return pickRandom(fallbacks);
  }

  return { getResponse };
})();
