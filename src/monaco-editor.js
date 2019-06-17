customElements.define('monaco-editor', class extends HTMLElement {
    constructor() {
        super();

        this.loaded = false;

        this.contentIframe = document.createElement('iframe');
        this.contentIframe.frameBorder = '0';
        this.contentIframe.srcdoc = `<html><head><style>body,html{margin:0;padding:0;overflow:hidden}#container,body,html{width:100%;height:100%}</style></head><body><div id="container" data-lang="${this.getAttribute('language') || 'text'}">${this.innerHTML}</div><script src="/monaco-element.js" defer></script></body></html>`

        this.contentIframe.style.visibility = 'hidden';

        this.contentIframe.addEventListener('load', () => {
            this.contentIframe.style.visibility = '';
            this.loaded = true;
        })

        const style = document.createElement('style');
        style.innerHTML = `:host{display:block;border:1px solid gray}iframe{width:100%;height:100%}`;

        this.attachShadow({ mode: 'open' }).appendChild(style);
        this.shadowRoot.appendChild(this.contentIframe);
    }

    get editor() {
        return new Promise((resolve, reject) => {
            let counter = 100;

            // for 10 seconds try every 100ms if not loaded
            const retFunc = () => {
                counter--;
                if (this.loaded) {
                    resolve(this.contentIframe.contentWindow.editor);
                } else if (counter == 0) {
                    reject('timeout');
                } else {
                    setTimeout(retFunc, 100);
                }
            };

            retFunc();
        });
    }
});
