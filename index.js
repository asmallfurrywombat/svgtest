import xs from 'xstream';
import { run } from '@cycle/xstream-run';
import { div, svg, makeDOMDriver } from '@cycle/dom';

function intent(DOM) {
  return DOM.select('.icon').events('click');
}

function model(events$) {
  return events$
    .map(ev => {
      alert('received event');
      return true;
    })
    .startWith(false);
}

function vtree(state$) {
  return state$.map(state =>
    div([
      svg(
        {
          attrs: {
            class: 'icon',
            width: '24px',
            height: '24px',
            viewBox: '0 0 24 24'
          }
        },
        [
          svg.g([
            svg.path({
              attrs: {
                fill: 'dark gray',
                d:
                  'M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 ' +
                  '2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z'
              }
            })
          ])
        ]
      )
    ])
  );
}

function main(sources) {
  const inputEv$ = intent(sources.DOM);
  const name$ = model(inputEv$);
  const vtree$ = vtree(name$);

  return {
    DOM: vtree$
  };
}

run(main, {
  DOM: makeDOMDriver('#app')
});
