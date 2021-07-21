import { ReactWidget } from '@jupyterlab/apputils';

import { Panel, PanelLayout, Widget } from '@lumino/widgets';

import React, { useEffect, useState } from 'react';

import { Toolbar } from '@jupyterlab/apputils';

import { IRestartsModel } from './tokens';


class RestartsBody extends ReactWidget {
  constructor(model: IRestartsModel) {
    super();
    this._model = model;
    this.addClass('jp-DebuggerRestarts-body');
  }

  render(): JSX.Element {
    return <RestartsComponent model={this._model} />;
  }

  private _model: IRestartsModel;
}

const RestartsComponent = ({
  model
}: {
  model: IRestartsModel;
}): JSX.Element => {
  const [restarts, setRestarts] = useState(
    Array.from(model.restarts)
  );

  useEffect(() => {
    const updateRestarts = (
      _: IRestartsModel,
      updates: string[]
    ): void => {
      setRestarts(Array.from(model.restarts));
    };

    /*const restoreRestarts = (_: IRestartsModel): void => {
      setRestarts(Array.from(model.restarts.entries()));
    };*/

    model.changed.connect(updateRestarts);
    //model.restored.connect(restoreRestarts);

    return (): void => {
      model.changed.disconnect(updateRestarts);
      //model.restored.disconnect(restoreRestarts);
    };
  });

  return (
    <>
      {restarts.map((restart, index) => (
        <RestartComponent
          index={index}
          restart={restart}
          model={model}
        />
      ))}
    </>
  );
};


const RestartComponent = ({
  index,
  restart,
  model
}: {
  index: number;
  restart: string;
  model: IRestartsModel;
}): JSX.Element => {
  return (
    <div
      className={'jp-DebuggerRestart'}
      onClick={(): void => model.clicked.emit(index)}
      title={restart}
    >
      <span className={'jp-DebuggerRestart-text'}>{restart}</span>
    </div>
  );
};


export class RestartsPanel extends Panel {
  constructor(options: any) {
    super();
    const { model } = options;

    const header = new RestartsHeader();
    const body = new RestartsBody(model);

    this.addWidget(header);
    this.addWidget(body);

    this.addClass('jp-DebuggerRestarts');
  }
}


class RestartsHeader extends Widget {
  constructor() {
    super({ node: document.createElement('header') });

    const title = new Widget({ node: document.createElement('h2') });
    title.node.textContent = 'Restarts';

    const layout = new PanelLayout();
    layout.addWidget(title);
    layout.addWidget(this.toolbar);
    this.layout = layout;
  }

  readonly toolbar = new Toolbar();
}
