import { oDeck } from "./typings";

export function createTpl(deck: oDeck): string {
  const { id, name, version, date, features, code } = deck;

  return `
    <p class="md:text-3xl text-2xl mb-2">${ name }</p>
    <p class="mb-6 text-slate-800 font-sans font-semibold">Feat. ${ features.join('、') }</p>
    <p class="mb-1 text-sm">Version: ${ version }</p>
    <p class="mb-6 text-slate-800">${ date }</p>
    <button class="w-full py-4 px-3 bg-blue-500 font-sans text-stone-100 rounded active:bg-blue-300 md:text-base text-sm" data-id="${ id }" data-code="${ code }">YGO Mobile 卡组码</button>
  `;
}