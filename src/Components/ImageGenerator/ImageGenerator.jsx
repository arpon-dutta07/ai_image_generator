import React, { useRef, useState } from 'react'
import './ImageGenerator.css';
import default_image from '../assets/default_image.svg';
import Gallery from '../Gallery/Gallery';
import About from '../About/About';
import Contact from '../Contact/Contact';


const ImageGenerator = () => {

  const [image_url, setImage_url] = useState("/")
  const [loading, setLoading] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")
  let inputRef = useRef(null);

  const generateImage = async () => {
    if(inputRef.current.value === "") {
      return 0;
    }
    
    setLoading(true);
    
    try {
      console.log("Generating image for prompt:", inputRef.current.value);
      
      // Try Pollinations AI (Free, no API key needed)
      const response = await fetch("https://image.pollinations.ai/prompt/" + encodeURIComponent(inputRef.current.value), {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 0) {
          const imageUrl = URL.createObjectURL(blob);
          setImage_url(imageUrl);
          setCurrentPrompt(inputRef.current.value);
          console.log("Image generated successfully with Pollinations AI!");
          return;
        }
      }
      
      // If Pollinations fails, show error
      console.error("Pollinations AI failed:", response.status);
      alert("Failed to generate image. Please try again with a different prompt.");
      
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Failed to generate image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const downloadImage = async () => {
    if (image_url === "/" || !image_url) {
      alert("No image to download! Please generate an image first.");
      return;
    }

    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = image_url;
      
      // Generate filename with current date and prompt
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const promptText = currentPrompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `ai_image_${promptText}_${timestamp}.png`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log("Image downloaded successfully!");
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Failed to download image. Please try again.");
    }
  }


  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="logo">✨ AI Studio</div>
        <nav>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => {e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});}}>Home</a></li>
            <li><a href="#gallery" onClick={(e) => {e.preventDefault(); document.getElementById('gallery').scrollIntoView({behavior: 'smooth'});}}>Gallery</a></li>
            <li><a href="#about" onClick={(e) => {e.preventDefault(); document.getElementById('about').scrollIntoView({behavior: 'smooth'});}}>About</a></li>
            <li><a href="#contact" onClick={(e) => {e.preventDefault(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'});}}>Contact</a></li>
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
          <div className='image'> 
            <img 
              src={image_url === "/" ? default_image : image_url} 
              alt={image_url === "/" ? "Default placeholder" : "Generated AI image"} 
            />
            <div className="shimmer"></div>
            {loading && <div className="loading">Generating your masterpiece...</div>}
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
              onClick={downloadImage}
              disabled={image_url === "/" || loading}
              title="Download Image"
            >
              ⬇️
            </button>
          </div>
        </div>
        
        {image_url !== "/" && (
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
          <div className="footer-section">
            <h3>AI Image Generator</h3>
            <p>Create stunning, unique images with the power of artificial intelligence. Transform your imagination into reality with just a few words.</p>
            <div className="social-links">
              <a href="#" title="Twitter">🐦</a>
              <a href="#" title="Instagram">📷</a>
              <a href="#" title="GitHub">💻</a>
              <a href="#" title="Discord">💬</a>
            </div>
          </div>
          
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
        
        <div className="footer-bottom">
          <p>&copy; 2024 AI Image Generator. Made with ❤️ and cutting-edge AI technology.</p>
        </div>
      </footer>
    </>
  )
}

export default ImageGenerator