import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';

const Home = lazy(() => import('./home'));
const Projects = lazy(() => import('./projects'));
const About = lazy(() => import('./about'));
const Contact = lazy(() => import('./contact'));
const Resume = lazy(() => import('./resume'));
const NotFound = lazy(() => import('./not-found'));

export default function PagesRouter() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}