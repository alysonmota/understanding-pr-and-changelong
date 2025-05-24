import { buildRegExp, optional, capture, oneOrMore, startOfString, word, char, endOfString, any, whitespace } from 'ts-regex-builder'

const type = [char(0x5b), capture(oneOrMore(word)), char(0x5d)]
const scope = [char(0x5b), optional(oneOrMore(word)), char(0x5d)]
const subject = capture(oneOrMore(any))
/*
[type] subject
[type][scope] subject
*/
const semanticCommitRegex = buildRegExp([startOfString, ...type, optional(scope), whitespace, subject, endOfString])

export default {
	parserPreset: {
		parserOpts: {
			headerPattern: semanticCommitRegex,
			headerCorrespondence: ['type', 'subject'],
		},
	},
	rules: {
		'type-enum': [2, 'always', ['fix', 'feat', 'release', 'chore']],
		'subject-empty': [2, 'never'],
	},
}
