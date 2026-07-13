import fs from 'fs';
import path from 'path';

const searchRegex = /(?<!https:\/\/)(?<!@)(Eco|eco)(?!track-server)(?!-track-server)(?!\.com)/gi;
const directoryPath = path.join(process.cwd(), 'src');

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;

  // Let's do a more explicit replacement to avoid messing up URLs
  newContent = newContent.replace(/Eco-Warrior/g, 'Verda-Warrior');
  newContent = newContent.replace(/Eco Warrior/g, 'Verda Warrior');
  newContent = newContent.replace(/eco-warrior/g, 'verda-warrior');
  newContent = newContent.replace(/Eco Points/g, 'Verda Points');
  newContent = newContent.replace(/eco points/g, 'verda points');
  newContent = newContent.replace(/Eco-Badge/g, 'Verda-Badge');
  newContent = newContent.replace(/Eco-Guardian/g, 'Verda-Guardian');
  newContent = newContent.replace(/Eco Champions/g, 'Verda Champions');
  newContent = newContent.replace(/ECO-TRACK/g, 'VERDA-TRACK');
  newContent = newContent.replace(/Eco-System/g, 'Verda-System');
  newContent = newContent.replace(/admin@eco\.com/g, 'admin@verda.com');
  newContent = newContent.replace(/eco-challenges/g, 'verda-challenges');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  });
}

walkDir(directoryPath);
console.log('Done!');
