import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IDebugger, IDebuggerSidebar } from '@jupyterlab/debugger';

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
    service.eventMessage.connect((service: IDebugger, event: IDebugger.ISession.Event) => {
      console.log(event);
    });
  }
};

export default plugin;
