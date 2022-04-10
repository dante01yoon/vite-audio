// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    'done-fetching': 'SIGNEDIN' | 'SIGNEDME' | 'SIGNEDUP';
  };
  internalEvents: {
    'done.invoke.fetch-auth': {
      type: 'done.invoke.fetch-auth';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
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
