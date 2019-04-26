import React from 'react';
import FindDom from './findDOMNode';
import Parent from './parent-life';
import StateSet from './setState';
import { UserState } from './hook/useState';
import { RenderPropsComponent } from './hook/renderProps';
import { AppEffectComponent } from './hook/useEffect';
import { CallbackApp } from './hook/useCallback';
import { CapTurnComponent } from './hook/capture-value';

function App() {
  return (
    <div className="App">
      {/*<FindDom />
      <Parent />
      <StateSet />
      <UserState />
      <RenderPropsComponent />
      <AppEffectComponent />*/}
      <CallbackApp />
      <CapTurnComponent />
    </div>
  );
}

export default App;
