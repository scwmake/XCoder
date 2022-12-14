#!/usr/bin/env node
import { existsSync, lstatSync, mkdirSync } from 'fs';
import path = require('path');
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { colors, trace } from '../lib/console';
import { textureDecodeFromFolder, texturesDecode } from '../lib/features/textures';
import { locale } from '../lib/locale';

const { argv } = yargs(hideBin(process.argv));

const inPath: string = argv['input'] || argv['i'];
let outPath: string = argv['output'] || argv['o'];
locale.initialize();

if (existsSync(inPath)) {
	const stat = lstatSync(inPath);

	if (stat.isDirectory()) {
		const outFolder = outPath || inPath + '_textures';
		if (!existsSync(outFolder)) {
			mkdirSync(outFolder);
		}
		textureDecodeFromFolder(inPath, outFolder, true);

	} else if (stat.isFile) {
		if (!outPath || !existsSync(outPath)) {
			outPath = path.parse(inPath).name;
			mkdirSync(outPath);
		}
		texturesDecode(inPath, outPath ? outPath : inPath);
	}

} else {
	trace(locale['wrongInputFile'], { textColor: colors.red });
}
