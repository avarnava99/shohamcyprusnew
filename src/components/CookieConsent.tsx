import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = 'shoham_cookie_consent';

const GA_ID = 'G-RWD1S131V7';
const ALBACROSS_ID = '89658243';

function loadGA() {
  if (document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.gtag?.('config', GA_ID);
}

function loadAlbacross() {
  if (document.getElementById('albacross-script')) return;
  (window as any)._nQc = ALBACROSS_ID;
  const s = document.createElement('script');
  s.id = 'albacross-script';
  s.async = true;
  s.src = 'https://serve.albacross.com/track.js';
  document.head.appendChild(s);
}

function loadAhrefs() {
  if (document.getElementById('ahrefs-analytics')) return;
  const s = document.createElement('script');
  s.id = 'ahrefs-analytics';
  s.async = true;
  s.src = 'https://analytics.ahrefs.com/analytics.js';
  s.setAttribute('data-key', 'zmhjHwtMhVC/sv3Mi4QmPg');
  document.head.appendChild(s);
}

function updateConsent(consent: ConsentState) {
  window.gtag?.('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });

  if (consent.analytics) { loadGA(); loadAhrefs(); }
  if (consent.marketing) loadAlbacross();
}

function getSavedConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();
    if (saved) {
      updateConsent(saved);
    } else {
      setVisible(true);
    }
  }, []);

  const save = useCallback((consent: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    updateConsent(consent);
    setVisible(false);
  }, []);

  const acceptAll = () => save({ analytics: true, marketing: true, timestamp: new Date().toISOString() });
  const rejectAll = () => save({ analytics: false, marketing: false, timestamp: new Date().toISOString() });
  const savePrefs = () => save({ analytics, marketing, timestamp: new Date().toISOString() });

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-xl border bg-card shadow-2xl">
        <div className="flex items-start gap-3 p-4 sm:p-5">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="flex-1 space-y-3">
            <p className="text-sm leading-relaxed text-card-foreground">
              We use cookies and tracking technologies to improve your experience, analyse site traffic, and support marketing.
              Read our{' '}
              <Link to="/about-us/privacy-policy" className="font-medium text-primary underline underline-offset-2">
                Privacy Policy
              </Link>.
            </p>

            {/* Preferences panel */}
            <button
              onClick={() => setShowPrefs(!showPrefs)}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Manage Preferences {showPrefs ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>

            <div className={cn('space-y-2 overflow-hidden transition-all', showPrefs ? 'max-h-40' : 'max-h-0')}>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked disabled className="accent-primary h-4 w-4" />
                <span>Essential <span className="text-xs">(always on)</span></span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-primary h-4 w-4"
                />
                <span>Analytics <span className="text-xs text-muted-foreground">(Google Analytics)</span></span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="accent-primary h-4 w-4"
                />
                <span>Marketing <span className="text-xs text-muted-foreground">(Albacross)</span></span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={acceptAll} size="sm" className="text-xs">
                Accept All
              </Button>
              <Button onClick={rejectAll} variant="outline" size="sm" className="text-xs">
                Reject All
              </Button>
              {showPrefs && (
                <Button onClick={savePrefs} variant="secondary" size="sm" className="text-xs">
                  Save Preferences
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
