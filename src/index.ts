import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IDebugger, IDebuggerSidebar } from '@jupyterlab/debugger';

import { IRestartsModel } from './tokens';
import { RestartsModel } from './model';
import { RestartsPanel } from './panel';

/**
 * Initialization data for the jupyterlab-debugger-restarts extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-debugger-restarts:plugin',
  autoStart: true,
  requires: [IDebugger, IDebuggerSidebar],
  activate: (
    app: JupyterFrontEnd,
    service: IDebugger,
    sidebar: IDebugger.ISidebar
  ) => {
    console.log('jupyterlab-debugger-restarts activated.');

    let model: IRestartsModel = new RestartsModel();
    let panel: RestartsPanel = new RestartsPanel({
      model: model
    });

    model.clicked.connect((model: IRestartsModel, restartNumber: number) => {
      if (service.session) {
        service.session.sendRequest('continue', {
          threadId: model.threadId,
          restart: restartNumber
        } as any);
      }
    });

    service.eventMessage.connect((service: IDebugger, event: IDebugger.ISession.Event) => {
      switch (event.event) {
        case 'stopped':
          model.threadId = event.body.threadId;
          model.restarts = event.body.restarts || [];
          break;
        case 'continued':
        case 'initialized':
        case 'terminated':
          model.restarts = [];
          break;
      }
    });

    service.sessionChanged.connect((service: IDebugger, session: IDebugger.ISession | null) => {
      model.restarts = [];
    });

    sidebar.insertItem(2, panel);
  }
};

export default plugin;
