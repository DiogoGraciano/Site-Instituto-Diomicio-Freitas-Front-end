import { History, BlogPost, BlogListResponse, Activity, Partner, Project } from '../types';

export const fetchActivities = (): Promise<Activity[]> => {
  return new Promise((resolve) => {
    const activities: Activity[] = Array(8).fill(0).map((_, i) => ({
      id: `activity-${i}`,
      title: `Atividade ${i + 1}`,
      image: `https://placehold.co/300x200`
    }));
    resolve(activities);
  });
};

export const fetchPartners = (): Promise<Partner[]> => {
  return new Promise((resolve) => {
    const partners: Partner[] = Array(8).fill(0).map((_, i) => ({
      id: `partner-${i}`,
      name: `Amigo ${i + 1}`,
      logo: `https://placehold.co/150x100`
    }));
    resolve(partners);
  });
};

export const fetchProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    const projects: Project[] = Array(6).fill(0).map((_, i) => ({
      id: `project-${i}`,
      title: `Projeto ${i + 1}`,
      description: 'Explicação do projeto',
      image: `https://placehold.co/300x200`
    }));
    resolve(projects);
  });
};

// Esta função seria substituída por uma chamada real à API
export const fetchHistoryData = (): Promise<History> => {
  return new Promise((resolve) => {
    // Dados de exemplo - seriam substituídos pelos dados da API real
    const mockData: History = {
      title: "Nossa História",
      foundationYear: "1998",
      content: [
        "O Instituto foi fundado em 1998 com o objetivo de proporcionar oportunidades de educação e desenvolvimento para crianças e jovens em situação de vulnerabilidade social.",
        "Começamos com apenas uma sala de aula e 15 alunos. Hoje, atendemos mais de 500 pessoas anualmente com diversos programas educacionais, culturais e de capacitação profissional.",
        "Nossa missão é transformar vidas através da educação, cultura e desenvolvimento humano, contribuindo para a construção de uma sociedade mais justa e igualitária."
      ],
      milestones: [
        { year: "1998", event: "Fundação do Instituto" },
        { year: "2003", event: "Expansão para novo prédio" },
        { year: "2008", event: "Início do programa de capacitação profissional" },
        { year: "2012", event: "Prêmio Nacional de Educação Social" },
        { year: "2015", event: "Lançamento do programa de bolsas para universidade" },
        { year: "2020", event: "Transformação digital dos programas" }
      ]
    };

    // Simulando um atraso de carregamento
    setTimeout(() => {
      resolve(mockData);
    }, 800);
  });
};

// Dados simulados para o blog
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Campanha de Arrecadação de Materiais Escolares",
    slug: "campanha-arrecadacao-materiais-escolares",
    excerpt: "Nossa campanha anual de arrecadação de materiais escolares foi um sucesso, graças à generosidade da comunidade.",
    content: `<p>Nossa campanha anual de arrecadação de materiais escolares foi um sucesso absoluto! Graças à generosidade da comunidade, conseguimos coletar mais de 500 kits completos para distribuir às crianças atendidas pelo Instituto.</p>

    <p>A iniciativa, que aconteceu durante todo o mês de janeiro, mobilizou empresas locais, escolas parceiras e voluntários. Os materiais arrecadados incluem cadernos, lápis, canetas, mochilas, réguas, borrachas e diversos outros itens essenciais para o ano letivo.</p>
    
    <p>"O material escolar é fundamental para garantir que as crianças tenham condições adequadas de estudo. Muitas famílias não conseguem arcar com esses custos, e nossa campanha visa justamente suprir essa necessidade", explica Maria Silva, coordenadora do projeto.</p>
    
    <p>A distribuição dos kits acontecerá na próxima semana, em um evento especial que contará com atividades recreativas e um lanche para as crianças e suas famílias.</p>
    
    <p>Agradecemos a todos que contribuíram para o sucesso desta campanha. Seu apoio faz toda a diferença na vida destas crianças e em seu futuro acadêmico!</p>`,
    image: "https://placehold.co/600x400",
    author: "Maria Silva",
    authorImage: "https://placehold.co/100x100",
    date: "2023-02-05",
    category: "Campanhas",
    tags: ["educação", "doações", "comunidade"]
  },
  {
    id: "2",
    title: "Instituto Recebe Prêmio de Impacto Social",
    slug: "instituto-recebe-premio-impacto-social",
    excerpt: "Nosso trabalho foi reconhecido com o Prêmio Nacional de Impacto Social, destacando nossos programas educacionais.",
    content: `<p>É com grande orgulho que anunciamos que nosso Instituto foi agraciado com o Prêmio Nacional de Impacto Social, na categoria Educação e Desenvolvimento Comunitário.</p>

    <p>O prêmio, concedido anualmente pela Fundação Nacional de Apoio a Projetos Sociais, reconhece organizações que desenvolvem trabalhos transformadores em suas comunidades, com resultados comprovados e metodologias inovadoras.</p>
    
    <p>O júri destacou especialmente nosso programa de reforço escolar e desenvolvimento de habilidades socioemocionais, que atende atualmente 300 crianças e adolescentes em situação de vulnerabilidade.</p>
    
    <p>"Este reconhecimento pertence a toda nossa equipe, voluntários, apoiadores e, principalmente, às crianças e famílias que confiam em nosso trabalho diariamente", declarou João Santos, diretor executivo do Instituto, durante a cerimônia de premiação realizada ontem em São Paulo.</p>
    
    <p>Além do troféu, o prêmio inclui uma contribuição financeira de R$ 50.000, que será integralmente investida na expansão do programa para atender mais 100 crianças a partir do próximo semestre.</p>
    
    <p>Agradecemos a todos que tornaram esta conquista possível e reafirmamos nosso compromisso com a transformação social através da educação.</p>`,
    image: "https://placehold.co/600x400",
    author: "João Santos",
    authorImage: "https://placehold.co/100x100",
    date: "2023-03-15",
    category: "Reconhecimentos",
    tags: ["prêmio", "impacto social", "educação"]
  },
  {
    id: "3",
    title: "Novo Programa de Inclusão Digital é Lançado",
    slug: "novo-programa-inclusao-digital-lancado",
    excerpt: "Iniciamos um programa de inclusão digital que oferecerá cursos de programação e design para jovens da comunidade.",
    content: `<p>O Instituto dá mais um passo importante em direção à inclusão digital com o lançamento de um novo programa que oferecerá cursos gratuitos de programação, design e marketing digital para jovens da comunidade.</p>

    <p>O "Conecta Futuro", como foi batizado o programa, tem como objetivo capacitar jovens de 14 a 21 anos para as demandas do mercado de trabalho atual, onde as habilidades digitais são cada vez mais essenciais.</p>
    
    <p>As aulas acontecerão em nosso recém-inaugurado laboratório de informática, equipado com 20 computadores de última geração, doados pela empresa TechSolutions, nossa mais nova parceira.</p>
    
    <p>"Percebemos que muitos jovens têm interesse em seguir carreiras na área de tecnologia, mas não possuem acesso a equipamentos adequados nem orientação profissional. Nosso programa vem preencher essa lacuna", explica Ana Costa, coordenadora do Conecta Futuro.</p>
    
    <p>O curso terá duração de seis meses, com aulas duas vezes por semana, e incluirá conteúdos como:
    <ul>
      <li>Introdução à lógica de programação</li>
      <li>Desenvolvimento web front-end (HTML, CSS, JavaScript)</li>
      <li>Design gráfico e UX/UI</li>
      <li>Marketing digital e redes sociais</li>
      <li>Empreendedorismo digital</li>
    </ul></p>
    
    <p>As inscrições já estão abertas e podem ser feitas diretamente em nossa sede ou pelo site.</p>`,
    image: "https://placehold.co/600x400",
    author: "Ana Costa",
    authorImage: "https://placehold.co/100x100",
    date: "2023-04-20",
    category: "Programas",
    tags: ["tecnologia", "inclusão digital", "capacitação"]
  },
  {
    id: "4",
    title: "Voluntários Participam de Treinamento Especial",
    slug: "voluntarios-participam-treinamento-especial",
    excerpt: "Nossa equipe de voluntários passou por um treinamento intensivo para aprimorar o atendimento às crianças do instituto.",
    content: `<p>Neste final de semana, nossa equipe de voluntários participou de um treinamento especial voltado para o aprimoramento das técnicas de acompanhamento pedagógico e suporte emocional às crianças atendidas pelo Instituto.</p>

    <p>O workshop, conduzido pela psicopedagoga Dra. Lúcia Mendes, teve duração de dois dias e abordou temas como:
    <ul>
      <li>Estratégias de aprendizagem para crianças com dificuldades escolares</li>
      <li>Identificação de sinais de transtornos de aprendizagem</li>
      <li>Técnicas de mediação de conflitos</li>
      <li>Suporte emocional a crianças em situação de vulnerabilidade</li>
      <li>Métodos lúdicos de ensino</li>
    </ul></p>
    
    <p>"É fundamental que nossos voluntários estejam bem preparados para lidar com os diversos desafios que surgem no trabalho com crianças em situação de vulnerabilidade. Este treinamento proporciona ferramentas práticas para um atendimento mais efetivo e acolhedor", explica Roberto Almeida, coordenador do programa de voluntariado.</p>
    
    <p>Participaram da formação 35 voluntários, incluindo estudantes universitários, profissionais aposentados e colaboradores de empresas parceiras que dedicam algumas horas de sua semana ao trabalho em nossos projetos.</p>
    
    <p>"Aprendi técnicas que certamente farão diferença no meu trabalho com as crianças. Percebi que pequenas mudanças na abordagem podem trazer grandes resultados", comentou Carla Sousa, voluntária há dois anos no projeto de reforço escolar.</p>
    
    <p>O Instituto realiza treinamentos periódicos para sua equipe de voluntários, acreditando que a capacitação contínua é essencial para a qualidade do trabalho desenvolvido.</p>`,
    image: "https://placehold.co/600x400",
    author: "Roberto Almeida",
    authorImage: "https://placehold.co/100x100",
    date: "2023-05-10",
    category: "Voluntariado",
    tags: ["voluntários", "capacitação", "educação"]
  },
  {
    id: "5",
    title: "Festival Cultural Celebra Talentos da Comunidade",
    slug: "festival-cultural-celebra-talentos-comunidade",
    excerpt: "Nosso festival anual reuniu música, dança, teatro e artes visuais produzidos pelos alunos e pela comunidade local.",
    content: `<p>No último sábado, realizamos a 5ª edição do Festival Cultural "Talentos da Comunidade", evento que celebra as manifestações artísticas dos alunos do Instituto e moradores da região.</p>

    <p>O festival, que aconteceu na praça central do bairro, contou com apresentações de música, dança, teatro, exposição de artes visuais e uma feira de artesanato. Mais de 500 pessoas passaram pelo evento ao longo do dia.</p>
    
    <p>Uma das atrações mais aplaudidas foi a apresentação do coral infantil do Instituto, formado por 25 crianças entre 7 e 12 anos, que interpretou canções tradicionais brasileiras e composições autorais criadas nas oficinas de música.</p>
    
    <p>"É emocionante ver o desenvolvimento artístico destas crianças. Muitas delas nunca tinham tido contato com instrumentos musicais antes de participar de nossas oficinas, e hoje já se apresentam com confiança para um público grande", comenta Paulo Ribeiro, professor de música do Instituto.</p>
    
    <p>O grupo de teatro adolescente também se destacou com a peça "Sonhos Possíveis", que aborda de forma sensível e bem-humorada os desafios e esperanças da juventude nas periferias urbanas. O texto foi desenvolvido coletivamente pelos próprios jovens, sob orientação da oficineira de teatro.</p>
    
    <p>A exposição de artes visuais apresentou pinturas, esculturas e fotografias produzidas nas oficinas artísticas do Instituto, enquanto a feira de artesanato ofereceu oportunidade para que artesãos locais, muitos deles pais e familiares de alunos, pudessem comercializar seus produtos.</p>
    
    <p>"Este festival é muito mais que um evento artístico. É uma oportunidade de fortalecer o senso de comunidade, valorizar os talentos locais e mostrar às crianças e jovens que suas expressões culturais têm valor e merecem ser celebradas", afirma Cristina Oliveira, coordenadora cultural do Instituto.</p>
    
    <p>O evento contou com o apoio da Secretaria Municipal de Cultura e de empresas locais.</p>`,
    image: "https://placehold.co/600x400",
    author: "Cristina Oliveira",
    authorImage: "https://placehold.co/100x100",
    date: "2023-06-25",
    category: "Eventos",
    tags: ["cultura", "arte", "comunidade"]
  },
  {
    id: "6",
    title: "Parceria com Universidade Amplia Atendimento Psicológico",
    slug: "parceria-universidade-amplia-atendimento-psicologico",
    excerpt: "Nova parceria com a Faculdade de Psicologia permitirá oferecer atendimento psicológico gratuito para mais crianças e suas famílias.",
    content: `<p>O Instituto acaba de formalizar uma importante parceria com o Departamento de Psicologia da Universidade Federal, que permitirá ampliar significativamente o atendimento psicológico oferecido às crianças e adolescentes atendidos, bem como a seus familiares.</p>

    <p>A parceria prevê que estudantes dos últimos anos do curso de Psicologia, sob supervisão de professores experientes, realizem atendimentos semanais em uma sala especialmente adaptada em nossa sede.</p>
    
    <p>"A saúde mental é um aspecto fundamental do desenvolvimento integral que buscamos proporcionar. Muitas das crianças que atendemos vivenciam situações de estresse, traumas e dificuldades emocionais que impactam seu aprendizado e socialização", explica Dra. Mariana Campos, psicóloga coordenadora do projeto.</p>
    
    <p>Inicialmente, serão oferecidas 40 vagas para atendimento contínuo, com possibilidade de ampliação no próximo semestre. Os casos serão encaminhados pela equipe pedagógica do Instituto, que já realiza um acompanhamento próximo dos alunos e consegue identificar aqueles que podem se beneficiar do suporte psicológico.</p>
    
    <p>Além dos atendimentos individuais, a parceria também prevê a realização de grupos terapêuticos para pais e cuidadores, oficinas de habilidades socioemocionais para as crianças e capacitações para a equipe do Instituto sobre temas relacionados à saúde mental infantojuvenil.</p>
    
    <p>"Esta parceria beneficia todos os envolvidos: as crianças e famílias recebem um atendimento especializado gratuito, os estudantes de Psicologia têm a oportunidade de praticar em um contexto real e supervisionado, e nós conseguimos ampliar nossos serviços sem um impacto significativo no orçamento", comenta José Andrade, diretor do Instituto.</p>
    
    <p>Os atendimentos começarão na próxima semana, após uma fase de avaliação inicial que já está em andamento.</p>`,
    image: "https://placehold.co/600x400",
    author: "Dra. Mariana Campos",
    authorImage: "https://placehold.co/100x100",
    date: "2023-07-12",
    category: "Parcerias",
    tags: ["saúde mental", "psicologia", "parcerias"]
  }
];

// Buscar lista de posts (com paginação)
export const fetchBlogPosts = (page: number = 1, limit: number = 6): Promise<BlogListResponse> => {
  return new Promise((resolve) => {
    const totalPosts = blogPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = blogPosts.slice(startIndex, endIndex);

    // Simulando um atraso de carregamento
    setTimeout(() => {
      resolve({
        posts: paginatedPosts,
        totalPages,
        currentPage: page
      });
    }, 800);
  });
};

// Buscar um post específico por slug
export const fetchBlogPostBySlug = (slug: string): Promise<BlogPost | null> => {
  return new Promise((resolve) => {
    const post = blogPosts.find(post => post.slug === slug) || null;

    // Simulando um atraso de carregamento
    setTimeout(() => {
      resolve(post);
    }, 800);
  });
}; 