import React, { useState } from 'react';
import { AIAssistant, CampaignSummaryBox, AILoadingState, AIErrorMessage } from './AIAssistant';
import { generateCampaignSummary } from '../services/aiService';

/**
 * Campaign Builder with AI Assistance
 * Integrates AI campaign analysis and optimization suggestions
 */
export const CampaignBuilderWithAI = ({ 
  campaignData = {},
  token 
}) => {
  const aiAssistant = AIAssistant({ type: 'campaign', token });
  const [campaignName, setCampaignName] = useState(campaignData.name || '');
  const [campaignDescription, setCampaignDescription] = useState(campaignData.description || '');
  const [campaignGoal, setCampaignGoal] = useState(campaignData.goal || '');
  const [targetAudience, setTargetAudience] = useState(campaignData.targetAudience || '');

  const handleGenerateSummary = async () => {
    await aiAssistant.generateCampaignAnalysis({
      campaignName,
      campaignDescription,
      targetAudience: targetAudience.split(',').map(a => a.trim()).filter(a => a),
      campaignGoal,
    });
  };

  return (
    <div className="space-y-6">
      {/* Campaign Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Name *
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g., Q1 Product Launch"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Description *
          </label>
          <textarea
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            placeholder="Describe the campaign purpose, key messages, and content..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Goal *
            </label>
            <input
              type="text"
              value={campaignGoal}
              onChange={(e) => setCampaignGoal(e.target.value)}
              placeholder="e.g., Generate 100 leads"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience (comma-separated)
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Tech executives, Enterprise buyers"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">✨ AI Campaign Assistant</h3>
        <p className="text-xs text-gray-600 mb-3">
          Get AI-powered analysis and optimization suggestions for your campaign
        </p>

        <button
          onClick={handleGenerateSummary}
          disabled={aiAssistant.loading || !campaignName || !campaignDescription || !campaignGoal}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition"
        >
          {aiAssistant.loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Analyzing campaign...
            </>
          ) : (
            '✨ Generate Campaign Analysis'
          )}
        </button>

        {aiAssistant.loading && (
          <div className="mt-4">
            <AILoadingState />
          </div>
        )}

        {aiAssistant.error && (
          <div className="mt-4">
            <AIErrorMessage
              error={aiAssistant.error}
              onDismiss={() => aiAssistant.setShowSuggestions(false)}
            />
          </div>
        )}

        {aiAssistant.showSuggestions && (
          <div className="mt-4">
            <CampaignSummaryBox
              summary={aiAssistant.suggestions}
              onClose={() => aiAssistant.setShowSuggestions(false)}
            />
          </div>
        )}
      </div>

      {/* Campaign Structure */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <div className="text-2xl mb-2">📧</div>
          <div className="text-sm font-medium text-gray-700">Email Content</div>
          <div className="text-xs text-gray-500 mt-1">Compose messages</div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-2">👥</div>
          <div className="text-sm font-medium text-gray-700">Audience</div>
          <div className="text-xs text-gray-500 mt-1">Select recipients</div>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-2">📊</div>
          <div className="text-sm font-medium text-gray-700">Schedule</div>
          <div className="text-xs text-gray-500 mt-1">Set send times</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Campaign Quick Preview
 */
export const CampaignPreview = ({ campaign, onEdit }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{campaign.name}</h3>
        <button
          onClick={onEdit}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium"
        >
          Edit
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-600">Goal: </span>
          <span className="font-medium text-gray-800">{campaign.goal}</span>
        </div>

        <div>
          <span className="text-gray-600">Target Audience: </span>
          <span className="font-medium text-gray-800">
            {Array.isArray(campaign.targetAudience)
              ? campaign.targetAudience.join(', ')
              : campaign.targetAudience}
          </span>
        </div>

        <div>
          <span className="text-gray-600">Status: </span>
          <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded font-medium">
            Draft
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilderWithAI;
