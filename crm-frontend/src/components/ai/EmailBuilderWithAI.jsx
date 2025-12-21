import React, { useState } from 'react';
import { AIAssistant, EmailSuggestionsBox, AILoadingState, AIErrorMessage } from './AIAssistant';
import { generateEmailSuggestions } from '../services/aiService';

/**
 * Email Builder with AI Assistance
 * Integrates AI email content suggestions into the email builder
 */
export const EmailBuilderWithAI = ({ 
  recipientName = '', 
  recipientCompany = '', 
  onEmailSelect,
  token 
}) => {
  const aiAssistant = AIAssistant({ type: 'email', token });
  const [emailType, setEmailType] = useState('follow-up');
  const [tone, setTone] = useState('professional');
  const [campaignContext, setCampaignContext] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleGenerateSuggestions = async () => {
    await aiAssistant.generateEmailContent({
      recipientName,
      recipientCompany,
      emailType,
      campaignContext,
      tone,
    });
  };

  const handleSuggestionSelect = (suggestion) => {
    setSubject(suggestion.subject);
    setBody(suggestion.body);
    aiAssistant.setSuggestions(null);
    aiAssistant.setShowSuggestions(false);
    
    if (onEmailSelect) {
      onEmailSelect({
        subject: suggestion.subject,
        body: suggestion.body,
        cta: suggestion.cta,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* AI Controls */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">✨ AI Email Assistant</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Type
            </label>
            <select
              value={emailType}
              onChange={(e) => setEmailType(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="follow-up">Follow-up</option>
              <option value="introduction">Introduction</option>
              <option value="meeting-request">Meeting Request</option>
              <option value="proposal">Proposal</option>
              <option value="thank-you">Thank You</option>
              <option value="nurture">Nurture</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="assertive">Assertive</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Campaign Context
            </label>
            <input
              type="text"
              value={campaignContext}
              onChange={(e) => setCampaignContext(e.target.value)}
              placeholder="e.g., Q1 Product Launch"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateSuggestions}
          disabled={aiAssistant.loading || !recipientName || !campaignContext}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition"
        >
          {aiAssistant.loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Generating suggestions...
            </>
          ) : (
            '✨ Generate Suggestions'
          )}
        </button>
      </div>

      {/* Loading State */}
      {aiAssistant.loading && <AILoadingState />}

      {/* Error Message */}
      {aiAssistant.error && (
        <AIErrorMessage
          error={aiAssistant.error}
          onDismiss={() => aiAssistant.setShowSuggestions(false)}
        />
      )}

      {/* Suggestions Display */}
      {aiAssistant.showSuggestions && (
        <EmailSuggestionsBox
          suggestions={aiAssistant.suggestions}
          onSelect={handleSuggestionSelect}
          onClose={() => aiAssistant.setShowSuggestions(false)}
        />
      )}

      {/* Email Content Fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject Line
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email content..."
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailBuilderWithAI;
