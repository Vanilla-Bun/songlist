		const CONFIG = { DATA_URL: "export.json" };
	
    const ENABLE_MOBILE_CARDS = true;
    const ENABLE_I18N = true;
    const ENABLE_RANDOM_PLACEHOLDER = true;

    const TAGS_HIDDEN = new Set(["На других языках"]);

    const SUPPORTED_LOCALES = ["ru", "en"];
    const DEFAULT_LOCALE = "ru";
    const LOCALE_STORAGE_KEY = "ui.locale";

    const SUPPORTED_THEMES = ["dark", "light"];
    const DEFAULT_THEME = "dark";
    const THEME_STORAGE_KEY = "ui.theme";
		const EMPTY_STATE_ICON = "⌀";

    const STRINGS = {
      ru: {
        app: {
          title: "Список песен Vanilla Bun",
          settings: "Настройки",
          settingsTitle: "Настройки",
					settingsDescription: "Панель настроек языка и темы",
					controlsRegion: "Панель управления: поиск, фильтры и настройки",
          settingsLanguage: "Язык",
          settingsTheme: "Тема",
					filtersToggle: "Фильтры",
          languageRu: "Русский",
          languageEn: "English",
          themeDark: "Тёмная",
          themeLight: "Светлая"
        },
				search: {
					label: "Поиск по названию, исполнителю или категории",
					clearAria: "Очистить поиск",
					placeholderDefault: "Введите исполнителя, песню или категорию",
					placeholderPrefix: "например:"
				},
        table: {				
          ariaLabel: "Список песен",
					caption: "Список песен",
					cardsAria: "Карточки песен",          
          col: { title: "Название", artist: "Исполнитель", tags: "Категории", request: "Заказ" },
          requestBtn: "Заказать",
          requestAria: "Заказать: {artist} – {title}",
          emptyTitle: "Ничего не найдено",
          emptyHint: "Попробуйте изменить запрос или выбрать другие фильтры"
        },
        pagination: {
          itemsPerPageLabel: "На странице",
					controlsAria: "Навигация по страницам",
          firstAria: "Первая страница",
          prevAria: "Предыдущая страница",
          nextAria: "Следующая страница",
          lastAria: "Последняя страница",
          all: "Все",
          info: "{from}–{to} / {total}"
        },
				modal: {
					title: "Поддержать или заказать песню",
					conditionsMain: "Заказать песню при поддержке от 300₽",
					conditionsSub: "или за баллы канала",
					songLabel: "Вы выбрали песню:",
					cardLabel: "Поддержка на карту Т-Банк:",
					bonusText: "Сигна в подарок за поддержку от 500₽",
					cancelBtn: "Отмена",
					closeAria: "Закрыть окно",
					cancelAria: "Отменить и закрыть окно",
					copyAria: "Скопировать название песни",
					cardCopyAreaAria: "Номер карты. Нажмите, чтобы скопировать",
					dialogDescription: "Посмотреть способы поддержки и заказа выбранной песни",
					cardLoadFailed: "Ошибка загрузки номера карты",
				},
        toast: { copiedSong: "Название песни скопировано", copiedCard: "Номер карты скопирован", clipboardFailed: "Не удалось скопировать" },
        a11y: { modalOpened: "Открыто окно с информацией о поддержке или заказе песни", modalClosed: "Окно закрыто" }
      },
      en: {
        app: {
          title: "Vanilla Bun Songlist",
          settings: "Settings",
          settingsTitle: "Settings",
					settingsDescription: "Language and theme settings",
					controlsRegion: "Control panel: search, filters, and settings",
          settingsLanguage: "Language",
          settingsTheme: "Theme",
					filtersToggle: "Filters",
          languageRu: "Russian",
          languageEn: "English",
          themeDark: "Dark",
          themeLight: "Light"
        },
				search: {
					label: "Search by title, artist, or category",
					clearAria: "Clear search",
					placeholderDefault: "Type an artist, song title, or category",
					placeholderPrefix: "e.g."
				},
        table: {
          ariaLabel: "Song list",
          caption: "Song list",
					cardsAria: "Song cards",
          col: { title: "Title", artist: "Artist", tags: "Categories", request: "Request" },
          requestBtn: "Request",
          requestAria: "Request: {artist} – {title}",
          emptyTitle: "No songs found",
          emptyHint: "Try changing your search or selecting different filters"
        },
        pagination: {
          itemsPerPageLabel: "Items per page",
					controlsAria: "Page navigation",
          firstAria: "First page",
          prevAria: "Previous page",
          nextAria: "Next page",
          lastAria: "Last page",
          all: "All",
          info: "{from}–{to} / {total}"
        },
				modal: {
					title: "Request a Song or Support",
					conditionsMain: "Song requests start at $4 (≈300₽)",
					conditionsSub: "or use channel points",
					songLabel: "Selected song:",
					cardLabel: "Direct bank transfer (Russia only)",
					bonusText: "Donate $6+ (≈500₽) and get a free Fan Sign!",
					cancelBtn: "Cancel",
					closeAria: "Close window",
					cancelAria: "Cancel and close window",
					copyAria: "Copy song title",
					cardCopyAreaAria: "Card number. Click to copy",
					dialogDescription: "View support options and request this song",
					cardLoadFailed: "Failed to load card number",
				},
        toast: { copiedSong: "Song title copied", copiedCard: "Card number copied", clipboardFailed: "Failed to copy" },
        a11y: { modalOpened: "Song request and support dialog opened", modalClosed: "Dialog closed" }
      }
    };

    function normalizeLocale(input) {
      if (input === null || input === undefined) return null;
      const raw = String(input).trim();
      if (!raw) return null;
      const primary = raw.split("-")[0];
      if (!primary) return null;
      const lower = primary.toLowerCase();
      if (lower === "ru") return "ru";
      if (lower === "en") return "en";
      return lower;
    }

    function pickInitialLocale() {
      try {
        const stored = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
        if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
      } catch {
				// noop
			}

      const langs = [];
      try {
        if (Array.isArray(navigator.languages)) langs.push(...navigator.languages);
        if (navigator.language) langs.push(navigator.language);
      } catch {
				// noop
			}

      for (let i = 0; i < langs.length; i++) {
        const normalized = normalizeLocale(langs[i]);
        if (normalized && SUPPORTED_LOCALES.includes(normalized)) return normalized;
      }
      return DEFAULT_LOCALE;
    }

    function setDocumentLang(locale) {
      document.documentElement.lang = locale;
    }

    function normalizeTheme(input) {
      if (input === null || input === undefined) return null;
      const raw = String(input).trim().toLowerCase();
      if (!raw) return null;
      if (raw === "dark") return "dark";
      if (raw === "light") return "light";
      return null;
    }

    function pickInitialTheme() {
      try {
        const stored = normalizeTheme(localStorage.getItem(THEME_STORAGE_KEY));
        if (stored && SUPPORTED_THEMES.includes(stored)) return stored;
      } catch {
				// noop
			}

      try {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
      } catch {
				// noop
			}

      return DEFAULT_THEME;
    }

    function applyTheme(theme) {
      const normalized = normalizeTheme(theme);
      const nextTheme = normalized && SUPPORTED_THEMES.includes(normalized) ? normalized : DEFAULT_THEME;
      document.documentElement.dataset.theme = nextTheme;
      try {
        document.documentElement.style.colorScheme = nextTheme;
      } catch {
				// noop
			}
    }

    function getByPath(obj, dottedKey) {
      if (!obj || !dottedKey) return undefined;
      const parts = String(dottedKey).split(".");
      let cur = obj;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        if (!cur || typeof cur !== "object" || !(p in cur)) return undefined;
        cur = cur[p];
      }
      return cur;
    }

    function t(key, locale = "ru", vars) {
      if (!ENABLE_I18N) return key;
      const loc = normalizeLocale(locale) || DEFAULT_LOCALE;
      const primaryDict = STRINGS[loc] ? STRINGS[loc] : null;
      const fallbackDict = STRINGS[DEFAULT_LOCALE] ? STRINGS[DEFAULT_LOCALE] : null;

      let value = undefined;
      if (primaryDict) value = getByPath(primaryDict, key);
      if (value === undefined && fallbackDict) value = getByPath(fallbackDict, key);
      if (value === undefined) value = null;

      if (value === null) return key;

      let str = String(value);
      if (vars && typeof vars === "object") {
        str = str.replace(/\{(\w+)\}/g, (m, name) => {
          if (Object.prototype.hasOwnProperty.call(vars, name)) return String(vars[name]);
          return m;
        });
      }
      return str;
    }

		function setRandomSearchPlaceholder(allSongs) {
			if (!ENABLE_RANDOM_PLACEHOLDER) return;

			const input = document.getElementById("searchInput");
			if (!input) return;

			const locale = appState?.ui?.locale ?? DEFAULT_LOCALE;
			const isNarrowMobile = window.matchMedia("(max-width: 480px)").matches;
			const prefix = isNarrowMobile ? "" : t("search.placeholderPrefix", locale);

			const songs = Array.isArray(allSongs) ? allSongs : [];
			if (!songs.length) return;

			const pick = songs[Math.floor(Math.random() * songs.length)];
			if (!pick) return;

			const artist = (pick.artist ?? "").toString().trim();
			const title = (pick.title ?? "").toString().trim();
			if (!artist && !title) return;

			input.placeholder = `${prefix} ${artist} — ${title}`.trim();
		}
		
		function applySearchPlaceholder(allSongs, locale = appState?.ui?.locale ?? DEFAULT_LOCALE) {
			const input = document.getElementById("searchInput");
			if (!input) return;

			if (ENABLE_RANDOM_PLACEHOLDER) {
				setRandomSearchPlaceholder(allSongs);
				return;
			}

			input.placeholder = t("search.placeholderDefault", locale);
		}
		
    // -------------------------
    // JSDoc Types
    // -------------------------

    /**
     * @typedef {Object} Song
     * Нормализованный объект песни. Создаётся конвейером parse→normalize→index
     * в normalizeFields() и никогда не изменяется после создания.
     *
     * @property {string|undefined} id
     *   Оригинальный id из API. Может быть undefined, если API не вернул id.
     *   Для идентификации в DOM используй fallbackId.
     *
     * @property {string} fallbackId
     *   Стабильный ключ вида "artist::title" (нормализованный).
     *   Используется в SongTable.getRowKey() и SongCards.getCardKey()
     *   для key-based reconciliation DOM-элементов.
     *
     * @property {string} title    — Оригинальное название песни (для отображения)
     * @property {string} artist   — Оригинальное имя исполнителя (для отображения)
     *
     * @property {string[]} attributes
     *   Массив категорий/тегов, прошедших белый список isAllowedTagAttribute().
     *   Используется для рендеринга тегов и фильтрации.
     *
     * @property {string} searchTitle    — normalize(title): без диакритики, lowercase
     * @property {string} searchArtist   — normalize(artist): без диакритики, lowercase
     * @property {string} searchAttributes — normalize(attributes).join(", ")
     *
     * @property {string} searchBlob
     *   Единая предвычисленная строка для полнотекстового поиска:
     *   normalizeForSearch(title + " " + artist + " " + attributes.join(" ")).
     *   Используется в applySearch() для быстрого String.includes() без повторной нормализации.
     *
     * @property {boolean} [active] — Флаг активности из API (фильтруется до нормализации)
     */

    /**
     * @typedef {Object} PaginationMeta
     * @property {number} startIndex  — Индекс первого элемента на странице (0-based)
     * @property {number} endIndex    — Индекс последнего элемента (exclusive)
     * @property {number} totalPages
     * @property {number} totalCount  — Общее число отфильтрованных песен
     * @property {number} currentPage
     */

    /**
     * @typedef {Object} AppState
     * @property {{ allSongs: Song[], sha: string|null, isLoading: boolean, error: string|null }} data
     * @property {{ locale: string, theme: string, search: {query: string},
     *   filters: {activeKeys: string[]}, sort: {column: string|null, direction: string},
     *   pagination: {currentPage: number, itemsPerPageRaw: number},
     *   modal: {isOpen: boolean, selectedSong: Song|null, isCardNumberLoading: boolean,
     *            cardNumber: string|null, cardNumberError: string|null, lastCopyAction: string|null},
     *   toast: {isVisible: boolean, message: string} }} ui
     */

    // -------------------------
    // Pure helpers
    // -------------------------
		function fixKeyboardLayout(str) {
			if (!str) return "";
			const map = {
				q: "й", w: "ц", e: "у", r: "к", t: "е", y: "н", u: "г", i: "ш", o: "щ", p: "з", "[": "х", "]": "ъ",
				a: "ф", s: "ы", d: "в", f: "а", g: "п", h: "р", j: "о", k: "л", l: "д", ";": "ж", "'": "э",
				z: "я", x: "ч", c: "с", v: "м", b: "и", n: "т", m: "ь", ",": "б", ".": "ю", "`": "ё",
				й: "q", ц: "w", у: "e", к: "r", е: "t", н: "y", г: "u", ш: "i", щ: "o", з: "p", х: "[", ъ: "]",
				ф: "a", ы: "s", в: "d", а: "f", п: "g", р: "h", о: "j", л: "k", д: "l", ж: ";", э: "'",
				я: "z", ч: "x", с: "c", м: "v", и: "b", т: "n", ь: "m", б: ",", ю: ".", ё: "`"
			};
			return str.split("").map((ch) => map[ch] || ch).join("");
		}

		function normalizeForSearch(value) {
			return (value ?? "")
				.toString()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.toLowerCase()				
				.replace(/ё/g, "е")
				.replace(/і/g, "и")
				.replace(/ї/g, "и")
				.replace(/є/g, "е")
				.replace(/\$/g, "s")
				.replace(/(?<=[а-я])s|s(?=[а-я])/g, "с")
				.replace(/(?<=[а-я])z|z(?=[а-я])/g, "з")
				.replace(/[^a-zа-я0-9\s]/g, " ")
				.replace(/\s+/g, " ")
				.trim();
		}

		function normalize(value) {
			return normalizeForSearch(value);
		}

    function computeFallbackId(song) {
      const a = normalize(song.artist);
      const tt = normalize(song.title);
      return a + "::" + tt;
    }
		
		function detectScript(str) {
			if (!str) return "unknown";

			const hasCyr = /[а-яё]/i.test(str);
			const hasLat = /[a-z]/i.test(str);

			if (hasCyr && !hasLat) return "cyrillic";
			if (hasLat && !hasCyr) return "latin";
			if (hasLat && hasCyr) return "mixed";

			return "unknown";
		}

		function shouldUseLayoutVariant(query) {
			if (!query) return false;

			const trimmed = query.trim();
			if (trimmed.length < 3) return false;

			const script = detectScript(trimmed);

			return script === "latin" || script === "cyrillic";
		}		

		function buildSearchVariants(value) {
			const raw = (value ?? "").toString();
			const direct = normalizeForSearch(raw);

			const variants = new Set();
			if (direct) variants.add(direct);
			
			const lowerRaw = raw.toLowerCase();

			if (shouldUseLayoutVariant(raw)) {
				const fixed = normalizeForSearch(fixKeyboardLayout(raw.toLowerCase()));
				if (fixed && fixed !== direct) variants.add(fixed);
			}

			return Array.from(variants);
		}

    function parseSongAttributes(song) {
      const attrArray = Array.isArray(song.attributes)
        ? song.attributes
        : (song.attributes ? song.attributes.toString().split(",").map((s) => s.trim()) : []);
      return { ...song, attributes: attrArray };
    }
		
    function normalizeSong(song) {
      const visibleAttributes = song.attributes.filter((attr) => isAllowedTagAttribute(attr));
      const rawId = (song.id ?? "").toString().trim();
      const fallbackId = computeFallbackId(song);
      return {
        ...song,
        id: rawId ? rawId : undefined,
        fallbackId,
        attributes: visibleAttributes
      };
    }
		
    function indexSong(song) {
      const titleN = normalize(song.title);
      const artistN = normalize(song.artist);
      const attrsN = song.attributes.map(normalize).join(", ");
      const searchBlobRaw = [song.title, song.artist, song.attributes.join(" ")].join(" ");
      return {
        ...song,
        searchTitle: titleN,
        searchArtist: artistN,
        searchAttributes: attrsN,
        searchBlob: normalizeForSearch(searchBlobRaw)
      };
    }
		
    function debounce(fn, delayMs) {
      let tmr = null;
      return function debounced(...args) {
        if (tmr) clearTimeout(tmr);
        tmr = setTimeout(() => fn.apply(this, args), delayMs);
      };
    }
		
    function normalizeFields(rawSongs) {
      return rawSongs.map((song) => indexSong(normalizeSong(parseSongAttributes(song))));
    }

		function applySearch(songs, searchState) {
			const trimmed = searchState && searchState.query ? searchState.query.trim() : "";
			if (!trimmed) return songs;

			const variants = buildSearchVariants(trimmed);

			const directVariant = variants[0];
			const layoutVariant = variants.length > 1 ? variants[1] : null;

			const directWords = directVariant.split(" ").filter(Boolean);
			if (!directWords.length) return songs;

			const directMatches = songs.filter((song) => {
				const haystack = song.searchBlob || "";
				return directWords.every((w) => haystack.includes(w));
			});

			if (directMatches.length > 0) return directMatches;

			if (!layoutVariant) return [];

			const layoutWords = layoutVariant.split(" ").filter(Boolean);
			if (!layoutWords.length) return [];

			const layoutMatches = songs.filter((song) => {
				const haystack = song.searchBlob || "";
				return layoutWords.every((w) => haystack.includes(w));
			});

			if (layoutMatches.length > 0) return layoutMatches;

			return [];
		}

    function applyFilters(songs, filtersState, filterMap) {
      const activeKeys = filtersState && Array.isArray(filtersState.activeKeys) ? filtersState.activeKeys : [];
      if (activeKeys.length === 0) return songs;

      return songs.filter((song) => {
        const attrsNorm = song.searchAttributes;
        return activeKeys.every((key) => {
          const requiredAttrs = filterMap[key];
          return requiredAttrs.some((reqNorm) => attrsNorm.includes(reqNorm));
        });
      });
    }

    function applySort(songs, sortState, locale) {
      if (!sortState || !sortState.column) return songs;

      const sorted = songs.slice();
      const column = sortState.column;
      const direction = sortState.direction === "desc" ? "desc" : "asc";

      const pick = (s) => {
        if (column === "title") return s.searchTitle;
        if (column === "artist") return s.searchArtist;
        return "";
      };

      const loc = normalizeLocale(locale) || DEFAULT_LOCALE;

      return sorted.sort((a, b) => {
        const valA = pick(a);
        const valB = pick(b);
        const cmp = valA.localeCompare(valB, loc);
        return direction === "asc" ? cmp : -cmp;
      });
    }

		function paginate(songs, paginationState) {
			const total = songs.length;
			const currentPageRaw = paginationState && typeof paginationState.currentPage === "number" ? paginationState.currentPage : 1;
			const itemsPerPageRaw = paginationState && typeof paginationState.itemsPerPageRaw === "number" ? paginationState.itemsPerPageRaw : 10;

			const perPage = itemsPerPageRaw < 0 ? Math.max(total, 1) : itemsPerPageRaw;
			const totalPages = Math.max(1, Math.ceil(total / perPage));
			const currentPage = Math.min(Math.max(currentPageRaw, 1), totalPages);

			let startIndex = (currentPage - 1) * perPage;
			let endIndex = Math.min(startIndex + perPage, total);

			if (itemsPerPageRaw >= 0 && total > 0 && currentPage === totalPages) {
				endIndex = total;
				startIndex = Math.max(0, total - perPage);
			}

			return { visibleSongs: songs.slice(startIndex, endIndex), startIndex,	endIndex,	totalPages,	totalCount: total, currentPage };
		}

    function deriveVisibleSongs(state) {
      const filteredSongs = selectFilteredSongs(state);
      const paginationState = state.ui.pagination;
      const page = paginate(filteredSongs, paginationState);

      return {
        visibleSongs: page.visibleSongs,
        paginationMeta: {
          startIndex: page.startIndex,
          endIndex: page.endIndex,
          totalPages: page.totalPages,
          totalCount: page.totalCount,
          currentPage: page.currentPage
        }
      };
    }

    function selectFilteredSongs(state) {
      let result = state.data.allSongs;
      result = applySearch(result, state.ui.search);
      result = applyFilters(result, state.ui.filters, FILTER_MAP);
      result = applySort(result, state.ui.sort, state.ui.locale);
      return result;
    }

		const FILTER_DEFS = {
			earth:		{ icon: "🌍", label: "На других языках", allow: true, attributes: ["Английские", "Французские", "Итальянские", "Молдавские", "Украинские", "Хинди"] },
			film:			{ icon: "🎬", label: "Из кинофильмов", allow: true, attributes: ["Из кинофильмов"] },
			mult:			{ icon: "🧸", label: "Из мультфильмов", allow: true, attributes: ["Из мультфильмов"] },
			ny:				{ icon: "🎄", label: "Новогодние", allow: false, attributes: ["Новогодние"] },
			piano:		{ icon: "🎹", label: "Лирические", allow: true, attributes: ["Лирические"] },
			dance:		{ icon: "💃", label: "Потанцевать", allow: true, attributes: ["Потанцевать"] },
			rock:			{ icon: "🎸", label: "Рок", allow: true, attributes: ["РОК"] },
			pop:			{ icon: "📀", label: "Поп", allow: true, attributes: ["ПОП"] },
			folk:			{ icon: "🎶", label: "Народные", allow: true, attributes: ["Народные"] },
			chanson:	{ icon: "🍷️", label: "Шансон", allow: true, attributes: ["Шансон"] },
			retro:		{ icon: "🎙️", label: "Ретро", allow: true, attributes: ["Ретро"] },
			cappella:	{ icon: "🗣️", label: "А капелла", allow: false, attributes: ["А капелла", "A capella"] },
			lullaby:	{ icon: "😴", label: "Колыбельные", allow: false, attributes: ["Колыбельные"] },
		};

    const FILTER_MAP = Object.fromEntries(
      Object.entries(FILTER_DEFS)
        .filter(([_, def]) => def.allow)
        .map(([key, def]) => [key, def.attributes.map(normalize)])
    );
		
		function isAllowedTagAttribute(attr) {
			const normalizedAttr = normalize(attr);
			if (!normalizedAttr) return false;
			if (TAGS_HIDDEN.has(attr)) return false;

			return Object.values(FILTER_DEFS).some((def) => {
				if (!def || !def.allow || !Array.isArray(def.attributes)) return false;
				return def.attributes.some((candidate) => normalize(candidate) === normalizedAttr);
			});
		}

    // -------------------------
    // Live regions announce
    // -------------------------
    function announceToScreenReader(message, isAssertive = false) {
      const regionId = isAssertive ? "live-region-assertive" : "live-region-polite";
      const region = document.getElementById(regionId);
      if (!region) return;

      region.textContent = "";
      setTimeout(() => { region.textContent = message; }, 50);
      setTimeout(() => { region.textContent = ""; }, 3000);
    }

    // -------------------------
    // Card number decode
    // -------------------------
    const encodedCard = "MjIwMCA3MDIwIDQ5MDcgNzQ0NA==";

    function decodeCardNumber(encoded) {
      try {
        const decoded = atob(encoded);
        return typeof decoded === "string" ? decoded : "";
      } catch (e) {
        return "";
      }
    }

    // -------------------------
    // Focus management modal
    // -------------------------
    const focusManagement = { triggerElement: null, keydownHandler: null, backdropClickHandler: null, closeButtonHandlers: [] };

    function getFocusableElements(container) {
      if (!container) return [];
      return Array.from(
        container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    }

    function setupModalFocus(modalRoot, dialogElement, onRequestClose) {
      if (!modalRoot || !dialogElement) return;

      focusManagement.triggerElement = document.activeElement;

      focusManagement.keydownHandler = (e) => {
        if (!appState.ui.modal.isOpen) return;

        if (e.key === "Escape") {
          e.preventDefault();
          onRequestClose();
          return;
        }

        if (e.key === "Tab") {
          const focusables = getFocusableElements(dialogElement);
          if (focusables.length === 0) {
            e.preventDefault();
            dialogElement.focus();
            return;
          }

          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          const active = document.activeElement;

          if (e.shiftKey) {
            if (active === first || active === dialogElement) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (active === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", focusManagement.keydownHandler);

      focusManagement.backdropClickHandler = (e) => {
        const closeEl = e.target.closest("[data-modal-close]");
        if (closeEl) return;
        if (e.target === modalRoot) onRequestClose();
      };

      modalRoot.addEventListener("click", focusManagement.backdropClickHandler);

      const closeButtons = dialogElement.querySelectorAll("[data-modal-close]");
      focusManagement.closeButtonHandlers = Array.from(closeButtons).map((btn) => {
        const h = (e) => { e.preventDefault(); onRequestClose(); };
        btn.addEventListener("click", h);
        return { element: btn, handler: h };
      });

      setTimeout(() => dialogElement.focus(), 0);
    }

    function teardownModalFocus(modalRoot) {
      if (focusManagement.keydownHandler) document.removeEventListener("keydown", focusManagement.keydownHandler);
      if (modalRoot && focusManagement.backdropClickHandler) modalRoot.removeEventListener("click", focusManagement.backdropClickHandler);
      focusManagement.closeButtonHandlers.forEach(({ element, handler }) => {
        if (element && handler) element.removeEventListener("click", handler);
      });

      const toFocus = focusManagement.triggerElement;

      focusManagement.triggerElement = null;
      focusManagement.keydownHandler = null;
      focusManagement.backdropClickHandler = null;
      focusManagement.closeButtonHandlers = [];

      setTimeout(() => { if (toFocus && typeof toFocus.focus === "function") toFocus.focus(); }, 0);
    }

    function handleModalOpenSideEffects(prevState, nextState) {
      const modalRoot = document.getElementById("requestModal");
      const dialog = modalRoot ? modalRoot.querySelector(".modaldialog") : null;
      const appRoot = document.getElementById("app");

      if (appRoot) appRoot.setAttribute("aria-hidden", "true");
      if (modalRoot) modalRoot.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      setupModalFocus(modalRoot, dialog, () => dispatch(actions.closeModal()));
    }

		function handleModalCloseSideEffects(prevState, nextState) {
			const modalRoot = document.getElementById("requestModal");
			const appRoot = document.getElementById("app");

			teardownModalFocus(modalRoot);

			if (modalRoot) modalRoot.setAttribute("aria-hidden", "true");
			if (appRoot) appRoot.removeAttribute("aria-hidden");

			document.body.style.overflow = "";
		}

    const StickyManager = {      
      rafId: null,

      _lastToolbarH: -1,
      _lastFilterbarH: -1,

      update() {
        const root = document.documentElement;

        const toolbar = document.querySelector(".toolbar");
        if (toolbar) {
          const h = Math.round(toolbar.getBoundingClientRect().height);
          if (h !== this._lastToolbarH) {
            this._lastToolbarH = h;
            root.style.setProperty("--toolbar-height", h + "px");
          }
        }

        const filterbar = document.querySelector(".filters");
        if (filterbar) {
          const h = Math.round(filterbar.getBoundingClientRect().height);
          if (h !== this._lastFilterbarH) {
            this._lastFilterbarH = h;
            root.style.setProperty("--filterbar-height", h + "px");
          }
        } else {
          if (this._lastFilterbarH !== 0) {
            this._lastFilterbarH = 0;
            root.style.setProperty("--filterbar-height", "0px");
          }
        }
      },

      schedule() {
        if (this.rafId !== null) return;
        this.rafId = requestAnimationFrame(() => {
          this.rafId = null;
          this.update();
        });
      },

      init() {
        window.addEventListener("resize", debounce(() => this.schedule(), 100));
        this.update();
      }
    };

    document.addEventListener("DOMContentLoaded", initApp);
    StickyManager.init();

    // -------------------------
    // State
    // -------------------------
    function getInitialState() {
      const storedItemsPerPage = parseInt(localStorage.getItem("itemsPerPageRaw") || "10", 10);

      return {
        data: { allSongs: [], sha: null, isLoading: false, error: null },
        ui: {
          locale: pickInitialLocale(),
          theme: pickInitialTheme(),
          search: { query: "" },
          filters: { activeKeys: [] },
          sort: { column: null, direction: "asc" },
          pagination: { currentPage: 1, itemsPerPageRaw: storedItemsPerPage },
          modal: { isOpen: false, selectedSong: null, isCardNumberLoading: false, cardNumber: null, cardNumberError: null, lastCopyAction: null },
          toast: { isVisible: false, message: "" }
        }
      };
    }

    let appState = getInitialState();

    // -------------------------
    // Actions
    // -------------------------
    const actions = {
      setSearch: (query) => ({ type: "SEARCH_SET_QUERY", payload: { query: String(query ?? "") } }),
      clearSearch: () => ({ type: "SEARCH_SET_QUERY", payload: { query: "" } }),

      toggleFilter: (key) => ({ type: "FILTER_TOGGLE", payload: { key } }),
      clearFilters: () => ({ type: "FILTER_CLEAR_ALL" }),

      setSort: (column, toggleDirection = true) => ({ type: "SORT_SET", payload: { column, toggleDirection: !!toggleDirection } }),
      clearSort: () => ({ type: "SORT_CLEAR" }),

      setPage: (page) => ({ type: "PAGE_SET", payload: { page } }),
      firstPage: () => ({ type: "PAGE_FIRST" }),
      lastPage: () => ({ type: "PAGE_LAST" }),
      nextPage: () => ({ type: "PAGE_NEXT" }),
      prevPage: () => ({ type: "PAGE_PREV" }),

      setItemsPerPage: (itemsPerPageRaw) => ({ type: "ITEMS_PER_PAGE_SET", payload: { itemsPerPageRaw } }),

      openModal: (songOrIndex) => ({ type: "MODAL_OPEN", payload: { songOrIndex } }),
      closeModal: () => ({ type: "MODAL_CLOSE" }),

      modalCardLoadStart: () => ({ type: "MODAL_CARD_LOAD_START" }),
      modalCardLoadSuccess: (cardNumber) => ({ type: "MODAL_CARD_LOAD_SUCCESS", payload: { cardNumber: String(cardNumber ?? "") } }),
      modalCardLoadError: (error) => ({ type: "MODAL_CARD_LOAD_ERROR", payload: { error: String(error ?? "Unknown error") } }),

      copyToClipboard: (type, value) => ({ type: "CLIPBOARD_COPY", payload: { type, value: String(value ?? "") } }),

      announce: (message, isAssertive = false) => ({ type: "LIVE_REGION_ANNOUNCE", payload: { message: String(message ?? ""), isAssertive: !!isAssertive } }),

      showToast: (message, duration = 3000) => ({ type: "TOAST_SHOW", payload: { message: String(message ?? ""), duration: Number(duration ?? 3000) } }),
      hideToast: () => ({ type: "TOAST_HIDE" }),

      dataLoadStart: () => ({ type: "DATA_LOAD_START" }),
      dataLoadSuccess: (songs, sha) => ({ type: "DATA_LOAD_SUCCESS", payload: { songs, sha: sha ?? null } }),
      dataLoadError: (error) => ({ type: "DATA_LOAD_ERROR", payload: { error: String(error ?? "Unknown error") } }),

      setLocale: (locale) => ({ type: "LOCALE_SET", payload: { locale } }),
      setTheme: (theme) => ({ type: "THEME_SET", payload: { theme } })
    };

    // -------------------------
    // Reducer
    // -------------------------
    function clampPage(page, stateForClamp) {
      const filtered = selectFilteredSongs(stateForClamp);
      const total = filtered.length;
      const perPageRaw = stateForClamp.ui.pagination.itemsPerPageRaw;
      const perPage = perPageRaw < 0 ? Math.max(total, 1) : perPageRaw;
      const totalPages = Math.max(1, Math.ceil(total / perPage));
      return Math.min(Math.max(page, 1), totalPages);
    }

		function resolveSongFromModalPayload(state, payload) {
      const value = payload ? payload.songOrIndex : null;
      if (value && typeof value === "object" && ("title" in value) && ("artist" in value)) return value;
      if (typeof value === "number" && Number.isFinite(value)) {
        const page = paginate(selectFilteredSongs(state), state.ui.pagination);
        return page.visibleSongs[value] || null;
      }
      return null;
    }

    function updateState(state, action) {
      switch (action.type) {
        case "DATA_LOAD_START":
          return { ...state, data: { ...state.data, isLoading: true, error: null } };

				case "DATA_LOAD_SUCCESS": {
          const songs = Array.isArray(action.payload.songs) ? action.payload.songs : [];
          const sha = action.payload.sha ?? null;
          let next = {
            ...state,
            data: { ...state.data, allSongs: songs, sha, isLoading: false, error: null },
            ui: { ...state.ui, pagination: { ...state.ui.pagination, currentPage: 1 } }
          };          

          if (next.data.allSongs.length === 0) {
            next = {
              ...next,
              ui: {
                ...next.ui,
                modal: { isOpen: false, selectedSong: null, isCardNumberLoading: false, cardNumber: null, cardNumberError: null, lastCopyAction: null }
              }
            };
          }

          const clamped = clampPage(next.ui.pagination.currentPage, next);
          if (clamped !== next.ui.pagination.currentPage) {
            next = { ...next, ui: { ...next.ui, pagination: { ...next.ui.pagination, currentPage: clamped } } };
          }
          return next;
        }

        case "DATA_LOAD_ERROR":
          return { ...state, data: { ...state.data, isLoading: false, error: action.payload.error } };

        case "SEARCH_SET_QUERY": {
          let next = { ...state, ui: { ...state.ui, search: { query: action.payload.query }, pagination: { ...state.ui.pagination, currentPage: 1 } } };

          const clamped = clampPage(next.ui.pagination.currentPage, next);
          if (clamped !== next.ui.pagination.currentPage) {
            next = { ...next, ui: { ...next.ui, pagination: { ...next.ui.pagination, currentPage: clamped } } };
          }
          return next;
        }

        case "FILTER_TOGGLE": {
          const key = action.payload.key;
          const prev = state.ui.filters.activeKeys;
          const activeKeys = prev.includes(key) ? prev.filter((k) => k !== key) : prev.concat(key);

          let next = { ...state, ui: { ...state.ui, filters: { activeKeys }, pagination: { ...state.ui.pagination, currentPage: 1 } } };

          const clamped = clampPage(next.ui.pagination.currentPage, next);
          if (clamped !== next.ui.pagination.currentPage) {
            next = { ...next, ui: { ...next.ui, pagination: { ...next.ui.pagination, currentPage: clamped } } };
          }
          return next;
        }

        case "FILTER_CLEAR_ALL": {
          let next = { ...state, ui: { ...state.ui, filters: { activeKeys: [] }, pagination: { ...state.ui.pagination, currentPage: 1 } } };

          const clamped = clampPage(next.ui.pagination.currentPage, next);
          if (clamped !== next.ui.pagination.currentPage) {
            next = { ...next, ui: { ...next.ui, pagination: { ...next.ui.pagination, currentPage: clamped } } };
          }
          return next;
        }

        case "SORT_SET": {
          const { column, toggleDirection } = action.payload;
          let direction = state.ui.sort.direction;

          if (toggleDirection) {
            if (state.ui.sort.column === column) direction = state.ui.sort.direction === "asc" ? "desc" : "asc";
            else direction = "asc";
          }

          let next = { ...state, ui: { ...state.ui, sort: { column, direction } } };

          const clamped = clampPage(next.ui.pagination.currentPage, next);
          if (clamped !== next.ui.pagination.currentPage) {
            next = { ...next, ui: { ...next.ui, pagination: { ...next.ui.pagination, currentPage: clamped } } };
          }
          return next;
        }

        case "SORT_CLEAR": {
          let next = { ...state, ui: { ...state.ui, sort: { column: null, direction: "asc" } } };

          const clamped = clampPage(next.ui.pagination.currentPage, next);
          if (clamped !== next.ui.pagination.currentPage) {
            next = { ...next, ui: { ...next.ui, pagination: { ...next.ui.pagination, currentPage: clamped } } };
          }
          return next;
        }

        case "PAGE_SET": {
          const desired = Number(action.payload.page ?? 1);
          const clamped = clampPage(desired, state);
          return { ...state, ui: { ...state.ui, pagination: { ...state.ui.pagination, currentPage: clamped } } };
        }

        case "PAGE_FIRST": {
          const clamped = clampPage(1, state);
          return { ...state, ui: { ...state.ui, pagination: { ...state.ui.pagination, currentPage: clamped } } };
        }

        case "PAGE_LAST": {
          const derived = deriveVisibleSongs(state);
          const last = derived.paginationMeta.totalPages || 1;
          const clamped = clampPage(last, state);
          return { ...state, ui: { ...state.ui, pagination: { ...state.ui.pagination, currentPage: clamped } } };
        }

        case "PAGE_NEXT": {
          const derived = deriveVisibleSongs(state);
          const totalPages = derived.paginationMeta.totalPages || 1;
          const nextPage = Math.min(state.ui.pagination.currentPage + 1, totalPages);
          const clamped = clampPage(nextPage, state);
          return { ...state, ui: { ...state.ui, pagination: { ...state.ui.pagination, currentPage: clamped } } };
        }

        case "PAGE_PREV": {
          const prevPage = Math.max(state.ui.pagination.currentPage - 1, 1);
          const clamped = clampPage(prevPage, state);
          return { ...state, ui: { ...state.ui, pagination: { ...state.ui.pagination, currentPage: clamped } } };
        }

        case "ITEMS_PER_PAGE_SET": {
          const raw = Number(action.payload.itemsPerPageRaw);
          const itemsPerPageRaw = Number.isFinite(raw) ? raw : 10;
          return { ...state, ui: { ...state.ui, pagination: { ...state.ui.pagination, itemsPerPageRaw, currentPage: 1 } } };
        }

				case "MODAL_OPEN": {
					const selectedSong = resolveSongFromModalPayload(state, action.payload);
					const isOpen = !!selectedSong;

					return {
						...state,
						ui: {
							...state.ui,
							modal: {
								isOpen,
								selectedSong,
								isCardNumberLoading: false,
								cardNumber: null,
								cardNumberError: null,
								lastCopyAction: null,
							}
						}
					};
				}

        case "MODAL_CLOSE":
          return { ...state, ui: { ...state.ui, modal: { isOpen: false, selectedSong: null, isCardNumberLoading: false, cardNumber: null, cardNumberError: null, lastCopyAction: null } } };

        case "MODAL_CARD_LOAD_START":
          return { ...state, ui: { ...state.ui, modal: { ...state.ui.modal, isCardNumberLoading: true, cardNumber: null, cardNumberError: null } } };

        case "MODAL_CARD_LOAD_SUCCESS":
          return { ...state, ui: { ...state.ui, modal: { ...state.ui.modal, isCardNumberLoading: false, cardNumber: action.payload.cardNumber, cardNumberError: null } } };

        case "MODAL_CARD_LOAD_ERROR":
          return { ...state, ui: { ...state.ui, modal: { ...state.ui.modal, isCardNumberLoading: false, cardNumber: null, cardNumberError: action.payload.error } } };

        case "CLIPBOARD_COPY":
          return { ...state, ui: { ...state.ui, modal: { ...state.ui.modal, lastCopyAction: action.payload.type } } };

        case "TOAST_SHOW":
          return { ...state, ui: { ...state.ui, toast: { isVisible: true, message: action.payload.message } } };

        case "TOAST_HIDE":
          return { ...state, ui: { ...state.ui, toast: { ...state.ui.toast, isVisible: false } } };

        case "LOCALE_SET": {
          const normalized = normalizeLocale(action.payload.locale);
          const locale = normalized && SUPPORTED_LOCALES.includes(normalized) ? normalized : DEFAULT_LOCALE;
          return { ...state, ui: { ...state.ui, locale } };
        }

        case "THEME_SET": {
          const normalized = normalizeTheme(action.payload.theme);
          const theme = normalized && SUPPORTED_THEMES.includes(normalized) ? normalized : DEFAULT_THEME;
          return { ...state, ui: { ...state.ui, theme } };
        }

        default:
          return state;
      }
    }

    // -------------------------
    // Side-effects
    // -------------------------
    let toastTimerId = null;
    let lastPlaceholderShaApplied = null;
		
		function runToastEffects(action) {
			if (action.type === "TOAST_SHOW") {
				const duration =
					action.payload && Number.isFinite(action.payload.duration) ? action.payload.duration : 3000;

				if (toastTimerId) clearTimeout(toastTimerId);
				toastTimerId = window.setTimeout(() => dispatch(actions.hideToast()), duration);
			}

			if (action.type === "TOAST_HIDE") {
				if (toastTimerId) clearTimeout(toastTimerId);
				toastTimerId = null;
			}
		}

		function persistUiSettings(action, nextState) {
			if (action.type === "ITEMS_PER_PAGE_SET") {
				localStorage.setItem("itemsPerPageRaw", String(nextState.ui.pagination.itemsPerPageRaw));
			}

			if (action.type === "LOCALE_SET") {
				localStorage.setItem(LOCALE_STORAGE_KEY, nextState.ui.locale);
				setDocumentLang(nextState.ui.locale);
			}

			if (action.type === "THEME_SET") {
				localStorage.setItem(THEME_STORAGE_KEY, nextState.ui.theme);
				applyTheme(nextState.ui.theme);
			}
		}

		function runModalEffects(prevState, nextState) {
			const wasOpen = !!prevState.ui.modal.isOpen;
			const isOpen = !!nextState.ui.modal.isOpen;

			if (!wasOpen && isOpen) {
				handleModalOpenSideEffects(prevState, nextState);
				const locale = nextState?.ui?.locale ?? DEFAULT_LOCALE;
				announceToScreenReader(t("a11y.modalOpened", locale), false);
			}

			if (wasOpen && !isOpen) {
				handleModalCloseSideEffects(prevState, nextState);
				const locale = nextState?.ui?.locale ?? DEFAULT_LOCALE;
				announceToScreenReader(t("a11y.modalClosed", locale), false);
			}
		}

    function applyActionDirect(action) {
      appState = updateState(appState, action);
      renderApp(appState);
    }
		
    function runModalCardLoadEffects(action, nextState) {
      if (action.type !== "MODAL_OPEN") return;

      const isOpen = !!nextState?.ui?.modal?.isOpen;
      if (!isOpen) return;

      applyActionDirect(actions.modalCardLoadStart());

      const decoded = decodeCardNumber(encodedCard);
      if (decoded) {
        applyActionDirect(actions.modalCardLoadSuccess(decoded));
        return;
      }

      const locale = nextState?.ui?.locale ?? DEFAULT_LOCALE;
      applyActionDirect(actions.modalCardLoadError(t("modal.cardLoadFailed", locale)));
    }
		
		async function runClipboardEffects(action, nextState) {
			if (action.type !== "CLIPBOARD_COPY") return;

			const { type, value } = action.payload;
			if (!value) return;

			const locale = nextState?.ui?.locale ?? DEFAULT_LOCALE;

			try {
				if (navigator.clipboard && navigator.clipboard.writeText) {
					await navigator.clipboard.writeText(value);

					const successMessage =
						type === "song"
							? t("toast.copiedSong", locale, { value })
							: t("toast.copiedCard", locale);

					dispatch(actions.showToast(successMessage, 3000));
					announceToScreenReader(successMessage, false);
				} else {
					throw new Error("Clipboard API not available");
				}
			} catch (e) {
				const errorMessage = t("toast.clipboardFailed", locale);
				dispatch(actions.showToast(errorMessage, 3000));
				announceToScreenReader(errorMessage, true);
			}
		}

		function runStickyEffects(action) {
			if (
				action.type === "FILTER_TOGGLE" ||
				action.type === "FILTER_CLEAR_ALL" ||
				action.type === "ITEMS_PER_PAGE_SET"
			) {
				StickyManager.schedule();
			}
		}

		function runLiveRegionEffects(action) {
			if (action.type !== "LIVE_REGION_ANNOUNCE") return;
			const msg = action.payload ? action.payload.message : "";
			const isAssertive = !!(action.payload && action.payload.isAssertive);
			if (msg) announceToScreenReader(msg, isAssertive);
		}

		function runJsonEffects(action, nextState) {
			if (action.type !== "DATA_LOAD_SUCCESS") return;

			if (!ENABLE_RANDOM_PLACEHOLDER) {
				lastPlaceholderShaApplied = null;
				applySearchPlaceholder(nextState?.data?.allSongs, nextState?.ui?.locale);
				return;
			}

			const sha = nextState && nextState.data ? nextState.data.sha : null;
			const uniqueKey = sha || "no-sha";
			if (lastPlaceholderShaApplied === uniqueKey) return;

			lastPlaceholderShaApplied = uniqueKey;
			applySearchPlaceholder(nextState.data.allSongs, nextState.ui.locale);
		}

		async function handleSideEffects(action, prevState, nextState) {
			runToastEffects(action);
			persistUiSettings(action, nextState);
			runModalEffects(prevState, nextState);
			runModalCardLoadEffects(action, nextState);
			await runClipboardEffects(action, nextState);
			runStickyEffects(action);
			runLiveRegionEffects(action);
			runJsonEffects(action, nextState);
		}

		function dispatch(action) {
      const prevState = appState;
      const nextState = updateState(appState, action);
      appState = nextState;

      const derived = deriveVisibleSongs(nextState);
      renderApp(nextState, derived);
      applyStaticI18n(nextState);

      queueMicrotask(() => handleSideEffects(action, prevState, nextState));
    }
		
		function renderFilterButtons(container) {
			if (!container) return;

			const frag = document.createDocumentFragment();

			Object.entries(FILTER_DEFS)
				.filter(([_, def]) => def.allow)
				.forEach(([key, def]) => {
					const btn = document.createElement("button");
					btn.type = "button";
					btn.className = "chip";
					btn.dataset.filter = key;
					btn.setAttribute("aria-pressed", "false");

					const icon = document.createElement("span");
					icon.className = "icon";
					icon.setAttribute("aria-hidden", "true");
					icon.textContent = def.icon ?? "";

					const label = document.createElement("span");
					label.textContent = def.label ?? "";

					btn.appendChild(icon);
					btn.appendChild(label);
					frag.appendChild(btn);
				});

			if (container.replaceChildren) container.replaceChildren(frag);
			else {
				container.textContent = "";
				container.appendChild(frag);
			}
		}

		function renderTagsToContainer(attrs, container) {
			if (!container) return;

			const parts = Array.isArray(attrs)
				? attrs.filter((attr) => isAllowedTagAttribute(attr))
				: (attrs ?? "").toString().split(",").map((s) => s.trim()).filter(Boolean).filter((attr) => isAllowedTagAttribute(attr));

			const frag = document.createDocumentFragment();

			for (let i = 0; i < parts.length; i++) {
				const span = document.createElement("span");
				span.className = "tag";
				span.textContent = parts[i];
				frag.appendChild(span);
			}

			if (container.replaceChildren) container.replaceChildren(frag);
			else {
				container.textContent = "";
				container.appendChild(frag);
			}
		}	

    // -------------------------
    // Components
    // -------------------------
    const SettingsMenu = {
      buttonElement: null,
      panelElement: null,
      localeToggle: null,
      themeToggle: null,
      isOpen: false,
      api: null,
      outsideClickHandler: null,
      keydownHandler: null,

      init(rootElement, api) {
        this.api = api;

        this.buttonElement = document.getElementById("settingsButton");
        this.panelElement = document.getElementById("settingsPanel");
				this.closeButton = document.getElementById("settingsCloseButton");
        this.localeToggle = document.getElementById("localeToggle");
        this.themeToggle = document.getElementById("themeToggle");

        if (!this.buttonElement || !this.panelElement) return;

        this.buttonElement.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggle();
        });	
				
				if (this.localeToggle) {
					this.localeToggle.addEventListener("change", (e) => {
						if (e.target.name !== "locale") return;
						this.api.setLocale(e.target.value);
					});
				}
				
				if (this.themeToggle) {
					this.themeToggle.addEventListener("change", (e) => {
						if (e.target.name !== "theme") return;
						this.api.setTheme(e.target.value);
					});
				}
				
				if (this.closeButton) {
					this.closeButton.addEventListener("click", () => {
						this.close(true);
					});
				}

        this.outsideClickHandler = (e) => {
          if (!this.isOpen) return;
          const target = e.target;
          if (!target) return;
          if (this.panelElement.contains(target)) return;
          if (this.buttonElement.contains(target)) return;
          this.close();
        };

        this.keydownHandler = (e) => {
          if (!this.isOpen) return;
          if (e.key === "Escape") {
            e.preventDefault();
            this.close(true);
          }
        };

        document.addEventListener("mousedown", this.outsideClickHandler);
        document.addEventListener("keydown", this.keydownHandler);
      },

      toggle() {
        if (this.isOpen) this.close(true);
        else this.open();
      },
			
			open() {
				if (!this.buttonElement || !this.panelElement) return;

				this.isOpen = true;
				this.panelElement.hidden = false;
				this.panelElement.removeAttribute("inert");
				this.buttonElement.setAttribute("aria-expanded", "true");

				this.syncToggleValues();

				const first = this.panelElement.querySelector(
					'.toggle-switch, button, a[href], input, [tabindex]:not([tabindex="-1"])'
				);

				if (first && typeof first.focus === "function") {
					setTimeout(() => first.focus(), 0);
				}
			},

			close(returnFocus = false) {
				if (!this.buttonElement || !this.panelElement) return;

        if (returnFocus && typeof this.buttonElement.focus === "function") {
          this.buttonElement.focus();
        }
				
        this.isOpen = false;
        this.panelElement.setAttribute("inert", "");
        this.panelElement.hidden = true;
        this.buttonElement.setAttribute("aria-expanded", "false");
			},
			
			syncToggleValues() {
				const currentLocale = appState?.ui?.locale || DEFAULT_LOCALE;
				const currentTheme = appState?.ui?.theme || DEFAULT_THEME;

				if (this.localeToggle) {
					this.localeToggle.dataset.value = currentLocale;

					const inputs = this.localeToggle.querySelectorAll("input[name='locale']");
					inputs.forEach((input) => {
						input.checked = input.value === currentLocale;
						input.closest(".toggle-option")
							.classList.toggle("toggle-option--active", input.checked);
					});
				}

				if (this.themeToggle) {
					this.themeToggle.dataset.value = currentTheme;

					const inputs = this.themeToggle.querySelectorAll("input[name='theme']");
					inputs.forEach((input) => {
						input.checked = input.value === currentTheme;
						input.closest(".toggle-option")
							.classList.toggle("toggle-option--active", input.checked);
					});
				}
			},

      render(state) {
        if (!this.buttonElement || !this.panelElement) return;
				
			const locale = state && state.locale ? state.locale : appState?.ui?.locale ?? DEFAULT_LOCALE;
			applyDataI18nMarkers(locale);
			this.syncToggleValues();

        if (appState?.ui?.modal?.isOpen && this.isOpen) {
          this.close(false);
        }
      }
    };

    const SearchBar = {
      rootElement: null,
      inputElement: null,
      clearButton: null,
      api: null,
      debounceTimerId: null,
      DEBOUNCE_DELAY: 300,

      init(rootElement, api) {
        this.rootElement = rootElement;
        this.api = api;
        if (!rootElement) return;

        this.inputElement = document.getElementById("searchInput");
        this.clearButton = document.getElementById("clearSearch");
        if (!this.inputElement || !this.clearButton) return;

        this.inputElement.addEventListener("input", (e) => {
          const query = e.target.value;
          if (this.debounceTimerId) clearTimeout(this.debounceTimerId);
          this.debounceTimerId = window.setTimeout(() => {
            this.api.setSearch(query);
            this.debounceTimerId = null;
          }, this.DEBOUNCE_DELAY);
        });

        const flush = () => {
          if (this.debounceTimerId) clearTimeout(this.debounceTimerId);
          this.debounceTimerId = null;
          this.api.setSearch(this.inputElement.value);
        };

        this.inputElement.addEventListener("blur", flush);
        this.inputElement.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            flush();
          }
        });

        this.clearButton.addEventListener("click", () => {
          if (this.debounceTimerId) clearTimeout(this.debounceTimerId);
          this.debounceTimerId = null;
          this.api.clearSearch();
        });
      },

      render(searchState) {
        if (!this.inputElement) return;
        const nextVal = searchState && typeof searchState.query === "string" ? searchState.query : "";
        if (this.inputElement.value !== nextVal) this.inputElement.value = nextVal;
      }
    };

    const FilterBar = {
      rootElement: null,
      api: null,

      init(rootElement, api) {
        this.rootElement = rootElement;
        this.api = api;
        if (!rootElement) return;

        this.rootElement.addEventListener("click", (e) => {
          const pill = e.target.closest("[data-filter]");
          if (!pill) return;
          const filterKey = pill.dataset.filter;
          if (!filterKey) return;
          this.api.toggleFilter(filterKey);
        });
      },

      render(filtersState) {
        if (!this.rootElement) return;
        const activeKeys = filtersState && Array.isArray(filtersState.activeKeys) ? filtersState.activeKeys : [];
        const pills = this.rootElement.querySelectorAll("[data-filter]");
        pills.forEach((pill) => {
          const key = pill.dataset.filter;
          const isActive = activeKeys.includes(key);
          pill.setAttribute("aria-pressed", String(isActive));
          pill.classList.toggle("chip--active", isActive);
        });
      }
    };
		
		const FiltersCollapse = {
			buttonElement: null,
			panelElement: null,
			mobileMq: null,
			onDocumentClick: null,
			onMqChange: null,

			init(buttonElement, panelElement) {
				this.buttonElement = buttonElement;
				this.panelElement = panelElement;
				if (!this.buttonElement || !this.panelElement) return;

				this.buttonElement.addEventListener("click", (e) => {
					e.preventDefault();
					this.toggle();
				});

				this.mobileMq = window.matchMedia("(max-width: 480px)");

				this.onDocumentClick = (e) => {
					if (!this.isOpen()) return;
					const isMobile = !!this.mobileMq && this.mobileMq.matches;
					const isAbsolute = this.panelElement && getComputedStyle(this.panelElement).position === "absolute";
					if (!isMobile && !isAbsolute) return;
					const target = e.target;
					if (!target) return;
					if (this.panelElement.contains(target)) return;
					if (this.buttonElement.contains(target)) return;
					this.close();
				};

				this.onMqChange = () => {
					if (!this.isOpen()) return;
					if (this.mobileMq && !this.mobileMq.matches) this.close();
				};

				if (this.mobileMq) {
					if (typeof this.mobileMq.addEventListener === "function") this.mobileMq.addEventListener("change", this.onMqChange);
					else if (typeof this.mobileMq.addListener === "function") this.mobileMq.addListener(this.onMqChange);
				}

				document.addEventListener("click", this.onDocumentClick);
			},

			toggle() {
				const nextOpen = this.panelElement.classList.toggle("is-open");
				this.buttonElement.setAttribute("aria-expanded", String(nextOpen));
				const toolbar = this.buttonElement.closest(".toolbar");
				if (toolbar) toolbar.classList.toggle("filters-open", nextOpen);
			},

			close() {
				this.panelElement.classList.remove("is-open");
				this.buttonElement.setAttribute("aria-expanded", "false");
				const toolbar = this.buttonElement.closest(".toolbar");
				if (toolbar) toolbar.classList.remove("filters-open");
			},

			isOpen() {
				return !!this.panelElement && this.panelElement.classList.contains("is-open");
			}
		};

    const SongTable = {
      rootElement: null,
      theadElement: null,
      tbodyElement: null,
      api: null,
      cachedVisibleSongs: [],
      cache: { lastKeys: [], rowMap: new Map() },

      init(rootElement, api) {
        this.rootElement = rootElement;
        this.api = api;
        if (!rootElement) return;

        this.theadElement = rootElement.querySelector("thead");
        this.tbodyElement = rootElement.querySelector("tbody");

        if (this.tbodyElement) {
          this.tbodyElement.addEventListener("click", (e) => {
            const btn = e.target.closest(".request-button");
            if (!btn) return;
            const tr = btn.closest("tr");
            if (!tr) return;
            const idx = parseInt(tr.dataset.index, 10);
            if (!Number.isFinite(idx)) return;
            const song = this.cachedVisibleSongs[idx];
            if (song) this.api.openModal(song);
          });
        }

        if (this.theadElement) {
          this.theadElement.addEventListener("click", (e) => {
            const sortBtn = e.target.closest("#sortTitle, #sortArtist");
            if (!sortBtn) return;
            const column = sortBtn.id === "sortTitle" ? "title" : "artist";
            this.api.setSort(column, true);
          });
        }
      },

      getRowKey(song) {
        return String(song.id || song.fallbackId);
      },

      applyRowClasses(tr, index) {
        tr.classList.add("tablerow");
        tr.classList.toggle("tablerow--zebra", index % 2 === 1);
      },

      updateSongRow(tr, song, index) {
        tr.dataset.index = String(index);
        this.applyRowClasses(tr, index);

        const locale = appState?.ui?.locale || DEFAULT_LOCALE;

        const tds = tr.children;
        const tdTitle = tds[0];
        const tdArtist = tds[1];
        const tdTags = tds[2];
        const tdActions = tds[3];

        if (tdTitle && tdTitle.textContent !== song.title) tdTitle.textContent = song.title;
        if (tdArtist && tdArtist.textContent !== song.artist) tdArtist.textContent = song.artist;
				
				if (tdTags) {
					renderTagsToContainer(song.attributes, tdTags);
				}

        if (tdActions) {
          const btn = tdActions.querySelector(".request-button");
          if (btn) {
            const nextText = t("table.requestBtn", locale);
            if (btn.textContent !== nextText) btn.textContent = nextText;

            const nextAria = t("table.requestAria", locale, { artist: song.artist, title: song.title });
            if (btn.getAttribute("aria-label") !== nextAria) btn.setAttribute("aria-label", nextAria);
          }
        }
      },

      render(visibleSongs, sortState) {
        this.cachedVisibleSongs = Array.isArray(visibleSongs) ? visibleSongs : [];
        if (!this.tbodyElement) return;

        const locale = appState?.ui?.locale || DEFAULT_LOCALE;

        if (!this.cachedVisibleSongs.length) {
          this.cache.lastKeys = [];
          this.cache.rowMap = new Map();
          this.tbodyElement.innerHTML = "";

          const tr = document.createElement("tr");
          tr.classList.add("tablerow");

          const td = document.createElement("td");
          td.colSpan = 4;
          td.className = "tablecell table-empty";

          const icon = document.createElement("span");
          icon.className = "table-emptyicon";
          icon.setAttribute("aria-hidden", "true");
          icon.textContent = EMPTY_STATE_ICON;

          const title = document.createElement("div");
          title.textContent = t("table.emptyTitle", locale);

          const hint = document.createElement("div");
          hint.textContent = t("table.emptyHint", locale);

          td.appendChild(icon);
          td.appendChild(title);
          td.appendChild(hint);

          tr.appendChild(td);
          this.tbodyElement.appendChild(tr);

          this.syncSortARIA(sortState);
          return;
        }

        const newKeys = this.cachedVisibleSongs.map((song) => this.getRowKey(song));
        const oldRowMap = this.cache.rowMap;

        const fragment = document.createDocumentFragment();
        const newRowMap = new Map();

        for (let i = 0; i < this.cachedVisibleSongs.length; i++) {
          const song = this.cachedVisibleSongs[i];
          const key = newKeys[i];
          let tr = oldRowMap.get(key);
          if (tr) this.updateSongRow(tr, song, i);
          else tr = this.createSongRow(song, i);

          newRowMap.set(key, tr);
          fragment.appendChild(tr);
        }

        if (this.tbodyElement.replaceChildren) this.tbodyElement.replaceChildren(fragment);
        else {
          this.tbodyElement.innerHTML = "";
          this.tbodyElement.appendChild(fragment);
        }

        this.cache.lastKeys = newKeys;
        this.cache.rowMap = newRowMap;

        this.syncSortARIA(sortState);
      },

      createSongRow(song, index) {
        const tr = document.createElement("tr");
        tr.dataset.index = String(index);
        this.applyRowClasses(tr, index);

        const tdTitle = document.createElement("td");
        tdTitle.className = "song-tablecell song-tablecell--title tablecell tablecell--title tablecell--truncate";
        tdTitle.textContent = song.title;
        tr.appendChild(tdTitle);

        const tdArtist = document.createElement("td");
        tdArtist.className = "song-tablecell tablecell tablecell--truncate";
        tdArtist.textContent = song.artist;
        tr.appendChild(tdArtist);
				
				const tdTags = document.createElement("td");
				tdTags.className = "song-tablecell song-tablecell--tags tablecell tablecell--tags";
				renderTagsToContainer(song.attributes, tdTags);
				tr.appendChild(tdTags);

        const tdActions = document.createElement("td");
        tdActions.className = "song-tablecell song-tablecell--actions tablecell tablecell--actions";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn--sm request-button";

        const locale = appState?.ui?.locale || DEFAULT_LOCALE;
        btn.textContent = t("table.requestBtn", locale);
        btn.setAttribute("aria-label", t("table.requestAria", locale, { artist: song.artist, title: song.title }));

        tdActions.appendChild(btn);
        tr.appendChild(tdActions);

        return tr;
      },

      syncSortARIA(sortState) {
        if (!this.theadElement) return;
        const ths = this.theadElement.querySelectorAll("th[aria-sort]");
        ths.forEach((th) => th.setAttribute("aria-sort", "none"));

        const column = sortState && sortState.column ? sortState.column : null;
        const direction = sortState && sortState.direction === "desc" ? "desc" : "asc";

        if (column) {
          const btnId = column === "title" ? "sortTitle" : "sortArtist";
          const btn = document.getElementById(btnId);
          const th = btn ? btn.closest("th") : null;
          if (th) th.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");
        }
      }
    };

		const SongCards = {
      rootElement: null,
      api: null,
      cachedVisibleSongs: [],
      cardMap: new Map(),

      init(rootElement, api) {
        this.rootElement = rootElement;
        this.api = api;
        if (!rootElement) return;

        this.rootElement.addEventListener("click", (e) => {
          const btn = e.target.closest(".request-button");
          if (!btn) return;
          const card = e.target.closest("[data-index]");
          if (!card) return;
          const idx = parseInt(card.dataset.index, 10);
          if (!Number.isFinite(idx)) return;
          const song = this.cachedVisibleSongs[idx];
          if (song) this.api.openModal(song);
        });
      },

      getCardKey(song) {
        return String(song.id || song.fallbackId);
      },

      createCard(song, index, locale) {
        const card = document.createElement("article");
        card.className = "song-card";
        card.dataset.index = String(index);

        const header = document.createElement("div");
        header.className = "song-cardheader";

        const titleEl = document.createElement("div");
        titleEl.className = "song-cardtitle";
        titleEl.textContent = song.title;

        const artistEl = document.createElement("div");
        artistEl.className = "song-cardartist";
        artistEl.textContent = song.artist;

        header.appendChild(titleEl);
        header.appendChild(artistEl);

        const tags = document.createElement("div");
        tags.className = "song-cardtags";
        renderTagsToContainer(song.attributes, tags);

        const footer = document.createElement("div");
        footer.className = "song-cardfooter";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn--sm request-button";
        btn.textContent = t("table.requestBtn", locale);
        btn.setAttribute("aria-label", t("table.requestAria", locale, { artist: song.artist, title: song.title }));

        footer.appendChild(btn);
        card.appendChild(header);
        card.appendChild(tags);
        card.appendChild(footer);
        return card;
      },

      updateCard(card, song, index, locale) {
        card.dataset.index = String(index);

        const titleEl = card.querySelector(".song-cardtitle");
        const artistEl = card.querySelector(".song-cardartist");
        const tagsEl = card.querySelector(".song-cardtags");
        const btn = card.querySelector(".request-button");

        if (titleEl && titleEl.textContent !== song.title) titleEl.textContent = song.title;
        if (artistEl && artistEl.textContent !== song.artist) artistEl.textContent = song.artist;
        if (tagsEl) renderTagsToContainer(song.attributes, tagsEl);

        if (btn) {
          const nextText = t("table.requestBtn", locale);
          if (btn.textContent !== nextText) btn.textContent = nextText;
          const nextAria = t("table.requestAria", locale, { artist: song.artist, title: song.title });
          if (btn.getAttribute("aria-label") !== nextAria) btn.setAttribute("aria-label", nextAria);
        }
      },

      render(visibleSongs) {
        this.cachedVisibleSongs = Array.isArray(visibleSongs) ? visibleSongs : [];
        if (!this.rootElement) return;

        const locale = appState?.ui?.locale || DEFAULT_LOCALE;

        if (!this.cachedVisibleSongs.length) {
          this.cardMap = new Map();
          const empty = document.createElement("div");
          empty.className = "table-empty song-cards-empty";

          const icon = document.createElement("span");
          icon.className = "table-emptyicon";
          icon.setAttribute("aria-hidden", "true");
          icon.textContent = EMPTY_STATE_ICON;

          const titleEl = document.createElement("div");
          titleEl.className = "song-cards-emptytitle";
          titleEl.textContent = t("table.emptyTitle", locale);

          const hint = document.createElement("div");
          hint.className = "song-cards-emptyhint";
          hint.textContent = t("table.emptyHint", locale);

          empty.appendChild(icon);
          empty.appendChild(titleEl);
          empty.appendChild(hint);

          if (this.rootElement.replaceChildren) this.rootElement.replaceChildren(empty);
          else { this.rootElement.innerHTML = ""; this.rootElement.appendChild(empty); }
          return;
        }

        const oldMap = this.cardMap;
        const newMap = new Map();
        const frag = document.createDocumentFragment();

        for (let i = 0; i < this.cachedVisibleSongs.length; i++) {
          const song = this.cachedVisibleSongs[i];
          const key = this.getCardKey(song);
          let card = oldMap.get(key);
          if (card) {
            this.updateCard(card, song, i, locale);
          } else {
            card = this.createCard(song, i, locale);
          }
          newMap.set(key, card);
          frag.appendChild(card);
        }

        this.cardMap = newMap;

        if (this.rootElement.replaceChildren) this.rootElement.replaceChildren(frag);
        else { this.rootElement.innerHTML = ""; this.rootElement.appendChild(frag); }
      }
    };

    const Pagination = {
      rootElement: null,
      pageInfoElement: null,
      itemsPerPageSelect: null,
      api: null,

      init(rootElement, api) {
        this.rootElement = rootElement;
        this.api = api;
        if (!rootElement) return;

        this.pageInfoElement = document.getElementById("pageInfo");
        this.itemsPerPageSelect = document.getElementById("itemsPerPage");

        this.rootElement.addEventListener("click", (e) => {
          const btn = e.target.closest("button");
          if (!btn) return;
          const btnId = btn.id;
          if (btnId === "firstPage") this.api.firstPage();
          else if (btnId === "prevPage") this.api.prevPage();
          else if (btnId === "nextPage") this.api.nextPage();
          else if (btnId === "lastPage") this.api.lastPage();
        });

        if (this.itemsPerPageSelect) {
          this.itemsPerPageSelect.addEventListener("change", (e) => {
            const raw = parseInt(e.target.value, 10);
            this.api.setItemsPerPage(raw);
          });
        }
      },

      render(paginationMeta) {
        if (!paginationMeta) return;

        const locale = appState?.ui?.locale || DEFAULT_LOCALE;

        const { startIndex, endIndex, totalPages, totalCount, currentPage } = paginationMeta;

        if (this.pageInfoElement) {
          if (totalCount === 0) {
            this.pageInfoElement.textContent = "0–0 / 0";
          } else {
            const from = startIndex + 1;
            const to = endIndex;
            this.pageInfoElement.textContent = t("pagination.info", locale, { from, to, total: totalCount });
          }
        }

        const firstBtn = document.getElementById("firstPage");
        const prevBtn = document.getElementById("prevPage");
        const nextBtn = document.getElementById("nextPage");
        const lastBtn = document.getElementById("lastPage");

        if (firstBtn) firstBtn.disabled = currentPage === 1;
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
        if (lastBtn) lastBtn.disabled = currentPage === totalPages;

        if (this.itemsPerPageSelect) {
          const desired = String(appState.ui.pagination.itemsPerPageRaw);
          if (this.itemsPerPageSelect.value !== desired) this.itemsPerPageSelect.value = desired;
        }
      }
    };

    const Modal = {
      rootElement: null,
      modalTitleElement: null,
      cancelButton: null,
      copySongElement: null,
      cardNumberElement: null,
      cardNumberValueElement: null,
      cardNumberErrorElement: null,
      api: null,
      cachedSelectedSong: null,

			init(rootElement, api) {
				this.rootElement = document.getElementById("requestModal");
				if (!this.rootElement) return;

				this.api = api;

				this.dialogElement = this.rootElement.querySelector(".modaldialog");

				this.modalTitleElement = document.getElementById("requestModalTitle");
				this.modalDescriptionElement = document.getElementById("modalDescription");

				this.conditionsTextElement =	this.rootElement.querySelector(".modalconditions-text");
				this.conditionsSubTextElement =	this.rootElement.querySelector(".modalconditions-subtext");
				
				this.bonusTextElement =  this.rootElement.querySelector(".modalbonus-text");

				this.songLabelTextElement =	this.rootElement.querySelector(".modalsong-label-text");
				this.cardLabelTextElement =	this.rootElement.querySelector(".modalcard-label-text");

				this.copySongElement = document.getElementById("copySong");
				this.cancelButton = document.getElementById("cancelButton");
				this.closeButton = this.rootElement.querySelector("[data-modal-close]");

				this.modalSelectedSongTextElement =	document.getElementById("modalArtistTitle");

				this.cardNumberElement = document.getElementById("cardNumber");
				this.cardNumberValueElement = document.getElementById("cardNumberValue");
				this.cardNumberErrorElement = document.getElementById("cardNumberError");

        if (this.cancelButton) this.cancelButton.addEventListener("click", () => this.api.closeModal());				
				
				if (this.copySongElement) {
					this.copySongElement.addEventListener("click", (e) => {
						e.preventDefault();
						const selectedSong = this.getSelectedSong();
						if (!selectedSong) return;
						const text = `${selectedSong.artist} - ${selectedSong.title}`.trim();
						this.api.copyToClipboard("song", text);
					});
				}

				if (this.cardNumberElement) {
					this.cardNumberElement.addEventListener("click", () => {
						const card = appState?.ui?.modal?.cardNumber;
						if (!card) return;
						this.api.copyToClipboard("card", card);
					});
				}
      },

			render(modalState) {
				if (!this.rootElement) return;

				const locale = appState?.ui?.locale ?? DEFAULT_LOCALE;

				const isOpen = !!(modalState && modalState.isOpen);
				const selectedSong = modalState ? modalState.selectedSong : null;

				if (this.modalTitleElement) {
					this.modalTitleElement.textContent = t("modal.title", locale);
				}
				
				if (this.modalTitleElement) this.modalTitleElement.textContent = t("modal.title", locale);

				if (isOpen && selectedSong) {
					this.cachedSelectedSong = selectedSong;

					if (this.modalSelectedSongTextElement) {
						this.modalSelectedSongTextElement.textContent =
							`${selectedSong.artist} — ${selectedSong.title}`.trim();
					}
				} else {
					this.cachedSelectedSong = null;

					if (this.modalSelectedSongTextElement) {
						this.modalSelectedSongTextElement.textContent = "";
					}
				}
				
				if (this.cancelButton) {
					this.cancelButton.textContent = t("modal.cancelBtn", locale);
					this.cancelButton.setAttribute("aria-label", t("modal.cancelAria", locale));
				}
				
				const cardNumber = modalState ? modalState.cardNumber : null;
				const cardNumberError = modalState ? modalState.cardNumberError : null;

				if (this.cardNumberValueElement) {
					if (!isOpen) {
						this.cardNumberValueElement.textContent = "";
					} else if (cardNumber) {
						this.cardNumberValueElement.textContent = cardNumber;
					} else if (cardNumberError) {
						this.cardNumberValueElement.textContent = cardNumberError;
					} else {
						this.cardNumberValueElement.textContent = "";
					}
				}

				if (this.cardNumberErrorElement) {
					this.cardNumberErrorElement.hidden = true;
					this.cardNumberErrorElement.textContent = "";
				}

				if (this.cardNumberElement) {
					const icon = this.cardNumberElement.querySelector(".modal-actionicon");
					if (icon) icon.style.display = (isOpen && cardNumberError) ? "none" : "";
				}
			},
		
			getSelectedSong() {
				return this.cachedSelectedSong;
			}
		};

		const Toast = {
			rootElement: null,

			init(rootElement) {
				this.rootElement = rootElement;
			},

			render(toastState) {
				if (!this.rootElement) return;
				const isVisible = !!(toastState && toastState.isVisible);
				const message =
					toastState && typeof toastState.message === "string"
						? toastState.message
						: "";

				this.rootElement.textContent = message;
				this.rootElement.classList.toggle("toast--visible", isVisible);
				this.rootElement.setAttribute("aria-hidden", isVisible ? "false" : "true");
			}
		};

    const components = {
      settings: SettingsMenu,
      searchBar: SearchBar,
      filterBar: FilterBar,
      songTable: SongTable,
      songCards: SongCards,
      pagination: Pagination,
      modal: Modal,
      toast: Toast
    };		

    const applyStaticI18n = (() => {
      let lastAppliedLocale = null;

      return function applyStaticI18n(state) {
        const locale = state && state.ui && state.ui.locale ? state.ui.locale : DEFAULT_LOCALE;
        if (lastAppliedLocale === locale) return;

        applyDataI18nMarkers(locale);

        const searchInput = document.getElementById("searchInput");
        if (searchInput && !searchInput.getAttribute("aria-labelledby") && !searchInput.getAttribute("aria-label")) {
          searchInput.setAttribute("aria-label", t("search.label", locale));
        }

        applySearchPlaceholder(state?.data?.allSongs, locale);

        const sortInstruction = document.getElementById("sort-instruction");
        if (sortInstruction) {
          sortInstruction.textContent = `${t("table.col.title", locale)}, ${t("table.col.artist", locale)}`;
        }

        lastAppliedLocale = locale;
      };
    })();
	
		function applyDataI18nMarkers(locale) {
			document.querySelectorAll("[data-i18n-text]").forEach((el) => {
				const key = el.getAttribute("data-i18n-text");
				if (!key) return;
				el.textContent = t(key, locale);
			});

			document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
				const key = el.getAttribute("data-i18n-placeholder");
				if (!key) return;

				if (el.id === "searchInput" && ENABLE_RANDOM_PLACEHOLDER) return;

				el.setAttribute("placeholder", t(key, locale));
			});

			document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
				const key = el.getAttribute("data-i18n-aria-label");
				if (!key) return;
				el.setAttribute("aria-label", t(key, locale));
			});

			document.querySelectorAll("[data-i18n-lang='document']").forEach(() => {
				setDocumentLang(locale);
			});
		}

    function renderApp(state, precomputed) {
      const derived = precomputed ?? deriveVisibleSongs(state);

      const errorContainer = document.getElementById("data-error");
      if (errorContainer) {
        if (state.data.error) {
          errorContainer.textContent = state.data.error;
          errorContainer.style.display = "block";
        } else {
          errorContainer.style.display = "none";
        }
      }

      components.settings.render(state.ui);
      components.searchBar.render(state.ui.search);
      components.filterBar.render(state.ui.filters);
      components.songTable.render(derived.visibleSongs, state.ui.sort);

      if (ENABLE_MOBILE_CARDS) components.songCards.render(derived.visibleSongs);

      components.pagination.render(derived.paginationMeta);
      components.modal.render(state.ui.modal);
      components.toast.render(state.ui.toast);
    }

    // -------------------------
    // Init
    // -------------------------
    function initApp() {
      document.documentElement.classList.toggle("ff-disable-mobile-cards", !ENABLE_MOBILE_CARDS);

      appState = getInitialState();
      applyTheme(appState.ui.theme);
      setDocumentLang(appState.ui.locale);

      const uiApi = {
        setSearch: (query) => dispatch(actions.setSearch(query)),
        clearSearch: () => dispatch(actions.clearSearch()),
        toggleFilter: (key) => dispatch(actions.toggleFilter(key)),
        setSort: (column, toggleDirection = true) => dispatch(actions.setSort(column, toggleDirection)),
        clearSort: () => dispatch(actions.clearSort()),
        setPage: (page) => dispatch(actions.setPage(page)),
        firstPage: () => dispatch(actions.firstPage()),
        prevPage: () => dispatch(actions.prevPage()),
        nextPage: () => dispatch(actions.nextPage()),
        lastPage: () => dispatch(actions.lastPage()),
        setItemsPerPage: (itemsPerPageRaw) => dispatch(actions.setItemsPerPage(itemsPerPageRaw)),
        openModal: (songOrIndex) => dispatch(actions.openModal(songOrIndex)),
        closeModal: () => dispatch(actions.closeModal()),
        copyToClipboard: (type, value) => dispatch(actions.copyToClipboard(type, value)),
        showToast: (message, duration) => dispatch(actions.showToast(message, duration)),
        setLocale: (locale) => dispatch(actions.setLocale(locale)),
        setTheme: (theme) => dispatch(actions.setTheme(theme))
      };

      const searchRoot = document.querySelector(".searchfield");
      const tableRoot = document.querySelector("table.song-table");
      const cardsRoot = document.getElementById("songCards");
      const paginationRoot = document.querySelector(".table-footer");
      const modalRoot = document.getElementById("requestModal");
      const toastRoot = document.getElementById("toast");
      const filtersRoot = document.getElementById("filtersBar");
      const settingsRoot = document.getElementById("toolbarRight");

      renderFilterButtons(filtersRoot);

      components.settings.init(settingsRoot, uiApi);
      components.filterBar.init(filtersRoot, uiApi);
      components.searchBar.init(searchRoot, uiApi);
      components.songTable.init(tableRoot, uiApi);
      if (ENABLE_MOBILE_CARDS) components.songCards.init(cardsRoot, uiApi);
      components.pagination.init(paginationRoot, uiApi);
      components.modal.init(modalRoot, uiApi);
      components.toast.init(toastRoot);

			FiltersCollapse.init(
				document.getElementById("filtersToggleButton"),
				filtersRoot
			);

      renderApp(appState);
      applyStaticI18n(appState);

      checkAndLoadJSON();
    }

    // -------------------------
    // JSON loading
    // -------------------------
		async function checkAndLoadJSON() {
			dispatch(actions.dataLoadStart());
			
			const CACHE_KEY_DATA = "songlist-data";
			const CACHE_KEY_VERSION = "songlist-version";

			try {
				const cachedVersion = localStorage.getItem(CACHE_KEY_VERSION);
				const cachedData = localStorage.getItem(CACHE_KEY_DATA);

				if (cachedData) {
					try {
						const parsed = JSON.parse(cachedData);
						const cachedJsonVersion = parsed && parsed._version ? String(parsed._version) : null;

						if (cachedVersion && cachedJsonVersion && cachedVersion === cachedJsonVersion) {
								parseAndDispatchJSON(parsed, cachedVersion);
								return;
						}
					} catch {}
				}

				const response = await fetch(CONFIG.DATA_URL);
				if (!response.ok) throw new Error("Fetch failed");

				const jsonData = await response.json();
				const remoteVersion = jsonData && jsonData._version ? String(jsonData._version) : null;

				localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(jsonData));
				if (remoteVersion) {
						localStorage.setItem(CACHE_KEY_VERSION, remoteVersion);
				}

				parseAndDispatchJSON(jsonData, remoteVersion);				
				
			} catch (error) {
				const storedData = localStorage.getItem(CACHE_KEY_DATA);
				if (storedData) {
					try {
						const parsed = JSON.parse(storedData);
						const cachedVersion = localStorage.getItem(CACHE_KEY_VERSION);
						parseAndDispatchJSON(parsed, cachedVersion);
						dispatch(actions.showToast("Загружены сохранённые данные", 4000));
					} catch (e) {
						dispatch(actions.dataLoadError("Ошибка кэша: " + e.message));
					}
				} else {
					dispatch(actions.dataLoadError(getUserFriendlyError(error)));
				}
			}
		}		
		
		function mapApiSongToInternal(raw) {
			return {
				id: raw.id ?? null,
				title: raw.title ?? raw.name ?? "",
				artist: raw.artist?.name ?? raw.artist ?? "",
				attributes: Array.isArray(raw.attributes)
					? raw.attributes
					: Array.isArray(raw.tags)
						? raw.tags.map(t => t.name ?? t)
						: typeof raw.attributes === "string"
							? raw.attributes.split(",")
							: [],
				active: raw.active ?? true
			};
		}

		function getUserFriendlyError(err) {
			const msg = String(err?.message || err || "");

			if (msg.includes("Failed to fetch")) {
				return "Нет подключения к интернету";
			}
			if (msg.includes("JSON")) {
				return "Ошибка обработки данных";
			}
			return "Не удалось загрузить список песен";
		}
		
		function parseAndDispatchJSON(jsonData, uniqueKey) {
			try {
				const rawSongs = (Array.isArray(jsonData) ? jsonData : jsonData.items || []);
				const mappedSongs = rawSongs.map(mapApiSongToInternal).filter(song => !!song.active);
				const enrichedSongs = normalizeFields(mappedSongs);

				dispatch(actions.dataLoadSuccess(enrichedSongs, uniqueKey ?? null));
			} catch (error) {
				dispatch(actions.dataLoadError(getUserFriendlyError(error)));
			}
		}