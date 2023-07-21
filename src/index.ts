import './index.css';
import decks from './deck.json';
import { IDeck } from './typings';
import { createTpl } from './utils';

;((doc) => {

  const deckCollection: IDeck[] = Array.from(decks).reverse() as IDeck[];
  const oDeckWrapper: HTMLElement = doc.querySelector('#deck-wrapper');

  const init = (): void => {
    render();
    bindEvent();
  }

  function render(): void {
    const oFrag = document.createDocumentFragment();
  
    deckCollection.forEach((deck, index) => {
      const div = document.createElement('div');
      div.className = "relative shadow rounded-md p-8 font-mono text-center box-border min-w-max";
      div.innerHTML = createTpl(deck);
      oFrag.appendChild(div);
    })

    oDeckWrapper.appendChild(oFrag);
  }

  function bindEvent(): void {
    if(window.ontouchstart) {
      oDeckWrapper.addEventListener('touchend', handleCopyOperation, false);
    } else {
      oDeckWrapper.addEventListener('click', handleCopyOperation, false);
    }
  }

  function handleCopyOperation(e: MouseEvent | TouchEvent) {
    const tar = e.target as HTMLElement;
    const tagName = tar.tagName.toLowerCase();
    const deckCode: string = tar.dataset.code;
  
    if(tagName !== 'button') return;

    if(navigator.clipboard) {
      navigator.clipboard.writeText(deckCode);
    } else {
      const textArea: HTMLTextAreaElement = document.createElement('textarea');
      textArea.value = deckCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  init();

})(document);