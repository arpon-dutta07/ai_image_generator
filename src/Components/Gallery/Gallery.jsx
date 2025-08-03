import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Sample AI-generated images with categories
  const galleryImages = [
    {
      id: 1,
      src: "https://image.pollinations.ai/prompt/a%20majestic%20lion%20in%20golden%20hour%20light",
      prompt: "A majestic lion in golden hour light",
      category: "animals",
      likes: 245
    },
    {
      id: 2,
      src: "https://image.pollinations.ai/prompt/cyberpunk%20city%20at%20night%20with%20neon%20lights",
      prompt: "Cyberpunk city at night with neon lights",
      category: "sci-fi",
      likes: 189
    },
    {
      id: 3,
      src: "https://image.pollinations.ai/prompt/beautiful%20mountain%20landscape%20with%20aurora%20borealis",
      prompt: "Beautiful mountain landscape with aurora borealis",
      category: "nature",
      likes: 312
    },
    {
      id: 4,
      src: "https://image.pollinations.ai/prompt/elegant%20woman%20in%20renaissance%20style%20painting",
      prompt: "Elegant woman in renaissance style painting",
      category: "portrait",
      likes: 156
    },
    {
      id: 5,
      src: "https://image.pollinations.ai/prompt/fantasy%20dragon%20flying%20over%20medieval%20castle",
      prompt: "Fantasy dragon flying over medieval castle",
      category: "fantasy",
      likes: 278
    },
    {
      id: 6,
      src: "https://image.pollinations.ai/prompt/abstract%20geometric%20art%20with%20vibrant%20colors",
      prompt: "Abstract geometric art with vibrant colors",
      category: "abstract",
      likes: 134
    },
    {
      id: 7,
      src: "https://image.pollinations.ai/prompt/cute%20robot%20in%20a%20flower%20garden",
      prompt: "Cute robot in a flower garden",
      category: "sci-fi",
      likes: 203
    },
    {
      id: 8,
      src: "https://image.pollinations.ai/prompt/serene%20japanese%20temple%20in%20cherry%20blossom%20season",
      prompt: "Serene Japanese temple in cherry blossom season",
      category: "nature",
      likes: 267
    },
    {
      id: 9,
      src: "https://image.pollinations.ai/prompt/steampunk%20airship%20in%20cloudy%20sky",
      prompt: "Steampunk airship in cloudy sky",
      category: "fantasy",
      likes: 198
    },
    {
      id: 10,
      src: "https://image.pollinations.ai/prompt/colorful%20parrot%20in%20tropical%20rainforest",
      prompt: "Colorful parrot in tropical rainforest",
      category: "animals",
      likes: 221
    },
    {
      id: 11,
      src: "https://image.pollinations.ai/prompt/futuristic%20space%20station%20orbiting%20earth",
      prompt: "Futuristic space station orbiting earth",
      category: "sci-fi",
      likes: 289
    },
    {
      id: 12,
      src: "https://image.pollinations.ai/prompt/mystical%20forest%20with%20glowing%20mushrooms",
      prompt: "Mystical forest with glowing mushrooms",
      category: "fantasy",
      likes: 345
    },
    {
      id: 13,
      src: "https://image.pollinations.ai/prompt/vintage%20car%20on%20desert%20highway",
      prompt: "Vintage car on desert highway",
      category: "vintage",
      likes: 167
    },
    {
      id: 14,
      src: "https://image.pollinations.ai/prompt/underwater%20coral%20reef%20with%20tropical%20fish",
      prompt: "Underwater coral reef with tropical fish",
      category: "nature",
      likes: 234
    },
    {
      id: 15,
      src: "https://image.pollinations.ai/prompt/gothic%20cathedral%20interior%20with%20stained%20glass",
      prompt: "Gothic cathedral interior with stained glass",
      category: "architecture",
      likes: 178
    },
    {
      id: 16,
      src: "https://image.pollinations.ai/prompt/magical%20unicorn%20in%20enchanted%20meadow",
      prompt: "Magical unicorn in enchanted meadow",
      category: "fantasy",
      likes: 298
    },
    {
      id: 17,
      src: "https://image.pollinations.ai/prompt/astronaut%20floating%20in%20deep%20space",
      prompt: "Astronaut floating in deep space",
      category: "sci-fi",
      likes: 256
    },
    {
      id: 18,
      src: "https://image.pollinations.ai/prompt/cozy%20cabin%20in%20snowy%20winter%20forest",
      prompt: "Cozy cabin in snowy winter forest",
      category: "nature",
      likes: 312
    },
    {
      id: 19,
      src: "https://image.pollinations.ai/prompt/elegant%20peacock%20displaying%20colorful%20feathers",
      prompt: "Elegant peacock displaying colorful feathers",
      category: "animals",
      likes: 189
    },
    {
      id: 20,
      src: "https://image.pollinations.ai/prompt/neon%20cityscape%20reflection%20in%20rain",
      prompt: "Neon cityscape reflection in rain",
      category: "urban",
      likes: 223
    },
    {
      id: 21,
      src: "https://image.pollinations.ai/prompt/ancient%20pyramid%20under%20starry%20night%20sky",
      prompt: "Ancient pyramid under starry night sky",
      category: "architecture",
      likes: 267
    },
    {
      id: 22,
      src: "https://image.pollinations.ai/prompt/beautiful%20mermaid%20swimming%20with%20dolphins",
      prompt: "Beautiful mermaid swimming with dolphins",
      category: "fantasy",
      likes: 334
    },
    {
      id: 23,
      src: "https://image.pollinations.ai/prompt/vintage%20steam%20locomotive%20in%20countryside",
      prompt: "Vintage steam locomotive in countryside",
      category: "vintage",
      likes: 145
    },
    {
      id: 24,
      src: "https://image.pollinations.ai/prompt/majestic%20eagle%20soaring%20over%20mountains",
      prompt: "Majestic eagle soaring over mountains",
      category: "animals",
      likes: 278
    },
    {
      id: 25,
      src: "https://image.pollinations.ai/prompt/holographic%20butterfly%20in%20digital%20garden",
      prompt: "Holographic butterfly in digital garden",
      category: "sci-fi",
      likes: 198
    },
    {
      id: 26,
      src: "https://image.pollinations.ai/prompt/sunset%20over%20lavender%20fields%20in%20provence",
      prompt: "Sunset over lavender fields in Provence",
      category: "nature",
      likes: 289
    },
    {
      id: 27,
      src: "https://image.pollinations.ai/prompt/wise%20old%20wizard%20with%20glowing%20staff",
      prompt: "Wise old wizard with glowing staff",
      category: "fantasy",
      likes: 245
    },
    {
      id: 28,
      src: "https://image.pollinations.ai/prompt/modern%20glass%20skyscraper%20at%20twilight",
      prompt: "Modern glass skyscraper at twilight",
      category: "architecture",
      likes: 167
    }
  ];

  const categories = ['all', 'nature', 'fantasy', 'sci-fi', 'animals', 'portrait', 'abstract', 'vintage', 'architecture', 'urban'];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const downloadImage = async (imageUrl, prompt) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai_image_${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Gallery...</h2>
        <p>Preparing amazing AI-generated artwork</p>
      </div>
    );
  }

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">
            <span className="title-word">AI</span>{' '}
            <span className="title-word">Gallery</span>
          </h2>
          <p className="gallery-subtitle">
            Explore stunning images created by artificial intelligence
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(image)}
            >
              <div className="image-container">
                <img
                  src={image.src}
                  alt={image.prompt}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{image.prompt}</h3>
                    <div className="image-stats">
                      <span className="likes">❤️ {image.likes}</span>
                      <span className="category">{image.category}</span>
                    </div>
                  </div>
                  <div className="overlay-actions">
                    <button
                      className="action-btn view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(image);
                      }}
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn download-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(image.src, image.prompt);
                      }}
                    >
                      ⬇️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>✕</button>
              <div className="modal-image-container">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.prompt}
                />
              </div>
              <div className="modal-info">
                <h3>{selectedImage.prompt}</h3>
                <div className="modal-stats">
                  <span className="likes">❤️ {selectedImage.likes} likes</span>
                  <span className="category">Category: {selectedImage.category}</span>
                </div>
                <button
                  className="modal-download-btn"
                  onClick={() => downloadImage(selectedImage.src, selectedImage.prompt)}
                >
                  Download Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;