/**
 * Jardim Perene — Quiz: Monte seu primeiro jardim
 * Script Oficial de Interatividade, Estado & Experiência Mobile-First
 */

(function () {
  'use strict';

  // --- Base de Conhecimento do Quiz ---
  const QUIZ_DATA = {
    scenarios: {
      janela: {
        id: 'janela',
        title: 'Um canto perto da janela',
        shortTitle: 'Canto perto da janela',
        image: 'images/cenarios/janela.webp',
        tip: '“Cantinho escolhido! Antes de levar uma muda para casa, observe quanto sol direto bate nesse lugar ao longo do dia.”'
      },
      varanda: {
        id: 'varanda',
        title: 'Uma varanda com vasos',
        shortTitle: 'Varanda com vasos',
        image: 'images/cenarios/varanda.webp',
        tip: '“Cantinho escolhido! Antes de levar uma muda para casa, observe quanto sol direto bate nesse lugar ao longo do dia.”'
      },
      quintal: {
        id: 'quintal',
        title: 'Um espaço no quintal',
        shortTitle: 'Espaço no quintal',
        image: 'images/cenarios/quintal.webp',
        tip: '“Cantinho escolhido! Antes de levar uma muda para casa, observe quanto sol direto bate nesse lugar ao longo do dia.”'
      }
    },

    plants: {
      folhagem: {
        id: 'folhagem',
        name: 'Folhagem',
        category: 'Folhagens',
        phraseType: 'folhagens',
        image: 'images/plantas/folhagem.webp',
        tip: '“Existem folhagens para ambientes diferentes. Use a luz do seu cantinho para escolher a espécie.”'
      },
      flor: {
        id: 'flor',
        name: 'Flor',
        category: 'Flores',
        phraseType: 'flores',
        image: 'images/plantas/flor.webp',
        tip: '“Antes de escolher pela cor, confira de quanta luz a espécie precisa para florescer.”'
      },
      tempero: {
        id: 'tempero',
        name: 'Tempero',
        category: 'Temperos & Ervas',
        phraseType: 'temperos',
        image: 'images/plantas/tempero.webp',
        tip: '“Comece com um tempero que você usa na cozinha e confira se o seu espaço oferece a luz de que ele precisa.”'
      }
    },

    itemsByMode: {
      vaso: [
        {
          id: 'muda',
          title: 'Muda',
          image: 'images/carrinho/muda.webp',
          tip: 'Item essencial! Uma muda viçosa e saudável é o ponto de partida do seu cantinho.'
        },
        {
          id: 'substrato',
          title: 'Substrato adequado',
          image: 'images/carrinho/substrato.webp',
          tip: 'Fundamental! Um bom substrato dá sustentação e aeração para as raízes se desenvolverem.'
        },
        {
          id: 'vaso',
          title: 'Vaso com furos',
          image: 'images/carrinho/vaso-com-furos.webp',
          tip: 'Ótima escolha! O furo de drenagem evita que a água fique acumulada e apodreça as raízes.'
        },
        {
          id: 'adubo',
          title: 'Adubo',
          image: 'images/carrinho/adubo.webp',
          tip: 'Colocou adubo no carrinho? Vale conferir primeiro se a muda precisa dele agora. O tipo de planta e o substrato influenciam essa escolha.'
        },
        {
          id: 'pa',
          title: 'Pá de mão',
          image: 'images/carrinho/pa-de-mao.webp',
          tip: 'Prática e versátil para manusear a terra sem machucar o torrão da muda.'
        },
        {
          id: 'tesoura',
          title: 'Tesoura de poda',
          image: 'images/carrinho/tesoura-de-poda.webp',
          tip: 'Excelente para podas de limpeza e para retirar folhas secas no futuro.'
        }
      ],
      canteiro: [
        {
          id: 'muda',
          title: 'Muda',
          image: 'images/carrinho/muda.webp',
          tip: 'Item essencial! Uma muda viçosa e saudável para se desenvolver no canteiro.'
        },
        {
          id: 'substrato',
          title: 'Substrato rico',
          image: 'images/carrinho/substrato.webp',
          tip: 'Excelente para enriquecer o solo do canteiro com nutrientes e boa aeração.'
        },
        {
          id: 'cobertura',
          title: 'Cobertura vegetal',
          image: 'images/carrinho/cobertura-vegetal.webp',
          tip: 'Perfeita para canteiros! Mantém a umidade do solo e protege as raízes contra o sol forte.'
        },
        {
          id: 'adubo',
          title: 'Adubo orgânico',
          image: 'images/carrinho/adubo.webp',
          tip: 'Colocou adubo no carrinho? Vale conferir primeiro se a terra já não tem nutrientes suficientes.'
        },
        {
          id: 'pa',
          title: 'Pá de mão',
          image: 'images/carrinho/pa-de-mao.webp',
          tip: 'Ferramenta indispensável para cavar a cova e acomodar a muda no canteiro.'
        },
        {
          id: 'tesoura',
          title: 'Tesoura de poda',
          image: 'images/carrinho/tesoura-de-poda.webp',
          tip: 'Ótima para manter a planta vigorosa e retirar folhas antigas no pós-plantio.'
        }
      ]
    }
  };

  // --- Estado do Quiz ---
  const state = {
    step: 0, // 0: intro, 1: cenário, 2: planta, 3: carrinho, 4: situação, 5: resultado
    scenario: null,
    plant: null,
    quintalType: 'vaso', // 'vaso' | 'canteiro'
    cart: [], // até 3 itens (IDs)
    situationChoice: null,
    theme: localStorage.getItem('jp_theme') || 'auto'
  };

  // --- Elementos do DOM ---
  const dom = {
    themeBtn: document.getElementById('btn-theme'),
    progressSection: document.getElementById('progress-section'),
    stepIndicator: document.getElementById('step-indicator'),
    progressBar: document.getElementById('progress-bar'),
    btnBack: document.getElementById('btn-back'),

    scenarioCanvas: document.getElementById('scenario-canvas'),
    scenarioCanvasImg: document.getElementById('scenario-canvas-img'),
    scenarioBadgeText: document.getElementById('scenario-badge-text'),
    plantSpotlight: document.getElementById('plant-spotlight'),
    plantSpotlightImg: document.getElementById('plant-spotlight-img'),
    plantBadgeText: document.getElementById('plant-badge-text'),

    steps: {
      0: document.getElementById('step-intro'),
      1: document.getElementById('step-scenario'),
      2: document.getElementById('step-plant'),
      3: document.getElementById('step-cart'),
      4: document.getElementById('step-situation'),
      5: document.getElementById('step-result')
    },

    btnStartQuiz: document.getElementById('btn-start-quiz'),
    btnNextScenario: document.getElementById('btn-next-scenario'),
    scenarioTip: document.getElementById('scenario-tip'),

    btnNextPlant: document.getElementById('btn-next-plant'),
    plantTip: document.getElementById('plant-tip'),
    plantTipTitle: document.getElementById('plant-tip-title'),
    plantTipText: document.getElementById('plant-tip-text'),

    quintalBox: document.getElementById('quintal-selector-box'),
    btnQuintalVaso: document.getElementById('btn-quintal-vaso'),
    btnQuintalCanteiro: document.getElementById('btn-quintal-canteiro'),
    cartRecommendationBox: document.getElementById('cart-recommendation-box'),
    cartRecommendationText: document.getElementById('cart-recommendation-text'),
    cartDropzone: document.getElementById('cart-dropzone'),
    cartCounter: document.getElementById('cart-counter'),
    cartSlots: document.getElementById('cart-slots'),
    shelfGrid: document.getElementById('shelf-items-grid'),
    cartTip: document.getElementById('cart-item-tip'),
    cartTipTitle: document.getElementById('cart-tip-title'),
    cartTipText: document.getElementById('cart-tip-text'),
    btnNextCart: document.getElementById('btn-next-cart'),

    situationCards: document.querySelectorAll('.situation-card'),
    situationTip: document.getElementById('situation-tip'),
    btnSeeResult: document.getElementById('btn-see-result'),

    resultScenarioImg: document.getElementById('result-scenario-img'),
    resultPlantImg: document.getElementById('result-plant-img'),
    resultPlantCategory: document.getElementById('result-plant-category'),
    resultPlantName: document.getElementById('result-plant-name'),
    resultScenarioTitle: document.getElementById('result-scenario-title'),
    resultProjectText: document.getElementById('result-project-text'),
    resultCartChips: document.getElementById('result-cart-chips'),
    resultNextStepText: document.getElementById('result-next-step-text'),

    btnShareResult: document.getElementById('btn-share-result'),
    btnRestartQuiz: document.getElementById('btn-restart-quiz'),
    toast: document.getElementById('toast'),

    shareModal: document.getElementById('share-modal'),
    btnCloseShareModal: document.getElementById('btn-close-share-modal'),
    shareWhatsapp: document.getElementById('share-whatsapp'),
    shareInstagram: document.getElementById('share-instagram'),
    shareFacebook: document.getElementById('share-facebook'),
    shareX: document.getElementById('share-x'),
    shareTelegram: document.getElementById('share-telegram'),
    btnDownloadStory: document.getElementById('btn-download-story'),
    btnDownloadFeed: document.getElementById('btn-download-feed')
  };

  // --- Inicialização ---
  function init() {
    initTheme();
    bindEvents();
    renderStep();
  }

  // --- Tema (Claro / Escuro) ---
  function initTheme() {
    if (state.theme === 'dark' || (state.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    dom.themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jp_theme', next);
      state.theme = next;
      showToast(next === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado');
    });
  }

  // --- Feedback Toast com Ícone Vetorial ---
  let toastTimer = null;
  function showToast(msg) {
    if (!dom.toast) return;
    dom.toast.innerHTML = `
      <div class="toast-inner">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>${msg}</span>
      </div>
    `;
    dom.toast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.classList.remove('active');
    }, 2800);
  }

  // --- Navegação de Etapas ---
  function goToStep(targetStep) {
    if (targetStep < 0 || targetStep > 5) return;
    state.step = targetStep;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderStep();
  }

  function renderStep() {
    // 1. Alterna visibilidade dos steps
    Object.keys(dom.steps).forEach((k) => {
      const stepEl = dom.steps[k];
      if (!stepEl) return;
      if (parseInt(k, 10) === state.step) {
        stepEl.style.display = 'flex';
        stepEl.classList.add('active');
      } else {
        stepEl.style.display = 'none';
        stepEl.classList.remove('active');
      }
    });

    // 2. Controla Barra de Progresso
    if (state.step >= 1 && state.step <= 4) {
      dom.progressSection.style.display = 'block';
      const pct = (state.step / 4) * 100;
      dom.progressBar.style.width = `${pct}%`;

      const stepNames = ['Abertura', 'Cenário', 'Primeira Planta', 'Carrinho da Loja', 'Chegada em Casa'];
      dom.stepIndicator.textContent = `Etapa ${state.step} de 4 · ${stepNames[state.step]}`;
    } else {
      dom.progressSection.style.display = 'none';
    }

    // 3. Controla Canvas do Cenário (Persistente da Etapa 2 em diante)
    if (state.step >= 2 && state.step <= 4 && state.scenario) {
      const scen = QUIZ_DATA.scenarios[state.scenario];
      dom.scenarioCanvas.style.display = 'block';
      dom.scenarioCanvasImg.src = scen.image;
      dom.scenarioBadgeText.textContent = scen.shortTitle;

      if (state.plant && QUIZ_DATA.plants[state.plant]) {
        const pl = QUIZ_DATA.plants[state.plant];
        dom.plantSpotlight.style.display = 'inline-flex';
        dom.plantSpotlightImg.src = pl.image;
        dom.plantBadgeText.textContent = pl.name;
      } else {
        dom.plantSpotlight.style.display = 'none';
      }
    } else {
      dom.scenarioCanvas.style.display = 'none';
    }

    // 4. Lógicas Específicas por Etapa
    if (state.step === 1) {
      syncScenarioSelectionUI();
    } else if (state.step === 2) {
      syncPlantSelectionUI();
    } else if (state.step === 3) {
      renderCartStep();
    } else if (state.step === 4) {
      syncSituationSelectionUI();
    } else if (state.step === 5) {
      renderResultStep();
    }
  }

  // --- Lógica: Etapa 1 (Cenário) ---
  function selectScenario(scenarioId) {
    state.scenario = scenarioId;
    syncScenarioSelectionUI();
    dom.scenarioTip.style.display = 'flex';
    dom.btnNextScenario.disabled = false;
  }

  function syncScenarioSelectionUI() {
    const cards = document.querySelectorAll('#scenarios-grid .choice-card');
    cards.forEach((c) => {
      const sc = c.getAttribute('data-scenario');
      if (sc === state.scenario) {
        c.classList.add('selected');
        c.setAttribute('aria-pressed', 'true');
      } else {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      }
    });

    if (state.scenario) {
      dom.scenarioTip.style.display = 'flex';
      dom.btnNextScenario.disabled = false;
    } else {
      dom.btnNextScenario.disabled = true;
    }
  }

  // --- Lógica: Etapa 2 (Planta) ---
  function selectPlant(plantId) {
    state.plant = plantId;
    syncPlantSelectionUI();

    const pl = QUIZ_DATA.plants[plantId];
    if (pl) {
      dom.plantTipTitle.textContent = `Dica para ${pl.name}`;
      dom.plantTipText.textContent = pl.tip;
      dom.plantTip.style.display = 'flex';
      dom.btnNextPlant.disabled = false;

      // Atualiza o spotlight no canvas persistente no topo
      dom.plantSpotlight.style.display = 'inline-flex';
      dom.plantSpotlightImg.src = pl.image;
      dom.plantBadgeText.textContent = pl.name;
    }
  }

  function syncPlantSelectionUI() {
    const cards = document.querySelectorAll('#plants-grid .choice-card');
    cards.forEach((c) => {
      const pl = c.getAttribute('data-plant');
      if (pl === state.plant) {
        c.classList.add('selected');
        c.setAttribute('aria-pressed', 'true');
      } else {
        c.classList.remove('selected');
        c.setAttribute('aria-pressed', 'false');
      }
    });

    if (state.plant && QUIZ_DATA.plants[state.plant]) {
      const pl = QUIZ_DATA.plants[state.plant];
      dom.plantTipTitle.textContent = `Dica para ${pl.name}`;
      dom.plantTipText.textContent = pl.tip;
      dom.plantTip.style.display = 'flex';
      dom.btnNextPlant.disabled = false;
    } else {
      dom.btnNextPlant.disabled = true;
    }
  }

  // --- Lógica: Etapa 3 (Carrinho do Viveiro) ---
  function getEffectiveCartMode() {
    if (state.scenario === 'quintal') {
      return state.quintalType || 'vaso';
    }
    return 'vaso';
  }

  function renderCartStep() {
    // 1. Mostra selector de Quintal se aplicável
    if (state.scenario === 'quintal') {
      dom.quintalBox.style.display = 'block';
      if (state.quintalType === 'canteiro') {
        dom.btnQuintalCanteiro.classList.add('active');
        dom.btnQuintalVaso.classList.remove('active');
      } else {
        dom.btnQuintalVaso.classList.add('active');
        dom.btnQuintalCanteiro.classList.remove('active');
      }
    } else {
      dom.quintalBox.style.display = 'none';
      state.quintalType = 'vaso';
    }

    // 2. Mensagem de Recomendação
    const mode = getEffectiveCartMode();
    if (mode === 'canteiro') {
      dom.cartRecommendationText.innerHTML = '<strong>Exemplo recomendado para canteiro:</strong> muda + composto/substrato + pá de mão.';
    } else {
      dom.cartRecommendationText.innerHTML = '<strong>Exemplo recomendado para vaso:</strong> muda + vaso com furos + substrato adequado.';
    }

    // 3. Renderiza Prateleira de Itens
    const availableItems = QUIZ_DATA.itemsByMode[mode];
    dom.shelfGrid.innerHTML = '';

    availableItems.forEach((item) => {
      const inCart = state.cart.includes(item.id);
      const isRecommended = (mode === 'vaso' && ['muda', 'vaso', 'substrato'].includes(item.id)) ||
                            (mode === 'canteiro' && ['muda', 'substrato', 'pa'].includes(item.id));

      const card = document.createElement('div');
      card.className = `shelf-item-card ${inCart ? 'in-cart' : ''} ${isRecommended ? 'recommended-item' : ''}`;
      card.setAttribute('draggable', !inCart);
      card.setAttribute('data-item-id', item.id);

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="shelf-item-thumb">
        <strong class="shelf-item-title">${item.title}</strong>
        <span class="shelf-item-btn">
          ${inCart
            ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>No carrinho</span>'
            : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>Adicionar</span>'}
        </span>
      `;

      // Clique para adicionar ao carrinho
      card.addEventListener('click', () => {
        if (inCart) {
          removeFromCart(item.id);
        } else {
          addToCart(item.id);
        }
      });

      // Drag and drop events
      card.addEventListener('dragstart', (e) => {
        if (inCart) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'copy';
      });

      dom.shelfGrid.appendChild(card);
    });

    // 4. Renderiza Slots do Carrinho
    renderCartSlots();

    // 5. Atualiza Botão Continuar
    dom.btnNextCart.disabled = state.cart.length !== 3;
    dom.cartCounter.textContent = `${state.cart.length} de 3 itens`;
  }

  function renderCartSlots() {
    const mode = getEffectiveCartMode();
    const availableItems = QUIZ_DATA.itemsByMode[mode];
    const itemsMap = Object.fromEntries(availableItems.map((i) => [i.id, i]));

    const slots = dom.cartSlots.querySelectorAll('.cart-slot');
    slots.forEach((slot, index) => {
      const itemId = state.cart[index];
      slot.innerHTML = '';

      if (itemId && itemsMap[itemId]) {
        const item = itemsMap[itemId];
        slot.className = 'cart-slot filled';

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-filled-item';
        itemEl.title = `Remover ${item.title}`;
        itemEl.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <span class="cart-filled-name">${item.title}</span>
          <button type="button" class="btn-remove-cart-item" aria-label="Remover">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        `;

        itemEl.addEventListener('click', () => {
          removeFromCart(itemId);
        });

        slot.appendChild(itemEl);
      } else {
        slot.className = 'cart-slot empty';
        slot.innerHTML = `<span class="slot-empty-label">Espaço ${index + 1}</span>`;
      }
    });
  }

  function addToCart(itemId) {
    if (state.cart.length >= 3) {
      showToast('Seu carrinho já tem 3 itens! Remova um para trocar.');
      return;
    }
    if (state.cart.includes(itemId)) return;

    state.cart.push(itemId);
    const mode = getEffectiveCartMode();
    const item = QUIZ_DATA.itemsByMode[mode].find((i) => i.id === itemId);

    if (item && item.tip) {
      dom.cartTipTitle.textContent = `Dica: ${item.title}`;
      dom.cartTipText.textContent = item.tip;
      dom.cartTip.style.display = 'flex';
    }

    renderCartStep();
  }

  function removeFromCart(itemId) {
    state.cart = state.cart.filter((id) => id !== itemId);
    renderCartStep();
  }

  function setupCartDragAndDrop() {
    dom.cartDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dom.cartDropzone.classList.add('drag-active');
    });

    dom.cartDropzone.addEventListener('dragleave', () => {
      dom.cartDropzone.classList.remove('drag-active');
    });

    dom.cartDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dom.cartDropzone.classList.remove('drag-active');
      const itemId = e.dataTransfer.getData('text/plain');
      if (itemId) {
        addToCart(itemId);
      }
    });
  }

  // --- Lógica: Etapa 4 (Situação Real) ---
  function selectSituation(choiceNumber) {
    state.situationChoice = choiceNumber;
    syncSituationSelectionUI();

    dom.situationTip.style.display = 'flex';
    dom.btnSeeResult.disabled = false;
  }

  function syncSituationSelectionUI() {
    dom.situationCards.forEach((c) => {
      const choice = c.getAttribute('data-choice');
      if (choice === state.situationChoice) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });

    if (state.situationChoice) {
      dom.situationTip.style.display = 'flex';
      dom.btnSeeResult.disabled = false;
    } else {
      dom.btnSeeResult.disabled = true;
    }
  }

  // --- Lógica: Tela de Resultado ---
  function renderResultStep() {
    const scen = QUIZ_DATA.scenarios[state.scenario] || QUIZ_DATA.scenarios.varanda;
    const pl = QUIZ_DATA.plants[state.plant] || QUIZ_DATA.plants.tempero;
    const mode = getEffectiveCartMode();
    const itemsMap = Object.fromEntries(QUIZ_DATA.itemsByMode[mode].map((i) => [i.id, i]));

    // 1. Showcase Visual
    dom.resultScenarioImg.src = scen.image;
    dom.resultPlantImg.src = pl.image;
    dom.resultPlantCategory.textContent = pl.category;
    dom.resultPlantName.textContent = pl.name;
    dom.resultScenarioTitle.textContent = scen.shortTitle;

    // 2. Textos Exatos das Especificações
    // Exemplo especificação: "Seu projeto: um cantinho de temperos na varanda."
    let spacePhrase = 'perto da janela';
    if (scen.id === 'varanda') spacePhrase = 'na varanda';
    if (scen.id === 'quintal') {
      spacePhrase = mode === 'canteiro' ? 'no canteiro do quintal' : 'em vasos no quintal';
    }

    const plantPlural = pl.phraseType; // temperos, folhagens, flores
    dom.resultProjectText.textContent = `um cantinho de ${plantPlural} ${spacePhrase}.`;

    // Próximo passo
    dom.resultNextStepText.textContent =
      `observe quanto sol direto bate ali e consulte quais ${plantPlural} combinam com essa condição. Depois, confira o que vale levar do viveiro.`;

    // 3. Chips do Carrinho
    dom.resultCartChips.innerHTML = '';
    state.cart.forEach((itemId) => {
      const item = itemsMap[itemId];
      if (!item) return;

      const chip = document.createElement('span');
      chip.className = 'cart-chip';
      chip.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <span>${item.title}</span>
      `;
      dom.resultCartChips.appendChild(chip);
    });
  }

  // --- Modal e Compartilhamento em Redes Sociais ---
  function openShareModal() {
    const scen = QUIZ_DATA.scenarios[state.scenario] || QUIZ_DATA.scenarios.varanda;
    const pl = QUIZ_DATA.plants[state.plant] || QUIZ_DATA.plants.tempero;
    const mode = getEffectiveCartMode();

    let spacePhrase = 'perto da janela';
    if (scen.id === 'varanda') spacePhrase = 'na varanda';
    else if (scen.id === 'quintal') {
      spacePhrase = mode === 'canteiro' ? 'no canteiro do quintal' : 'em vasos no quintal';
    }

    const shareText = `Montei meu primeiro jardim no Jardim Perene! Meu projeto: um cantinho de ${pl.phraseType} ${spacePhrase}. Veja o que escolher para o seu espaço:`;
    const shareUrl = 'https://jardim-de-bolso-nu.vercel.app';

    // 1. WhatsApp
    dom.shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

    // 2. Facebook
    dom.shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;

    // 3. X (Twitter)
    dom.shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

    // 4. Telegram
    dom.shareTelegram.href = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

    // Exibe o modal
    dom.shareModal.style.display = 'flex';
  }

  function closeShareModal() {
    dom.shareModal.style.display = 'none';
  }

  // --- Gerador de Imagem em Canvas para Story (9:16) ou Feed (1:1) ---
  function generateAndShareCard(format = 'story') {
    const isStory = format === 'story';
    const width = 1080;
    const height = isStory ? 1920 : 1080;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const scen = QUIZ_DATA.scenarios[state.scenario] || QUIZ_DATA.scenarios.varanda;
    const pl = QUIZ_DATA.plants[state.plant] || QUIZ_DATA.plants.tempero;
    const mode = getEffectiveCartMode();
    const availableItems = QUIZ_DATA.itemsByMode[mode];
    const itemsMap = Object.fromEntries(availableItems.map((i) => [i.id, i]));

    let spacePhrase = 'perto da janela';
    if (scen.id === 'varanda') spacePhrase = 'na varanda';
    else if (scen.id === 'quintal') {
      spacePhrase = mode === 'canteiro' ? 'no canteiro do quintal' : 'em vasos no quintal';
    }

    showToast('Gerando imagem em alta resolução...');

    const scenarioImg = new Image();
    scenarioImg.crossOrigin = 'anonymous';
    scenarioImg.src = scen.image;

    const plantImg = new Image();
    plantImg.crossOrigin = 'anonymous';
    plantImg.src = pl.image;

    Promise.all([
      new Promise((res) => { scenarioImg.onload = res; scenarioImg.onerror = res; }),
      new Promise((res) => { plantImg.onload = res; plantImg.onerror = res; })
    ]).then(() => {
      // Fundo degradê botânico escuro
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#0f281e');
      bgGrad.addColorStop(0.5, '#1b4332');
      bgGrad.addColorStop(1, '#091510');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Círculo de iluminação suave
      ctx.fillStyle = 'rgba(82, 183, 136, 0.08)';
      ctx.beginPath();
      ctx.arc(width * 0.8, height * 0.15, 320, 0, Math.PI * 2);
      ctx.fill();

      // Topo: Marca Jardim Perene
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('JARDIM PERENE', width / 2, isStory ? 140 : 90);

      ctx.fillStyle = '#74c69d';
      ctx.font = '600 22px "Plus Jakarta Sans", system-ui, sans-serif';
      ctx.fillText('PROJETO MONTE SEU PRIMEIRO JARDIM', width / 2, isStory ? 180 : 125);

      // Moldura do Cenário
      const cardY = isStory ? 230 : 160;
      const cardH = isStory ? 600 : 420;
      const cardW = width - 120;
      const cardX = 60;
      const radius = 32;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, radius);
      ctx.clip();
      if (scenarioImg.complete && scenarioImg.naturalWidth > 0) {
        ctx.drawImage(scenarioImg, cardX, cardY, cardW, cardH);
      } else {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(cardX, cardY, cardW, cardH);
      }

      // Overlay de contraste
      const cardOverlay = ctx.createLinearGradient(cardX, cardY + cardH * 0.35, cardX, cardY + cardH);
      cardOverlay.addColorStop(0, 'rgba(15, 40, 30, 0)');
      cardOverlay.addColorStop(1, 'rgba(15, 40, 30, 0.88)');
      ctx.fillStyle = cardOverlay;
      ctx.fillRect(cardX, cardY, cardW, cardH);
      ctx.restore();

      // Badge com nome do Cenário
      ctx.fillStyle = 'rgba(15, 40, 30, 0.85)';
      ctx.beginPath();
      ctx.roundRect(cardX + 30, cardY + 30, 270, 50, 25);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(scen.shortTitle, cardX + 54, cardY + 63);

      // Avatar circular da Planta
      const plantAvatarSize = isStory ? 140 : 110;
      const plantAvatarX = width / 2;
      const plantAvatarY = cardY + cardH - (isStory ? 40 : 20);

      ctx.save();
      ctx.beginPath();
      ctx.arc(plantAvatarX, plantAvatarY, (plantAvatarSize / 2) + 6, 0, Math.PI * 2);
      ctx.fillStyle = '#52b788';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(plantAvatarX, plantAvatarY, plantAvatarSize / 2, 0, Math.PI * 2);
      ctx.clip();
      if (plantImg.complete && plantImg.naturalWidth > 0) {
        ctx.drawImage(plantImg, plantAvatarX - (plantAvatarSize / 2), plantAvatarY - (plantAvatarSize / 2), plantAvatarSize, plantAvatarSize);
      } else {
        ctx.fillStyle = '#1b4332';
        ctx.fillRect(plantAvatarX - (plantAvatarSize / 2), plantAvatarY - (plantAvatarSize / 2), plantAvatarSize, plantAvatarSize);
      }
      ctx.restore();

      // Rótulo da Planta
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pl.name, plantAvatarX, plantAvatarY + (plantAvatarSize / 2) + 38);

      // Bloco de Resumo do Projeto
      const summaryY = isStory ? 1040 : 660;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(cardX, summaryY, cardW, isStory ? 540 : 290, 28);
      ctx.fill();

      ctx.fillStyle = '#52b788';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SEU PROJETO CONCLUÍDO', width / 2, summaryY + 50);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px "Bricolage Grotesque", sans-serif';
      ctx.fillText(`Um cantinho de ${pl.phraseType} ${spacePhrase}`, width / 2, summaryY + 105);

      // Itens selecionados no carrinho
      ctx.fillStyle = '#b7e4c7';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Itens que levei do viveiro:', width / 2, summaryY + 160);

      const itemsText = state.cart.map((id) => itemsMap[id] ? itemsMap[id].title : id).join('  ·  ');
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(itemsText, width / 2, summaryY + 205);

      if (isStory) {
        // Dica educativa para Story
        ctx.fillStyle = 'rgba(82, 183, 136, 0.15)';
        ctx.beginPath();
        ctx.roundRect(cardX + 30, summaryY + 250, cardW - 60, 180, 20);
        ctx.fill();

        ctx.fillStyle = '#eaf8ed';
        ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Dica: antes de regar, observe a luz do local', width / 2, summaryY + 325);
        ctx.fillText('e sinta a umidade do substrato com a mão.', width / 2, summaryY + 370);
      }

      // Rodapé
      ctx.fillStyle = '#74c69d';
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Descubra o que plantar no seu espaço: jardim-de-bolso-nu.vercel.app', width / 2, height - (isStory ? 100 : 50));

      // Conversão e Exportação
      canvas.toBlob((blob) => {
        if (!blob) return;
        const fileName = `meu-jardim-${format}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            title: 'Meu Primeiro Jardim · Jardim Perene',
            text: `Meu primeiro jardim ganhou forma no Jardim Perene! Confira o seu em https://jardim-de-bolso-nu.vercel.app`
          }).then(() => {
            showToast('Pronto para publicar!');
          }).catch(() => {
            downloadBlobFile(blob, fileName);
          });
        } else {
          downloadBlobFile(blob, fileName);
        }
      }, 'image/png');
    });
  }

  function downloadBlobFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Imagem pronta! Abra seu Instagram e publique no Story ou Feed.');
  }

  // --- Eventos Globais ---
  function bindEvents() {
    // Tela 0 -> Etapa 1
    dom.btnStartQuiz.addEventListener('click', () => {
      goToStep(1);
    });

    // Botão Voltar
    dom.btnBack.addEventListener('click', () => {
      if (state.step > 0) {
        goToStep(state.step - 1);
      }
    });

    // Etapa 1: Cenário
    const scenarioCards = document.querySelectorAll('#scenarios-grid .choice-card');
    scenarioCards.forEach((c) => {
      c.addEventListener('click', () => {
        selectScenario(c.getAttribute('data-scenario'));
      });
      c.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectScenario(c.getAttribute('data-scenario'));
        }
      });
    });

    dom.btnNextScenario.addEventListener('click', () => {
      if (state.scenario) goToStep(2);
    });

    // Etapa 2: Planta
    const plantCards = document.querySelectorAll('#plants-grid .choice-card');
    plantCards.forEach((c) => {
      c.addEventListener('click', () => {
        selectPlant(c.getAttribute('data-plant'));
      });
      c.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectPlant(c.getAttribute('data-plant'));
        }
      });
    });

    dom.btnNextPlant.addEventListener('click', () => {
      if (state.plant) goToStep(3);
    });

    // Etapa 3: Carrinho (Modo Vaso ou Canteiro)
    dom.btnQuintalVaso.addEventListener('click', () => {
      state.quintalType = 'vaso';
      state.cart = []; // Limpa para readaptar
      renderCartStep();
    });

    dom.btnQuintalCanteiro.addEventListener('click', () => {
      state.quintalType = 'canteiro';
      state.cart = []; // Limpa para readaptar
      renderCartStep();
    });

    setupCartDragAndDrop();

    dom.btnNextCart.addEventListener('click', () => {
      if (state.cart.length === 3) goToStep(4);
    });

    // Etapa 4: Situação
    dom.situationCards.forEach((c) => {
      c.addEventListener('click', () => {
        selectSituation(c.getAttribute('data-choice'));
      });
    });

    dom.btnSeeResult.addEventListener('click', () => {
      if (state.situationChoice) goToStep(5);
    });

    // Tela de Resultado: Abrir Modal de Redes Sociais
    dom.btnShareResult.addEventListener('click', openShareModal);
    dom.btnCloseShareModal.addEventListener('click', closeShareModal);
    dom.shareModal.addEventListener('click', (e) => {
      if (e.target === dom.shareModal) closeShareModal();
    });

    // Ações das redes no modal
    dom.shareInstagram.addEventListener('click', () => {
      generateAndShareCard('story');
    });

    dom.btnDownloadStory.addEventListener('click', () => {
      generateAndShareCard('story');
    });

    dom.btnDownloadFeed.addEventListener('click', () => {
      generateAndShareCard('feed');
    });

    dom.btnRestartQuiz.addEventListener('click', () => {
      state.step = 0;
      state.scenario = null;
      state.plant = null;
      state.cart = [];
      state.situationChoice = null;
      goToStep(0);
    });
  }

  // Registra Service Worker se suportado
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  // Inicia aplicação
  document.addEventListener('DOMContentLoaded', init);
})();
