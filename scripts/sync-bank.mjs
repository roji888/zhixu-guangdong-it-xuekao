import {readFileSync, writeFileSync} from 'node:fs';
const jsonUrl=new URL('../dist/bank.json',import.meta.url);
const data=JSON.parse(readFileSync(jsonUrl,'utf8').replace(/^\uFEFF/,''));
if(!Array.isArray(data.questions)||!data.questions.length)throw new Error('题库为空');
if(new Set(data.questions.map(q=>q.id)).size!==data.questions.length)throw new Error('题目ID重复');
writeFileSync(new URL('../dist/bank.js',import.meta.url),'window.QUESTION_BANK='+JSON.stringify(data)+';','utf8');
console.log(`已同步 ${data.questions.length} 道小题。`);
