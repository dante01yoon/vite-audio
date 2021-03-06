// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    'done-fetching': 'SIGNEDIN' | 'SIGNEDME' | 'SIGNEDUP';
    'reject-handler': 'error.platform.fetch-auth';
  };
  internalEvents: {
    'done.invoke.fetch-auth': {
      type: 'done.invoke.fetch-auth';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetch-auth': { type: 'error.platform.fetch-auth'; data: unknown };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'signedIn' | 'signedOut' | 'loading' | 'resolved' | 'rejected';
  tags: never;
}
