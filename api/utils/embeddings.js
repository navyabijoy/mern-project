
/**
 * Generate a simple embedding vector from text
 * Uses a hash-based approach to create consistent vectors
 * @param {string} text - The text to generate embeddings for
 * @returns {Promise<number[]>} - Array of 128 numbers representing the embedding
 */
export const generateEmbedding = async (text) => {
  try {
    const textToEmbed = typeof text === 'string' ? text : JSON.stringify(text);
    const normalized = textToEmbed.toLowerCase().trim();
    
    // Create a 128-dimensional vector
    const dimensions = 128;
    const embedding = new Array(dimensions).fill(0);
    
    // Split text into words and create features
    const words = normalized.split(/\s+/);
    const uniqueWords = [...new Set(words)];
    
    // Generate features based on text characteristics
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordHash = simpleHash(word);
      
      // Distribute word influence across multiple dimensions
      for (let j = 0; j < 3; j++) {
        const idx = (wordHash + j * 43) % dimensions;
        embedding[idx] += 1 / Math.sqrt(words.length);
      }
    }
    
    // Add bigram features for better context
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = words[i] + ' ' + words[i + 1];
      const bigramHash = simpleHash(bigram);
      const idx = bigramHash % dimensions;
      embedding[idx] += 0.5 / Math.sqrt(words.length);
    }
    
    // Normalize the vector
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (magnitude > 0) {
      for (let i = 0; i < dimensions; i++) {
        embedding[i] /= magnitude;
      }
    }
    
    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error.message);
    return null;
  }
};

/**
 * Simple hash function for strings
 * @param {string} str - String to hash
 * @returns {number} - Hash value
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Create a searchable text from product data
 * @param {Object} product - Product object with name, description, brand, category
 * @returns {string} - Combined text for embedding
 */
export const createProductText = (product) => {
  const parts = [
    product.name,
    product.description,
    product.brand,
    product.category,
    product.condition,
  ].filter(Boolean); // Remove any undefined/null values
  
  return parts.join(' ');
};

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} - Similarity score between 0 and 1
 */
export const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || vecA.length !== vecB.length) {
    return 0;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
};
