/* tslint:disable:no-eval */

import * as jQuery from "jquery";
import "jquery.terminal";
import "jquery.terminal/css/jquery.terminal.min.css";
import * as React from "react";
// import {style} from 'typestyle';

declare global {
  /* tslint:disable-next-line:interface-name */
  interface JQuery {
    terminal(init: (command: string, term: any) => void, params: object): void;
  }
}

export class Terminal extends React.Component<object, object> {
  protected terminal: HTMLDivElement | null;
  protected terminalContent: HTMLDivElement | null;
  protected terminalHeader: HTMLDivElement | null;

  public render() {
    return <div ref={(element) => this.terminal = element}>
      <div ref={(element) => this.terminalContent = element}></div>
      <div ref={(element) => this.terminalHeader = element}></div>
    </div>;
  }

  public componentDidMount() {
    if (this.terminalContent) {
      jQuery(this.terminalContent).terminal(
        (command, term) => {
          if (command !== "") {
            const result = eval(command);
            if (result !== undefined) {
              term.echo(String(result));
            }
          }
        },
        {
          greetings: "Javascript Interpreter",
          height: 170,
          name: "js_demo",
          prompt: "js> ",
          width: 450,
        });
    }
  }
}
