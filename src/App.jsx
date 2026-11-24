import React, { useState } from 'react';
import { Phone, Copy, Check, ExternalLink, MessageCircle, Send, PhoneCall, ChevronDown } from 'lucide-react';
import './App.css';

const COUNTRIES = [
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    flag: '🇪🇹',
    code: '+251',
    displayNumber: '0927 27 80 52',
    fullInternational: '+251 927 278 052',
    rawCallNumber: '0927278052',
    whatsappNumber: '251927278052',
    telegramHandleOrPhone: '+251927278052',
    imoNumber: '251927278052',
    tagline: 'Direct Local & International Support'
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    code: '+1',
    displayNumber: '+1 (343) 306-4688',
    fullInternational: '+1 (343) 306-4688',
    rawCallNumber: '+13433064688',
    whatsappNumber: '13433064688',
    telegramHandleOrPhone: '+13433064688',
    imoNumber: '13433064688',
    tagline: 'North America Contact Line'
  }
];

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCountry.displayNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleImoClick = (e) => {
    // Attempt deep link first, with fallback
    const imoDeepLink = `imo://call?phone=${selectedCountry.imoNumber}`;
    const imoChatLink = `imo://user?phone=${selectedCountry.imoNumber}`;
    
    // Check if mobile or desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = imoDeepLink;
    } else {
      window.open(`https://imo.im`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="page-wrapper">
      <main className="contact-card">
        {/* Status Indicator */}
        <div className="status-badge">
          <span className="pulse-dot"></span>
          <span className="status-text">Available Now • Ready to Connect</span>
        </div>

        {/* Header */}
        <div className="card-header">
          <h1 className="main-title">Contact Directly</h1>
          <p className="subtitle">Choose your preferred country and contact method</p>
        </div>

        {/* Country Selector Dropdown */}
        <div className="country-selector-container">
          <label className="selector-label">Select Country / አገር ይምረጡ:</label>
          <div className="custom-dropdown">
            <button
              type="button"
              className="dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              <span className="dropdown-left">
                <span className="flag-icon">{selectedCountry.flag}</span>
                <span className="country-name-bold">{selectedCountry.name}</span>
                <span className="country-code-pill">{selectedCountry.code}</span>
              </span>
              <ChevronDown className={`chevron-icon ${isDropdownOpen ? 'rotated' : ''}`} size={18} />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.id}
                    type="button"
                    className={`dropdown-option ${selectedCountry.id === country.id ? 'active' : ''}`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="option-flag">{country.flag}</span>
                    <span className="option-name">{country.name}</span>
                    <span className="option-number">{country.displayNumber}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Country Tabs for 1-Tap Switching */}
        <div className="tabs-container">
          {COUNTRIES.map((country) => (
            <button
              key={country.id}
              type="button"
              className={`tab-button ${selectedCountry.id === country.id ? 'active-tab' : ''}`}
              onClick={() => handleCountrySelect(country)}
            >
              <span className="tab-flag">{country.flag}</span>
              <span className="tab-label">{country.name}</span>
            </button>
          ))}
        </div>

        {/* Display Active Phone Number Box */}
        <div className="phone-display-box">
          <div className="phone-header">
            <span className="phone-tag">{selectedCountry.flag} {selectedCountry.name} Phone Number</span>
            <button
              type="button"
              className="copy-button"
              onClick={handleCopy}
              title="Copy Phone Number"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green" />
                  <span className="text-green">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="number-text">{selectedCountry.displayNumber}</div>
        </div>

        {/* Action Buttons Section */}
        <div className="action-buttons-group">
          {/* 1. Direct Call */}
          <a
            href={`tel:${selectedCountry.rawCallNumber}`}
            className="action-btn btn-call"
            id="call-button"
          >
            <div className="btn-icon-wrapper">
              <PhoneCall size={22} className="btn-icon" />
            </div>
            <div className="btn-text-content">
              <span className="btn-title">Direct Phone Call</span>
              <span className="btn-subtitle">Tap to call instantly</span>
            </div>
            <span className="action-arrow">→</span>
          </a>

          {/* 2. WhatsApp */}
          <a
            href={`https://wa.me/${selectedCountry.whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20connect%20with%20you.`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn btn-whatsapp"
            id="whatsapp-button"
          >
            <div className="btn-icon-wrapper">
              <svg className="btn-icon brand-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="btn-text-content">
              <span className="btn-title">WhatsApp</span>
              <span className="btn-subtitle">Message or call on WhatsApp</span>
            </div>
            <span className="action-arrow">→</span>
          </a>

          {/* 3. Telegram */}
          <a
            href={`https://t.me/${selectedCountry.telegramHandleOrPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn btn-telegram"
            id="telegram-button"
          >
            <div className="btn-icon-wrapper">
              <svg className="btn-icon brand-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.198 1.006.128.832.926z"/>
              </svg>
            </div>
            <div className="btn-text-content">
              <span className="btn-title">Telegram</span>
              <span className="btn-subtitle">Chat instantly on Telegram</span>
            </div>
            <span className="action-arrow">→</span>
          </a>

          {/* 4. IMO */}
          <button
            type="button"
            onClick={handleImoClick}
            className="action-btn btn-imo"
            id="imo-button"
          >
            <div className="btn-icon-wrapper">
              <svg className="btn-icon brand-svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M8 8v8M12 8v8M16 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="btn-text-content">
              <span className="btn-title">IMO</span>
              <span className="btn-subtitle">Call or message via IMO</span>
            </div>
            <span className="action-arrow">→</span>
          </button>
        </div>

        {/* Footer Note */}
        <footer className="card-footer">
          <p className="guarantee-text">⚡ Fast response • 100% Direct Connection</p>
        </footer>
      </main>
    </div>
  );
}
