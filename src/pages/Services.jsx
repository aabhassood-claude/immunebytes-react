import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { StructuredServicePage, ProseServicePage } from '../components/ServicePages';
import * as serviceData from '../data/serviceData';

// Map URL slugs to data objects
const SERVICE_REGISTRY = {
  'smart-contract':   { data: serviceData.PAGE_SCA, template: 'structured' },
  'by-chain':         { data: serviceData.PAGE_BY_CHAIN, template: 'structured' },
  'by-project-type':  { data: serviceData.PAGE_BY_PROJECT_TYPE, template: 'prose' },
  'protocol':         { data: serviceData.PAGE_PROTOCOL, template: 'structured' },
  'l1-l2':            { data: serviceData.PAGE_L1_L2, template: 'structured' },
  'consensus':        { data: serviceData.PAGE_CONSENSUS, template: 'structured' },
  'tokenomics':       { data: serviceData.PAGE_TOKENOMICS, template: 'structured' },
  'wallet':           { data: serviceData.PAGE_WALLET, template: 'structured' },
  'dapp-integration': { data: serviceData.PAGE_DAPP_INTEGRATION, template: 'structured' },
  'extension':        { data: serviceData.PAGE_WALLET_EXTENSION, template: 'structured' },
  'pentest':          { data: serviceData.PAGE_PENTEST, template: 'structured' },
  'web-app':          { data: serviceData.PAGE_WEB_APP, template: 'structured' },
  'mobile':           { data: serviceData.PAGE_MOBILE, template: 'structured' },
  'desktop':          { data: serviceData.PAGE_DESKTOP, template: 'structured' },
  'agent':            { data: serviceData.PAGE_AI_AGENT, template: 'structured' },
  'chatbot':          { data: serviceData.PAGE_CHATBOT, template: 'structured' },
  'llm':              { data: serviceData.PAGE_LLM, template: 'structured' },
  'automation':       { data: serviceData.PAGE_AUTOMATION, template: 'structured' },
  'shift-left':       { data: serviceData.PAGE_SHIFT_LEFT, template: 'structured' },
  'test-fuzz':        { data: serviceData.PAGE_TEST_FUZZ, template: 'structured' },
  'pre-audit':        { data: serviceData.PAGE_PRE_AUDIT, template: 'structured' },
  'research':         { data: serviceData.PAGE_RESEARCH, template: 'structured' },
};

export default function Services() {
  const { '*': splat } = useParams();
  // Extract the last segment of the URL as the page slug
  const segments = (splat || '').split('/').filter(Boolean);
  const pageSlug = segments[segments.length - 1] || 'smart-contract';

  const entry = SERVICE_REGISTRY[pageSlug] || SERVICE_REGISTRY['smart-contract'];

  let body;
  if (entry.template === 'prose') {
    body = <main><ProseServicePage data={entry.data} /></main>;
  } else {
    body = <main><StructuredServicePage data={entry.data} /></main>;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header activePath={`/${pageSlug}`} />
      {body}
      <Footer />
    </div>
  );
}
