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
	branches: ['master'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				parserOpts: {
					headerPattern: semanticCommitRegex,
					headerCorrespondence: ['type', 'subject'],
				},
				releaseRules: [
					{ type: 'fix', release: 'patch' },
					{ type: 'feat', release: 'minor' },
					{ type: 'chore', release: false },
				],
			},
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/git',
		'@semantic-release/github',
	],
}
