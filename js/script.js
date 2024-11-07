

document.addEventListener('DOMContentLoaded', function() {
  const demoContainer = document.getElementById('demo-container');

  document.addEventListener('DOMContentLoaded', function() {
    // Existing code...

    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a, .cta a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('href');
            if (page) {
                window.location.href = page;
            }
        });
    });

    // Dropdown toggle
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Existing code...
});
  
  // Simulated Q&A interaction
  const qaPairs = [
      { question: "What was CRA's 2023 total cost of sales?", answer: "CRA's reported total cost of sales for fiscal year 2023 was $66,089" },
      { question: "What was CRA's gross margin in 2021 and 2022, respectively?", answer: "CRA's gross margin was 33.99% in 2021 and 27.94% in 2022." },
      { question: "How much did CRA's net sales increase from 2022 to 2023?", answer: "CRA's net sales increased by $23,152, from $278,550 in 2022 to $301,702 in 2023." }
  ];

  let currentQAIndex = 0;

  function renderQA() {
      const qa = qaPairs[currentQAIndex];
      demoContainer.innerHTML = `
          <div class="qa-interaction">
              <div class="financial-statement">
                  <img src="images/financial-statement.png" alt="Sample Financial Statement">
              </div>
              <div class="qa-content">
                  <div class="question">${qa.question}</div>
                  <div class="answer">${qa.answer}</div>
              </div>
              <button id="next-qa">Next Question</button>
          </div>
      `;

      document.getElementById('next-qa').addEventListener('click', () => {
          currentQAIndex = (currentQAIndex + 1) % qaPairs.length;
          renderQA();
      });
  }

  renderQA();
});
document.addEventListener('DOMContentLoaded', function() {
  const demoContainer = document.getElementById('demo-container');
  
  const callSummary = `
Client: TechStart Inc.
Funding Round: Series A
Valuation: $20 million pre-money
Amount Raised: $5  million
Investor: VentureX Capital
`;

  const termSheetTemplate = `
TERM SHEET

Company: [COMPANY_NAME]
Round: [ROUND]
Valuation: [VALUATION]
Amount: [AMOUNT]
Lead Investor: [INVESTOR]

1. Type of Security: Series A Preferred Stock

2. Valuation: [VALUATION] pre-money valuation

3. Amount Raised: [AMOUNT]

4. Liquidation Preference: 1x non-participating preferred

5. Dividends: 8% non-cumulative

6. Voting Rights: Votes together with Common Stock on an as-converted basis

7. Board of Directors: 5 members
 - 2 appointed by Series A investors
 - 2 appointed by Common Stock holders
 - 1 independent director mutually agreed upon

8. Protective Provisions: Standard for transactions of this type

9. Anti-dilution: Broad-based weighted average

10. Employee Pool: 10% of post-money capitalization

11. Information Rights: Standard for transactions of this type

12. Right of First Refusal and Co-Sale: Standard for transactions of this type

13. Drag Along: 50% of Preferred and Common

14. Closing Conditions: Standard for transactions of this type

15. Exclusivity: 30 days

16. Expiration: This term sheet expires in 14 days if not accepted by the Company.

This term sheet is non-binding and is for discussion purposes only.
`;

  function renderDemo() {
      demoContainer.innerHTML = `
          <h3>Call Summary</h3>
          <pre>${callSummary}</pre>
          <button class="generate-btn">Generate Term Sheet</button>
          <div id="term-sheet" class="term-sheet" style="display: none;"></div>
      `;

      document.querySelector('.generate-btn').addEventListener('click', generateTermSheet);
  }

  function generateTermSheet() {
      const termSheet = termSheetTemplate
          .replace('[COMPANY_NAME]', 'TechStart Inc.')
          .replace('[ROUND]', 'Series A')
          .replace(/\[VALUATION\]/g, '$20 million')
          .replace('[AMOUNT]', '$5 million')
          .replace('[INVESTOR]', 'VentureX Capital');

      const termSheetElement = document.getElementById('term-sheet');
      termSheetElement.textContent = termSheet;
      termSheetElement.style.display = 'block';
  }

  renderDemo();
});

document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  const botResponses = {
      "hello": "Hello! How can I assist you today?",
      "hi": "Hi there! What can I help you with?",
      "how are you": "I'm doing well, thank you for asking. How may I help you?",
      "product information": "We offer a wide range of products. Could you please specify which product line you're interested in?",
      "pricing": "Our pricing varies depending on the product and package you choose. Can you tell me which specific product you're inquiring about?",
      "shipping": "We offer free shipping on orders over $50. Standard shipping usually takes 3-5 business days.",
      "return policy": "We have a 30-day return policy for most items. Please ensure the item is unused and in its original packaging.",
      "contact support": "You can reach our support team at support@example.com or call us at 1-800-123-4567 during business hours.",
      "default": "I'm sorry, I didn't quite understand that. Could you please rephrase your question or choose from our frequently asked topics?"
  };

  function addMessage(message, isUser = false) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(userMessage) {
      const lowerCaseMessage = userMessage.toLowerCase();
      for (const [key, value] of Object.entries(botResponses)) {
          if (lowerCaseMessage.includes(key)) {
              return value;
          }
      }
      return botResponses.default;
  }

  function handleUserInput() {
      const userMessage = userInput.value.trim();
      if (userMessage) {
          addMessage(userMessage, true);
          userInput.value = '';

          setTimeout(() => {
              const botResponse = getBotResponse(userMessage);
              addMessage(botResponse);
          }, 500);
      }
  }

  sendButton.addEventListener('click', handleUserInput);
  userInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          handleUserInput();
      }
  });

  // Initial bot message
  addMessage("Hello! I'm your AI assistant. How can I help you today?");
});


document.addEventListener('DOMContentLoaded', function() {
  const transcriptInput = document.getElementById('transcript-input');
  const analyzeButton = document.getElementById('analyze-button');
  const financialMetrics = document.getElementById('financial-metrics');
  const keyTopics = document.getElementById('key-topics');
  const sentimentAnalysis = document.getElementById('sentiment-analysis');

  analyzeButton.addEventListener('click', analyzeTranscript);

  function analyzeTranscript() {
      const transcript = transcriptInput.value.trim();
      if (transcript) {
          // In a real-world scenario, this would be sent to a backend for processing
          // For this demo, we'll use some mock analysis results
          const results = mockAnalysis(transcript);
          displayResults(results);
      } else {
          alert('Please enter an earnings call transcript to analyze.');
      }
  }

  function mockAnalysis(transcript) {
      // This is a simplified mock analysis
      // In a real scenario, this would involve complex NLP and ML techniques
      const words = transcript.toLowerCase().split(/\s+/);
      const wordCount = words.length;

      return {
          financialMetrics: [
              { name: 'Revenue', value: '$' + (Math.random() * 1000).toFixed(2) + 'M' },
              { name: 'Net Income', value: '$' + (Math.random() * 100).toFixed(2) + 'M' },
              { name: 'EPS', value: '$' + (Math.random() * 2).toFixed(2) },
          ],
          keyTopics: [
              { name: 'Growth', mentions: Math.floor(Math.random() * 10) + 1 },
              { name: 'Innovation', mentions: Math.floor(Math.random() * 10) + 1 },
              { name: 'Market Share', mentions: Math.floor(Math.random() * 10) + 1 },
          ],
          sentiment: {
              overall: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)],
              confidence: (Math.random() * 0.5 + 0.5).toFixed(2)
          }
      };
  }

  function displayResults(results) {
      // Display financial metrics
      financialMetrics.innerHTML = '<h4>Financial Metrics</h4>';
      results.financialMetrics.forEach(metric => {
          const metricElement = document.createElement('div');
          metricElement.classList.add('metric');
          metricElement.textContent = `${metric.name}: ${metric.value}`;
          financialMetrics.appendChild(metricElement);
      });

      // Display key topics
      keyTopics.innerHTML = '<h4>Key Topics</h4>';
      results.keyTopics.forEach(topic => {
          const topicElement = document.createElement('div');
          topicElement.classList.add('topic');
          topicElement.textContent = `${topic.name}: ${topic.mentions} mentions`;
          keyTopics.appendChild(topicElement);
      });

      // Display sentiment analysis
      sentimentAnalysis.innerHTML = '<h4>Sentiment Analysis</h4>';
      const sentimentElement = document.createElement('div');
      sentimentElement.classList.add('sentiment');
      sentimentElement.textContent = `Overall: ${results.sentiment.overall} (Confidence: ${results.sentiment.confidence})`;
      sentimentAnalysis.appendChild(sentimentElement);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const researchTopic = document.getElementById('research-topic');
  const searchButton = document.getElementById('search-button');
  const papersList = document.getElementById('papers-list');
  const summarySection = document.getElementById('summary-section');

  searchButton.addEventListener('click', performSearch);

  function performSearch() {
      const topic = researchTopic.value.trim();
      if (topic) {
          // In a real-world scenario, this would make an API call to a backend service
          // For this demo, we'll use mock data
          const results = mockSearchResults(topic);
          displayResults(results);
      } else {
          alert('Please enter a research topic to search.');
      }
  }

  function mockSearchResults(topic) {
      // This is a simplified mock of search results
      // In a real scenario, this would be the result of an API call
      return [
          {
              title: `Advances in ${topic} Research`,
              authors: 'John Doe, Jane Smith',
              abstract: `This paper presents recent advancements in ${topic}, highlighting key developments and future research directions.`,
              year: 2023
          },
          {
              title: `A Comprehensive Review of ${topic}`,
              authors: 'Alice Johnson, Bob Williams',
              abstract: `Our review synthesizes the current state of knowledge in ${topic}, identifying gaps and proposing new avenues for investigation.`,
              year: 2022
          },
          {
              title: `Emerging Trends in ${topic}`,
              authors: 'Eva Brown, Chris Davis',
              abstract: `We explore cutting-edge trends in ${topic}, discussing their potential impact on the field and related industries.`,
              year: 2023
          }
      ];
  }

  function displayResults(results) {
      papersList.innerHTML = '';
      results.forEach(paper => {
          const paperElement = document.createElement('div');
          paperElement.classList.add('paper-item');
          paperElement.innerHTML = `
              <div class="paper-title">${paper.title}</div>
              <div class="paper-authors">${paper.authors} (${paper.year})</div>
              <div class="paper-abstract">${paper.abstract}</div>
          `;
          papersList.appendChild(paperElement);
      });

      generateSummary(results);
  }

  function generateSummary(results) {
      // In a real scenario, this would involve more sophisticated NLP techniques
      const topicSummary = `Based on the analysis of ${results.length} recent papers, 
          the research in ${researchTopic.value} is primarily focused on advancements, 
          comprehensive reviews, and emerging trends. Key researchers in this field include 
          ${results.map(r => r.authors.split(',')[0]).join(', ')}. The most recent studies 
          date from ${Math.max(...results.map(r => r.year))}.`;

      summarySection.innerHTML = `
          <h3>Research Summary</h3>
          <p>${topicSummary}</p>
      `;
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });

  function sendMessage() {
      const message = userInput.value.trim();
      if (message) {
          addMessage(message, 'user-message');
          userInput.value = '';
          setTimeout(() => {
              const response = generateResponse(message);
              addMessage(response, 'assistant-message');
          }, 1000);
      }
  }

  function addMessage(message, className) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', className);
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateResponse(message) {
      // This is a simplified response generation.
      // In a real application, this would involve more sophisticated NLP and potentially API calls.
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('headache')) {
          return "I'm sorry to hear you're experiencing a headache. Some common causes include stress, dehydration, or lack of sleep. Try drinking water, resting in a dark room, and if the pain persists or is severe, please consult a healthcare professional.";
      } else if (lowerMessage.includes('cold') || lowerMessage.includes('flu')) {
          return "Cold and flu symptoms can be similar. Rest, stay hydrated, and monitor your symptoms. If you have a high fever, severe symptoms, or they last more than a week, please see a doctor.";
      } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout')) {
          return "Regular exercise is great for your health! Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity a week. Always consult with a doctor before starting a new exercise routine.";
      } else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition')) {
          return "A balanced diet is key to good health. Try to include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals. If you have specific dietary concerns, it's best to consult with a registered dietitian.";
      } else {
          return "I'm here to provide general health information, but for specific medical advice, diagnosis, or treatment, please consult with a qualified healthcare professional. Is there anything else I can help you with?";
      }
  }


  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    const industryDropdown = document.getElementById('industry-dropdown');
    const metricDropdown = document.getElementById('metric-dropdown');
    const modelDropdown = document.getElementById('model-dropdown');
    const useCaseCards = document.querySelectorAll('.use-case-card');

    function filterUseCases() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedIndustry = industryDropdown.value.toLowerCase();
        const selectedMetric = metricDropdown.value.toLowerCase();
        const selectedModel = modelDropdown.value.toLowerCase();

        useCaseCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const cardIndustry = card.dataset.industry ? card.dataset.industry.toLowerCase() : '';
            const cardMetric = card.dataset.metric ? card.dataset.metric.toLowerCase() : '';
            const cardModel = card.dataset.model ? card.dataset.model.toLowerCase() : '';

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesIndustry = selectedIndustry === '' || cardIndustry.includes(selectedIndustry);
            const matchesMetric = selectedMetric === '' || cardMetric.includes(selectedMetric);
            const matchesModel = selectedModel === '' || cardModel.includes(selectedModel);

            if (matchesSearch && matchesIndustry && matchesMetric && matchesModel) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterUseCases);
    searchButton.addEventListener('click', filterUseCases);
    industryDropdown.addEventListener('change', filterUseCases);
    metricDropdown.addEventListener('change', filterUseCases);
    modelDropdown.addEventListener('change', filterUseCases);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '☰';
    document.querySelector('.navbar').prepend(mobileMenuToggle);

    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    // Dropdown menu for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown-toggle')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });
});

  // Initial message
  addMessage("Hello! I'm your virtual health assistant. How can I help you today?", 'assistant-message');
});
/////
// Common functionality for all pages
function initCommonFunctionality() {
    // Header dropdown toggle
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('show');
      });
    }
  
    // Mobile menu toggle (assuming there's a mobile menu)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
      });
    }
  
    // Newsletter subscription form
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
      subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        // Here you would typically send this to your server or newsletter service
        console.log(`Subscribing email: ${email}`);
        alert('Thank you for subscribing!');
      });
    }
  }
  
  // Specific functionality for individual pages
  const pageFunctions = {
    'index.html': () => {
      console.log('Home page specific functionality');
      // Add any home page specific code here
    },
    'courses.html': () => {
      console.log('Courses page specific functionality');
      // Add course enrollment logic, course filtering, etc.
    },
    'knowledgecenter.html': () => {
      console.log('Knowledge Center page specific functionality');
      // Add blog post loading, filtering, etc.
    },
    'letstalk.html': () => {
      console.log('Contact page specific functionality');
      // Add contact form submission logic
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Here you would typically send this to your server
          console.log('Contact form submitted');
          alert('Thank you for your message. We will get back to you soon!');
        });
      }
    },
    'products.html': () => {
      console.log('Products page specific functionality');
      // Add product filtering, sorting, etc.
    },
    'try-ndimensions.html': () => {
      console.log('Demo page specific functionality');
      // Add demo interaction logic
      const generateBtn = document.getElementById('generate-btn');
      const aiPrompt = document.getElementById('ai-prompt');
      const aiResponse = document.getElementById('ai-response');
      
      if (generateBtn && aiPrompt && aiResponse) {
        generateBtn.addEventListener('click', () => {
          const prompt = aiPrompt.value;
          // Here you would typically send this to your AI service
          console.log(`Generating response for: ${prompt}`);
          aiResponse.innerHTML = '<p>AI is thinking...</p>';
          // Simulate AI response after 2 seconds
          setTimeout(() => {
            aiResponse.innerHTML = '<p>This is a simulated AI response.</p>';
          }, 2000);
        });
      }
    },
    'usecases.html': () => {
      console.log('Use Cases page specific functionality');
      // Add use case filtering, sorting, etc.
    },
    'aboutus.html': () => {
      console.log('About Us page specific functionality');
      // Add any about page specific interactions
    },
    'careers.html': () => {
      console.log('Careers page specific functionality');
      // Add job listing filtering, application form logic, etc.
    }
  };
  
  // Initialize page-specific functionality
  function initPageFunctionality() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (pageFunctions[currentPage]) {
      pageFunctions[currentPage]();
    }
  }
  
  // Main initialization function
  function init() {
    initCommonFunctionality();
    initPageFunctionality();
  }
  
  // Run initialization when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', init);
  
  // For demonstration purposes, let's simulate page loads
  console.log('Simulating page loads:');
  Object.keys(pageFunctions).forEach(page => {
    console.log(`\nLoading ${page}`);
    pageFunctions[page]();
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img.lazy').forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }

    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.about-leadership__card, .about-advisors__card');
    const animateCards = () => {
        const triggerBottom = window.innerHeight * 0.8;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateCards);
    animateCards(); // Initial check on page load
});
document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.about-advisors__dropdown-toggle');

  dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
          const content = this.closest('.about-advisors__card').querySelector('.about-advisors__content');
          const isActive = content.classList.contains('active');

          // Close all dropdowns
          document.querySelectorAll('.about-advisors__content').forEach(el => el.classList.remove('active'));
          document.querySelectorAll('.about-advisors__dropdown-toggle').forEach(el => el.classList.remove('active'));

          // Open the clicked dropdown if it was closed
          if (!isActive) {
              content.classList.add('active');
              this.classList.add('active');
          }
      });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const demoFeatureSelect = document.getElementById('demo-feature-select');
  const runDemoButton = document.getElementById('run-demo');
  const demoOutput = document.getElementById('demo-output');

  runDemoButton.addEventListener('click', function() {
      const selectedFeature = demoFeatureSelect.value;
      if (selectedFeature) {
          demoOutput.innerHTML = `<p>Running demo for: ${selectedFeature}</p>`;
          // Simulate API call or processing time
          setTimeout(() => {
              switch (selectedFeature) {
                  case 'risk-assessment':
                      demoOutput.innerHTML += '<p>Risk assessment complete. Overall risk score: 72/100</p>';
                      break;
                  case 'fraud-detection':
                      demoOutput.innerHTML += '<p>Fraud detection analysis finished. 3 suspicious transactions identified.</p>';
                      break;
                  case 'market-analysis':
                      demoOutput.innerHTML += '<p>Market analysis completed. Bullish trend detected in tech sector.</p>';
                      break;
                  default:
                      demoOutput.innerHTML += '<p>Demo completed successfully.</p>';
              }
          }, 1500);
      } else {
          demoOutput.innerHTML = '<p>Please select a feature to demo.</p>';
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const demoFeatureSelect = document.getElementById('demo-feature-select');
  const runDemoButton = document.getElementById('run-demo');
  const demoOutput = document.getElementById('demo-output');

  runDemoButton.addEventListener('click', function() {
      const selectedFeature = demoFeatureSelect.value;
      if (selectedFeature) {
          demoOutput.innerHTML = `<p>Running demo for: ${selectedFeature}</p>`;
          // Simulate API call or processing time
          setTimeout(() => {
              switch (selectedFeature) {
                  case 'predictive-maintenance':
                      demoOutput.innerHTML += '<p>Predictive maintenance analysis complete. Next maintenance due in 500 flight hours.</p>';
                      break;
                  case 'flight-optimization':
                      demoOutput.innerHTML += '<p>Flight path optimization finished. Estimated fuel savings: 12%</p>';
                      break;
                  case 'design-simulation':
                      demoOutput.innerHTML += '<p>Design simulation completed. Aerodynamic efficiency improved by 8%.</p>';
                      break;
                  default:
                      demoOutput.innerHTML += '<p>Demo completed successfully.</p>';
              }
          }, 1500);
      } else {
          demoOutput.innerHTML = '<p>Please select a feature to demo.</p>';
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const demoFeatureSelect = document.getElementById('demo-feature-select');
  const runDemoButton = document.getElementById('run-demo');
  const demoOutput = document.getElementById('demo-output');

  runDemoButton.addEventListener('click', function() {
      const selectedFeature = demoFeatureSelect.value;
      if (selectedFeature) {
          demoOutput.innerHTML = `<p>Running demo for: ${selectedFeature}</p>`;
          // Simulate API call or processing time
          setTimeout(() => {
              switch (selectedFeature) {
                  case 'diagnosis-assistant':
                      demoOutput.innerHTML += '<p>AI-assisted diagnosis complete. Recommended tests: Blood panel, CT scan.</p>';
                      break;
                  case 'imaging-analysis':
                      demoOutput.innerHTML += '<p>Medical imaging analysis finished. Anomaly detected in lower right quadrant.</p>';
                      break;
                  case 'patient-monitoring':
                      demoOutput.innerHTML += '<p>Remote patient monitoring update: Heart rate and blood pressure within normal ranges.</p>';
                      break;
                  default:
                      demoOutput.innerHTML += '<p>Demo completed successfully.</p>';
              }
          }, 1500);
      } else {
          demoOutput.innerHTML = '<p>Please select a feature to demo.</p>';
      }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const demoFeatureSelect = document.getElementById('demo-feature-select');
  const runDemoButton = document.getElementById('run-demo');
  const demoOutput = document.getElementById('demo-output');

  runDemoButton.addEventListener('click', function() {
      const selectedFeature = demoFeatureSelect.value;
      if (selectedFeature) {
          demoOutput.innerHTML = `<p>Running demo for: ${selectedFeature}</p>`;
          // Simulate API call or processing time
          setTimeout(() => {
              switch (selectedFeature) {
                  case 'seismic-interpretation':
                      demoOutput.innerHTML += '<p>Seismic data interpretation complete. Potential reservoir identified at 3500m depth.</p>';
                      break;
                  case 'predictive-maintenance':
                      demoOutput.innerHTML += '<p>Predictive maintenance analysis finished. Pump #3 requires inspection within 48 hours.</p>';
                      break;
                  case 'production-optimization':
                      demoOutput.innerHTML += '<p>Production optimization complete. Recommended flow rate adjustment: +5% for Well A, -2% for Well B.</p>';
                      break;
                  default:
                      demoOutput.innerHTML += '<p>Demo completed successfully.</p>';
              }
          }, 1500);
      } else {
          demoOutput.innerHTML = '<p>Please select a feature to demo.</p>';
      }
  });
});
 // Simple toggle function
 function togglePaper() {
    const content = document.getElementById('paperContent');
    content.classList.toggle('active');
}

 // Dropdown toggle functionality
        
 document.querySelectorAll('.mega-menu-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const megaMenu = button.parentElement;
        megaMenu.classList.toggle('active');
        
        // Close other mega-menus
        document.querySelectorAll('.mega-menu.active').forEach(activeMegaMenu => {
            if (activeMegaMenu !== megaMenu) {
                activeMegaMenu.classList.remove('active');
            }
        });
    });
});

// Close mega-menus when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.mega-menu.active').forEach(megaMenu => {
        megaMenu.classList.remove('active');
    });
});

function togglePaper() {
    const paperContent = document.getElementById('paperContent');
    paperContent.classList.toggle('active');
}

function togglePaperContent() {
    var content = document.getElementById('paperContent');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const backLink = document.getElementById('backToBlog');
    
    backLink.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Navigating back to blog...');
        // In a real application, you might want to add custom navigation logic here
        // For demonstration, we'll just log a message and redirect after a short delay
        setTimeout(() => {
            window.location.href = '/blog';
        }, 500);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const testimonialContent = document.querySelector('.ndai-quote-content');
    const authorElement = document.querySelector('.ndai-author');
    const companyElement = document.querySelector('.ndai-company');
    const prevBtn = document.querySelector('.ndai-prev');
    const nextBtn = document.querySelector('.ndai-next');
    const dots = document.querySelectorAll('.ndai-dot');
    let currentIndex = 0;
  
    const testimonials = [
      {
        quote: "nDimensions.AI's technology allows us to create around-the-clock availability, serving contextual information quickly.",
        // author: "CEO",
        // company: "ONE ZERO"
      },
      {
        quote: "With nDimensions.AI, we've revolutionized our customer service, providing instant, accurate responses 24/7.",
        // author: "CTO",
        // company: "TECH INNOVATORS"
      },
      {
        quote: "The AI solutions from nDimensions.AI have dramatically improved our operational efficiency at an unprecedented scale.",
        // author: "COO",
        // company: "GLOBAL SYSTEMS"
      },
      {
        quote: "nDimensions.AI's platform has enabled us to create personalized experiences for each of our customers.",
        // author: "CMO",
        // company: "NEXGEN RETAIL"
      }
    ];
  
    function showTestimonial(index) {
      testimonialContent.style.opacity = 0;
      setTimeout(() => {
        testimonialContent.textContent = testimonials[index].quote;
        authorElement.textContent = testimonials[index].author;
        companyElement.textContent = testimonials[index].company;
        testimonialContent.style.opacity = 1;
      }, 500);
      dots.forEach((dot, i) => {
        dot.classList.toggle('ndai-dot-active', i === index);
      });
    }
  
    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }
  
    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    }
  
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
  
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(currentIndex);
      });
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('prod-header');
    const scrollThreshold = 100; // Adjust this value to change when the header becomes visible

    function handleScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll);
  });
  document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.prod-feature');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelector('.prod-feature-gradient').style.opacity = '1';
        } else {
          entry.target.querySelector('.prod-feature-gradient').style.opacity = '0';
        }
      });
    }, { threshold: 0.3 });

    features.forEach(feature => {
      observer.observe(feature);
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const resourceNav = document.getElementById('resourceNav');
    const contentWrapper = document.getElementById('contentWrapper');
    const heroSection = document.querySelector('.knowledge-hero');
    
    function handleScroll() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.pageYOffset >= heroBottom - 72) { // 72px is header height
            resourceNav.classList.add('sticky');
            contentWrapper.classList.add('nav-is-sticky');
        } else {
            resourceNav.classList.remove('sticky');
            contentWrapper.classList.remove('nav-is-sticky');
        }
    }

    window.addEventListener('scroll', handleScroll);
});