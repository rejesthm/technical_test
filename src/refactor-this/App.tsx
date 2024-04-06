
import { useState } from 'react';
import AppHeader from './components/header/AppHeader'
import { Pages } from './common/constants';
import Gallery from './components/gallery/Gallery';

function App() {
  // set default [activePage] to be used in AppHeader
  const [activePage, setActivePage] = useState(Pages.nature.toString());

  return (
    <>
      <AppHeader
        pageLists={Object.values(Pages)}
        activePage={activePage}
        onChangedPage={(pageList: string) => setActivePage(pageList)}
      />
      <Gallery
        category={activePage}
      />
    </>
  )
}

export default App
