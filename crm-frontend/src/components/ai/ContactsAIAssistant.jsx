import React, { useState } from 'react';
import { AIAssistant, OutreachSuggestionsBox, AILoadingState, AIErrorMessage } from './AIAssistant';
import { generateOutreachSuggestions } from '../services/aiService';

/**
 * Contacts AI Assistant
 * Generates personalized outreach messages for contacts
 */
export const ContactsAIAssistant = ({ 
  contact = {},
  token 
}) => {
  const aiAssistant = AIAssistant({ type: 'outreach', token });
  const [messageType, setMessageType] = useState('initial-outreach');
  const [tone, setTone] = useState('professional');
  const [customValue, setCustomValue] = useState('');

  const handleGenerateMessages = async () => {
    await aiAssistant.generateOutreachContent({
      contactName: contact.name || '',
      contactRole: contact.title || '',
      companyName: contact.company || '',
      industry: contact.industry || '',
      value: customValue,
      tone,
    });
  };

  const handleMessageSelect = (suggestion) => {
    if (aiAssistant.onSuggestionSelect) {
      aiAssistant.onSuggestionSelect(suggestion);
    }
    // Trigger callback or save to draft
    console.log('Selected message:', suggestion);
    aiAssistant.setSuggestions(null);
    aiAssistant.setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      {/* Contact Info Display */}
      {contact.name && (
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Contact Info</h4>
          <div className="space-y-1 text-sm text-gray-700">
            {contact.name && <div><span className="font-medium">Name:</span> {contact.name}</div>}
            {contact.title && <div><span className="font-medium">Title:</span> {contact.title}</div>}
            {contact.company && <div><span className="font-medium">Company:</span> {contact.company}</div>}
            {contact.industry && <div><span className="font-medium">Industry:</span> {contact.industry}</div>}
          </div>
        </div>
      )}

      {/* AI Controls */}
      <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">✨ AI Outreach Assistant</h3>

        <div className="space-y-3 mb-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Message Type
            </label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="initial-outreach">Initial Outreach</option>
              <option value="follow-up">Follow-up</option>
              <option value="reconnect">Reconnect</option>
              <option value="event-invitation">Event Invitation</option>
              <option value="value-prop">Value Proposition</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Value Proposition (optional)
            </label>
            <textarea
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="What value do you want to highlight? (e.g., helps reduce costs by 30%)"
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateMessages}
          disabled={aiAssistant.loading || !contact.name}
          className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition"
        >
          {aiAssistant.loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Generating messages...
            </>
          ) : (
            '✨ Generate Messages'
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
        <OutreachSuggestionsBox
          suggestions={aiAssistant.suggestions}
          onSelect={handleMessageSelect}
          onClose={() => aiAssistant.setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

/**
 * Quick Contact Card with AI Button
 */
export const ContactCardWithAI = ({ contact, onGenerateMessage }) => {
  const [showAIPanel, setShowAIPanel] = useState(false);

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{contact.name}</h4>
          <p className="text-sm text-gray-600">{contact.title}</p>
          <p className="text-xs text-gray-500">{contact.company}</p>
        </div>
        <button
          onClick={() => setShowAIPanel(!showAIPanel)}
          className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition font-medium"
        >
          ✨ AI
        </button>
      </div>

      {showAIPanel && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <ContactsAIAssistant contact={contact} token={contact.token} />
        </div>
      )}
    </div>
  );
};

/**
 * Bulk Outreach with AI
 */
export const BulkOutreachWithAI = ({ contacts = [], token }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [messageTemplate, setMessageTemplate] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const toggleContact = (contactId) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Bulk Outreach Campaign</h3>

      {/* Contact Selection */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Select Contacts ({selectedContacts.length} selected)
        </h4>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {contacts.map((contact) => (
            <label key={contact.id} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => toggleContact(contact.id)}
                className="rounded border-gray-300 mr-3"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{contact.name}</div>
                <div className="text-xs text-gray-600">{contact.title} at {contact.company}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Message Template */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message Template
        </label>
        <textarea
          value={messageTemplate}
          onChange={(e) => setMessageTemplate(e.target.value)}
          placeholder="Use {name}, {title}, {company} as placeholders..."
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
        />
      </div>

      {/* Preview & Send */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex-1 px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 font-medium transition"
        >
          👁️ Preview
        </button>

        <button
          disabled={selectedContacts.length === 0}
          className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
        >
          📨 Send to {selectedContacts.length} contacts
        </button>
      </div>

      {/* Preview Panel */}
      {showPreview && selectedContacts.length > 0 && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-3">Preview</h4>
          <div className="p-3 bg-white rounded border border-gray-200 text-sm text-gray-700 whitespace-pre-wrap font-mono">
            {messageTemplate.replace(
              /{name}|{title}|{company}/g,
              (match) => {
                const contact = contacts.find((c) => selectedContacts.includes(c.id));
                if (!contact) return match;
                if (match === '{name}') return contact.name;
                if (match === '{title}') return contact.title;
                if (match === '{company}') return contact.company;
                return match;
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsAIAssistant;
