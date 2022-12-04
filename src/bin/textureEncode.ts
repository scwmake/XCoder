#!/usr/bin/env node
import { existsSync, lstatSync, mkdirSync } from 'fs';
import path = require('path');
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { colors, trace } from '../lib/console';
import { textureEncode, textureEncodeFromFolder } from '../lib/features/textures';
import { locale } from '../lib/locale';

const { argv } = yargs(hideBin(process.argv));

const inPath: string = argv['input'] || argv['i'];
const outPath: string = argv['output'] || argv['o'];
locale.initialize();

if (existsSync(inPath)) {
	const stat = lstatSync(inPath);

	if (stat.isDirectory()) {
		textureEncode(inPath, outPath ? outPath : inPath + '.sc');
	}

} else {
	trace(locale['wrongInputFile'], { textColor: colors.red });
}
