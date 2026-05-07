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
			emptyHint: "Попробуйте изменить поисковый запрос или выбрать другие фильтры",
			emptyHintSearch: "Попробуйте изменить поисковый запрос",
			emptyHintFilter: "Попробуйте выбрать другие фильтры"
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
			emptyHint: "Try changing your search or selecting different filters",
			emptyHintSearch: "Try changing your search query",
			emptyHintFilter: "Try selecting different filters"
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