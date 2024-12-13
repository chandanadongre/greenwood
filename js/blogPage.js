const blogPosts = [
    {
        title: "Lorem ipsum 1",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        link: "blog1.html" 
    },
    {
        title: "Lorem ipsum 2",
        description: "Praesent non ligula in eros ultrices.Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        link: "blog1.html" 
    },
    {
        title: "Lorem ipsum 3",
        description: "BPraesent non ligula in eros ultrices. applications.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        link: "blog1.html" 
    },
    {
        title: "Lorem ipsum 4",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        link: "blog1.html" 
    },
    {
        title: "Lorem ipsum 5",
        description: "BPraesent non ligula in eros ultrices. applications.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        link: "blog1.html" 
    },
    {
        title: "Lorem ipsum 6",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
        link: "blog1.html" 
    }
];

class BlogLoader {
    constructor() {
        this.currentIndex = 0;
        this.postsPerLoad = 3;
        this.isLoading = false;
        this.blogGrid = document.getElementById('blog-grid');
        this.loadMoreBtn = document.getElementById('load-more-btn');
        
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMorePosts());
        }
        
        // Initialize intersection observer for animations
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        // Load initial posts
        this.loadMorePosts();
    }

    createBlogCard(post, index) {
        const article = document.createElement('article');
        article.className = 'blog-card transform transition-all duration-300 opacity-0 translate-y-8';
        article.style.transitionDelay = `${index * 100}ms`;
        
        article.innerHTML = `
        <a href="${post.link}" class="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[450px] min-h-[450px]">
  <div class="relative overflow-hidden group h-64">
    <img 
      src="${post.image}" 
      alt="${post.title}"
      class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
    >
    <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
  </div>

  <div class="p-6 flex flex-col justify-between h-[calc(100%-16rem)]">
    <h3 class="text-2xl font-bold text-gray-800 mb-3 hover:text-green-700 transition-colors duration-300 line-clamp-2">
      ${post.title}
    </h3>
    <p class="text-gray-600 mb-4 line-clamp-2">
      ${post.description}
    </p>
    <span class="inline-flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors duration-300 group">
      Read More 
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
           viewBox="0 0 24 24" 
           fill="none" 
           stroke="currentColor" 
           stroke-width="2" 
           stroke-linecap="round" 
           stroke-linejoin="round">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </span>
  </div>
</a>

      
        `;
    
        return article;
    }
    

    showLoadingState() {
        if (!this.loadMoreBtn) return;
        this.loadMoreBtn.disabled = true;
        this.loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
        const span = this.loadMoreBtn.querySelector('span');
        span.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
        `;
    }

    hideLoadingState() {
        if (!this.loadMoreBtn) return;
        this.loadMoreBtn.disabled = false;
        this.loadMoreBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        this.loadMoreBtn.querySelector('span').textContent = 'Load More Blogs';
    }

    loadMorePosts() {
        if (this.isLoading || this.currentIndex >= blogPosts.length) return;
        this.isLoading = true;
        
        this.showLoadingState();
        
        setTimeout(() => {
            const fragment = document.createDocumentFragment();
            const endIndex = Math.min(this.currentIndex + this.postsPerLoad, blogPosts.length);
            
            for (let i = this.currentIndex; i < endIndex; i++) {
                const card = this.createBlogCard(blogPosts[i], i - this.currentIndex);
                fragment.appendChild(card);
                this.observer.observe(card);
            }
            
            this.blogGrid.appendChild(fragment);
            
            // Trigger reflow to enable animations
            requestAnimationFrame(() => {
                const newCards = Array.from(this.blogGrid.children).slice(this.currentIndex);
                newCards.forEach(card => {
                    card.classList.add('fade-in');
                });
            });
            
            this.currentIndex = endIndex;
            this.hideLoadingState();
            this.isLoading = false;
            
            if (this.currentIndex >= blogPosts.length && this.loadMoreBtn) {
                this.loadMoreBtn.style.display = 'none';
            }
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', () => new BlogLoader());