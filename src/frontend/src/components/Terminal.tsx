/* tslint:disable:no-eval */

import * as jQuery from 'jquery';
import 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.min.css';
import * as React from 'react';
// import {style} from 'typestyle';

export class Terminal extends React.Component<object, void> {
  protected terminal: HTMLElement;
  protected terminalContent: HTMLElement;
  protected terminalHeader: HTMLElement;

  public render() {
    return <div ref={(element) => this.terminal = element}>
      <div ref={(element) => this.terminalContent = element}></div>
      <div ref={(element) => this.terminalHeader = element}></div>
    </div>;
  }

  public componentDidMount() {
    jQuery(this.terminalContent).terminal(
      (command: string, term: any) => {
        if (command !== '') {
          const result = eval(command);
          if (result !== undefined) {
            term.echo(String(result));
          }
        }
      },
      {
        greetings: 'Javascript Interpreter',
        height: 170,
        name: 'js_demo',
        prompt: 'js> ',
        width: 450
      });
  }
}
