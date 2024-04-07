
import { useState } from 'react';
import AppHeader from './components/header/AppHeader'
import { Pages } from './common/constants';
import Gallery from './components/gallery/Gallery';

function App() {
  // set default [activePage] to be used in AppHeader
  const [activePage, setActivePage] = useState(Pages.nature.toString());
  // pagination page count
  const [pageCount, setPageCount] = useState(0);

  return (
    <>
      <AppHeader
        pageLists={Object.values(Pages)}
        activePage={activePage}
        onChangedPage={(pageList: string) => {
          setPageCount(0);
          setActivePage(pageList);
        }}
      />
      <Gallery
        category={activePage}
        pageCount={pageCount}
        onPageCountChange={(pageCount: number) => {
          setPageCount(pageCount);
        }}
      />
    </>
  )
}

export default App
