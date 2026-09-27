const NEW_SONGS_DAYS = 15;

const FILTER_DEFS = {
	new:			{ icon: "🆕", label: "Новые", allow: true, type: "recent", days: NEW_SONGS_DAYS },
	dsssr:		{ icon: "🎸", label: "DirectorSSSR", allow: false, highlight: "true", attributes: ["DirectorSSSR"] },
	earth:		{ icon: "🌍", label: "На других языках", allow: true, attributes: ["На других языках"] },
	film:			{ icon: "🎬", label: "Из кинофильмов", allow: true, attributes: ["Из кинофильмов"] },
	mult:			{ icon: "🧸", label: "Из мультфильмов", allow: true, attributes: ["Из мультфильмов"] },
	ny:				{ icon: "🎄", label: "Новогодние", allow: false, attributes: ["Новогодние"] },
	piano:		{ icon: "🎹", label: "Лирические", allow: true, attributes: ["Лирические"] },
	dance:		{ icon: "💃", label: "Потанцевать", allow: true, attributes: ["Потанцевать"] },
	rock:			{ icon: "🤘", label: "Рок", allow: true, attributes: ["РОК"] },
	pop:			{ icon: "📀", label: "Поп", allow: true, attributes: ["ПОП"] },
	folk:			{ icon: "🎶", label: "Народные", allow: true, attributes: ["Народные"] },
	chanson:	{ icon: "🍷️", label: "Шансон", allow: true, attributes: ["Шансон"] },
	retro:		{ icon: "🎙️", label: "Ретро", allow: true, attributes: ["Ретро"] },
	poems:		{ icon: "📜️", label: "Стихи", allow: false, attributes: ["Стихи"] },
	cappella:	{ icon: "🗣️", label: "А капелла", allow: false, attributes: ["А капелла", "A capella"] },
	lullaby:	{ icon: "😴", label: "Колыбельные", allow: false, attributes: ["Колыбельные"] },
};