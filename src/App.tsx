import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppNavigationSidebar } from './components/AppNavigationSidebar';
import { About, Annotate, Export, KnowledgeGraph, Images, Markus, Start, Vocabulary } from './pages';
import { useStore } from './store';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

export const App = () => { 

  const store = useStore();

  const { pathname } = useLocation();
  
  
  // 삽입코
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const image = params.get('image'); // 예: default/seo021867-000-002.jpg
    const annotations = params.get('annotations'); // 예: default/annotation.js

    if (image && annotations) {
      const encoded = encodeURIComponent(image);
      navigate(`/annotate/${encoded}`, { replace: true });
    }
  }, []);

  return store ? (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={store ? '/images' : '/start' }/>} />

        <Route path="start" element={<Start />} />

        <Route path="images" element={<Images />} />

        <Route path="images/:folder" element={<Images />} />

        <Route path="annotate/:images" element={store ? <Annotate /> : <Start />} />

        <Route path="model" element={<Vocabulary />} />

        <Route path="graph" element={<KnowledgeGraph />} />

        <Route path="export">
          <Route index element={<Navigate to="/export/annotations" />} />
          <Route path="annotations" element={<Export tab="annotations" />} />
          <Route path="relationships" element={<Export tab="relationships" />} />
          <Route path="model" element={<Export tab="model" />} />
          <Route path="metadata" element={<Export tab="metadata" />} />
        </Route>

        <Route path="markus" element={<Markus />} />

        <Route path="about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  ) : (
    <Start redirectTo={pathname === '/' ? undefined : pathname} />
  )

}

const NotFound = () => {

  return (
    <div className="page-root">
      <AppNavigationSidebar />

      <main className="page not-found">
        <h2>Nothing to see here.</h2>
      </main>
    </div>
  )

}
