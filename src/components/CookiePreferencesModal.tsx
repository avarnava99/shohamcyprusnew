import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = 'shoham_cookie_consent';

function getSavedConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function updateConsent(consent: ConsentState) {
  window.gtag?.('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });
}

interface CookiePreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CookiePreferencesModal = ({ open, onOpenChange }: CookiePreferencesModalProps) => {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();
    if (saved) {
      setAnalytics(saved.analytics);
      setMarketing(saved.marketing);
    }
  }, [open]);

  const savePrefs = () => {
    const consent: ConsentState = {
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    updateConsent(consent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <DialogTitle>Cookie Preferences</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked
              disabled
              className="accent-primary h-4 w-4"
            />
            <span>Essential <span className="text-xs text-muted-foreground">(always on)</span></span>
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="accent-primary h-4 w-4"
            />
            <span>Analytics <span className="text-xs text-muted-foreground">(Google Analytics, Ahrefs)</span></span>
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

        <div className="flex gap-2">
          <Button onClick={savePrefs} className="flex-1">
            Save Preferences
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePreferencesModal;
