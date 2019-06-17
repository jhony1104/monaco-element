import * as monaco from 'monaco-editor';

const element = document.getElementById('container');
const language = element.dataset.lang;
const value = element.innerHTML;

while (element.hasChildNodes()) element.firstChild.remove();

window.editor = monaco.editor.create(element, {
    value,
    language
});

window.onresize = () => window.editor.layout();