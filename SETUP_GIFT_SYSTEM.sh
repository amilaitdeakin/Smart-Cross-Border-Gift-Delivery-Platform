#!/bin/bash
# Quick Setup Guide for AI Gift Suggestion System

echo "🎁 AI Gift Suggestion System - Quick Setup"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✓ .env.local found"
    if grep -q "OPENAI_API_KEY" ".env.local"; then
        echo "✓ OPENAI_API_KEY is set"
    else
        echo "⚠ OPENAI_API_KEY not found in .env.local"
        echo "Please add: OPENAI_API_KEY=your_key_here"
    fi
else
    echo "✗ .env.local not found"
    echo "Create .env.local with: OPENAI_API_KEY=your_key_here"
fi

echo ""
echo "Next steps:"
echo "1. Get your API key from: https://platform.openai.com/api-keys"
echo "2. Add it to .env.local: OPENAI_API_KEY=sk-..."
echo "3. Run: npm run dev"
echo "4. Visit: http://localhost:3000/gifts/ai-suggestions"
echo ""
echo "For more info, see: AI_GIFT_SUGGESTION_SYSTEM.md"
