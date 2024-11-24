const blogPosts = [
    {
        title: "Lorem ipsum 1",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 2",
        description: "Praesent non ligula in eros ultrices.Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 3",
        description: "BPraesent non ligula in eros ultrices. applications.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 4",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 3",
        description: "BPraesent non ligula in eros ultrices. applications.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Lorem ipsum 4",
        description: "Praesent non ligula in eros ultrices.",
        image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
];

function createBlogCard(post, index) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.style.animationDelay = `${index * 150}ms`;
    
    card.innerHTML = `
        <div class="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="overflow-hidden">
                <img src="${post.image}" alt="${post.title}" 
                     class="w-full h-60 object-cover transform hover:scale-105 transition-transform duration-700">
            </div>
            <div class="p-6">
                <h3 class="font-bold text-green-800 text-2xl mb-2">${post.title}</h3>
                <p class="text-gray-600 mb-4">${post.description}</p>
            </div>
        </div>
    `;
    
    return card;
}

function initializeBlogSection() {
    const blogGrid = document.getElementById('blog-grid');
    
    // Display only first two blog posts
    blogPosts.slice(0, 2).forEach((post, index) => {
        const card = createBlogCard(post, index);
        blogGrid.appendChild(card);
    });

    // Add animation with Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        observer.observe(card);
    });
}
function showLoadingState() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
    const span = loadMoreBtn.querySelector('span');
    span.innerHTML = `
        <div class="flex items-center">
            <div class="shimmer w-24 h-4 bg-white/20 rounded"></div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBlogSection);