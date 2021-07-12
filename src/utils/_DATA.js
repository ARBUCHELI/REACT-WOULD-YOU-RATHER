let users = {
	oksanaveselovskaya: {
		id: "oksanaveselovskaya",
		name: "Oksana Veselovskaya",
		avatarURL: "https://raw.githubusercontent.com/ARBUCHELI/REACT-WOULD-YOU-RATHER/master/Oksana%20Veselovskaya.jpg",
		answers: {
			"8xf0y6ziyjabvozdd253nd": "optionOne",
			"6ni6ok3ym7mf1p33lnez": "optionTwo",
			am8ehyc8byjqgar0jgpub9: "optionTwo",
			loxhs1bqm25b708cmbf3g: "optionTwo",
		},
		questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
	},
	andresrbucheli: {
		id: "andresrbucheli",
		name: "Andres R. Bucheli",
		avatarURL: "https://raw.githubusercontent.com/ARBUCHELI/REACT-WOULD-YOU-RATHER/master/Andres%20R.%20Bucheli.jpg",
		answers: {
			vthrdm985a262al8qx3do: "optionOne",
			xj352vofupe1dqz9emx13r: "optionTwo",
		},
		questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
	},
	danilveselovsky: {
		id: "danilveselovsky",
		name: "Danil Veselovsky",
		avatarURL: "https://raw.githubusercontent.com/ARBUCHELI/REACT-WOULD-YOU-RATHER/master/Danil%20Veselovskyjpg.jpg",
		answers: {
			xj352vofupe1dqz9emx13r: "optionOne",
			vthrdm985a262al8qx3do: "optionTwo",
			"6ni6ok3ym7mf1p33lnez": "optionTwo",
		},
		questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
	},
};

let questions = {
	"8xf0y6ziyjabvozdd253nd": {
		id: "8xf0y6ziyjabvozdd253nd",
		author: "oksanaveselovskaya",
		timestamp: 1467166872634,
		optionOne: {
			votes: ["oksanaveselovskaya"],
			text: "Planning a European road trip.",
		},
		optionTwo: {
			votes: [],
			text: "Plan a trip to South America",
		},
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: "6ni6ok3ym7mf1p33lnez",
		author: "danilveselovsky",
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: "Buy a new electric guitar",
		},
		optionTwo: {
			votes: ["danilveselovsky", "oksanaveselovksaya"],
			text: "Travel to Moscow to see Green Day live.",
		},
	},
	am8ehyc8byjqgar0jgpub9: {
		id: "am8ehyc8byjqgar0jgpub9",
		author: "oksanaveselovskaya",
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: "Publishing my book online",
		},
		optionTwo: {
			votes: ["oksanaveselovskaya"],
			text: "Publishing my book through a publishing house",
		},
	},
	loxhs1bqm25b708cmbf3g: {
		id: "loxhs1bqm25b708cmbf3g",
		author: "andresrbucheli",
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: "Save money to buy a car",
		},
		optionTwo: {
			votes: ["oksanaveselovskaya"],
			text: "Save money to buy a house",
		},
	},
	vthrdm985a262al8qx3do: {
		id: "vthrdm985a262al8qx3do",
		author: "andresrbucheli",
		timestamp: 1489579767190,
		optionOne: {
			votes: ["andresrbucheli"],
			text: "Invest in cryptocurrency",
		},
		optionTwo: {
			votes: ["danilveselovsky"],
			text: "Put the money in the bank",
		},
	},
	xj352vofupe1dqz9emx13r: {
		id: "xj352vofupe1dqz9emx13r",
		author: "danilveselovsky",
		timestamp: 1493579767190,
		optionOne: {
			votes: ["danilveselovsky"],
			text: "Travel on vacation to Germany",
		},
		optionTwo: {
			votes: ["andresrbucheli"],
			text: "Travel on vacation to England",
		},
	},
};

function generateUID() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function _getUsers() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...users }), 1000);
	});
}

export function _getQuestions() {
	return new Promise((res, rej) => {
		setTimeout(() => res({ ...questions }), 1000);
	});
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		},
	};
}

export function _saveQuestion(question) {
	return new Promise((res, rej) => {
		const authedUser = question.author;
		const formattedQuestion = formatQuestion(question);

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion,
			};

			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					questions: users[authedUser].questions.concat([formattedQuestion.id]),
				},
			};

			res(formattedQuestion);
		}, 1000);
	});
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[qid]: answer,
					},
				},
			};

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([authedUser]),
					},
				},
			};

			res();
		}, 500);
	});
}
