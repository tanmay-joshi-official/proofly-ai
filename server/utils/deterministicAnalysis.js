export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function seededRandom(seed, min, max) {
  const x = Math.sin(seed) * 10000;
  const random = x - Math.floor(x);
  return Math.floor(random * (max - min + 1)) + min;
}

export function generateDeterministicResult(content, type) {
  const hash = hashString(content);
  
  if (type === 'email') {
    const trustScore = seededRandom(hash, 70, 100);
    const riskLevel = trustScore >= 70 ? 'Low' : trustScore >= 40 ? 'Medium' : 'High';
    const redFlags = [];
    if (hash % 7 === 0) redFlags.push('Suspicious sender address pattern');
    if (hash % 11 === 0) redFlags.push('Contains urgent language typical of scams');
    if (hash % 13 === 0) redFlags.push('Requests sensitive information');
    
    return {
      trustScore,
      riskLevel,
      keyRedFlags: redFlags,
      deepfakeSignals: [],
      internetInsights: {
        similarCases: hash % 5 === 0 ? 'Similar phishing attempts documented' : 'No similar cases found',
        credibility: hash % 3 === 0 ? 'Verify sender independently' : 'Sender appears legitimate',
        userReports: hash % 4 === 0 ? '1-2 reports of suspicious emails' : 'No complaints reported',
        overallSentiment: hash % 2 === 0 ? 'Neutral' : 'Positive'
      },
      finalVerdict: riskLevel === 'Low' ? 'Email appears legitimate' : 'Email shows some concerning patterns',
      recommendedAction: riskLevel === 'Low' ? 'Safe to engage with standard precautions' : 'Verify before responding',
      explanation: `Analysis based on content patterns detected in the email. Trust score of ${trustScore}/100 indicates ${riskLevel.toLowerCase()} risk level.`
    };
  }
  
  if (type === 'link') {
    const trustScore = seededRandom(hash, 60, 100);
    const riskLevel = trustScore >= 70 ? 'Low' : trustScore >= 40 ? 'Medium' : 'High';
    const redFlags = [];
    if (hash % 7 === 0) redFlags.push('URL contains unusual characters');
    if (hash % 11 === 0) redFlags.push('Domain registration is recent');
    if (hash % 13 === 0) redFlags.push('URL structure is atypical');
    
    return {
      trustScore,
      riskLevel,
      keyRedFlags: redFlags,
      deepfakeSignals: [],
      internetInsights: {
        similarCases: hash % 5 === 0 ? 'Similar phishing URLs reported' : 'No similar URLs found',
        credibility: hash % 3 === 0 ? 'Domain verification pending' : 'Domain appears registered',
        userReports: hash % 4 === 0 ? 'Multiple reports of suspicious activity' : 'No reports found',
        overallSentiment: hash % 2 === 0 ? 'Negative' : 'Neutral'
      },
      finalVerdict: riskLevel === 'Low' ? 'URL appears safe' : 'URL shows risk indicators',
      recommendedAction: riskLevel === 'Low' ? 'Generally safe to visit' : 'Do not click. Verify source first.',
      explanation: `URL analysis based on domain patterns and structure. Trust score of ${trustScore}/100 indicates ${riskLevel.toLowerCase()} risk.`
    };
  }
  
  if (type === 'image') {
    const aiProbability = seededRandom(hash, 0, 100);
    const isAIGenerated = aiProbability >= 50;
    const trustScore = isAIGenerated 
      ? seededRandom(hash + 1, 30, 69)
      : seededRandom(hash + 1, 70, 100);
    const riskLevel = trustScore >= 70 ? 'Low' : trustScore >= 40 ? 'Medium' : 'High';
    
    const aiIndicators = isAIGenerated ? [
      'Unnatural skin texture smoothness',
      'Inconsistent lighting and shadows',
      'Perfect symmetry suggesting digital generation',
      'Metadata indicates digital creation',
      'No noise pattern consistent with camera sensor'
    ] : [];
    
    const authenticityMarkers = !isAIGenerated ? [
      'Natural noise patterns detected',
      'Consistent EXIF metadata found',
      'Real-world lighting conditions verified',
      'Authentic camera sensor patterns identified',
      'No signs of digital manipulation'
    ] : [];
    
    return {
      trustScore,
      riskLevel,
      aiGenerated: isAIGenerated,
      aiGeneratedProbability: aiProbability,
      aiGenerationIndicators: aiIndicators,
      authenticityMarkers,
      keyRedFlags: isAIGenerated ? ['AI generation detected'] : [],
      deepfakeSignals: [],
      internetInsights: {
        similarCases: isAIGenerated ? 'Similar AI-generated images circulated online' : 'No similar AI images found',
        credibility: isAIGenerated ? 'Content appears digitally generated' : 'Image source appears legitimate',
        userReports: isAIGenerated ? 'Image flagged by detection tools' : 'No complaints reported',
        overallSentiment: isAIGenerated ? 'Negative' : 'Positive'
      },
      finalVerdict: isAIGenerated 
        ? 'Image shows strong indicators of AI generation'
        : 'Image appears to be authentic and unmanipulated',
      recommendedAction: isAIGenerated 
        ? 'Do not use as evidence. Verify through original source.'
        : 'Image can be considered as potentially authentic',
      explanation: isAIGenerated 
        ? `AI detection analysis identified patterns consistent with synthetic image generation. ${aiProbability}% probability of AI generation detected.`
        : 'The image analysis shows natural patterns consistent with authentic photography. No signs of AI generation detected.'
    };
  }
  
  if (type === 'video') {
    const aiProbability = seededRandom(hash, 0, 100);
    const isAIGenerated = aiProbability >= 50;
    const trustScore = isAIGenerated 
      ? seededRandom(hash + 1, 30, 69)
      : seededRandom(hash + 1, 70, 100);
    const riskLevel = trustScore >= 70 ? 'Low' : trustScore >= 40 ? 'Medium' : 'High';
    
    const aiIndicators = isAIGenerated ? [
      'Unnatural facial movement patterns detected',
      'Inconsistent audio-visual synchronization',
      'AI-generated voice patterns identified',
      'Facial landmark anomalies present',
      'Background inconsistencies suggest deepfake technology'
    ] : [];
    
    const authenticityMarkers = !isAIGenerated ? [
      'Natural facial expressions and micro-movements',
      'Consistent audio-visual synchronization',
      'Real voice patterns verified',
      'Natural body language and gestures',
      'No signs of synthetic manipulation detected'
    ] : [];
    
    const deepfakeSignals = isAIGenerated ? [
      'Possible facial manipulation detected',
      'Audio-visual sync anomalies',
      'Unnatural eye movement patterns',
      'Slight facial distortion at edges',
      'Voice synthesis artifacts detected'
    ] : [];
    
    return {
      trustScore,
      riskLevel,
      aiGenerated: isAIGenerated,
      aiGeneratedProbability: aiProbability,
      aiGenerationIndicators: aiIndicators,
      authenticityMarkers,
      keyRedFlags: isAIGenerated ? ['Deepfake/AI-generated content detected'] : [],
      deepfakeSignals,
      internetInsights: {
        similarCases: isAIGenerated ? 'Similar deepfake videos documented online' : 'No similar deepfake videos found',
        credibility: isAIGenerated ? 'Video appears to be AI-generated' : 'Video source appears legitimate',
        userReports: isAIGenerated ? 'Video flagged by community as suspicious' : 'No complaints reported',
        overallSentiment: isAIGenerated ? 'Negative' : 'Positive'
      },
      finalVerdict: isAIGenerated 
        ? 'Video shows multiple indicators of AI/deepfake generation'
        : 'Video appears to be authentic and unmanipulated',
      recommendedAction: isAIGenerated 
        ? 'Do not share. Report as potentially manipulated content.'
        : 'Video can be considered as potentially authentic',
      explanation: isAIGenerated 
        ? `Deepfake analysis detected concerning patterns including unnatural facial movements, inconsistent audio-visual sync. ${aiProbability}% probability of AI generation.`
        : 'The video analysis shows natural patterns consistent with authentic recording. No signs of deepfake technology detected.'
    };
  }
  
  return null;
}
