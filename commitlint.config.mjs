import { buildRegExp, capture, oneOrMore, startOfString, word, char, endOfString, any } from 'ts-regex-builder'

export default {
	parserPreset: {
		parserOpts: {
			headerPattern: buildRegExp([startOfString, '@', capture(oneOrMore(word)), char(32), capture(oneOrMore(any)), endOfString]),
			headerCorrespondence: ['type', 'subject'],
		},
	},
	rules: {
		'type-enum': [2, 'always', ['fix', 'feat', 'release', 'chore']],
		'subject-empty': [2, 'never'],
	},
}
