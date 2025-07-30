/*!
 * Ganesh Utensils - Interactive Scripts
 * 2015-era JavaScript functionality
 */

$(document).ready(function() {
    'use strict';

    // Shopping cart array to store items
    var cart = [];
    var cartTotal = 0;

    // Initialize the application
    init();

    function init() {
        // Load images with fade-in effect
        loadImages();
        
        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize product interactions
        initProductButtons();
        
        // Initialize contact form
        initContactForm();
        
        // Initialize navbar scroll effect
        initNavbarScroll();
        
        // Show loading animation on page load
        hideLoader();
    }

    // Image loading with fade-in effect
    function loadImages() {
        $('.product-image img').each(function() {
            var $img = $(this);
            var img = new Image();
            
            img.onload = function() {
                $img.addClass('loaded');
            };
            
            img.src = $img.attr('src');
        });
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            var target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 800, 'easeInOutQuad');
            }
        });
    }

    // Product button interactions
    function initProductButtons() {
        // Add to Cart functionality
        $('.add-to-cart').on('click', function(e) {
            e.preventDefault();
            
            var $btn = $(this);
            var product = $btn.data('product');
            var price = parseInt($btn.data('price'));
            
            // Add loading state
            $btn.addClass('loading').prop('disabled', true);
            
            // Simulate API call delay
            setTimeout(function() {
                addToCart(product, price);
                
                // Remove loading state
                $btn.removeClass('loading').prop('disabled', false);
                
                // Show success feedback
                showNotification('Product added to cart successfully!', 'success');
                
                // Add bounce effect
                $btn.closest('.product-card').addClass('animate__animated animate__pulse');
                
                setTimeout(function() {
                    $btn.closest('.product-card').removeClass('animate__animated animate__pulse');
                }, 1000);
                
            }, 800);
        });

        // Buy Now functionality
        $('.buy-now').on('click', function(e) {
            e.preventDefault();
            
            var $btn = $(this);
            var product = $btn.data('product');
            var price = parseInt($btn.data('price'));
            
            // Add loading state
            $btn.addClass('loading').prop('disabled', true);
            
            // Simulate API call delay
            setTimeout(function() {
                buyNow(product, price);
                
                // Remove loading state
                $btn.removeClass('loading').prop('disabled', false);
                
            }, 800);
        });

        // Product card hover effects
        $('.product-card').hover(
            function() {
                $(this).find('.product-image img').css('transform', 'scale(1.05)');
            },
            function() {
                $(this).find('.product-image img').css('transform', 'scale(1)');
            }
        );
    }

    // Add item to cart
    function addToCart(product, price) {
        var existingItem = cart.find(function(item) {
            return item.product === product;
        });

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                product: product,
                price: price,
                quantity: 1
            });
        }

        updateCartTotal();
        updateCartDisplay();
        
        console.log('Cart updated:', cart);
    }

    // Buy now functionality
    function buyNow(product, price) {
        // Create order object
        var order = {
            product: product,
            price: price,
            quantity: 1,
            total: price,
            timestamp: new Date().toISOString()
        };

        // Show confirmation modal
        showOrderConfirmation(order);
        
        console.log('Order placed:', order);
    }

    // Update cart total
    function updateCartTotal() {
        cartTotal = cart.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Update cart display (if cart widget exists)
    function updateCartDisplay() {
        var itemCount = cart.reduce(function(count, item) {
            return count + item.quantity;
        }, 0);

        // Update cart badge if it exists
        $('.cart-badge').text(itemCount);
        $('.cart-total').text('PKR ' + cartTotal.toLocaleString());
    }

    // Show order confirmation
    function showOrderConfirmation(order) {
        var modalHtml = `
            <div class="modal fade" id="orderModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">
                                <i class="fa fa-shopping-cart text-success"></i> Order Confirmation
                            </h4>
                        </div>
                        <div class="modal-body">
                            <h5>Thank you for your order!</h5>
                            <div class="order-details">
                                <p><strong>Product:</strong> ${order.product}</p>
                                <p><strong>Price:</strong> PKR ${order.price.toLocaleString()}</p>
                                <p><strong>Quantity:</strong> ${order.quantity}</p>
                                <p><strong>Total:</strong> PKR ${order.total.toLocaleString()}</p>
                            </div>
                            <div class="alert alert-info">
                                <i class="fa fa-info-circle"></i>
                                We will contact you within 24 hours to confirm your order and arrange delivery.
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="continueShoppingg()">Continue Shopping</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal
        $('#orderModal').remove();
        
        // Add new modal
        $('body').append(modalHtml);
        
        // Show modal
        $('#orderModal').modal('show');
    }

    // Continue shopping function
    window.continueShoppingg = function() {
        $('#orderModal').modal('hide');
        window.location.href = 'products.html';
    };

    // Contact form functionality
    function initContactForm() {
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var $submitBtn = $form.find('button[type="submit"]');
            
            // Validate form
            if (!validateContactForm($form)) {
                return;
            }
            
            // Add loading state
            $submitBtn.addClass('loading').prop('disabled', true);
            
            // Get form data
            var formData = {
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                subject: $('#subject').val(),
                message: $('#message').val(),
                newsletter: $('#newsletter').is(':checked')
            };
            
            // Simulate form submission
            setTimeout(function() {
                // Remove loading state
                $submitBtn.removeClass('loading').prop('disabled', false);
                
                // Show success modal
                $('#successModal').modal('show');
                
                // Reset form
                $form[0].reset();
                
                console.log('Contact form submitted:', formData);
                
            }, 1500);
        });
    }

    // Validate contact form
    function validateContactForm($form) {
        var isValid = true;
        
        // Remove existing error messages
        $('.error-message').remove();
        $('.form-group').removeClass('has-error');
        
        // Required fields validation
        $form.find('[required]').each(function() {
            var $field = $(this);
            var $group = $field.closest('.form-group');
            
            if (!$field.val().trim()) {
                $group.addClass('has-error');
                $group.append('<div class="error-message">This field is required.</div>');
                isValid = false;
            }
        });
        
        // Email validation
        var email = $('#email').val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            $('#email').closest('.form-group').addClass('has-error');
            $('#email').closest('.form-group').append('<div class="error-message">Please enter a valid email address.</div>');
            isValid = false;
        }
        
        return isValid;
    }

    // Navbar scroll effect
    function initNavbarScroll() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 50) {
                $('.navbar').addClass('navbar-scrolled');
            } else {
                $('.navbar').removeClass('navbar-scrolled');
            }
        });
    }

    // Show notification
    function showNotification(message, type) {
        type = type || 'info';
        
        var notificationHtml = `
            <div class="notification notification-${type}" style="
                position: fixed;
                top: 90px;
                right: 20px;
                background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
                color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
                padding: 15px 20px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 9999;
                max-width: 300px;
                animation: slideInRight 0.5s ease-out;
            ">
                <i class="fa fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
                ${message}
            </div>
        `;
        
        $('body').append(notificationHtml);
        
        // Auto remove after 3 seconds
        setTimeout(function() {
            $('.notification').fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Hide loader
    function hideLoader() {
        // Remove loader if it exists
        $('.page-loader').fadeOut(500);
    }

    // Utility function for custom easing
    $.easing.easeInOutQuad = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
    };

    // Search functionality (if needed)
    function initSearch() {
        $('#searchInput').on('keyup', function() {
            var searchTerm = $(this).val().toLowerCase();
            
            $('.product-card').each(function() {
                var productName = $(this).find('h4').text().toLowerCase();
                var productDescription = $(this).find('p').text().toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        });
    }

    // Price filter functionality (if needed)
    function initPriceFilter() {
        $('#priceFilter').on('change', function() {
            var maxPrice = parseInt($(this).val());
            
            $('.product-card').each(function() {
                var productPrice = parseInt($(this).find('.product-price').text().replace(/[^\d]/g, ''));
                
                if (maxPrice === 0 || productPrice <= maxPrice) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        });
    }

    // Add CSS animations
    var animationCSS = `
        <style>
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .navbar-scrolled {
            background: rgba(63, 81, 181, 0.95) !important;
            backdrop-filter: blur(10px);
        }
        
        .has-error .form-control {
            border-color: #d9534f;
            box-shadow: 0 0 0 3px rgba(217, 83, 79, 0.1);
        }
        
        .animate__animated {
            animation-duration: 1s;
            animation-fill-mode: both;
        }
        
        .animate__pulse {
            animation-name: pulse;
        }
        
        @keyframes pulse {
            from {
                transform: scale3d(1, 1, 1);
            }
            50% {
                transform: scale3d(1.05, 1.05, 1.05);
            }
            to {
                transform: scale3d(1, 1, 1);
            }
        }
        </style>
    `;
    
    $('head').append(animationCSS);

    // Expose cart functions globally
    window.getCart = function() {
        return cart;
    };

    window.getCartTotal = function() {
        return cartTotal;
    };

    window.clearCart = function() {
        cart = [];
        cartTotal = 0;
        updateCartDisplay();
    };

    // Debug information
    console.log('Ganesh Utensils website initialized successfully!');
    console.log('Available functions: getCart(), getCartTotal(), clearCart()');
});

// Additional utility functions
function formatCurrency(amount) {
    return 'PKR ' + amount.toLocaleString();
}

function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    var regex = /^[\+]?[1-9][\d]{0,15}$/;
    return regex.test(phone.replace(/\s/g, ''));
}

// Page-specific initializations
$(document).ready(function() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            // Home page specific code
            console.log('Home page loaded');
            break;
            
        case 'products.html':
            // Products page specific code
            console.log('Products page loaded');
            break;
            
        case 'about.html':
            // About page specific code
            console.log('About page loaded');
            break;
            
        case 'contact.html':
            // Contact page specific code
            console.log('Contact page loaded');
            break;
    }
});
