import React, { useRef, useState } from 'react'
import './ImageGenerator.css';
import default_image from '../assets/default_image.svg';
import Gallery from '../Gallery/Gallery';
import About from '../About/About';
import Contact from '../Contact/Contact';


const ImageGenerator = () => {

  const [image_urls, setImage_urls] = useState(["/", "/", "/", "/"])
  const [loading, setLoading] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let inputRef = useRef(null);

  const generateImage = async () => {
    if(inputRef.current.value === "") {
      return 0;
    }
    
    setLoading(true);
    
    try {
      console.log("Generating 4 images for prompt:", inputRef.current.value);
      
      const basePrompt = inputRef.current.value;
      const variations = [
        basePrompt,
        basePrompt + ", artistic style",
        basePrompt + ", photorealistic",
        basePrompt + ", digital art style"
      ];
      
      const imagePromises = variations.map(async (prompt, index) => {
        try {
          // Add a small delay between requests to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, index * 500));
          
          const response = await fetch("https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt), {
            method: "GET",
          });

          if (response.ok) {
            const blob = await response.blob();
            if (blob.size > 0) {
              return URL.createObjectURL(blob);
            }
          }
          return "/"; // Return default if failed
        } catch (error) {
          console.error(`Error generating image ${index + 1}:`, error);
          return "/"; // Return default if failed
        }
      });

      const generatedImages = await Promise.all(imagePromises);
      setImage_urls(generatedImages);
      setCurrentPrompt(inputRef.current.value);
      console.log("Images generated successfully!");
      
    } catch (error) {
      console.error("Error generating images:", error);
      alert(`Failed to generate images: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const downloadImage = async (imageIndex = null) => {
    const hasValidImages = image_urls.some(url => url !== "/");
    if (!hasValidImages) {
      alert("No images to download! Please generate images first.");
      return;
    }

    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const promptText = currentPrompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
      
      if (imageIndex !== null) {
        // Download specific image
        const imageUrl = image_urls[imageIndex];
        if (imageUrl !== "/") {
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = `ai_image_${promptText}_${imageIndex + 1}_${timestamp}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        // Download all valid images
        image_urls.forEach((imageUrl, index) => {
          if (imageUrl !== "/") {
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = imageUrl;
              link.download = `ai_image_${promptText}_${index + 1}_${timestamp}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, index * 500); // Stagger downloads
          }
        });
      }
      
      console.log("Images downloaded successfully!");
    } catch (error) {
      console.error("Error downloading images:", error);
      alert("Failed to download images. Please try again.");
    }
  }


  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="logo">✨ AI Studio</div>
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});}}>Home</a></li>
            <li><a href="#gallery" onClick={(e) => {e.preventDefault(); document.getElementById('gallery').scrollIntoView({behavior: 'smooth'});}}>Gallery</a></li>
            <li><a href="#about" onClick={(e) => {e.preventDefault(); document.getElementById('about').scrollIntoView({behavior: 'smooth'});}}>About</a></li>
            <li><a href="#contact" onClick={(e) => {e.preventDefault(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});}}>Contact</a></li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Mobile Menu */}
        <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li><a href="#home" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); setMobileMenuOpen(false);}}>Home</a></li>
            <li><a href="#gallery" onClick={(e) => {e.preventDefault(); document.getElementById('gallery').scrollIntoView({behavior: 'smooth'}); setMobileMenuOpen(false);}}>Gallery</a></li>
            <li><a href="#about" onClick={(e) => {e.preventDefault(); document.getElementById('about').scrollIntoView({behavior: 'smooth'}); setMobileMenuOpen(false);}}>About</a></li>
            <li><a href="#contact" onClick={(e) => {e.preventDefault(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); setMobileMenuOpen(false);}}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with 3D Background */}
      <div className='hero-section' id="home">
        {/* 3D Spline Background */}
        <div className="spline-background">
          <spline-viewer url="https://prod.spline.design/Ha5C9fVoAD3Tkzsm/scene.splinecode"></spline-viewer>
        </div>
        
        {/* Hero Content */}
        <div className="hero-content">
          <div className='header' data-text="AI IMAGE GENERATOR">
            <span className="word-ai" style={{'--i': 0}}>AI</span>{' '}
            <span className="word-image" style={{'--i': 1}}>IMAGE</span>{' '}
            <span className="word-generator" style={{'--i': 2}}>GENERATOR</span>
          </div>
          
          {/* Hero Subtitle */}
          <div className="hero-subtitle">
            <p className="subtitle-text">
              Transform your imagination into stunning visuals with the power of artificial intelligence
            </p>
            <div className="subtitle-highlights">
              <span className="highlight">✨ Unlimited Creativity</span>
              <span className="highlight">🚀 Instant Results</span>
              <span className="highlight">🎨 Professional Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Generator Section */}
      <div className='ai-image-generator'>
        <div className='img-loading'>
          <div className='images-grid'>
            {image_urls.map((image_url, index) => (
              <div key={index} className='image'> 
                <img 
                  src={image_url === "/" ? default_image : image_url} 
                  alt={image_url === "/" ? "Click generate to create AI image" : `Generated AI image ${index + 1}`}
                />
                <div className="shimmer"></div>
                {loading && (
                  <div className="loading">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Creating masterpiece {index + 1}...</div>
                    <div className="loading-progress">
                      <div className="progress-bar" style={{animationDelay: `${index * 0.5}s`}}></div>
                    </div>
                  </div>
                )}
                {!loading && image_url !== "/" && (
                  <button 
                    className="download-individual-btn"
                    onClick={() => downloadImage(index)}
                    title={`Download Image ${index + 1}`}
                  >
                    ⬇️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className='search-box'>
          <input 
            type="text" 
            ref={inputRef} 
            className='search-input' 
            placeholder='Describe your dream image in detail...'
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && !loading && generateImage()}
          />
          
          <div className='buttons-container'>
            <button 
              className={`generate-btn ${loading ? 'loading' : ''}`} 
              onClick={generateImage}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Creating...</span>
                </>
              ) : (
                'Generate'
              )}
            </button>
            
            <button 
              className='download-btn' 
              onClick={() => downloadImage()}
              disabled={!image_urls.some(url => url !== "/") || loading}
              title="Download All Images"
            >
              📥
            </button>
          </div>
        </div>
        
        {image_urls.some(url => url !== "/") && (
          <div style={{
            color: 'rgba(255, 255, 255, 0.8)', 
            fontSize: '16px', 
            textAlign: 'center',
            fontStyle: 'italic',
            maxWidth: '600px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            💭 "{currentPrompt}"
            <div style={{
              marginTop: '10px',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              4 unique variations generated
            </div>
          </div>
        )}
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-sections-row">
            <div className="footer-section">
              <h3>Features</h3>
              <p><a href="#">High-Quality Images</a></p>
              <p><a href="#">Fast Generation</a></p>
              <p><a href="#">Multiple Styles</a></p>
              <p><a href="#">Free to Use</a></p>
            </div>
            
            <div className="footer-section">
              <h3>Resources</h3>
              <p><a href="#">Documentation</a></p>
              <p><a href="#">API Reference</a></p>
              <p><a href="#">Tutorials</a></p>
              <p><a href="#">Community</a></p>
            </div>
            
            <div className="footer-section">
              <h3>Support</h3>
              <p><a href="#">Help Center</a></p>
              <p><a href="#">Contact Us</a></p>
              <p><a href="#">Bug Reports</a></p>
              <p><a href="#">Feature Requests</a></p>
            </div>
          </div>
          
          <div className="footer-social">
            <h3 className="follow-us-title">Follow Us</h3>
            <div className="social-links">
              <a href="#" title="Twitter" aria-label="Follow us on Twitter">🐦</a>
              <a href="#" title="Instagram" aria-label="Follow us on Instagram">📷</a>
              <a href="#" title="GitHub" aria-label="Follow us on GitHub">💻</a>
              <a href="#" title="Discord" aria-label="Join our Discord">💬</a>
              <a href="#" title="Facebook" aria-label="Follow us on Facebook">📘</a>
              <a href="#" title="LinkedIn" aria-label="Follow us on LinkedIn">💼</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 AI Image Generator. Made with ❤️ and cutting-edge AI technology.</p>
        </div>
      </footer>
    </>
  )
}

export default ImageGenerator