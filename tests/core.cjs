const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=require('path').join(__dirname,'../dist/');
const elements=new Map();const node=()=>({innerHTML:'',textContent:'',classList:{add(){},remove(){},toggle(){}},addEventListener(){},querySelectorAll(){return []},showModal(){},close(){},getBoundingClientRect(){return {}},scrollIntoView(){}});
const store=()=>({getItem(){return null},setItem(){}});
const context={console,Date,Math,Set,URL,Blob,FormData,JSON,Number,String,Array,Object,setTimeout(){},clearTimeout(){},setInterval(){},localStorage:store(),sessionStorage:store(),location:{hash:'',href:'http://127.0.0.1:4173/'},document:{querySelector(s){if(!elements.has(s))elements.set(s,node());return elements.get(s)},addEventListener(){}},scrollTo(){},addEventListener(){}};context.window=context;
vm.createContext(context);vm.runInContext(fs.readFileSync(root+'bank.js','utf8'),context);vm.runInContext(fs.readFileSync(root+'app.js','utf8'),context);
const c=context.XuekaoCore,qs=c.questions;let checks=0;
function check(v,m){assert(v,m);checks++}
check(qs.length===121,'121 items');check(new Set(qs.map(q=>q.id)).size===121,'unique ids');
for(const [p,max] of [['sz2303',97],['sz2312',100],['ft2425',100]])for(const g of ['26','27']){const exam=c.makeExam(p,g);check(exam.reduce((s,q)=>s+q.points,0)===max,p+g+' total');check(exam.every(q=>!q.group||q.group===g),'branch selection');}
for(const q of qs){if(!q.manual){const a=q.type==='multi'?q.answer.split(''):q.answer;check(c.evaluate(q,a).earned===q.points,q.id+' correct');check(c.evaluate(q,'').earned===0,q.id+' unanswered');}check(q.explanation&&q.pitfall&&q.topic,q.id+' explanation');if(q.image)check(q.imageData.startsWith('data:image/png;base64,'),'embedded images')}
const dup=qs.find(q=>q.id==='sz2312-26-2');check(c.evaluate(dup,'D').earned===5,'duplicate answer accepted');
const multi=qs.find(q=>q.id==='sz2312-27-5');check(c.evaluate(multi,['B','C']).earned===2,'partial 2');check(c.evaluate(multi,['A','B']).earned===0,'wrong choice zero');check(c.evaluate(multi,[]).earned===0,'no choice zero');check(c.evaluate(multi,['B','C','D']).earned===5,'all correct');
const fill=qs.find(q=>q.id==='ft2425-26-1');check(c.evaluate(fill,' input ').earned===5,'trim spaces');check(c.evaluate(fill,'Input').earned===0,'case sensitive');
const manual=qs.find(q=>q.id==='ft2425-27-6');check(c.evaluate(manual,'any answer').earned===null,'manual pending');
for(const topic of Object.keys(context.QUESTION_BANK.notes)){const selected=c.selectQuestions({topic,count:100,source:'all'});check(selected.every(q=>q.topic===topic&&!q.manual),'topic filter');check(new Set(selected.map(q=>q.id)).size===selected.length,'no repeats')}
check(c.selectQuestions({count:10}).every(q=>q.kind==='true'),'real papers first');
const student=c.paperHtml(qs,false,'test'),teacher=c.paperHtml(qs,true,'test');check(!student.includes('<dt>答案</dt>'),'student has no answer block');check(teacher.includes('<dt>答案</dt>'),'teacher has answers');check(!student.includes('<script'),'student contains no answer JS');check(student.includes('data:image/png;base64,'),'offline diagrams');
const md=c.paperMarkdown(qs,true,'test');check(md.includes('**答案**')&&md.includes('**考点**')&&md.includes('**解析**')&&md.includes('**易错提醒**'),'four-part format');
console.log(JSON.stringify({passed:checks,questions:qs.length,examBranches:6}));

