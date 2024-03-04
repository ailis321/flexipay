import React from 'react';

const ReviewsCarousel = () => {

  const reviews = [
    { id: 1, text: 'FlexiPay has been instrumental in streamlining our payment process. The platform is user-friendly and provides excellent support. We are thrilled with the results so far!' },
    { id: 2, text: 'Our experience with FlexiPay has been outstanding. The system is robust and reliable, and the customer service is top-notch. We highly recommend it to other businesses.' },
    { id: 3, text: 'FlexiPay has exceeded our expectations in every way. From its intuitive interface to its seamless integration, it has made payment processing a breeze. We couldn\'t be happier with our choice.' },
    { id: 4, text: 'Using FlexiPay has been a game-changer for our company. It has helped us increase our revenue and improve our customer experience. We are grateful for such a reliable payment platform.' },
    { id: 5, text: 'We\'ve tried several payment platforms, but none compare to FlexiPay. Its features are unmatched, and its support team is incredibly responsive. We are extremely satisfied with our decision to switch.' },
    { id: 6, text: 'FlexiPay has made our lives so much easier. Its straightforward setup and seamless integration have saved us time and money. We highly recommend it to anyone looking for a reliable payment solution.' },
  ];
  
  const groupedReviews = [];
  for (let i = 0; i < reviews.length; i += 3) {
    groupedReviews.push(reviews.slice(i, i + 3));
  }

  return (
    <section className="bg-light py-4">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {groupedReviews.map((group, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="container">
                <div className="row">
                  {group.map((review) => (
                    <div key={review.id} className="col-md-4">
                      <div className="card mb-4">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <img
                              src="https://cdn.vectorstock.com/i/preview-1x/41/19/five-star-5-gold-stars-for-review-and-rating-vector-32824119.jpg"
                              alt="Rating Logo"
                              style={{ width: '50px', height: '50px' }}
                            />
                          </div>
                          <div className="text-center mb-3">
                            <img
                              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305"
                              alt="Company Logo"
                              style={{ width: '100px', height: '100px' }}
                            />
                          </div>
                          <p className="card-text text-center">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
